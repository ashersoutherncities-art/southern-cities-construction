'use client';

import { useState } from 'react';
import { ServiceCardData } from '@/lib/services-data';
import { getServiceRequestIntro, getServiceSubmitLabel } from '@/lib/service-detail-helpers';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  service: ServiceCardData & { avatar: string; avatarLabel: string };
};

function buildDefaultMessage(service: Props['service'], details: string) {
  if (service.purchaseType === 'priced') {
    return `Pricing request for ${service.title}.\n\nProject details:\n${details}`;
  }

  if (service.purchaseType === 'recurring') {
    return `Monthly support request for ${service.title}.\n\nBusiness details:\n${details}`;
  }

  return `Review request for ${service.title}.\n\nProject details:\n${details}`;
}

export default function ServiceLeadForm({ service }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    propertyAddress: '',
    details: '',
    honey: '',
  });
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');

  const submitLabel = getServiceSubmitLabel(service);
  const intro = getServiceRequestIntro(service);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          audience_type: service.avatarLabel,
          service: service.title,
          service_price: service.monthlyPrice,
          source: `${service.purchaseType}:${service.slug}`,
          message: buildDefaultMessage(
            service,
            [
              formData.propertyAddress ? `Address: ${formData.propertyAddress}` : '',
              formData.details,
            ]
              .filter(Boolean)
              .join('\n\n')
          ),
          honey: formData.honey,
        }),
      });

      const result = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(result.error || 'Failed to submit request');

      setState('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        propertyAddress: '',
        details: '',
        honey: '',
      });
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="rounded-[24px] border border-stone-200 bg-white px-6 py-7 sm:px-7 sm:py-8 shadow-elev-1">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
        {service.purchaseType === 'priced' ? 'Get pricing' : service.purchaseType === 'recurring' ? 'Review plan fit' : 'Request review'}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{intro}</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
        Give Southern Cities enough detail to point you to the right next step without pretending this is simpler than it is.
      </p>

      <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Name" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Email" />
        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Phone" />
        <input name="company" value={formData.company} onChange={handleChange} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Company" />
        <input name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 sm:col-span-2" placeholder="Property or project address" />
        <textarea name="details" value={formData.details} onChange={handleChange} required className="min-h-[180px] w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 sm:col-span-2" placeholder="What is happening right now, what has already been done, and what you need help pricing or reviewing next." />
        <input name="honey" value={formData.honey} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" />
        <div className="mt-8 sm:col-span-2 flex flex-wrap gap-3">
          <button type="submit" disabled={state === 'loading'} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70">
            {state === 'loading' ? 'Sending...' : submitLabel}
          </button>
        </div>
        {state === 'success' ? (
          <p className="mt-2 sm:col-span-2 text-sm font-medium leading-[1.6] text-green-700">Request received. Southern Cities will review it and follow up with the right next step.</p>
        ) : null}
        {state === 'error' ? (
          <p className="mt-2 sm:col-span-2 text-sm font-medium leading-[1.6] text-red-700">{error}</p>
        ) : null}
      </form>
    </div>
  );
}
