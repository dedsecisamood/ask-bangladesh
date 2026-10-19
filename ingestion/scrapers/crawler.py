"""Controlled domain-allowlisted crawler for Bangladesh official portals."""

from urllib.parse import urlparse
import time
from typing import Optional

# Non-negotiable domain allowlist for safety and anti-SSRF protections
ALLOWED_DOMAINS = {
    "bangladesh.gov.bd",
    "epassport.gov.bd",
    "services.nidw.gov.bd",
    "nidw.gov.bd",
    "bdris.gov.bd",
    "ldtax.gov.bd",
    "land.gov.bd",
    "mutation.land.gov.bd",
    "nbr.gov.bd",
    "bsp.brta.gov.bd",
}

class IngestionSafetyGuard:
    @staticmethod
    def is_url_allowed(url: str) -> bool:
        """Verify URL strictly belongs to approved official government domains."""
        try:
            parsed = urlparse(url)
            if parsed.scheme not in ("http", "https"):
                return False
            hostname = parsed.hostname or ""
            # Support exact match or direct subdomain
            return any(
                hostname == domain or hostname.endswith("." + domain)
                for domain in ALLOWED_DOMAINS
            )
        except Exception:
            return False

class PoliteCrawler:
    def __init__(self, request_delay_seconds: float = 2.0):
        self.request_delay = request_delay_seconds
        self.last_request_time = 0.0

    def wait_polite_delay(self):
        """Enforce polite crawling delay to avoid burdening government servers."""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.request_delay:
            time.sleep(self.request_delay - elapsed)
        self.last_request_time = time.time()
