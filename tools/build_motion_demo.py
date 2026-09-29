"""index.html にモーションレイヤーを重ねた motion-demo.html を生成する。
index.html 自体は変更しない。  使い方: python3 tools/build_motion_demo.py
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "tools/motion.css").read_text(encoding="utf-8")
js = (ROOT / "tools/motion.js").read_text(encoding="utf-8")

def replace_once(s, old, new):
    assert s.count(old) >= 1, f"marker not found: {old[:60]!r}"
    return s.replace(old, new, 1)

out = src

# 1. demo page must not be indexed
out = replace_once(out, 'content="index, follow, max-image-preview:large, max-snippet:-1" name="robots"',
                   'content="noindex, nofollow" name="robots"')

# 2. CSS appended to the main stylesheet + early motion flag (avoids flash of unstyled motion)
out = replace_once(out, "</style>", css + "</style>\n<script>(function(){var r=document.documentElement;"
    "if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;r.classList.add('motion');"
    "setTimeout(function(){r.classList.add('is-loaded');},3000);})();</script>")

# 3. overlay elements right after <body>
word = "LINK×MANAGEMENT"
chars = "".join(
    f'<span class="x" style="--i:{i}">×</span>' if c == "×" else f'<span style="--i:{i}">{c}</span>'
    for i, c in enumerate(word))
overlay = f'''<body>
<div aria-hidden="true" class="intro"><div class="intro__inner"><div class="intro__word">{chars}</div><div class="intro__bar"><i></i></div><div class="intro__meta"><span>Career Support</span><span class="intro__count">000</span></div></div></div>
<div aria-hidden="true" class="scroll-progress"></div>
<div aria-hidden="true" class="cursor is-hidden"></div><div aria-hidden="true" class="cursor-dot is-hidden"></div>
<div class="demo-badge"><i></i><b>Motion Demo</b><a href="./">元のページ</a></div>'''
out = replace_once(out, "<body>", overlay)

# 4. hero accents
out = re.sub(r'(<img[^>]*id="hero-img"[^>]*/>)',
             r'\1\n<span aria-hidden="true" class="hero-slash"></span><span aria-hidden="true" class="hero-cue">SCROLL<i></i></span>',
             out, count=1)

# 5. region marquee between ticker and Service
regions = ["Australia", "New Zealand", "Mongolia", "Asia &amp; Oceania"]
grp = "".join(f'<span class="marquee__item">{r}</span><span class="marquee__sep">×</span>' for r in regions)
marquee = (f'<div aria-hidden="true" class="marquee"><div class="marquee__track">'
           f'<div class="marquee__group">{grp}</div><div class="marquee__group">{grp}</div></div></div>\n')
out = replace_once(out, "<!-- ============================================================\n     2. Service", marquee +
                   "<!-- ============================================================\n     2. Service")

# 6. footer mega wordmark
mega = "".join(
    f'<span class="x" style="--i:{i}">×</span>' if c == "×" else f'<span style="--i:{i}">{c}</span>'
    for i, c in enumerate(word))
out = replace_once(out, '<div class="footer-bottom">', f'<div aria-hidden="true" class="footer-mega">{mega}</div>\n<div class="footer-bottom">')

# 7. language switch through the View Transitions API
switch = '''  function switchLang(lang){
    if(document.startViewTransition && document.documentElement.classList.contains('motion')){
      document.startViewTransition(function(){ applyLang(lang); });
    } else { applyLang(lang); }
  }

  var langOptions ='''
out = replace_once(out, "  var langOptions =", switch)
n = out.count("applyLang(li.getAttribute('data-lang'));")
assert n == 2, n
out = out.replace("applyLang(li.getAttribute('data-lang'));", "switchLang(li.getAttribute('data-lang'));")

# 8. motion script at the very end
idx = out.rindex("</body>")
out = out[:idx] + js + out[idx:]

(ROOT / "motion-demo.html").write_text(out, encoding="utf-8")
print("wrote motion-demo.html", len(out))
