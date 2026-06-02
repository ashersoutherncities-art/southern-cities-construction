from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


BASE = Path("/Users/ashborn/.openclaw/workspace")
OUT = BASE / "submitted-draw-requests/1115-n-long-st-salisbury-nc/building-bee-subcontract-agreement-2026-05-18.pdf"
LOGO = BASE / "tmp/sharefile-logo/southern-cities-construction-full-logo.png"
LINE_ITEMS = [
    ["Demolition and debris removal", "$2,200.00"],
    ["Foundation and floor support stabilization", "$4,150.00"],
    ["Roofing labor", "$4,900.00"],
    ["Exterior siding and envelope labor", "$4,000.00"],
    ["Structural framing labor", "$900.00"],
    ["Finish carpentry and punch labor", "$650.00"],
    ["Drywall and insulation labor", "$2,650.00"],
    ["Interior paint labor", "$1,600.00"],
    ["Flooring labor", "$1,600.00"],
    ["Kitchen install labor", "$750.00"],
    ["Bathroom install labor", "$1,600.00"],
]
styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="DocTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#111827"),
        alignment=TA_CENTER,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="Meta",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionHead",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#111827"),
        spaceBefore=10,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyCopy",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletCopy",
        parent=styles["BodyCopy"],
        leftIndent=14,
        bulletIndent=4,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="TinyCopy",
        parent=styles["BodyCopy"],
        fontSize=8.5,
        leading=11,
        spaceAfter=4,
    )
)


def p(text: str, style: str = "BodyCopy"):
    return Paragraph(text, styles[style])


def bullet(text: str):
    return Paragraph(text, styles["BulletCopy"], bulletText="•")


doc = SimpleDocTemplate(
    str(OUT),
    pagesize=letter,
    leftMargin=0.7 * inch,
    rightMargin=0.7 * inch,
    topMargin=0.65 * inch,
    bottomMargin=0.65 * inch,
)

story = []

if LOGO.exists():
    logo = Image(str(LOGO), width=3.7 * inch, height=1.43 * inch)
    story.append(logo)
    story.append(Spacer(1, 8))

story.append(p("Southern Cities Construction - Subcontract Agreement", "DocTitle"))
story.append(
    p(
        'This Subcontract Agreement ("Agreement") is entered into as of <b>May 18, 2026</b> by and between '
        '<b>Southern Cities Construction LLC</b> ("Contractor") and <b>The Building Bee LLC</b> ("Subcontractor").',
        "Meta",
    )
)

meta = Table(
    [
        ["Project", "1115 N Long St Renovation"],
        ["Address", "1115 N Long St, Salisbury, NC"],
        ["Owner / Client", "Kiavi-funded rehab project"],
        ["Contract Sum", "$25,000.00"],
        ["Estimated Start", "June 1, 2026"],
        ["Final Completion", "July 10, 2026"],
    ],
    colWidths=[1.55 * inch, 4.85 * inch],
)
meta.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f8fafc")),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
            ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#111827")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
story.append(meta)
story.append(Spacer(1, 10))

sections = [
    (
        "1. Project",
        [
            "Contractor is the prime contractor or construction manager for the Project. The parties want to memorialize the agreed labor budget scope and pricing basis identified in <b>Exhibit A</b> as a binding subcontract between Subcontractor and Contractor."
        ],
    ),
    (
        "2. Scope of Work",
        [
            'Subcontractor shall furnish all labor, supervision, tools, equipment, transportation, consumables, and all other items reasonably necessary to complete the work described in <b>Exhibit A</b> (the "Work"), except for items expressly stated in Exhibit A as excluded and accepted in writing by Contractor.',
            "Subcontractor shall:",
            ("bullets", [
                "perform the Work in a good and workmanlike manner;",
                "comply with all applicable codes, laws, ordinances, permit requirements, and manufacturer requirements;",
                "coordinate sequencing with Contractor and other trades;",
                "keep the jobsite broom-clean and remove trade debris generated by Subcontractor;",
                "protect completed work, adjacent surfaces, and materials from damage; and",
                "promptly correct defective or non-conforming work at Subcontractor's expense.",
            ]),
            "If there is any conflict between this Agreement and Exhibit A, this Agreement controls unless Contractor signs a written amendment stating otherwise.",
        ],
    ),
    (
        "3. Contract Sum",
        [
            'The total amount payable to Subcontractor for the Work is <b>$25,000.00</b> (the "Contract Sum"), subject only to approved written change orders.',
            'The Contract Sum is based on the revised labor budget reflected in Column D ("Labor Budget") of the exact workbook tab titled "Sheet I made " for the Project. That column was verified to total $25,000.00 and is deemed to include all ordinary field conditions reasonably inferable from the Project documents, site observations, and the agreed labor scope unless expressly excluded in Exhibit A.',
        ],
    ),
    (
        "4. Schedule",
        [
            "Estimated start date: <b>June 1, 2026</b><br/>Substantial completion date: <b>July 8, 2026</b><br/>Final completion date: <b>July 10, 2026</b>",
            "Time is material. Subcontractor shall staff the Project adequately and perform the Work in accordance with Contractor's schedule updates. If Subcontractor believes a delay will occur, Subcontractor shall notify Contractor immediately in writing with the cause, expected duration, and proposed recovery plan.",
        ],
    ),
    (
        "5. Payment Terms",
        [
            "Payment shall be made against approved invoices and milestone completion as set out in <b>Exhibit B</b>. Each milestone amount is a partial payment on the Contract Sum only for Work actually completed, inspected by Contractor, and accepted for billing.",
            "The following conditions apply to every payment request:",
            ("bullets", [
                "Subcontractor must submit an invoice describing the completed portion of the Work.",
                "Payment is milestone-based only. No payment is due in advance of the applicable milestone completion and billing approval.",
                "When an inspection is required for a milestone or draw, Subcontractor shall, when instructed by Contractor, take and submit inspection photographs or other supporting documentation needed for draw or inspection package submission.",
                "Contractor is not obligated to pay for unapproved change work, stored materials, or incomplete milestone packages.",
                "Draw disbursements are generally expected within <b>1-2 business days</b> after a complete submission package is delivered, but timing may be affected by wire issues, lender processing delays, bank delays, or other funding issues outside Contractor's control.",
                "If any such delay occurs, Contractor shall provide Subcontractor with daily communication and status updates until the applicable draw funds are disbursed.",
                "To the extent Contractor's receipt of owner, lender, or draw funds is delayed for reasons not caused solely by Contractor, payment to Subcontractor for the affected Work shall be due within a reasonable time after Contractor receives corresponding funds for that Work.",
                "Contractor may withhold payment for defective work, incomplete work, disputed amounts, backcharges, missing closeout items, or failure to provide required documents.",
                "Contractor may offset any amounts owed to Contractor arising from Subcontractor's breach, delay, defective work, cleanup failure, warranty work, lien claims, or damage caused by Subcontractor.",
                "Contractor may hold <b>0% retainage</b> unless Contractor later elects to withhold retainage or specific punch-list reserves against incomplete or disputed items.",
                "Final payment is conditioned on punch list completion, final inspection approval if applicable, delivery of warranties, delivery of final unconditional lien waiver, and confirmation that all lower-tier labor and suppliers for Subcontractor have been paid.",
            ]),
            "No extra work, material upgrade, substitution, or scope revision shall be paid unless authorized by a written change order signed by Contractor before the changed work starts.",
            "Subcontractor is not entitled to delay damages, extended overhead, acceleration compensation, or other impact claims unless Contractor expressly approves the claim in a signed writing stating the exact amount due.",
        ],
    ),
    (
        "6. Licenses, Insurance, and Compliance",
        [
            "Before starting work, Subcontractor shall provide current copies of:",
            ("bullets", [
                "required trade licenses;",
                "general liability insurance;",
                "workers' compensation coverage or valid exemption documentation; and",
                "any other certifications reasonably requested by Contractor for the Project.",
            ]),
            "Subcontractor is responsible for its own employees, helpers, subcontractors, taxes, payroll, and legal compliance.",
        ],
    ),
    (
        "7. Safety",
        [
            "Subcontractor shall control its means and methods and is solely responsible for the safety of its employees, agents, suppliers, and lower-tier subcontractors. Subcontractor shall follow site safety rules issued by Contractor and stop any unsafe activity immediately upon notice.",
        ],
    ),
    (
        "8. Materials and Storage",
        [
            "Unless Exhibit A states otherwise, Subcontractor shall supply only those materials, if any, expressly included in the agreed labor budget scope. For a labor-only scope, Contractor or others designated by Contractor may supply project materials. Title to materials for which Contractor has paid passes to Contractor upon payment or delivery to the jobsite, whichever occurs first, but risk of loss remains with Subcontractor until the relevant Work is installed and accepted.",
        ],
    ),
    (
        "9. Warranties",
        [
            "Subcontractor warrants its Work for <b>one year</b> from substantial completion of the Project, or for any longer period required by law or a manufacturer warranty passed through to the Project. The warranty includes defects in workmanship, improper installation, and failures caused by Subcontractor's scope.",
            "Subcontractor shall begin warranty corrective work within a commercially reasonable time after notice from Contractor and shall complete the correction promptly.",
        ],
    ),
    (
        "10. Lien Waivers",
        [
            "As a condition to each progress payment, Subcontractor shall provide a partial lien waiver covering the amount requested. As a condition to final payment, Subcontractor shall provide a final unconditional lien waiver for its full scope and shall obtain equivalent waivers from any lower-tier parties it used on the Project.",
        ],
    ),
    (
        "11. Indemnity",
        [
            "To the fullest extent permitted by law, Subcontractor shall defend, indemnify, and hold harmless Contractor, the Project owner, and their respective officers, managers, and agents from claims, damages, losses, liabilities, and expenses, including reasonable attorneys' fees, arising out of or relating to Subcontractor's Work, acts, omissions, breach of this Agreement, or failure to comply with applicable law, except to the extent caused by the sole negligence of the indemnified party.",
        ],
    ),
    (
        "12. Independent Contractor",
        [
            "Subcontractor is an independent contractor and not an employee, partner, or joint venturer of Contractor. Subcontractor has no authority to bind Contractor except as expressly authorized in writing.",
        ],
    ),
    (
        "13. Default and Termination",
        [
            "If Subcontractor fails to supply sufficient labor, supervision, or materials; fails to prosecute the Work diligently; performs defective work; violates a material term of this Agreement; or becomes insolvent or unable to perform, Contractor may give written notice and, if the default is not cured within <b>48 hours</b> or such shorter time as the situation reasonably requires, Contractor may supplement Subcontractor's forces, backcharge Subcontractor, terminate this Agreement for cause, or take any combination of those actions.",
            "Contractor may also terminate this Agreement for convenience upon written notice. In that event, Subcontractor shall be paid for Work properly performed through the termination date, less prior payments and valid offsets.",
            "If Subcontractor abandons the Project, materially understaffs the Project, fails to maintain progress, or refuses to correct defective work, Contractor may immediately secure the site, supplement labor, and protect unfinished work without waiving any other remedy.",
        ],
    ),
    (
        "14. Documentation and Communication",
        [
            "All field directives affecting price or time must be documented in writing. Text message or email approval from Contractor may be relied upon for minor field coordination, but only a signed written change order changes the Contract Sum or schedule entitlement.",
            "Subcontractor shall maintain photo documentation of concealed conditions, rough-in stages, and completed scope when reasonably requested.",
        ],
    ),
    (
        "15. Dispute Resolution and Venue",
        [
            "This Agreement is governed by the laws of the State of North Carolina. The parties shall first attempt in good faith to resolve disputes through direct discussion. If litigation is required, venue shall lie in the state courts serving the county where Contractor's principal office is located, unless Contractor elects another proper North Carolina venue tied to the Project.",
        ],
    ),
    (
        "16. Entire Agreement",
        [
            "This Agreement, together with its exhibits and any signed change orders, is the entire agreement between the parties for the Work and supersedes prior proposals, conversations, and understandings relating to the same scope.",
        ],
    ),
]

for heading, paragraphs in sections:
    story.append(p(heading, "SectionHead"))
    for item in paragraphs:
        if isinstance(item, tuple) and item[0] == "bullets":
            for entry in item[1]:
                story.append(bullet(entry))
        else:
            story.append(p(item))

story.append(PageBreak())
story.append(p("Exhibit A - Line Item Breakdown", "SectionHead"))
story.append(p("Prepared for: <b>Southern Cities Construction LLC</b><br/>Subcontractor: <b>The Building Bee LLC</b><br/>Reference: <b>1115 N Long St labor line-item breakdown</b><br/>Workbook Basis: <b>Tab \"Sheet I made \" / Column D</b><br/>Attached Exhibit Total: <b>$25,000.00</b>"))
story.append(
    p(
        'Labor scope pricing is based on the revised budget workbook prepared for 1115 N Long St from the exact tab titled "Sheet I made ". This Exhibit A is the contract-ready typed breakdown of the verified Labor Budget column total of $25,000.00.'
    )
)
story.append(Spacer(1, 6))
exhibit_rows = [["Line Item", "Amount"]]
exhibit_rows.extend(LINE_ITEMS)
exhibit_rows.append(["Labor Budget Total", "$25,000.00"])
exhibit_table = Table(exhibit_rows, colWidths=[5.2 * inch, 1.2 * inch], repeatRows=1)
exhibit_table.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTNAME", (0, 1), (-1, -2), "Helvetica"),
            ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("ALIGN", (1, 1), (1, -1), "RIGHT"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, colors.HexColor("#f8fafc")]),
            ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#f8fafc")),
            ("TEXTCOLOR", (0, -1), (-1, -1), colors.HexColor("#111827")),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
story.append(exhibit_table)
story.append(Spacer(1, 8))
reference_totals = Table(
    [
        ["Workbook Reference Totals", ""],
        ["Labor Budget", "$25,000.00"],
        ["Material Budget", "$27,500.00"],
        ["Labor + Material Check", "$52,500.00"],
    ],
    colWidths=[5.2 * inch, 1.2 * inch],
)
reference_totals.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e2e8f0")),
            ("SPAN", (0, 0), (1, 0)),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("ALIGN", (1, 1), (1, -1), "RIGHT"),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
story.append(reference_totals)
story.append(Spacer(1, 6))
story.append(
    p(
        "This typed Exhibit A is the controlling pricing attachment for the labor scope and replaces any earlier screenshot-based exhibit or 28,200 labor-budget support draft.",
        "TinyCopy",
    )
)
for line in [
    "Labor Budget total shown in this Exhibit A is $25,000.00 and is the controlling subcontract pricing amount.",
    "Material Budget and Labor + Material Check totals are included for workbook reference only and are not part of the Contract Sum unless added by written change order.",
    "Any scope additions, upgraded finishes, unforeseen conditions, or owner-requested revisions require written change order approval before the work is performed.",
]:
    story.append(bullet(line))

story.append(Spacer(1, 6))
story.append(p("Exhibit B - Payment Milestones", "SectionHead"))
milestones = Table(
    [
        ["Deposit / mobilization", "None"],
        ["Milestone 1", "Demolition, debris haul-off, floor stabilization, structural framing, and roof dry-in labor substantially complete and accepted by Contractor - $10,000.00"],
        ["Milestone 2", "Exterior siding labor, insulation, drywall hang/finish, subfloor resets, and interior paint prep/prime stages substantially complete and accepted by Contractor - $8,750.00"],
        ["Milestone 3", "Flooring, kitchen install labor, bathroom finish install labor, trim, punch, final cleanup, and all closeout items complete and accepted by Contractor - $6,250.00"],
        ["Retainage withheld until final completion", "0%, subject to Contractor's right to withhold punch-list reserves or other valid offsets under Section 5"],
    ],
    colWidths=[2.2 * inch, 4.2 * inch],
)
milestones.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), colors.white),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
story.append(milestones)
story.append(Spacer(1, 14))

story.append(p("Signatures", "SectionHead"))
sig_table = Table(
    [
        [p("<b>Southern Cities Construction LLC</b>"), p("<b>The Building Bee LLC</b>")],
        [p("By: ______________________________"), p("By: ______________________________")],
        [p("Name: ____________________________"), p("Name: ____________________________")],
        [p("Title: _____________________________"), p("Title: _____________________________")],
        [p("Date: _____________________________"), p("Date: _____________________________")],
    ],
    colWidths=[3.2 * inch, 3.2 * inch],
)
sig_table.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ]
    )
)
story.append(sig_table)

doc.build(story)
print(OUT)
