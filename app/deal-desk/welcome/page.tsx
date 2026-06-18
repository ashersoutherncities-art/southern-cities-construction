import Link from 'next/link';

const NAVY = '#132452';
const ORANGE = '#fa8c41';
const CREAM = '#f6f2ec';

export default function DealDeskWelcome() {
  return (
    <main style={{ background: CREAM, color: NAVY, minHeight: '100vh', padding: '64px 20px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', background: '#fff', border: '1px solid #e8dfd4', borderRadius: 18, padding: 32 }}>
        <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 12, margin: 0 }}>
          Southern Cities Construction · Deal Desk
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 900, margin: '12px 0 10px' }}>You&apos;re in. Welcome to the Deal Desk.</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6 }}>
          Your subscription is active. <strong>We just emailed your private access link</strong> to the address you used at
          checkout — click it to open your Deal Desk and run a GC-verified rehab number plus your Max Allowable Offer on any NC deal.
        </p>

        <div style={{ background: CREAM, border: '1px solid #e8dfd4', borderRadius: 12, padding: 16, margin: '16px 0' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 14 }}>How your access works</p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7, color: '#374151' }}>
            <li><strong>No password</strong> — your emailed link is your login. Bookmark the page it opens.</li>
            <li><strong>It renews automatically</strong> — each billing cycle we email you a fresh link and reset your snapshots.</li>
            <li><strong>Need one now?</strong> Use the button below to send yourself a fresh link anytime.</li>
          </ul>
        </div>

        <Link
          href="/deal-desk#member"
          style={{ display: 'inline-block', background: ORANGE, color: NAVY, fontWeight: 700, textDecoration: 'none', padding: '13px 22px', borderRadius: 10 }}
        >
          Email me a fresh link
        </Link>
        <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
          Didn&apos;t get the email? Check spam, or use the button above. Your link is private to you and works on any device.
        </p>
      </div>
    </main>
  );
}
