from pathlib import Path
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUTPUT_DIR = Path('/Users/ashborn/.openclaw/workspace/southern-cities-construction/public/resources')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BRAND_NAVY = HexColor('#163061')
BRAND_ORANGE = HexColor('#fa8c41')
TEXT = HexColor('#334155')
MUTED = HexColor('#64748b')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name='TitleBrand',
    parent=styles['Title'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=BRAND_NAVY,
    spaceAfter=8,
    alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name='SubtitleBrand',
    parent=styles['BodyText'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=14,
    textColor=BRAND_ORANGE,
    spaceAfter=14,
    alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name='SectionBrand',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=16,
    textColor=BRAND_NAVY,
    spaceBefore=10,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name='BodyBrand',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=10,
    leading=14,
    textColor=TEXT,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name='FooterBrand',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=MUTED,
    spaceBefore=12,
))

RESOURCES = [
    {
        'filename': 'nc-residential-permit-prep-checklist.pdf',
        'title': 'NC Residential Permit Prep Checklist',
        'subtitle': 'Southern Cities Construction · Free Resource',
        'intro': 'Use this checklist to organize a cleaner residential permit submission before it reaches the plan-review desk.',
        'sections': [
            ('1. Verify the property and jurisdiction', [
                'Confirm the exact site address.',
                'Confirm parcel number or tax ID.',
                'Confirm the city or county jurisdiction handling the permit.',
                'Confirm whether zoning, HOA, floodplain, or historic-district issues apply.',
            ]),
            ('2. Define the exact scope of work', [
                'Write a short scope narrative in plain language.',
                'Identify whether the work is repair, renovation, addition, change of use, or new construction.',
                'List structural, electrical, plumbing, mechanical, roofing, window, or layout changes.',
                'Make sure the scope narrative matches the drawings.',
            ]),
            ('3. Gather the plan set and support documents', [
                'Site plan if required.',
                'Existing and proposed floor plans.',
                'Structural details if structure is changing.',
                'MEP layouts if required by scope.',
                'Energy forms, engineering, owner authorization, and HOA approvals where applicable.',
            ]),
            ('4. Catch common misses before filing', [
                'Address is consistent on every document.',
                'Owner and contractor names are consistent on every document.',
                'All sheets are readable, labeled, and current.',
                'Revisions are dated and draft sheets are removed.',
            ]),
            ('5. Submission follow-through', [
                'Save the submission confirmation and permit number.',
                'Track reviewer comments and correction deadlines.',
                'Keep one running log of resubmissions and responses.',
            ]),
        ],
        'footer': 'If you want Southern Cities to review the permit path or handle permit administration, use the services page at southerncitiesconstruction.com.',
    },
    {
        'filename': 'nc-rough-inspection-pass-list.pdf',
        'title': 'NC Rough-Inspection Pass List',
        'subtitle': 'Southern Cities Construction · Free Resource',
        'intro': 'Use this field sheet before calling for a rough inspection so avoidable failures do not cost extra days.',
        'sections': [
            ('Before the inspection request', [
                'Confirm the permit card or permit number is available.',
                'Confirm the scope is ready for the exact inspection being requested.',
                'Confirm unfinished work is not hidden behind walls or ceilings that should still be open.',
                'Confirm the responsible contact can answer inspector questions.',
            ]),
            ('Framing rough checks', [
                'Confirm framing changes match approved plans.',
                'Confirm headers, beams, posts, straps, anchors, and hold-downs are in place as required.',
                'Confirm fire-blocking and draft-stopping conditions are being addressed.',
            ]),
            ('Electrical, plumbing, and mechanical rough checks', [
                'Confirm box placement, cable protection, venting paths, slopes, returns, clearances, and exhaust paths are correct.',
                'Confirm rough-in heights, access points, and support conditions are clean and visible.',
            ]),
            ('General readiness checks', [
                'Confirm work areas are accessible and safe.',
                'Confirm debris is not blocking inspection visibility.',
                'Confirm prior correction items are fully resolved.',
                'Take photos before concealment.',
            ]),
        ],
        'footer': 'If you need Southern Cities help with inspection scheduling support or permit administration, use the contractor services pages at southerncitiesconstruction.com.',
    },
    {
        'filename': 'owner-scope-lock-worksheet.pdf',
        'title': 'Owner Scope-Lock Worksheet',
        'subtitle': 'Southern Cities Construction · Free Resource',
        'intro': 'Use this worksheet before construction starts so scope, allowances, open items, and decision timing are clearer.',
        'sections': [
            ('Project basics', [
                'Property address',
                'Owner name and primary contact',
                'Target start date and target completion date',
                'Project type',
            ]),
            ('1. What is actually being done?', [
                'List every room, area, or exterior zone included.',
                'List anything the owner assumes is included but has not been clearly written anywhere.',
                'List anything intentionally excluded.',
            ]),
            ('2. Allowances and selections', [
                'Document allowance amount, who selects, and deadline for each major finish or fixture category.',
                'Examples: flooring, tile, cabinets, countertops, plumbing fixtures, lighting, appliances, paint level.',
            ]),
            ('3. Open items that create change orders later', [
                'Structural questions still not answered.',
                'Hidden condition risks.',
                'Permit questions still unresolved.',
                'Material lead-time risks or finish selections still undecided.',
            ]),
            ('4. Decision deadlines and change-order rules', [
                'Define final scope-lock date, permit submission date, selection deadlines, and contractor award deadlines.',
                'Clarify what counts as a change, who approves it, and how timeline impact is communicated.',
            ]),
        ],
        'footer': 'If you need help pressure-testing scope, budget, or project setup, use the relevant services at southerncitiesconstruction.com.',
    },
]

def bullet_list(items):
    return ListFlowable(
        [ListItem(Paragraph(item, styles['BodyBrand'])) for item in items],
        bulletType='bullet',
        start='circle',
        leftIndent=18,
    )

for resource in RESOURCES:
    doc = SimpleDocTemplate(str(OUTPUT_DIR / resource['filename']), pagesize=LETTER, rightMargin=54, leftMargin=54, topMargin=54, bottomMargin=54)
    story = []
    story.append(Paragraph(resource['title'], styles['TitleBrand']))
    story.append(Paragraph(resource['subtitle'], styles['SubtitleBrand']))
    story.append(Paragraph(resource['intro'], styles['BodyBrand']))
    story.append(Spacer(1, 8))
    for heading, items in resource['sections']:
        story.append(Paragraph(heading, styles['SectionBrand']))
        story.append(bullet_list(items))
        story.append(Spacer(1, 6))
    story.append(Spacer(1, 10))
    story.append(Paragraph(resource['footer'], styles['FooterBrand']))
    doc.build(story)

print('Built PDFs in', OUTPUT_DIR)
