// Deal Desk magic-link email (Resend), mirroring the snapshot email setup.

type LinkEmailContext = 'new' | 'renewal' | 'requested';

const COPY: Record<LinkEmailContext, { subject: string; heading: string; intro: string }> = {
  new: {
    subject: "Welcome to the Deal Desk — here's your access link",
    heading: 'Welcome to the Deal Desk',
    intro:
      "Your subscription is active. Here's your private access link to run a GC-verified rehab + Max Allowable Offer on any NC deal.",
  },
  renewal: {
    subject: 'Your Deal Desk is renewed — fresh access link inside',
    heading: 'Your new cycle is ready',
    intro:
      'Your membership just renewed and your snapshots have reset for the new cycle. Here is your fresh access link.',
  },
  requested: {
    subject: 'Your Deal Desk access link',
    heading: 'Your Deal Desk access link',
    intro:
      "Here's your private access link to open your Deal Desk and run a GC-verified rehab + Max Allowable Offer on any deal.",
  },
};

export async function sendMagicLinkEmail(args: {
  email: string;
  link: string;
  tierName: string;
  context?: LinkEmailContext;
}): Promise<{ sent: boolean }> {
  const fromEmail = process.env.REHAB_SNAPSHOT_FROM_EMAIL || 'reports@southerncitiesconstruction.com';
  if (!process.env.RESEND_API_KEY) return { sent: false };
  const copy = COPY[args.context ?? 'requested'];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f6f2ec;padding:24px;color:#132452;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8dfd4;border-radius:18px;overflow:hidden;">
        <div style="background:#132452;padding:24px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#fa8c41;font-weight:700;">Southern Cities Construction · Deal Desk</div>
          <h1 style="font-size:24px;margin:10px 0 0;">${copy.heading}</h1>
        </div>
        <div style="padding:24px;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">${args.tierName} plan</p>
          <p style="margin:0 0 18px;">${copy.intro}</p>
          <p style="margin:0 0 22px;">
            <a href="${args.link}" style="display:inline-block;background:#fa8c41;color:#132452;font-weight:700;text-decoration:none;padding:13px 22px;border-radius:10px;">Open my Deal Desk</a>
          </p>

          <div style="background:#f6f2ec;border:1px solid #e8dfd4;border-radius:12px;padding:16px;margin:0 0 18px;">
            <p style="margin:0 0 8px;font-weight:700;font-size:14px;">How your access works</p>
            <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:#374151;">
              <li><strong>No password.</strong> This button is your login — keep this email or bookmark the page it opens.</li>
              <li><strong>It refreshes itself.</strong> Each time your subscription renews, we email you a brand-new link automatically — you never have to ask.</li>
              <li><strong>Need one sooner?</strong> Anytime, go to the Deal Desk page and enter your email to get a fresh link.</li>
              <li><strong>Keep it to yourself.</strong> The link is private to your membership and tied to your snapshot allowance.</li>
            </ul>
          </div>

          <p style="margin:0;color:#6b7280;font-size:12px;">This link works for about 40 days, then the next renewal link takes over. If you didn't expect this, you can ignore it. · Southern Cities Construction · NC GC License #107724</p>
        </div>
      </div>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [args.email],
      subject: copy.subject,
      html,
    }),
  });

  return { sent: res.ok };
}
