import re
import json
from urllib.parse import urljoin
from urllib.request import urlopen, Request
from html.parser import HTMLParser

BASE = 'http://127.0.0.1:3000'
PAGES = [
    '/',
    '/services',
    '/services/homeowners',
    '/services/investors',
    '/services/realtors',
    '/services/contractors',
    '/services/developers-landowners',
    '/recurring-support',
    '/services/homeowners/home-assessment',
    '/services/homeowners/owner-consultation',
    '/services/homeowners/permit-path-review',
    '/services/realtors/inspection-response',
    '/services/realtors/realtor-inspection-review',
    '/services/investors/investor-review',
    '/services/investors/permit-local-compliance-review',
    '/services/investors/budget-review',
    '/services/investors/contractor-fit-consultation',
    '/services/investors/draw-review-support',
]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self._href = None
        self._text = []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            href = dict(attrs).get('href')
            if href is not None:
                self._href = href
                self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag == 'a' and self._href is not None:
            text = ' '.join(''.join(self._text).split())
            self.links.append({'href': self._href, 'text': text})
            self._href = None
            self._text = []

def fetch(path):
    req = Request(urljoin(BASE, path), headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=20) as r:
        return r.status, r.read().decode('utf-8', 'ignore')

results = []
for page in PAGES:
    status, html = fetch(page)
    parser = LinkParser()
    parser.feed(html)
    for link in parser.links:
        txt = link['text'].strip().lower()
        if txt == 'buy now':
            href = link['href']
            absolute = href if href.startswith('http') else urljoin(BASE, href)
            route_status = None
            route_ok = False
            route_404 = False
            name_hit = None
            price_hit = None
            try:
                s2, h2 = fetch(href)
                route_status = s2
                route_ok = s2 == 200
                route_404 = '404' in h2.lower() or 'not found' in h2.lower()
                title_match = re.search(r'<h1[^>]*>(.*?)</h1>', h2, re.I | re.S)
                if title_match:
                    name_hit = re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
                price_match = re.search(r'\$[0-9,]+', h2)
                if price_match:
                    price_hit = price_match.group(0)
            except Exception as e:
                route_status = str(e)
            results.append({
                'page': page,
                'text': link['text'],
                'href': href,
                'absolute': absolute,
                'route_status': route_status,
                'route_ok': route_ok,
                'route_404': route_404,
                'title_hit': name_hit,
                'price_hit': price_hit,
            })
print(json.dumps(results, indent=2))
