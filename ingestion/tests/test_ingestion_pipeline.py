import unittest
from ingestion.scrapers.crawler import IngestionSafetyGuard
from ingestion.parsers.html_parser import HtmlParser
from ingestion.chunkers.text_chunker import TextChunker

class TestIngestionPipeline(unittest.TestCase):
    def test_ingestion_safety_guard(self):
        # Allowed official domains
        self.assertTrue(IngestionSafetyGuard.is_url_allowed("https://bangladesh.gov.bd/page/123"))
        self.assertTrue(IngestionSafetyGuard.is_url_allowed("https://services.nidw.gov.bd/login"))
        self.assertTrue(IngestionSafetyGuard.is_url_allowed("https://www.epassport.gov.bd/instructions"))

        # Blocked external domains (SSRF and untrusted source protection)
        self.assertFalse(IngestionSafetyGuard.is_url_allowed("https://google.com"))
        self.assertFalse(IngestionSafetyGuard.is_url_allowed("https://fake-bangladesh.com"))
        self.assertFalse(IngestionSafetyGuard.is_url_allowed("http://192.168.1.1/internal"))

    def test_html_parser_cleaning(self):
        raw = "  ই-পাসপোর্ট   আবেদন   \n\n\n   প্রক্রিয়া  "
        cleaned = HtmlParser.clean_text(raw)
        self.assertEqual(cleaned, "ই-পাসপোর্ট আবেদন\n\nপ্রক্রিয়া")

    def test_text_chunker(self):
        chunker = TextChunker(chunk_size=50, overlap=10)
        sample = "অনুচ্ছেদ ১: পাসপোর্ট নির্দেশিকা।\n\nঅনুচ্ছেদ ২: এনআইডি সংশোধন।\n\nঅনুচ্ছেদ ৩: ভূমি কর।"
        chunks = chunker.chunk_text(sample)
        self.assertGreaterEqual(len(chunks), 1)
        self.assertIn("passage_index", chunks[0])
        self.assertIn("text", chunks[0])

if __name__ == "__main__":
    unittest.main()
