import http.server
import socketserver
import os
import json
import re
from pathlib import Path

PORT = 5000
HOST = "0.0.0.0"

FILES = {
    "judaism_tanakh_primer.md": "Judaism: Tanakh Primer",
    "islam_quran_primer.md": "Islam: Quran Primer",
    "hinduism_bhagavad_gita_primer.md": "Hinduism: Bhagavad Gita Primer",
    "buddhism_dhammapada_primer.md": "Buddhism: Dhammapada Primer",
    "christianity_catholic_canon.md": "Christianity: Catholic Canon",
    "christianity_orthodox_canon.md": "Christianity: Orthodox Canon",
    "christianity_mainline_protestant.md": "Christianity: Mainline Protestant",
    "christianity_evangelical_baptist.md": "Christianity: Evangelical / Baptist",
    "christianity_restorationist_lds.md": "Christianity: Restorationist / LDS",
    "christianity_ecumenical_concordance.md": "Christianity: Ecumenical Concordance",
    "comparative_methods.md": "Comparative Methods",
    "glossary_neutral_terms.md": "Glossary: Neutral Terms",
    "translation_matrix.md": "Translation Matrix",
    "translation_metadata_and_licenses.md": "Translation Metadata & Licenses",
    "reserved_minor_traditions.md": "Reserved: Minor Traditions",
    "reserved_nonaffiliated_perspectives.md": "Reserved: Non-Affiliated Perspectives",
    "test_queries.md": "Test Queries",
    "ui_copy.md": "UI Copy",
    "changelog.md": "Changelog",
}

OPENAPI_FILES = {
    "openapi_quran.json": "Quran API",
    "openapi_alquran.json": "Al-Quran API",
    "openapi_bible.json": "Bible API",
    "openapi_hadith.json": "Hadith API",
    "openapi_sefaria.json": "Sefaria API",
}

def md_to_html(text):
    text = re.sub(r'^---.*?---\n', '', text, flags=re.DOTALL)
    text = re.sub(r'^###### (.+)$', r'<h6>\1</h6>', text, flags=re.MULTILINE)
    text = re.sub(r'^##### (.+)$', r'<h5>\1</h5>', text, flags=re.MULTILINE)
    text = re.sub(r'^#### (.+)$', r'<h4>\1</h4>', text, flags=re.MULTILINE)
    text = re.sub(r'^### (.+)$', r'<h3>\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.+)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^# (.+)$', r'<h1>\1</h1>', text, flags=re.MULTILINE)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    text = re.sub(r'`(.+?)`', r'<code>\1</code>', text)
    text = re.sub(r'^\- (.+)$', r'<li>\1</li>', text, flags=re.MULTILINE)
    text = re.sub(r'(<li>.*?</li>(\n|$))+', lambda m: '<ul>' + m.group(0) + '</ul>', text, flags=re.DOTALL)
    lines = text.split('\n')
    result = []
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith('<'):
            result.append(f'<p>{stripped}</p>')
        else:
            result.append(line)
    return '\n'.join(result)

def render_index():
    nav_items = ""
    for fname, label in FILES.items():
        nav_items += f'<a href="/view/{fname}">{label}</a>\n'

    api_items = ""
    for fname, label in OPENAPI_FILES.items():
        api_items += f'<a href="/view/{fname}">{label}</a>\n'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ARE00 - Abrahamic Reference Engine</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: Georgia, serif; background: #0f0f0f; color: #e8e0d0; min-height: 100vh; }}
  .layout {{ display: flex; min-height: 100vh; }}
  .sidebar {{ width: 280px; background: #1a1a1a; border-right: 1px solid #2a2a2a; padding: 24px 0; flex-shrink: 0; overflow-y: auto; position: fixed; top: 0; bottom: 0; }}
  .sidebar-header {{ padding: 0 20px 20px; border-bottom: 1px solid #2a2a2a; margin-bottom: 16px; }}
  .sidebar-header h1 {{ font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; }}
  .sidebar-header p {{ font-size: 11px; color: #666; margin-top: 4px; }}
  .sidebar-section {{ padding: 0 12px; margin-bottom: 20px; }}
  .sidebar-section-label {{ font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #555; padding: 0 8px; margin-bottom: 6px; }}
  .sidebar a {{ display: block; padding: 7px 8px; font-size: 13px; color: #aaa; text-decoration: none; border-radius: 4px; transition: all 0.15s; }}
  .sidebar a:hover {{ background: #252525; color: #e8e0d0; }}
  .sidebar a.active {{ background: #2a2010; color: #c9a84c; }}
  .main {{ margin-left: 280px; flex: 1; padding: 48px; max-width: 900px; }}
  .hero {{ margin-bottom: 48px; }}
  .hero h2 {{ font-size: 32px; font-weight: 300; color: #c9a84c; margin-bottom: 12px; }}
  .hero p {{ color: #888; font-size: 16px; line-height: 1.6; }}
  .card-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }}
  .card {{ background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; text-decoration: none; color: #e8e0d0; transition: all 0.2s; }}
  .card:hover {{ border-color: #c9a84c; background: #1e1a10; }}
  .card h3 {{ font-size: 14px; font-weight: 600; margin-bottom: 6px; }}
  .card p {{ font-size: 12px; color: #666; }}
  .section-title {{ font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 16px; margin-top: 40px; padding-bottom: 8px; border-bottom: 1px solid #222; }}
</style>
</head>
<body>
<div class="layout">
  <nav class="sidebar">
    <div class="sidebar-header">
      <h1>ARE00</h1>
      <p>Abrahamic Reference Engine</p>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-label">Knowledge Base</div>
      {nav_items}
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-label">API Specs</div>
      {api_items}
    </div>
  </nav>
  <main class="main">
    <div class="hero">
      <h2>Abrahamic Reference Engine</h2>
      <p>A structured theological reference and cross-tradition lookup tool. Browse sacred text primers, canon overviews, translation matrices, and OpenAPI specifications for major religious text providers.</p>
    </div>
    <div class="section-title">Traditions</div>
    <div class="card-grid">
      <a class="card" href="/view/judaism_tanakh_primer.md"><h3>Judaism</h3><p>Tanakh primer and textual tradition</p></a>
      <a class="card" href="/view/islam_quran_primer.md"><h3>Islam</h3><p>Quran primer and Hadith overview</p></a>
      <a class="card" href="/view/hinduism_bhagavad_gita_primer.md"><h3>Hinduism</h3><p>Bhagavad Gita primer</p></a>
      <a class="card" href="/view/buddhism_dhammapada_primer.md"><h3>Buddhism</h3><p>Dhammapada primer</p></a>
      <a class="card" href="/view/christianity_catholic_canon.md"><h3>Christianity (Catholic)</h3><p>Catholic canon and tradition</p></a>
      <a class="card" href="/view/christianity_orthodox_canon.md"><h3>Christianity (Orthodox)</h3><p>Orthodox canon overview</p></a>
      <a class="card" href="/view/christianity_mainline_protestant.md"><h3>Christianity (Protestant)</h3><p>Mainline Protestant tradition</p></a>
      <a class="card" href="/view/christianity_restorationist_lds.md"><h3>Christianity (LDS)</h3><p>Restorationist and LDS tradition</p></a>
    </div>
    <div class="section-title">Reference</div>
    <div class="card-grid">
      <a class="card" href="/view/comparative_methods.md"><h3>Comparative Methods</h3><p>Cross-tradition comparison methodology</p></a>
      <a class="card" href="/view/glossary_neutral_terms.md"><h3>Glossary</h3><p>Neutral terms and definitions</p></a>
      <a class="card" href="/view/translation_matrix.md"><h3>Translation Matrix</h3><p>Translation ID mappings</p></a>
      <a class="card" href="/view/translation_metadata_and_licenses.md"><h3>Licenses</h3><p>Translation metadata and licensing</p></a>
    </div>
    <div class="section-title">API Specifications</div>
    <div class="card-grid">
      <a class="card" href="/view/openapi_quran.json"><h3>Quran.com API</h3><p>OpenAPI spec</p></a>
      <a class="card" href="/view/openapi_alquran.json"><h3>Al-Quran API</h3><p>OpenAPI spec</p></a>
      <a class="card" href="/view/openapi_bible.json"><h3>API.Bible</h3><p>OpenAPI spec</p></a>
      <a class="card" href="/view/openapi_hadith.json"><h3>Hadith API</h3><p>OpenAPI spec</p></a>
      <a class="card" href="/view/openapi_sefaria.json"><h3>Sefaria API</h3><p>OpenAPI spec</p></a>
    </div>
  </main>
</div>
</body>
</html>"""

def render_file(fname):
    path = Path(fname)
    if not path.exists():
        return None, None

    label = FILES.get(fname) or OPENAPI_FILES.get(fname) or fname
    content = path.read_text(encoding="utf-8")

    if fname.endswith(".json"):
        body = f'<pre style="white-space:pre-wrap;word-break:break-word;font-size:13px;line-height:1.6">{content}</pre>'
    else:
        body = md_to_html(content)

    nav_items = ""
    for f, lbl in FILES.items():
        active = ' class="active"' if f == fname else ''
        nav_items += f'<a href="/view/{f}"{active}>{lbl}</a>\n'

    api_items = ""
    for f, lbl in OPENAPI_FILES.items():
        active = ' class="active"' if f == fname else ''
        api_items += f'<a href="/view/{f}"{active}>{lbl}</a>\n'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{label} - ARE00</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: Georgia, serif; background: #0f0f0f; color: #e8e0d0; min-height: 100vh; }}
  .layout {{ display: flex; min-height: 100vh; }}
  .sidebar {{ width: 280px; background: #1a1a1a; border-right: 1px solid #2a2a2a; padding: 24px 0; flex-shrink: 0; overflow-y: auto; position: fixed; top: 0; bottom: 0; }}
  .sidebar-header {{ padding: 0 20px 20px; border-bottom: 1px solid #2a2a2a; margin-bottom: 16px; }}
  .sidebar-header a {{ text-decoration: none; }}
  .sidebar-header h1 {{ font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; }}
  .sidebar-header p {{ font-size: 11px; color: #666; margin-top: 4px; }}
  .sidebar-section {{ padding: 0 12px; margin-bottom: 20px; }}
  .sidebar-section-label {{ font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #555; padding: 0 8px; margin-bottom: 6px; }}
  .sidebar a {{ display: block; padding: 7px 8px; font-size: 13px; color: #aaa; text-decoration: none; border-radius: 4px; transition: all 0.15s; }}
  .sidebar a:hover {{ background: #252525; color: #e8e0d0; }}
  .sidebar a.active {{ background: #2a2010; color: #c9a84c; }}
  .main {{ margin-left: 280px; flex: 1; padding: 48px; max-width: 900px; }}
  .page-title {{ font-size: 24px; font-weight: 300; color: #c9a84c; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #222; }}
  .content h1, .content h2, .content h3, .content h4 {{ color: #c9a84c; margin: 28px 0 12px; font-weight: 500; }}
  .content h1 {{ font-size: 22px; }}
  .content h2 {{ font-size: 18px; }}
  .content h3 {{ font-size: 15px; }}
  .content p {{ line-height: 1.75; margin-bottom: 14px; color: #ccc; font-size: 15px; }}
  .content ul {{ padding-left: 24px; margin-bottom: 14px; }}
  .content li {{ line-height: 1.7; color: #ccc; font-size: 15px; margin-bottom: 4px; }}
  .content code {{ background: #1e1e1e; padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 13px; color: #e0c080; }}
  .content strong {{ color: #e8e0d0; }}
  .back {{ display: inline-block; margin-bottom: 24px; font-size: 13px; color: #666; text-decoration: none; }}
  .back:hover {{ color: #c9a84c; }}
</style>
</head>
<body>
<div class="layout">
  <nav class="sidebar">
    <div class="sidebar-header">
      <a href="/"><h1>ARE00</h1><p>Abrahamic Reference Engine</p></a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-label">Knowledge Base</div>
      {nav_items}
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-label">API Specs</div>
      {api_items}
    </div>
  </nav>
  <main class="main">
    <a class="back" href="/">&larr; Home</a>
    <div class="page-title">{label}</div>
    <div class="content">{body}</div>
  </main>
</div>
</body>
</html>""", 200

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/" or self.path == "":
            html = render_index()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
        elif self.path.startswith("/view/"):
            fname = self.path[6:]
            result = render_file(fname)
            if result[0] is None:
                self.send_response(404)
                self.send_header("Content-Type", "text/plain")
                self.end_headers()
                self.wfile.write(b"Not found")
            else:
                html, code = result
                self.send_response(code)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write(html.encode("utf-8"))
        else:
            self.send_response(302)
            self.send_header("Location", "/")
            self.end_headers()

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

if __name__ == "__main__":
    with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
        httpd.allow_reuse_address = True
        print(f"ARE00 server running at http://{HOST}:{PORT}")
        httpd.serve_forever()
