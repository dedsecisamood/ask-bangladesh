"""Smart passage chunker with overlap and boundary preservation."""

from typing import List, Dict

class TextChunker:
    def __init__(self, chunk_size: int = 500, overlap: int = 100):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str) -> List[Dict[str, any]]:
        """Split text into structured passages while preserving sentence boundaries."""
        if not text:
            return []

        # Split on paragraph or punctuation boundaries
        paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
        chunks = []
        current_chunk = []
        current_len = 0
        passage_index = 0

        for para in paragraphs:
            para_len = len(para)
            if current_len + para_len > self.chunk_size and current_chunk:
                chunk_text = "\n\n".join(current_chunk)
                chunks.append({
                    "passage_index": passage_index,
                    "text": chunk_text,
                    "char_count": len(chunk_text),
                })
                passage_index += 1
                # Simple sliding window
                current_chunk = [current_chunk[-1], para] if len(current_chunk) > 1 else [para]
                current_len = sum(len(p) for p in current_chunk)
            else:
                current_chunk.append(para)
                current_len += para_len

        if current_chunk:
            chunk_text = "\n\n".join(current_chunk)
            chunks.append({
                "passage_index": passage_index,
                "text": chunk_text,
                "char_count": len(chunk_text),
            })

        return chunks
