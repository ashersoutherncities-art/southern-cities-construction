export interface QuotedPurchaseItem {key:string;name:string;description:string;unitAmount:number;quantity:number}
export async function prepareDealPackPurchase(input:{items:QuotedPurchaseItem[];projectAddress:string;cancelPath?:string;boundEmail?:string}) {
  const base=process.env.HUB_BASE_URL?.replace(/\/$/,'')
  const secret=process.env.DEAL_PACK_WEBHOOK_SECRET
  if(!base||!secret)throw new Error('Deal Pack agreement review is temporarily unavailable.')
  const response=await fetch(base+'/api/purchases/deal-pack/intents',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+secret},body:JSON.stringify({source:'main-site',...input}),signal:AbortSignal.timeout(15000)})
  if(!response.ok)throw new Error('Could not prepare the Deal Pack agreement. No payment has been started.')
  const result=await response.json()
  const url=new URL(result.url)
  if(url.origin!==new URL(base).origin||!/^\/purchase\/deal-pack\/[a-f0-9-]{36}$/i.test(url.pathname))throw new Error('Could not verify the agreement review link.')
  return {url:url.href}
}
export async function confirmDealPackAgreementPayment(session:{id:string;metadata?:Record<string,string>|null}) {
  if(!session.metadata?.purchase_agreement_id)return
  const base=process.env.HUB_BASE_URL?.replace(/\/$/,'')
  const secret=process.env.DEAL_PACK_WEBHOOK_SECRET
  if(!base||!secret)throw new Error('Purchase agreement payment verification is unavailable.')
  const response=await fetch(base+'/api/purchases/deal-pack/payment',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+secret},body:JSON.stringify({sessionId:session.id}),signal:AbortSignal.timeout(20000)})
  if(!response.ok)throw new Error('Purchase agreement payment could not be verified.')
}

export async function confirmDealPackRefund(sessionId:string){
 const base=process.env.HUB_BASE_URL?.replace(/\/$/,'');const secret=process.env.DEAL_PACK_WEBHOOK_SECRET
 if(!base||!secret)throw new Error('Refund credit sync is unavailable.')
 const response=await fetch(base+'/api/purchases/deal-pack/payment',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+secret},body:JSON.stringify({sessionId,action:'refund'}),signal:AbortSignal.timeout(20000)})
 if(!response.ok)throw new Error('Refund credit hold could not be verified.')
}
