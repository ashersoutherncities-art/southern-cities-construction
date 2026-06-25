import React from 'react';
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { formatProjectCategoryLabel } from '@/lib/rehab-snapshot/engine';
import {
  EstimateComputation,
  RehabSnapshotLeadInput,
  RehabSnapshotProjectInput,
} from '@/lib/rehab-snapshot/types';
import type { MaoResult } from '@/lib/avm';

const NAVY = '#132452';
const INK = '#0c1730';
const ORANGE = '#fa8c41';
const MUTE = '#6b7787';
const LINE = '#e9e2d7';
const CREAM = '#faf7f2';

export const SNAPSHOT_DISCLAIMER =
  'This Rehab Budget & Execution-Risk Snapshot is a preliminary, GC-calibrated feasibility estimate based only on the property details you provided. It is not a site inspection, a contractor bid, a proposal, or a guaranteed price. Actual cost depends on a physical scope review, site and hidden conditions, finish selections, permitting and jurisdiction requirements, and current trade-labor and material pricing — any of which can materially change the figures shown. Use it to screen and underwrite a deal, not to set a final budget. A firm, GC-committed number comes from a Southern Cities Deal Pack or a full scope review.';

export const MAO_DISCLAIMER =
  'The Max Allowable Offer and After-Repair Value are underwriting guides derived from current market data and your rehab estimate — not an appraisal or a guaranteed value. The ARV is finalized by a Southern Cities Realty Comparative Market Analysis under our NC real estate brokerage license.';

const styles = StyleSheet.create({
  page: { paddingBottom: 40, fontSize: 9.5, fontFamily: 'Helvetica', color: INK, backgroundColor: '#ffffff' },
  header: { backgroundColor: NAVY, paddingVertical: 22, paddingHorizontal: 34 },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  brand: { fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 1.4, color: ORANGE, textTransform: 'uppercase' },
  license: { fontSize: 8, color: '#aab6d8' },
  hTitle: { fontSize: 19, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 5 },
  hSub: { fontSize: 9.5, color: '#cdd7f0', lineHeight: 1.4 },
  body: { paddingHorizontal: 34, paddingTop: 18 },
  headline: { borderWidth: 1, borderColor: LINE, borderRadius: 12, backgroundColor: CREAM, padding: 18, marginBottom: 14 },
  hlLabel: { fontSize: 8.5, textTransform: 'uppercase', letterSpacing: 0.8, color: MUTE, marginBottom: 6 },
  hlValue: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: INK },
  hlMetaRow: { flexDirection: 'row', gap: 22, marginTop: 13 },
  hlMetaLabel: { fontSize: 8, color: MUTE, marginBottom: 2 },
  hlMetaValue: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: NAVY },
  read: { fontSize: 10, lineHeight: 1.5, color: '#33414f', marginBottom: 16 },
  section: { marginBottom: 16 },
  sTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: INK, marginBottom: 9 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#f1ece4' },
  rowLabel: { fontSize: 9.5, color: INK },
  rowNote: { fontSize: 7.5, color: MUTE, marginTop: 1 },
  rowValue: { flex: 0.8, textAlign: 'right', fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: NAVY },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1.5, borderTopColor: NAVY, marginTop: 2 },
  bullet: { flexDirection: 'row', marginBottom: 6 },
  dot: { width: 10, fontSize: 9.5, color: ORANGE },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.45, color: '#33414f' },
  cta: { borderWidth: 1, borderColor: ORANGE, borderRadius: 12, backgroundColor: '#fff6ee', padding: 15, marginBottom: 16 },
  ctaTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#b25a18', marginBottom: 5 },
  ctaText: { fontSize: 9.5, lineHeight: 1.5, color: '#7a4a1d' },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { borderWidth: 1, borderColor: LINE, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 11 },
  chipLabel: { fontSize: 7.5, textTransform: 'uppercase', color: MUTE, marginBottom: 2 },
  chipValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: INK },
  disclaimer: { borderTopWidth: 1, borderTopColor: LINE, paddingTop: 12 },
  disTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: MUTE, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 5 },
  disText: { fontSize: 8, lineHeight: 1.5, color: '#7c879b', marginBottom: 7 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  footText: { fontSize: 8, color: MUTE },
  maoBox: { borderWidth: 1, borderColor: '#cbd8ee', borderRadius: 12, backgroundColor: '#f6f9ff', padding: 16, marginBottom: 16 },
  maoVerdict: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 10 },
});

function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.hlMetaLabel}>{label}</Text>
      <Text style={styles.hlMetaValue}>{value}</Text>
    </View>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.dot}>{'•'}</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
}

const VERDICT_META: Record<MaoResult['verdict'], { label: string; color: string }> = {
  strong: { label: 'STRONG — healthy spread', color: '#1a7f37' },
  thin: { label: 'THIN — tight margin', color: '#b7791f' },
  pass: { label: 'PASS — no room at this ARV', color: '#c0392b' },
};

function MaoSection({ mao }: { mao: MaoResult }) {
  const verdict = VERDICT_META[mao.verdict];
  const line = (label: string, value: string, strong?: boolean) => (
    <View style={[styles.row, strong ? { borderTopWidth: 1.5, borderTopColor: NAVY, borderBottomWidth: 0, marginTop: 2 } : {}]}>
      <Text style={[styles.rowLabel, strong ? { fontFamily: 'Helvetica-Bold' } : {}]}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.maoBox} wrap={false}>
      <Text style={styles.sTitle}>Deal verdict & Max Allowable Offer</Text>
      <Text style={[styles.maoVerdict, { color: verdict.color }]}>{verdict.label}</Text>
      {line('After-Repair Value (ARV)', currency(mao.arv))}
      {line('Less: estimated rehab (all-in)', `- ${currency(mao.rehab)}`)}
      {line('Less: target profit', `- ${currency(mao.buyerProfit)}`)}
      {line('Less: selling costs (6% + closing)', `- ${currency(mao.holdingClosing)}`)}
      {line('Less: assignment fee', `- ${currency(mao.assignmentFee)}`)}
      {line('Max Allowable Offer', currency(mao.mao), true)}
      {mao.recommendCma ? (
        <Text style={[styles.bulletText, { marginTop: 9, color: '#c0392b' }]}>
          Valuation came back uncertain on this property. Order a Southern Cities Realty CMA to finalize the ARV before making this offer.
        </Text>
      ) : null}
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
    <Document title="Rehab Budget & Execution-Risk Snapshot — Southern Cities Construction">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>Southern Cities Construction</Text>
            <Text style={styles.license}>NC General Contractor · License #107724</Text>
          </View>
          <Text style={styles.hTitle}>Rehab Budget & Execution-Risk Snapshot</Text>
          <Text style={styles.hSub}>
            Prepared for {lead.first_name} {lead.last_name}  ·  {project.property_address}, {project.city}, {project.state} {project.zip}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.headline} wrap={false}>
            <Text style={styles.hlLabel}>Estimated all-in rehab budget</Text>
            <Text style={styles.hlValue}>
              {currency(estimate.estimatedLow)} – {currency(estimate.estimatedHigh)}
            </Text>
            <View style={styles.hlMetaRow}>
              <Metric label="Stress-tested (high-risk)" value={currency(estimate.highRiskEstimate)} />
              <Metric label="Timeline" value={`${estimate.timelineLowWeeks}–${estimate.timelineHighWeeks} weeks`} />
              <Metric label="Scope" value={formatProjectCategoryLabel(estimate.projectCategory)} />
            </View>
          </View>

          {estimate.executionSummary ? <Text style={styles.read}>{estimate.executionSummary}</Text> : null}

          {mao ? <MaoSection mao={mao} /> : null}

          <View style={styles.section}>
            <Text style={styles.sTitle}>Where the budget goes</Text>
            {estimate.breakdown.map((r) => (
              <View style={styles.row} key={r.label}>
                <View style={{ flex: 1.5 }}>
                  <Text style={styles.rowLabel}>{r.label}</Text>
                  {r.notes ? <Text style={styles.rowNote}>{r.notes}</Text> : null}
                </View>
                <Text style={styles.rowValue}>
                  {currency(r.low)} – {currency(r.high)}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={[styles.rowLabel, { fontFamily: 'Helvetica-Bold' }]}>All-in range</Text>
              <Text style={styles.rowValue}>
                {currency(estimate.estimatedLow)} – {currency(estimate.estimatedHigh)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sTitle}>Execution risk on this property</Text>
            {estimate.riskFlags.length ? (
              estimate.riskFlags.map((f) => <Bullet key={f}>{f}</Bullet>)
            ) : (
              <Text style={styles.bulletText}>No major execution flags surfaced from the intake beyond normal rehab variance.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sTitle}>What could move this number</Text>
            {estimate.whatCouldChangeThisNumber.map((f) => (
              <Bullet key={f}>{f}</Bullet>
            ))}
          </View>

          <View style={styles.cta} wrap={false}>
            <Text style={styles.ctaTitle}>Your next step</Text>
            <Text style={styles.ctaText}>
              {estimate.recommendedNextStep} To turn this range into a firm number, get a Southern Cities Deal Pack — a licensed NC
              GC walks the property and commits to the rehab price in writing.
            </Text>
          </View>

          <View style={styles.metaGrid} wrap={false}>
            <Chip label="Property type" value={project.property_type.replace(/_/g, ' ')} />
            <Chip label="Square feet" value={project.square_feet.toLocaleString()} />
            <Chip label="Year built" value={project.year_built ? String(project.year_built) : 'Unknown'} />
            <Chip label="Permit complexity" value={estimate.permitComplexity} />
            <Chip label="Estimate confidence" value={estimate.confidenceLevel.toUpperCase()} />
          </View>

          <View style={styles.disclaimer} wrap={false}>
            <Text style={styles.disTitle}>About this estimate</Text>
            <Text style={styles.disText}>{SNAPSHOT_DISCLAIMER}</Text>
            {mao ? <Text style={styles.disText}>{MAO_DISCLAIMER}</Text> : null}
            <View style={styles.footer}>
              <Text style={styles.footText}>Southern Cities Construction · NC GC #107724</Text>
              <Text style={styles.footText}>orders@southerncitiesconstruction.com · southerncitiesconstruction.com</Text>
            </View>
          </View>
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
