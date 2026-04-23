'use client';

import { useEffect } from 'react';

export default function RealtorRedirectPage() {
  useEffect(() => {
    window.location.replace('/services/realtors');
  }, []);

  return null;
}
