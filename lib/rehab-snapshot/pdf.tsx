import React from 'react';
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { formatProjectCategoryLabel } from '@/lib/rehab-snapshot/engine';
import {
  EstimateComputation,
  RehabSnapshotLeadInput,
  RehabSnapshotProjectInput,
} from '@/lib/rehab-snapshot/types';
import type { MaoResult } from '@/lib/avm';

const styles = StyleSheet.create({
  page: {
    padding: 34,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#132452',
    backgroundColor: '#f7f3ed',
  },
  hero: {
    backgroundColor: '#132452',
    borderRadius: 16,
    padding: 24,
    color: '#ffffff',
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#fa8c41',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    color: '#ffffff',
  },
  heroBody: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#d9e2ff',
  },
  metricRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    border: '1 solid #e6ddd1',
  },
  metricLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#7c879b',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#08111d',
    marginBottom: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    border: '1 solid #e6ddd1',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    color: '#08111d',
  },
  body: {
    fontSize: 10,
    lineHeight: 1.45,
    color: '#324155',
  },
  bullet: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 6,
    borderBottom: '1 solid #f0ebe3',
  },
  rowLabel: {
    flex: 1.4,
    color: '#08111d',
  },
  rowValue: {
    flex: 0.9,
    textAlign: 'right',
    color: '#132452',
    fontWeight: 700,
  },
  note: {
    fontSize: 8,
    color: '#7c879b',
    marginTop: 2,
  },
  footerNote: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.45,
  },
});

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

const VERDICT_META: Record<MaoResult['verdict'], { label: string; color: string }> = {
  strong: { label: 'STRONG — healthy spread', color: '#1a7f37' },
  thin: { label: 'THIN — tight margin', color: '#b7791f' },
  pass: { label: 'PASS — no room at this ARV', color: '#c0392b' },
};

// Deal Desk only. Renders the Max Allowable Offer + verdict. Never shows the
// individual AVM provider numbers (MaoResult has none) — ARV here is the
// reconciled, derived figure. Omitted entirely on the free snapshot.
function MaoSection({ mao }: { mao: MaoResult }) {
  const verdict = VERDICT_META[mao.verdict];
  return (
    <View style={[styles.section, { borderWidth: 1, borderColor: '#e8dfd4', borderRadius: 8, padding: 12 }]}>
      <Text style={styles.sectionTitle}>Deal Verdict & Max Allowable Offer</Text>
      <Text style={[styles.metricValue, { color: verdict.color, marginBottom: 6 }]}>{verdict.label}</Text>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Max Allowable Offer</Text>
          <Text style={styles.metricValue}>{currency(mao.mao)}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Rule-of-thumb cross-check</Text>
          <Text style={styles.metricValue}>{currency(mao.maoRuleOfThumb)}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Valuation confidence</Text>
          <Text style={styles.metricValue}>{mao.confidence.toUpperCase()}</Text>
        </View>
      </View>

      <View style={[styles.row, { marginTop: 6 }]}>
        <Text style={styles.rowLabel}>After-Repair Value (ARV)</Text>
        <Text style={styles.rowValue}>{currency(mao.arv)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Less: estimated rehab (all-in)</Text>
        <Text style={styles.rowValue}>- {currency(mao.rehab)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Less: buyer profit</Text>
        <Text style={styles.rowValue}>- {currency(mao.buyerProfit)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Less: holding + closing</Text>
        <Text style={styles.rowValue}>- {currency(mao.holdingClosing)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Less: assignment fee</Text>
        <Text style={styles.rowValue}>- {currency(mao.assignmentFee)}</Text>
      </View>
      <View style={[styles.row, { borderTopWidth: 1, borderTopColor: '#132452', marginTop: 2 }]}>
        <Text style={[styles.rowLabel, { fontFamily: 'Helvetica-Bold' }]}>Max Allowable Offer</Text>
        <Text style={[styles.rowValue, { fontFamily: 'Helvetica-Bold' }]}>{currency(mao.mao)}</Text>
      </View>

      {mao.recommendCma ? (
        <Text style={[styles.bullet, { marginTop: 8, color: '#c0392b' }]}>
          Automated valuations diverged or were low-confidence. Order a Southern Cities Realty CMA to finalize the ARV before making this offer.
        </Text>
      ) : null}

      <Text style={[styles.footerNote, { marginTop: 8 }]}>
        The Max Allowable Offer is derived from automated valuation models (AVMs) and your rehab estimate. It is an underwriting guide — not an appraisal or a guaranteed value. The ARV is finalized by a Southern Cities Realty Comparative Market Analysis (CMA) under our NC real estate brokerage license.
      </Text>
    </View>
  );
}

function SnapshotPdf({
  lead,
  project,
  estimate,
  mao,
}: {
  lead: RehabSnapshotLeadInput;
  project: RehabSnapshotProjectInput;
  estimate: EstimateComputation;
  mao?: MaoResult | null;
}) {
  return (
    <Document title="Preliminary Rehab Budget Range & Execution Risk Snapshot">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Southern Cities Construction</Text>
          <Text style={styles.title}>Preliminary Rehab Budget Range & Execution Risk Snapshot</Text>
          <Text style={styles.heroBody}>
            Preliminary feasibility estimate for {project.property_address}, {project.city}, {project.state}. This is an underwriting tool designed to bucket execution cost and likely risk, not a contractor quote or guaranteed price.
          </Text>
        </View>

        {mao ? <MaoSection mao={mao} /> : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Project Summary</Text>
          <Text style={styles.body}>{lead.first_name} {lead.last_name}</Text>
          <Text style={styles.body}>{project.property_address}, {project.city}, {project.state} {project.zip}</Text>
          <Text style={styles.body}>Property type: {project.property_type.replace(/_/g, ' ')}</Text>
          <Text style={styles.body}>Square feet: {project.square_feet.toLocaleString()}</Text>
          <Text style={styles.body}>Year built: {project.year_built || 'Unknown'}</Text>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>2. Preliminary budget range</Text>
            <Text style={styles.metricValue}>{currency(estimate.estimatedLow)} - {currency(estimate.estimatedHigh)}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>3. High-risk budget scenario</Text>
            <Text style={styles.metricValue}>{currency(estimate.highRiskEstimate)}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>4. Estimated timeline range</Text>
            <Text style={styles.metricValue}>{estimate.timelineLowWeeks}-{estimate.timelineHighWeeks} weeks</Text>
          </View>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>5. Confidence level</Text>
            <Text style={styles.metricValue}>{estimate.confidenceLevel.toUpperCase()} ({estimate.confidenceScore}/100)</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>6. Likely project category</Text>
            <Text style={styles.metricValue}>{formatProjectCategoryLabel(estimate.projectCategory)}</Text>
            <Text style={styles.body}>Execution difficulty: {estimate.executionDifficulty}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Permit complexity</Text>
            <Text style={styles.metricValue}>{estimate.permitComplexity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Major Execution Risk Flags</Text>
          {estimate.riskFlags.length ? (
            estimate.riskFlags.map((flag) => (
              <Text style={styles.bullet} key={flag}>- {flag}</Text>
            ))
          ) : (
            <Text style={styles.body}>No major execution flags were surfaced from the intake beyond normal rehab variance.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Assumptions Used</Text>
          {estimate.assumptions.map((item) => (
            <Text style={styles.bullet} key={item}>- {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. What Could Change This Number</Text>
          {estimate.whatCouldChangeThisNumber.map((item) => (
            <Text style={styles.bullet} key={item}>- {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Recommended Next Step</Text>
          <Text style={styles.body}>{estimate.recommendedNextStep}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Breakdown</Text>
          {estimate.breakdown.map((row) => (
            <View style={styles.row} key={row.label}>
              <View style={{ flex: 1.4 }}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                {row.notes ? <Text style={styles.note}>{row.notes}</Text> : null}
              </View>
              <Text style={styles.rowValue}>{currency(row.low)} - {currency(row.high)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Internal Summary</Text>
          <Text style={styles.body}>{estimate.executionSummary}</Text>
          <Text style={[styles.footerNote, { marginTop: 8 }]}>
            Prepared for {lead.first_name} {lead.last_name} by Southern Cities Construction. Contact: orders@southerncitiesconstruction.com.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderSnapshotPdf(args: {
  lead: RehabSnapshotLeadInput;
  project: RehabSnapshotProjectInput;
  estimate: EstimateComputation;
  mao?: MaoResult | null;
}) {
  return renderToBuffer(<SnapshotPdf {...args} />);
}
