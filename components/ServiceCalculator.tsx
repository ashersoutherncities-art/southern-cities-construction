'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { buildCartHref, buildDirectCheckoutHref, formatPrice } from '@/lib/cart';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

type NumberFieldConfig = {
  name: string;
  label: string;
  type: 'number';
  min: number;
  max: number;
  defaultValue: number;
};

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldConfig = {
  name: string;
  label: string;
  type: 'select';
  options: SelectOption[];
  defaultValue: string;
};

export type CalculatorFieldConfig = NumberFieldConfig | SelectFieldConfig;

type CalculatorValues = Record<string, string | number>;

export type ServiceCalculatorConfig = {
  itemKey?: string;
  fields: CalculatorFieldConfig[];
  calculatePrice: (values: CalculatorValues) => number;
  actionLabel: string;
  actionHref?: string;
  actionType: 'cart' | 'link';
  checkoutItemKey?: string;
};

function getInitialValues(fields: CalculatorFieldConfig[]): CalculatorValues {
  return fields.reduce<CalculatorValues>((acc, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {});
}

export default function ServiceCalculator({ config }: { config: ServiceCalculatorConfig }) {
  const [values, setValues] = useState<CalculatorValues>(() => getInitialValues(config.fields));
  const [price, setPrice] = useState<number | null>(null);

  const actionHref = useMemo(() => {
    if (price === null) return '#';
    if (config.actionType === 'cart') {
      const itemKey = config.itemKey ?? config.checkoutItemKey;
      if (!itemKey) return '#';
      return buildCartHref([{ key: itemKey, amount: price }]);
    }

    if (config.checkoutItemKey) {
      return buildDirectCheckoutHref({ key: config.checkoutItemKey, amount: price });
    }

    return config.actionHref ?? '#contact';
  }, [config, price]);

  const handleFieldChange = (field: CalculatorFieldConfig, rawValue: string) => {
    setValues((prev) => ({
      ...prev,
      [field.name]: field.type === 'number' ? Number(rawValue) : rawValue,
    }));
  };

  const handleCalculate = () => {
    setPrice(config.calculatePrice(values));
  };

  return (
    <div className="mt-auto rounded-2xl border border-gray-200 bg-[#f8fafc] p-4">
      <div className="grid gap-3">
        {config.fields.map((field) => (
          <label key={field.name} className="block text-left">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: NAVY }}>
              {field.label}
            </span>
            {field.type === 'number' ? (
              <input
                type="number"
                min={field.min}
                max={field.max}
                value={String(values[field.name])}
                onChange={(event) => handleFieldChange(field, event.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm text-gray-700 focus:outline-none"
                style={{ borderColor: 'rgba(19,36,82,0.15)' }}
              />
            ) : (
              <select
                value={String(values[field.name])}
                onChange={(event) => handleFieldChange(field, event.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm text-gray-700 focus:outline-none"
                style={{ borderColor: 'rgba(19,36,82,0.15)' }}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-4 inline-block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
        style={{ backgroundColor: ORANGE }}
      >
        Review Price
      </button>

      {price !== null && (
        <div className="mt-4 rounded-2xl border border-white bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Calculated price</p>
          <p className="mt-1 text-2xl font-extrabold" style={{ color: ORANGE }}>{formatPrice(price)}</p>
          {config.actionType === 'cart' ? (
            <Link
              href={actionHref}
              className="mt-4 inline-block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              Add to Cart
            </Link>
          ) : (
            <a
              href={actionHref}
              className="mt-4 inline-block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              {config.actionLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
