/**
 * FAQPage JSON-LD generator.
 *
 * Important: the Q&A pairs you pass here MUST also be rendered server-side
 * in the page HTML (not just shown after a client-side accordion expand) —
 * Google needs to see the answer in the initial markup for FAQPage rich
 * results to qualify.
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
