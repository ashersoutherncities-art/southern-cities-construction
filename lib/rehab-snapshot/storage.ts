import { SupabaseClient } from '@supabase/supabase-js';
import { StoredUpload } from '@/lib/rehab-snapshot/types';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export async function uploadIncomingFiles(
  supabase: SupabaseClient,
  args: {
    email: string;
    propertyAddress: string;
    files: Array<{ file: File; label: string }>;
  }
): Promise<StoredUpload[]> {
  const prefix = `${slugify(args.email)}-${slugify(args.propertyAddress)}-${Date.now()}`;
  const uploaded: StoredUpload[] = [];

  for (let index = 0; index < args.files.length; index += 1) {
    const item = args.files[index];
    const file = item.file;
    if (!file || file.size === 0) continue;

    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
    const path = `${prefix}/${String(index + 1).padStart(2, '0')}-${slugify(item.label)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from('rehab-snapshot-uploads')
      .upload(path, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (error) throw error;

    uploaded.push({
      bucket: 'rehab-snapshot-uploads',
      path,
      label: item.label,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
    });
  }

  return uploaded;
}

export async function uploadPdfReport(
  supabase: SupabaseClient,
  args: { email: string; propertyAddress: string; pdf: Buffer }
) {
  const fileName = `${slugify(args.email)}-${slugify(args.propertyAddress)}-${Date.now()}.pdf`;
  const path = `reports/${fileName}`;
  const { error } = await supabase.storage
    .from('rehab-snapshot-reports')
    .upload(path, args.pdf, { contentType: 'application/pdf', upsert: false });
  if (error) throw error;
  return path;
}
