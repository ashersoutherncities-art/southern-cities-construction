import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {prepareDealPackPurchase,confirmDealPackAgreementPayment} from '@/lib/deal-pack/purchase-agreement';
import {POST as legacy} from '@/app/api/permit-oversight-checkout/route';
import {POST as reorder} from '@/app/api/deal-pack/pro-reorder/route';
import {NextRequest} from 'next/server';
const s=vi.hoisted(()=>({create:vi.fn(),customers:vi.fn(),subscriptions:vi.fn()}));
vi.mock('stripe',()=>({default:class{checkout={sessions:{create:s.create}};customers={list:s.customers};subscriptions={list:s.subscriptions}}}));
beforeEach(()=>{vi.stubEnv('HUB_BASE_URL','https://hub.example.test');vi.stubEnv('DEAL_PACK_WEBHOOK_SECRET','synthetic-shared-key');vi.stubEnv('STRIPE_SECRET_KEY','synthetic-key');vi.stubEnv('DEAL_PACK_PRO_PRICE_ID','price_qa');s.create.mockReset();s.customers.mockResolvedValue({data:[{id:'qa'}]});s.subscriptions.mockResolvedValue({data:[{status:'active',items:{data:[{price:{id:'price_qa'}}]}}]});vi.stubGlobal('fetch',vi.fn(async()=>Response.json({url:'https://hub.example.test/purchase/deal-pack/11111111-1111-4111-8111-111111111111'})))});
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs()});
const purchase={items:[{key:'deal-pack-bid-ready',name:'Bid Ready',description:'Report',unitAmount:59900,quantity:1}],projectAddress:'QA Property'};
it('sends only a server-authenticated quote and refuses an untrusted redirect',async()=>{
 await prepareDealPackPurchase(purchase);
 expect(fetch).toHaveBeenCalledWith('https://hub.example.test/api/purchases/deal-pack/intents',expect.objectContaining({headers:expect.objectContaining({Authorization:'Bearer synthetic-shared-key'}),body:JSON.stringify({source:'main-site',...purchase})}));
 vi.stubGlobal('fetch',vi.fn(async()=>Response.json({url:'https://evil.example/purchase/deal-pack/11111111-1111-4111-8111-111111111111'})));
 await expect(prepareDealPackPurchase(purchase)).rejects.toThrow('verify');
});
it('fails closed before payment if agreement service is unavailable',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>new Response('{}',{status:503})));
 await expect(prepareDealPackPurchase(purchase)).rejects.toThrow('No payment');
 expect(s.create).not.toHaveBeenCalled();
});
it('the legacy purchase endpoint cannot bypass the Deal Pack agreement',async()=>{
 const r=await legacy(new NextRequest('https://site.example.test/api/permit-oversight-checkout',{method:'POST',body:JSON.stringify({item:'deal-pack-build-ready',buyer_name:'QA',buyer_email:'qa@example.test',project_address:'QA Property',project_manager_role:'owner'})}));
 expect(r.status).toBe(200);expect((await r.json()).url).toContain('/purchase/deal-pack/');expect(s.create).not.toHaveBeenCalled();
});
it('keeps Pro membership verification and binds discounted quotes to its verified Hub email',async()=>{
 const r=await reorder(new NextRequest('https://site.example.test/api/deal-pack/pro-reorder',{method:'POST',body:JSON.stringify({email:'member@example.test',projectAddress:'QA Property',quantity:2})}));
 expect(r.status).toBe(200);const payload=JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string);expect(payload.boundEmail).toBe('member@example.test');expect(payload.items[0]).toMatchObject({quantity:2,unitAmount:39900,key:'deal-pack-bid-ready'});expect(s.create).not.toHaveBeenCalled();
 s.subscriptions.mockResolvedValue({data:[]});expect((await reorder(new NextRequest('https://site.example.test/reorder',{method:'POST',body:JSON.stringify({email:'notmember@example.test',projectAddress:'QA'})}))).status).toBe(403);
});
it('keeps legacy fulfillment unchanged but blocks new agreement orders on failed payment verification',async()=>{
 await confirmDealPackAgreementPayment({id:'old_session',metadata:{}});expect(fetch).not.toHaveBeenCalled();
 vi.stubGlobal('fetch',vi.fn(async()=>new Response('{}',{status:503})));
 await expect(confirmDealPackAgreementPayment({id:'cs_test_qa',metadata:{purchase_agreement_id:'agreement'}})).rejects.toThrow('could not be verified');
});
