"""Builds the ATS-friendly CV (EN + ES) as .docx from cv.json.

Single column, real headings, no tables or text boxes, so every ATS can parse it.
Usage: <python with python-docx> cv-src/build-docx.py
"""
import json
import pathlib

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Inches

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
DATA = json.loads((HERE / "cv.json").read_text(encoding="utf-8"))
OUT = ROOT / "public" / "cv"
OUT.mkdir(parents=True, exist_ok=True)

INK = RGBColor(0x11, 0x11, 0x11)
VINO = RGBColor(0x6E, 0x01, 0x12)


def rule(paragraph):
    """Crimson bottom border under a section heading."""
    p_pr = paragraph._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "8")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "CE0037")
    borders.append(bottom)
    p_pr.append(borders)


def spacing(paragraph, before=0, after=2):
    paragraph.paragraph_format.space_before = Pt(before)
    paragraph.paragraph_format.space_after = Pt(after)


def tab_right(paragraph, section):
    width = section.page_width - section.left_margin - section.right_margin
    paragraph.paragraph_format.tab_stops.add_tab_stop(width, alignment=2)  # right


def build(d, c):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.5), Inches(11)
    sec.left_margin = sec.right_margin = Inches(0.6)
    sec.top_margin = sec.bottom_margin = Inches(0.55)

    normal = doc.styles["Normal"]
    normal.font.name = "Arial"
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), "Arial")
    normal.font.size = Pt(9.5)
    normal.font.color.rgb = INK

    doc.core_properties.author = c["name"]
    doc.core_properties.title = f'{c["name"]} | {d["title"]}'

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(c["name"])
    r.bold = True
    r.font.size = Pt(19)
    spacing(p, 0, 1)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(d["title"])
    r.bold = True
    r.font.size = Pt(10.5)
    r.font.color.rgb = VINO
    spacing(p, 0, 2)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(" | ".join([d["location"], c["phone"], c["email"], c["linkedin"], c["github"], c["site"]]))
    r.font.size = Pt(8.8)
    spacing(p, 0, 4)

    def heading(text):
        h = doc.add_paragraph()
        run = h.add_run(text.upper())
        run.bold = True
        run.font.size = Pt(10.3)
        spacing(h, 9, 4)
        rule(h)

    def bullet(text):
        b = doc.add_paragraph(style="List Bullet")
        b.add_run(text)
        spacing(b, 0, 1.5)

    heading(d["h"]["summary"])
    p = doc.add_paragraph(d["summary"])
    spacing(p, 0, 2)

    heading(d["h"]["skills"])
    for k, v in d["skills"]:
        p = doc.add_paragraph()
        p.add_run(f"{k}: ").bold = True
        p.add_run(v)
        spacing(p, 0, 1.5)

    heading(d["h"]["experience"])
    for j in d["experience"]:
        p = doc.add_paragraph()
        tab_right(p, sec)
        p.add_run(j["role"]).bold = True
        p.add_run("\t")
        p.add_run(j["dates"]).bold = True
        spacing(p, 5, 0)
        p = doc.add_paragraph()
        tab_right(p, sec)
        r = p.add_run(j["company"])
        r.italic = True
        p.add_run("\t")
        r = p.add_run(j["where"])
        r.italic = True
        spacing(p, 0, 1)
        for b in j["bullets"]:
            bullet(b)

    heading(d["h"]["projects"])
    for n, t in d["projects"]:
        b = doc.add_paragraph(style="List Bullet")
        b.add_run(n).bold = True
        b.add_run(f": {t}")
        spacing(b, 0, 1.5)

    heading(d["h"]["education"])
    for deg, sch, yrs in d["education"]:
        p = doc.add_paragraph()
        tab_right(p, sec)
        p.add_run(deg).bold = True
        p.add_run(f", {sch}\t")
        p.add_run(yrs).bold = True
        spacing(p, 0, 1.5)

    heading(d["h"]["languages"])
    doc.add_paragraph(d["languages"])

    path = OUT / f'{d["file"]}.docx'
    doc.save(path)
    print("DOCX", path)


for key in ("en", "es"):
    build(DATA[key], DATA["contact"])
