"""HTML text extraction and normalizer."""

import re
from typing import Dict, Any

class HtmlParser:
    @staticmethod
    def clean_text(raw_text: str) -> str:
        """Clean extracted text, normalize whitespace, and preserve Bangla characters."""
        if not raw_text:
            return ""
        # Strip individual lines first
        lines = [re.sub(r"[ \t]+", " ", line).strip() for line in raw_text.splitlines()]
        # Collapse multiple empty lines to double newline
        cleaned = "\n".join(lines)
        cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
        return cleaned.strip()

    @staticmethod
    def extract_metadata(title: str, url: str) -> Dict[str, Any]:
        """Extract baseline document provenance metadata."""
        return {
            "title": title.strip() if title else "সরকারি নথি",
            "source_url": url,
            "extracted_at": "2026-10-19T17:00:00Z",
        }
