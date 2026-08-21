ALTER TABLE subcontractor_applications
  ADD COLUMN IF NOT EXISTS sms_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sms_consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS sms_consent_version text,
  ADD COLUMN IF NOT EXISTS sms_consent_language text;
