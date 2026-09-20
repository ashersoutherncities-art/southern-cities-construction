// Best-effort team notification (Telegram) — used for CMA orders so SC Realty
// knows to fulfill. Silent no-op if creds are missing or the call fails.
export async function notifyTeam(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text }),
    });
  } catch {
    // best-effort
  }
}
