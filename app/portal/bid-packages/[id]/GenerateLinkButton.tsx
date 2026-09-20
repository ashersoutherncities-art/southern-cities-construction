'use client';

import { useState } from 'react';
import { generateComparisonLinkAction } from './actions';

export default function GenerateLinkButton({ bidPackageId }: { bidPackageId: string }) {
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    try {
      setLink(await generateComparisonLinkAction(bidPackageId));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onGenerate}
        disabled={loading}
        className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 disabled:opacity-60"
      >
        {loading ? 'Generating…' : 'Generate client comparison link'}
      </button>
      {link && (
        <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
          <p className="break-all text-xs text-navy-900">{link}</p>
        </div>
      )}
    </div>
  );
}
