#!/usr/bin/env python3
"""Build the one-page job resume from the website's generated content snapshot."""

from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "scripts" / "resume-content.json"
OUTPUT_PATH = ROOT / "public" / "resume-wang-zeyi.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

INK = HexColor("#0B0D10")
PAPER = HexColor("#F3F0E9")
COBALT = HexColor("#1557FF")
MUTED = HexColor("#666B73")
LINE = HexColor("#C9C7C1")
WHITE = HexColor("#FFFDF8")


def clean(value: str) -> str:
    return value.replace("—", "-").replace("→", "to").strip()


def wrap_text(text: str, font: str, size: float, max_width: float) -> list[str]:
    lines: list[str] = []
    current = ""
    for character in clean(text):
        candidate = current + character
        if current and pdfmetrics.stringWidth(candidate, font, size) > max_width:
            lines.append(current.rstrip())
            current = character.lstrip()
        else:
            current = candidate
    if current:
        lines.append(current.rstrip())
    return lines or [""]


def draw_wrapped(
    canvas: Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    size: float = 8,
    leading: float = 12,
    color=MUTED,
    max_lines: int | None = None,
) -> float:
    lines = wrap_text(text, "Resume", size, width)
    if max_lines is not None:
        lines = lines[:max_lines]
    canvas.setFont("Resume", size)
    canvas.setFillColor(color)
    for line in lines:
        canvas.drawString(x, y, line)
        y -= leading
    return y


def section_label(canvas: Canvas, label: str, x: float, y: float, width: float) -> float:
    canvas.setFillColor(COBALT)
    canvas.setFont("Resume", 7.2)
    canvas.drawString(x, y, label.upper())
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(x, y - 8, x + width, y - 8)
    return y - 26


def build_resume() -> Path:
    if not FONT_PATH.exists():
        raise FileNotFoundError(f"CJK font not found: {FONT_PATH}")
    if not CONTENT_PATH.exists():
        raise FileNotFoundError(f"Resume content snapshot not found: {CONTENT_PATH}")

    data = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    pdfmetrics.registerFont(TTFont("Resume", str(FONT_PATH)))
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    canvas = Canvas(str(OUTPUT_PATH), pagesize=A4, pageCompression=1)
    page_width, page_height = A4
    canvas.setTitle(f"{data['profile']['name']} - 个人简历")
    canvas.setAuthor(data["profile"]["name"])

    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, page_width, page_height, stroke=0, fill=1)
    canvas.setFillColor(INK)
    canvas.rect(0, page_height - 132, page_width, 132, stroke=0, fill=1)
    canvas.setFillColor(COBALT)
    canvas.rect(0, page_height - 132, 12, 132, stroke=0, fill=1)

    margin = 36
    canvas.setFillColor(WHITE)
    canvas.setFont("Resume", 27)
    canvas.drawString(margin, page_height - 54, data["profile"]["name"])
    canvas.setFillColor(HexColor("#7FA2FF"))
    canvas.setFont("Resume", 11)
    canvas.drawString(margin, page_height - 78, clean(data["profile"]["positioning"]))
    canvas.setFillColor(HexColor("#B8BBC1"))
    canvas.setFont("Resume", 8)
    canvas.drawString(margin, page_height - 101, " / ".join(data["profile"]["targetRoles"]))

    contact_x = 360
    contact_y = page_height - 52
    canvas.setFillColor(HexColor("#D8DADE"))
    canvas.setFont("Resume", 7.4)
    for line in [
        f"EMAIL  {data['contact']['email']}",
        f"TEL    {data['contact']['phone']}",
        f"CITY   {data['contact']['city']}",
    ]:
        canvas.drawString(contact_x, contact_y, line)
        contact_y -= 18

    left_x = margin
    left_width = 176
    right_x = 236
    right_width = page_width - right_x - margin
    y_left = page_height - 164
    y_right = page_height - 164

    y_left = section_label(canvas, "PROFILE / 个人简介", left_x, y_left, left_width)
    y_left = draw_wrapped(
        canvas,
        data["profile"]["summary"],
        left_x,
        y_left,
        left_width,
        size=8.2,
        leading=13.2,
        color=INK,
        max_lines=7,
    ) - 18

    y_left = section_label(canvas, "AI DELIVERY / AI 交付", left_x, y_left, left_width)
    canvas.setFont("Resume", 7.8)
    for item in data["aiDeliverables"]:
        canvas.setFillColor(COBALT)
        canvas.circle(left_x + 3, y_left + 2, 2, stroke=0, fill=1)
        canvas.setFillColor(INK)
        canvas.drawString(left_x + 12, y_left - 1, item)
        y_left -= 18
    y_left -= 10

    y_left = section_label(canvas, "CAPABILITIES / 核心能力", left_x, y_left, left_width)
    for item in data["capabilities"][:5]:
        canvas.setFillColor(COBALT)
        canvas.setFont("Resume", 7)
        canvas.drawString(left_x, y_left, item["index"])
        canvas.setFillColor(INK)
        canvas.setFont("Resume", 8)
        canvas.drawString(left_x + 22, y_left, item["title"])
        y_left -= 14
        y_left = draw_wrapped(
            canvas,
            item["description"],
            left_x + 22,
            y_left,
            left_width - 22,
            size=6.8,
            leading=9.6,
            max_lines=2,
        ) - 8

    y_right = section_label(canvas, "EXPERIENCE / 工作经历", right_x, y_right, right_width)
    work_items = [item for item in data["experience"] if item["id"] != "exp-education"]
    for item in work_items:
        canvas.setFillColor(COBALT)
        canvas.setFont("Resume", 7.2)
        canvas.drawString(right_x, y_right, clean(item["period"]))
        canvas.setFillColor(INK)
        canvas.setFont("Resume", 10)
        canvas.drawString(right_x + 104, y_right, item["company"])
        y_right -= 16
        canvas.setFillColor(MUTED)
        canvas.setFont("Resume", 7.2)
        canvas.drawString(right_x + 104, y_right, item["role"])
        y_right -= 14
        y_right = draw_wrapped(
            canvas,
            item["summary"],
            right_x + 104,
            y_right,
            right_width - 104,
            size=7.2,
            leading=10.5,
            max_lines=3,
        )
        canvas.setFont("Resume", 6.7)
        for highlight in item["highlights"][:3]:
            canvas.setFillColor(COBALT)
            canvas.circle(right_x + 107, y_right + 2, 1.4, stroke=0, fill=1)
            canvas.setFillColor(MUTED)
            canvas.drawString(right_x + 114, y_right, clean(highlight))
            y_right -= 11
        canvas.setStrokeColor(LINE)
        canvas.line(right_x, y_right - 5, right_x + right_width, y_right - 5)
        y_right -= 22

    education = next(item for item in data["experience"] if item["id"] == "exp-education")
    y_right = section_label(canvas, "EDUCATION / 教育与荣誉", right_x, y_right, right_width)
    canvas.setFillColor(INK)
    canvas.setFont("Resume", 10)
    canvas.drawString(right_x, y_right, education["company"])
    canvas.setFillColor(COBALT)
    canvas.setFont("Resume", 7.2)
    canvas.drawRightString(right_x + right_width, y_right, clean(education["period"]))
    y_right -= 17
    canvas.setFillColor(MUTED)
    canvas.setFont("Resume", 7.4)
    canvas.drawString(right_x, y_right, education["role"])
    y_right -= 15
    y_right = draw_wrapped(
        canvas,
        education["summary"],
        right_x,
        y_right,
        right_width,
        size=7.2,
        leading=10.5,
        max_lines=3,
    )
    canvas.setFillColor(MUTED)
    canvas.setFont("Resume", 6.8)
    canvas.drawString(right_x, y_right - 2, " · ".join(education["highlights"]))

    canvas.setStrokeColor(LINE)
    canvas.line(margin, 38, page_width - margin, 38)
    canvas.setFillColor(MUTED)
    canvas.setFont("Resume", 6.6)
    canvas.drawString(margin, 24, "WZY / 视觉创作与 AI 内容生产")
    canvas.drawRightString(page_width - margin, 24, "作品网站：www.8529663.xyz")

    canvas.showPage()
    canvas.save()
    return OUTPUT_PATH


if __name__ == "__main__":
    output = build_resume()
    print(f"Built {output}")
