'use client';

import { useRef, useState } from 'react';
import { getBrowserSupabaseClient } from '@/lib/supabase-browser';
import { createBidPackageUploadUrlAction, recordBidPackageDocumentAction } from './actions';

/**
 * Direct-to-Storage upload for Bid Package drawings/specs. Every other
 * upload route in this repo goes through the Next.js API layer, which
 * Vercel serverless caps at 4.5MB regardless of the app's own limit — floor
 * plans and spec PDFs routinely exceed that. This gets a signed upload URL
 * from the server action, then PUTs the file straight to Supabase Storage
 * from the browser, so the file bytes never touch a Next.js request body.
 */
export default function BidPackageDocumentUploader({ bidPackageId }: { bidPackageId: string }) {
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error' | 'done'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setMessage('Choose a file first.');
      return;
    }
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setMessage('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set — direct-to-Storage upload is unavailable until it is.');
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setMessage(null);
    try {
      const signed = await createBidPackageUploadUrlAction(bidPackageId, file.name);
      if ('error' in signed) {
        setStatus('error');
        setMessage(signed.error);
        return;
      }
      const { error } = await supabase.storage
        .from('gc-procurement-documents')
        .uploadToSignedUrl(signed.path, signed.token, file);
      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }
      await recordBidPackageDocumentAction({
        bidPackageId,
        label: label || file.name,
        path: signed.path,
        fileType: file.type || '',
      });
      setStatus('done');
      setLabel('');
      if (fileRef.current) fileRef.current.value = '';
    } catch (e) {
      setStatus('error');
      setMessage(e instanceof Error ? e.message : 'Upload failed');
    }
  }

  return (
    <div className="space-y-2">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Floor Plan / Elevation / Spec Sheet"
        className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs"
      />
      <input ref={fileRef} type="file" className="w-full text-xs" />
      <button
        type="button"
        onClick={onUpload}
        disabled={status === 'uploading'}
        className="w-full rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy disabled:opacity-60"
      >
        {status === 'uploading' ? 'Uploading…' : 'Upload (no size limit via signed URL)'}
      </button>
      {message && <p className={`text-xs ${status === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>{message}</p>}
      {status === 'done' && !message && <p className="text-xs text-emerald-700">Uploaded.</p>}
    </div>
  );
}
