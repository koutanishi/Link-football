<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Link×Football | 海外挑戦を、本気でサポートする。</title>
<meta name="description" content="Link×Footballは、オーストラリア・ニュージーランド・モンゴルをはじめとするアジア・オセアニア地域への移籍を目指す選手のための契約交渉サポートサービスです。">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='8' fill='%230E1113'/%3E%3Ctext x='32' y='42' font-family='Arial,sans-serif' font-weight='900' font-size='24' fill='%23E2792E' text-anchor='middle'%3ELF%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=League+Spartan:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
/* ==============================================================
   Link×Football — Design tokens
   参考: KTX株式会社サイト(ダーク基調・写真主体・力強いゴシック体の
   製造業コーポレートサイト)のトーン&マナーを踏襲。
   ============================================================== */
:root{
  --bg:#0E1113;
  --bg-1:#15181B;
  --bg-2:#1B1F22;
  --bg-3:#22262A;
  --ink:#F4F3EF;
  --ink-muted:#A7ACA8;
  --ink-faint:#6E7370;
  --line:rgba(244,243,239,.10);
  --line-strong:rgba(244,243,239,.20);
  --accent:#E2792E;
  --accent-2:#C6621F;
  --accent-soft:rgba(226,121,46,.14);
  --accent-ink:#1A0E06;

  --font-jp:'Noto Sans JP', 'Hiragino Sans', sans-serif;
  --font-en:'League Spartan', sans-serif;

  --container:1180px;
  --dur:.5s;
  --ease:cubic-bezier(.2,.7,.3,1);
}

@media (prefers-reduced-motion: reduce){
  *{animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important; scroll-behavior:auto !important;}
}

*,*::before,*::after{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  background:var(--bg);
  color:var(--ink);
  font-family:var(--font-jp);
  font-weight:400;
  line-height:1.85;
  font-size:16px;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
}
img,svg{display:block;max-width:100%;}
a{color:inherit;text-decoration:none;}
ul{margin:0;padding:0;list-style:none;}
h1,h2,h3,h4{
  font-family:var(--font-jp);
  font-weight:900;
  line-height:1.4;
  margin:0;
  letter-spacing:.01em;
}
p{margin:0;}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;}

.wrap{
  max-width:var(--container);
  margin-inline:auto;
  padding-inline:clamp(1.25rem,4.5vw,3rem);
}

.eyebrow{
  display:inline-flex;
  align-items:center;
  gap:.7em;
  font-family:var(--font-en);
  font-weight:700;
  font-size:.78rem;
  letter-spacing:.24em;
  text-transform:uppercase;
  color:var(--accent);
}
.eyebrow::before{
  content:"";
  width:1.8em;
  height:2px;
  background:var(--accent);
  display:inline-block;
}

.section-head{
  max-width:44em;
  margin-bottom:clamp(2.25rem,5vw,3.5rem);
}
.section-head h2{
  margin-top:.8rem;
  font-size:clamp(1.7rem,3.6vw,2.55rem);
}
.section-head .sub{
  margin-top:1.1rem;
  color:var(--ink-muted);
  font-size:.98rem;
  line-height:1.9;
}

section{padding-block:clamp(4rem,9vw,7.5rem);}
.bleed-alt{background:var(--bg-1);}

/* ==============================================================
   Media slot — 画像差し替え用プレースホルダー
   実際の写真を入れる際は、対象の <img class="media-slot__ph"> の
   src 属性を写真のパスに差し替えるだけでOKです(class はそのまま)。
   下の figcaption(差し替え案内)は本番公開前に削除してください。
   ============================================================== */
.media-slot{
  position:relative;
  overflow:hidden;
  background:var(--bg-2);
  /* padding-top spacer sets the box's aspect ratio (width / height = --ar).
     Deliberately not using the aspect-ratio property here: combined with
     CSS Grid's track-sizing algorithm it triggers a layout bug in current
     Chromium where grid items runaway-grow on reflow. This technique is
     equivalent and doesn't interact with grid sizing at all. */
}
.media-slot::before{
  content:"";
  display:block;
  padding-top:calc(100% / var(--ar, 1.6));
}
.media-slot__ph{
  position:absolute;
  inset:0;
  width:100%;height:100%;
  object-fit:cover;
  display:block;
}
.media-slot__tag{
  position:absolute;
  left:.9rem;bottom:.9rem;
  display:inline-flex;
  align-items:center;
  gap:.5em;
  background:rgba(14,17,19,.82);
  border:1px solid var(--line-strong);
  color:var(--ink-muted);
  font-size:.68rem;
  letter-spacing:.04em;
  padding:.5em .8em;
  max-width:calc(100% - 1.8rem);
  backdrop-filter:blur(4px);
}
.media-slot__tag b{color:var(--accent);font-weight:700;}

/* Corner-cut signature detail on every photo slot.
   Deliberately ::after only: ::before on .media-slot is already used as
   the aspect-ratio spacer, and an element can only have one ::before. */
.media-slot.cut::after{
  content:"";
  position:absolute;
  right:0;top:0;
  width:0;height:0;
  border-style:solid;
  border-width:0 38px 38px 0;
  border-color:transparent var(--accent) transparent transparent;
  z-index:1;
}

/* ==============================================================
   Skip link / focus
   ============================================================== */
.skip-link{
  position:absolute;
  left:-999px;top:auto;
  background:var(--accent);
  color:var(--accent-ink);
  padding:.8em 1.2em;
  z-index:200;
  font-weight:700;
}
.skip-link:focus{left:1rem;top:1rem;}
a:focus-visible,button:focus-visible,input:focus-visible{
  outline:2px solid var(--accent);
  outline-offset:3px;
}

/* ==============================================================
   Header
   ============================================================== */
.site-header{
  position:sticky;top:0;z-index:100;
  background:rgba(14,17,19,.88);
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line);
  transition:border-color .3s var(--ease);
}
.site-header.is-scrolled{border-color:var(--line-strong);}
.site-header .wrap{
  display:flex;align-items:center;justify-content:space-between;
  height:76px;
}
.brand{display:flex;align-items:center;gap:.6rem;}
.brand-logo-slot{
  /* ロゴ画像を用意した際は、この中に
     <img src="logo.svg" alt="Link×Football" style="height:100%;width:auto;display:block;">
     を配置すれば高さ32pxのコンテナに自動で収まります。 */
  height:32px;
  display:flex;align-items:center;
}
.brand-wordmark{
  font-family:var(--font-en);
  font-weight:800;
  font-size:1.3rem;
  letter-spacing:.01em;
  color:var(--ink);
  white-space:nowrap;
}
.brand-wordmark .x{color:var(--accent);font-weight:700;padding-inline:.06em;}

.nav-desktop{display:flex;align-items:center;gap:clamp(1.3rem,2.4vw,2.4rem);}
.nav-desktop a{
  font-size:.9rem;
  font-weight:500;
  letter-spacing:.02em;
  position:relative;
  padding-block:.3rem;
}
.nav-desktop a::after{
  content:"";
  position:absolute;left:0;right:0;bottom:0;
  height:2px;background:var(--accent);
  transform:scaleX(0);transform-origin:right;
  transition:transform .3s var(--ease);
}
.nav-desktop a:hover::after,.nav-desktop a:focus-visible::after{
  transform:scaleX(1);transform-origin:left;
}
.nav-cta{
  display:inline-flex;align-items:center;gap:.5em;
  background:var(--accent);
  color:var(--accent-ink) !important;
  padding:.65em 1.4em;
  font-size:.85rem !important;
  font-weight:700;
  letter-spacing:.03em;
  border:1px solid var(--accent);
  transition:background .3s var(--ease), border-color .3s var(--ease);
}
.nav-cta:hover{background:var(--accent-2);border-color:var(--accent-2);}
.nav-cta::after{display:none !important;}

.menu-toggle{
  display:none;flex-direction:column;justify-content:center;gap:5px;
  width:44px;height:44px;border:1px solid var(--line-strong);
}
.menu-toggle span{
  width:20px;height:2px;background:var(--ink);margin-inline:auto;
  transition:transform .3s var(--ease), opacity .3s var(--ease);
}
.menu-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.menu-toggle[aria-expanded="true"] span:nth-child(2){opacity:0;}
.menu-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

.nav-mobile{
  position:fixed;inset:76px 0 0 0;
  background:var(--bg);
  padding:2.5rem clamp(1.25rem,6vw,3rem);
  display:flex;flex-direction:column;gap:1.7rem;
  transform:translateY(-8px);opacity:0;pointer-events:none;
  transition:opacity .3s var(--ease), transform .3s var(--ease);
  z-index:90;overflow-y:auto;
}
.nav-mobile.is-open{opacity:1;transform:translateY(0);pointer-events:auto;}
.nav-mobile a{
  font-family:var(--font-en);
  font-weight:700;
  font-size:1.5rem;
  letter-spacing:.01em;
  border-bottom:1px solid var(--line);
  padding-bottom:1.1rem;
}
.nav-mobile .nav-cta{
  align-self:flex-start;margin-top:.5rem;
}

/* ==============================================================
   Hero — full-bleed photo
   ============================================================== */
.hero{position:relative;background:var(--bg);}
.hero-media{
  position:relative;
  aspect-ratio:4/3;
  max-height:52vh;
}
@media (min-width:640px){.hero-media{aspect-ratio:16/9;max-height:86vh;}}
@media (min-width:1024px){.hero-media{aspect-ratio:21/10;}}
.hero-media::after{
  content:"";
  position:absolute;inset:0;
  z-index:1;
  background:linear-gradient(180deg, rgba(14,17,19,.05) 0%, rgba(14,17,19,.25) 70%, rgba(14,17,19,.55) 100%);
}
@media (min-width:640px){
  .hero-media::after{
    background:linear-gradient(180deg, rgba(14,17,19,.15) 0%, rgba(14,17,19,.55) 55%, rgba(14,17,19,.96) 100%);
  }
}
/* Mobile: copy flows normally below the image (own dark background) —
   avoids overlaying text on a short image where it could collide with
   the sticky header. Tablet/desktop: copy overlays the bottom of the
   (taller) image, as in the reference design. */
.hero-copy{
  position:static;
  z-index:2;
  background:var(--bg);
  padding:2rem 1.25rem 2.5rem;
  max-width:var(--container);
  margin-inline:auto;
}
@media (min-width:640px){
  .hero-copy{
    position:absolute;left:0;right:0;bottom:0;
    background:none;
    padding:clamp(2rem,6vw,4rem) clamp(1.25rem,4.5vw,3rem) clamp(2.5rem,5vw,3.5rem);
  }
}
.hero-copy .eyebrow{margin-bottom:1.2rem;}
.hero h1{
  font-size:clamp(2rem,5.6vw,3.6rem);
  color:var(--ink);
  max-width:16ch;
}
.hero .lead{
  margin-top:1.4rem;
  max-width:38em;
  color:var(--ink-muted);
  font-size:1rem;
  line-height:1.95;
}
.hero-ctas{
  display:flex;flex-wrap:wrap;gap:.8rem;
  margin-top:2rem;
}
.btn{
  display:inline-flex;align-items:center;gap:.6em;
  padding:.85em 1.5em;
  font-size:.88rem;font-weight:500;
  letter-spacing:.02em;
  border:1px solid transparent;
  transition:background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease), transform .15s var(--ease);
}
.btn svg{width:1.05em;height:1.05em;flex-shrink:0;}
.btn:active{transform:translateY(1px);}
.btn-accent{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:700;}
.btn-accent:hover{background:var(--accent-2);border-color:var(--accent-2);}
.btn-outline{border-color:var(--line-strong);color:var(--ink);}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);}

/* ticker / info bar under hero */
.ticker{
  background:var(--bg-1);
  border-bottom:1px solid var(--line);
}
.ticker .wrap{
  display:flex;flex-wrap:wrap;align-items:center;gap:1rem 2rem;
  padding-block:1.1rem;
}
.ticker-label{
  display:inline-flex;align-items:center;gap:.6em;
  font-family:var(--font-en);
  font-size:.72rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-muted);
}
.ticker-label svg{width:1.1em;height:1.1em;color:var(--accent);}
.region-tags{display:flex;flex-wrap:wrap;gap:.6rem;flex:1;}
.region-tags li{
  font-family:var(--font-en);
  font-size:.74rem;font-weight:600;
  letter-spacing:.08em;text-transform:uppercase;
  border:1px solid var(--line-strong);
  padding:.5em .95em;
  color:var(--ink-muted);
}
.ticker-link{
  font-size:.84rem;font-weight:700;color:var(--accent);
  display:inline-flex;align-items:center;gap:.4em;
  white-space:nowrap;
}
.ticker-link svg{width:1em;height:1em;transition:transform .25s var(--ease);}
.ticker-link:hover svg{transform:translateX(3px);}

/* ==============================================================
   Service — feature blocks (alternating)
   ============================================================== */
.service-intro{
  max-width:52em;
  font-size:1.02rem;
  line-height:2;
  color:var(--ink-muted);
}
.subblock-title{
  margin-top:clamp(3.25rem,6vw,4.5rem);
  margin-bottom:1.6rem;
  font-size:1.1rem;
  font-weight:700;
  letter-spacing:.02em;
}

.feature-list{display:flex;flex-direction:column;gap:1px;background:var(--line);}
.feature{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  background:var(--bg);
  align-items:stretch;
}
.feature:nth-child(even) .feature-media{order:2;}
.feature-body{
  padding:clamp(1.75rem,3.5vw,3rem);
  display:flex;flex-direction:column;justify-content:center;
}
.feature-num{
  font-family:var(--font-en);
  font-weight:700;
  font-size:.82rem;
  letter-spacing:.1em;
  color:var(--accent);
  display:block;
  margin-bottom:1rem;
}
.feature-body h3{
  font-size:1.2rem;
  line-height:1.6;
  margin-bottom:.8rem;
}
.feature-body p{
  font-size:.92rem;
  color:var(--ink-muted);
  line-height:1.9;
}

.eligibility{
  margin-top:clamp(2.5rem,4vw,3.25rem);
  border-left:2px solid var(--accent);
  padding:1.3rem 1.7rem;
  background:var(--bg-1);
  max-width:44em;
}
.eligibility .label{
  font-family:var(--font-en);
  font-size:.72rem;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;
  color:var(--accent);
  display:block;margin-bottom:.5rem;
}
.eligibility p{font-size:.92rem;color:var(--ink-muted);}

/* ==============================================================
   Plans — two-card "business unit" style
   ============================================================== */
.plan-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:1px;
  background:var(--line);
}
.plan-card{
  background:var(--bg);
  display:flex;flex-direction:column;
}
.plan-card .media-slot{--ar:1.6;}
.plan-body{padding:clamp(1.75rem,3vw,2.4rem);display:flex;flex-direction:column;flex-grow:1;}
.plan-card h3{font-size:1.25rem;margin-bottom:.9rem;}
.plan-badge{
  display:inline-block;
  background:var(--accent);
  color:var(--accent-ink);
  font-size:.68rem;font-weight:700;
  letter-spacing:.06em;
  padding:.4em .8em;
  margin-bottom:1rem;
  align-self:flex-start;
}
.plan-card .price{
  font-family:var(--font-en);
  font-size:2.2rem;font-weight:700;
  color:var(--ink);margin-bottom:.3rem;
}
.plan-card .price .yen{font-size:1.1rem;font-weight:600;margin-right:.15em;}
.plan-card .price .tax{font-family:var(--font-jp);font-size:.78rem;font-weight:400;color:var(--ink-faint);margin-left:.35em;}
.plan-card .desc{
  margin-top:1rem;padding-top:1.2rem;
  border-top:1px solid var(--line);
  font-size:.92rem;color:var(--ink-muted);line-height:1.95;
  flex-grow:1;
}

.continued-support{
  margin-top:clamp(1.75rem,3vw,2.25rem);
  display:flex;flex-wrap:wrap;gap:1rem 2rem;
  align-items:baseline;justify-content:space-between;
  border:1px dashed var(--line-strong);
  padding:1.4rem 1.7rem;
}
.continued-support .t{font-size:.94rem;color:var(--ink-muted);}
.continued-support .t strong{font-weight:700;color:var(--ink);}
.continued-support .rate{
  font-family:var(--font-en);font-size:1.35rem;font-weight:700;
  color:var(--accent);white-space:nowrap;
}

.option-table{display:grid;gap:1px;background:var(--line);}
.option-row{
  display:grid;
  grid-template-columns:1.1fr 2.2fr .9fr;
  gap:1.5rem;
  background:var(--bg-1);
  padding:1.3rem 1.6rem;
  align-items:center;
}
.option-row .cell-label{
  font-family:var(--font-en);
  font-size:.66rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);
  display:block;margin-bottom:.35rem;
}
.option-row .name{font-weight:700;font-size:.98rem;}
.option-row .content{font-size:.88rem;color:var(--ink-muted);line-height:1.85;}
.option-row .price{
  font-family:var(--font-en);font-weight:700;font-size:1.02rem;text-align:right;
}
.option-row .price .tax{font-family:var(--font-jp);font-weight:400;font-size:.72rem;color:var(--ink-faint);display:block;text-align:right;}

.payment-methods{
  margin-top:clamp(2.5rem,4vw,3.25rem);
  display:flex;flex-wrap:wrap;align-items:center;gap:1rem 1.5rem;
}
.payment-methods .label{
  font-family:var(--font-en);font-size:.72rem;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);
}
.payment-methods ul{display:flex;flex-wrap:wrap;gap:.6rem;}
.payment-methods li{
  font-size:.85rem;border:1px solid var(--line-strong);
  padding:.5em 1em;color:var(--ink-muted);
}

/* ==============================================================
   Results — photo card grid, empty state
   ============================================================== */
.results-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1px;background:var(--line);
}
.result-card{background:var(--bg);}
.result-card .media-slot{--ar:0.8;}
.result-body{padding:1.5rem 1.5rem 1.7rem;}
.result-body .quote-mark{
  font-family:var(--font-en);
  font-size:1.8rem;font-weight:700;
  color:var(--accent);line-height:1;
  display:block;margin-bottom:.6rem;
}
.result-body .msg{font-size:.86rem;line-height:1.85;color:var(--ink-muted);}
.results-note{
  margin-top:2.25rem;
  font-size:.88rem;color:var(--ink-muted);
  max-width:44em;
  border-top:1px solid var(--line);
  padding-top:1.4rem;
}

/* ==============================================================
   About / founder
   ============================================================== */
.about-layout{
  display:grid;
  grid-template-columns:.9fr 1.1fr;
  gap:0;
  border:1px solid var(--line);
}
.about-layout .media-slot{--ar:0.8;height:100%;}
.about-body{
  padding:clamp(2rem,4vw,3rem);
  display:flex;flex-direction:column;justify-content:center;
  background:var(--bg-1);
}
.about-body .role{
  font-family:var(--font-en);font-size:.72rem;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--accent);
}
.about-body .name{
  margin-top:.7rem;
  font-size:1.3rem;font-weight:900;
}
.about-body .locales{
  margin-top:1.2rem;padding-top:1.2rem;
  border-top:1px solid var(--line);
  font-size:.82rem;color:var(--ink-muted);line-height:2;
  margin-bottom:1.6rem;
}
.about-message p{font-size:.98rem;line-height:2.05;color:var(--ink-muted);}
.about-message p + p{margin-top:1.3rem;}

/* ==============================================================
   Contact
   ============================================================== */
.contact-cta{
  background:var(--bg-1);
  border:1px solid var(--line-strong);
  padding:clamp(2rem,4vw,2.75rem);
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:1.5rem;
  margin-bottom:clamp(2.5rem,4vw,3rem);
}
.contact-cta .t{max-width:32em;}
.contact-cta .t .k{
  font-family:var(--font-en);font-size:.72rem;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--accent);
  display:block;margin-bottom:.6rem;
}
.contact-cta .t h3{font-size:1.3rem;}

.contact-grid{
  display:grid;grid-template-columns:repeat(2,1fr);
  gap:1px;background:var(--line);
}
.contact-card{
  background:var(--bg-1);
  padding:1.8rem 1.9rem;
  display:flex;align-items:center;gap:1.1rem;
  transition:background .25s var(--ease);
}
.contact-card:hover{background:var(--bg-2);}
.contact-card .icon{
  width:46px;height:46px;flex-shrink:0;
  border:1px solid var(--line-strong);
  display:flex;align-items:center;justify-content:center;
  color:var(--accent);
}
.contact-card .icon svg{width:20px;height:20px;}
.contact-card .info{min-width:0;}
.contact-card .channel{font-weight:700;font-size:.98rem;}
.contact-card .detail{
  font-size:.82rem;color:var(--ink-muted);margin-top:.2rem;
  overflow-wrap:anywhere;
}

/* ==============================================================
   Footer
   ============================================================== */
.site-footer{
  background:var(--bg-1);
  border-top:1px solid var(--line);
  padding-block:3rem 2rem;
}
.footer-grid{
  display:grid;
  grid-template-columns:1.2fr repeat(3,1fr);
  gap:2.5rem;
  padding-bottom:2.5rem;
  border-bottom:1px solid var(--line);
}
.footer-brand .brand-wordmark{display:block;margin-bottom:1rem;}
.footer-brand p{font-size:.82rem;color:var(--ink-faint);line-height:1.9;max-width:26em;}
.footer-col h4{
  font-family:var(--font-en);
  font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-faint);margin-bottom:1.1rem;
}
.footer-col ul{display:flex;flex-direction:column;gap:.7rem;}
.footer-col a{font-size:.86rem;color:var(--ink-muted);}
.footer-col a:hover{color:var(--accent);}
.footer-bottom{
  padding-top:1.6rem;
  display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;
  font-size:.76rem;color:var(--ink-faint);
}

/* ==============================================================
   Responsive breakpoints
   ============================================================== */
@media (max-width:1024px){
  .about-layout{grid-template-columns:1fr;}
  .about-layout .media-slot{--ar:1.778;}
  .footer-grid{grid-template-columns:1fr 1fr;}
}

@media (max-width:860px){
  .nav-desktop{display:none;}
  .menu-toggle{display:flex;}
  .feature{grid-template-columns:1fr;}
  .feature-media{order:-1 !important;}
  .feature-media .media-slot{--ar:1.6;}
  .plan-grid{grid-template-columns:1fr;}
  .results-grid{grid-template-columns:1fr 1fr;}
  .contact-grid{grid-template-columns:1fr;}
  .footer-grid{grid-template-columns:1fr 1fr;gap:2rem 1.5rem;}
}

@media (max-width:640px){
  body{font-size:15.5px;}
  section{padding-block:clamp(3.25rem,10vw,4.5rem);}
  .option-row{grid-template-columns:1fr;gap:.5rem;}
  .option-row .price{text-align:left;}
  .option-row .price .tax{text-align:left;}
  .results-grid{grid-template-columns:1fr;}
  .continued-support{flex-direction:column;align-items:flex-start;}
  .contact-cta{flex-direction:column;align-items:flex-start;}
  .hero-ctas{gap:.6rem;}
  .btn{font-size:.85rem;padding:.8em 1.2em;}
  .footer-grid{grid-template-columns:1fr;gap:2rem;}
  .footer-bottom{flex-direction:column;}
}

@media (max-width:640px){
  .ticker .wrap{flex-direction:column;align-items:flex-start;gap:.9rem;}
  .region-tags{flex:none;width:100%;}
  .ticker-link{align-self:flex-start;}
}

@media (max-width:400px){
  .brand-wordmark{font-size:1.12rem;}
}
</style>
</head>
<body>

<a href="#main" class="skip-link">本文へスキップ</a>

<!--
  ================= 画像差し替えガイド =================
  このページには合計11箇所の写真プレースホルダー(.media-slot内の
  <img class="media-slot__ph">)があります。実写真を入れる際は、
  対象の img タグの src 属性を写真ファイルのパスに差し替えるだけで
  反映されます(class・alt はそのまま残してください)。

  1. ヒーロー(#hero-img)            推奨: 1920×1080以上・横長
  2. STEP.01 お問い合わせ(#step1-img) 推奨: 4:3 横長
  3. STEP.02 プラン選択(#step2-img)   推奨: 4:3 横長
  4. STEP.03 クラブ交渉(#step3-img)   推奨: 4:3 横長
  5. STEP.04 お支払い(#step4-img)     推奨: 4:3 横長
  6. 練習参加プラン(#plan1-img)       推奨: 16:10 横長
  7. 本契約プラン(#plan2-img)         推奨: 16:10 横長
  8-10. 実績・選手の声 3枠(#result1-3-img) 推奨: 4:5 縦長(選手ポートレート)
  11. 運営者情報(#about-img)          推奨: 4:5 縦長 または 16:9

  各 figcaption(差し替え案内タグ)は公開前に削除してください。
  ======================================================
-->

<!-- ============================================================
     Header
     ============================================================ -->
<header class="site-header" id="top">
  <div class="wrap">
    <a href="#top" class="brand" aria-label="Link×Football トップへ">
      <span class="brand-logo-slot">
        <!-- ロゴ確定後: <img src="logo.svg" alt="Link×Football" style="height:100%;width:auto;"> に差し替え可能 -->
        <span class="brand-wordmark">Link<span class="x">×</span>Football</span>
      </span>
    </a>

    <nav class="nav-desktop" aria-label="メインナビゲーション">
      <a href="#service">サービス</a>
      <a href="#plans">プラン</a>
      <a href="#results">実績</a>
      <a href="#about">運営者情報</a>
      <a href="#contact" class="nav-cta">無料相談</a>
    </nav>

    <button class="menu-toggle" aria-label="メニューを開く" aria-expanded="false" aria-controls="nav-mobile">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- backdrop-filterを持つヘッダーの外に置くことで、position:fixedの
     全画面メニューがビューポート全体に正しく広がるようにしています。 -->
<nav class="nav-mobile" id="nav-mobile" aria-label="モバイルナビゲーション">
  <a href="#service">サービス</a>
  <a href="#plans">プラン</a>
  <a href="#results">実績</a>
  <a href="#about">運営者情報</a>
  <a href="#contact" class="nav-cta">無料相談</a>
</nav>

<main id="main">

<!-- ============================================================
     1. Hero
     ============================================================ -->
<section class="hero">
  <div class="hero-media">
    <img id="hero-img" class="media-slot__ph" style="width:100%;height:100%;object-fit:cover;" alt=""
      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%23171B1E'/><defs><pattern id='d' width='34' height='34' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='34' stroke='%23E2792E' stroke-opacity='0.10' stroke-width='2'/></pattern></defs><rect width='1600' height='900' fill='url(%23d)'/><g transform='translate(800,450)' fill='none' stroke='%23E2792E' stroke-opacity='0.4' stroke-width='4'><rect x='-70' y='-48' width='140' height='96' rx='6'/><circle cx='0' cy='0' r='28'/><rect x='26' y='-64' width='34' height='18' rx='3'/></g></svg>">
    <span class="media-slot__tag" style="left:1.25rem;bottom:auto;top:1.25rem;"><b>画像差替:</b>&nbsp;#hero-img / 選手のトレーニングや試合風景を推奨</span>
  </div>
    <div class="hero-copy">
      <span class="eyebrow">Career Support Agency</span>
      <h1>本気で海外を<br>目指す選手のために。</h1>
      <p class="lead">
        Link×Footballは、海外のサッカークラブ入りを本気で目指す選手のための
        キャリアサポートサービスです。オーストラリア・ニュージーランド・モンゴルをはじめとする
        アジア・オセアニア地域への移籍の契約交渉をサポートします。
      </p>
      <div class="hero-ctas">
        <a class="btn btn-accent" href="https://lin.ee/6agJDsY" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5c0 4.7-4.7 8.5-9.5 8.5-1 0-2-.15-2.9-.45L4 21l1.1-3.8C3.8 15.9 3 13.8 3 11.5 3 6.8 7.7 3 12.5 3S21 6.8 21 11.5Z"/></svg>
          公式LINEで相談する
        </a>
        <a class="btn btn-outline" href="https://www.threads.com/@link.football_" target="_blank" rel="noopener">Threadsで相談する</a>
        <a class="btn btn-outline" href="https://www.instagram.com/link.football_" target="_blank" rel="noopener">Instagramで相談する</a>
        <a class="btn btn-outline" href="https://wa.me/message/OH776LDKUG5LB1" target="_blank" rel="noopener">WhatsAppで相談する</a>
        <a class="btn btn-outline" href="mailto:linkfootball13@gmail.com">メールで問い合わせる</a>
      </div>
    </div>

  <div class="ticker">
    <div class="wrap">
      <span class="ticker-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
        対応地域
      </span>
      <ul class="region-tags">
        <li>Australia</li>
        <li>New Zealand</li>
        <li>Mongolia</li>
        <li>Asia &amp; Oceania 全域</li>
      </ul>
      <a class="ticker-link" href="#service">
        サービスを見る
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ============================================================
     2. Service
     ============================================================ -->
<section id="service">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Service</span>
      <h2>なぜLink×Footballなのか</h2>
    </div>

    <p class="service-intro">
      アジア・オセアニア地域(オーストラリア/ニュージーランド/モンゴル)でプレーした経験から
      強いコネクションがあり、多数の実績を活かし低価格で契約交渉を迅速にサポートさせていただきます。
    </p>

    <h3 class="subblock-title">サポートの流れ</h3>
    <div class="feature-list">
      <div class="feature">
        <div class="feature-media">
          <div class="media-slot cut" style="--ar:1.333;">
            <img id="step1-img" class="media-slot__ph" alt=""
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23171B1E'/><defs><pattern id='d1' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='300' fill='url(%23d1)'/><g transform='translate(200,150)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#step1-img</span>
          </div>
        </div>
        <div class="feature-body">
          <span class="feature-num">STEP.01</span>
          <h3>お問い合わせ・ヒアリング</h3>
          <p>現在の状況や希望する国・レベル感を伺います。</p>
        </div>
      </div>

      <div class="feature">
        <div class="feature-media">
          <div class="media-slot cut" style="--ar:1.333;">
            <img id="step2-img" class="media-slot__ph" alt=""
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23171B1E'/><defs><pattern id='d2' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='300' fill='url(%23d2)'/><g transform='translate(200,150)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#step2-img</span>
          </div>
        </div>
        <div class="feature-body">
          <span class="feature-num">STEP.02</span>
          <h3>プラン選択・契約</h3>
          <p>練習参加プラン・本契約プランからご希望に合わせて選択いただきます。</p>
        </div>
      </div>

      <div class="feature">
        <div class="feature-media">
          <div class="media-slot cut" style="--ar:1.333;">
            <img id="step3-img" class="media-slot__ph" alt=""
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23171B1E'/><defs><pattern id='d3' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='300' fill='url(%23d3)'/><g transform='translate(200,150)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#step3-img</span>
          </div>
        </div>
        <div class="feature-body">
          <span class="feature-num">STEP.03</span>
          <h3>クラブとの交渉・トライアル調整</h3>
          <p>現地クラブとのコネクションを活かし、交渉・調整を進めます。</p>
        </div>
      </div>

      <div class="feature">
        <div class="feature-media">
          <div class="media-slot cut" style="--ar:1.333;">
            <img id="step4-img" class="media-slot__ph" alt=""
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23171B1E'/><defs><pattern id='d4' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='300' fill='url(%23d4)'/><g transform='translate(200,150)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#step4-img</span>
          </div>
        </div>
        <div class="feature-body">
          <span class="feature-num">STEP.04</span>
          <h3>お支払い</h3>
          <p>本契約プランは契約決定後、練習参加プランは練習参加決定後のお支払いです。</p>
        </div>
      </div>
    </div>

    <div class="eligibility">
      <span class="label">対象となる選手</span>
      <p>契約締結時点で満18歳以上の方を対象としています。</p>
    </div>
  </div>
</section>

<!-- ============================================================
     3. Plans & pricing
     ============================================================ -->
<section id="plans" class="bleed-alt">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Plans</span>
      <h2>プラン・料金</h2>
    </div>

    <div class="plan-grid">
      <div class="plan-card">
        <div class="media-slot cut">
          <img id="plan1-img" class="media-slot__ph" alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23171B1E'/><defs><pattern id='p1' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='250' fill='url(%23p1)'/><g transform='translate(200,125)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
          <span class="media-slot__tag"><b>差替:</b>&nbsp;#plan1-img / 練習・トライアル風景</span>
        </div>
        <div class="plan-body">
          <h3>練習参加プラン</h3>
          <div class="price"><span class="yen">¥</span>70,000<span class="tax">(税込)</span></div>
          <div class="desc">
            クラブへの練習参加・トライアル交渉(ヒアリングに基づき1〜3チーム)、契約交渉を行います。
          </div>
        </div>
      </div>

      <div class="plan-card">
        <div class="media-slot cut">
          <img id="plan2-img" class="media-slot__ph" alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23171B1E'/><defs><pattern id='p2' width='24' height='24' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='24' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='250' fill='url(%23p2)'/><g transform='translate(200,125)' fill='none' stroke='%23E2792E' stroke-opacity='0.45' stroke-width='2.5'><rect x='-38' y='-26' width='76' height='52' rx='4'/><circle cx='0' cy='0' r='15'/><rect x='14' y='-34' width='18' height='10' rx='2'/></g></svg>">
          <span class="media-slot__tag"><b>差替:</b>&nbsp;#plan2-img / 契約・加入シーン</span>
        </div>
        <div class="plan-body">
          <span class="plan-badge">おすすめ</span>
          <h3>本契約プラン</h3>
          <div class="price"><span class="yen">¥</span>100,000<span class="tax">(税込)</span></div>
          <div class="desc">
            練習を経ずに直接加入を目指します(難しい場合は練習参加プランへの変更が可能です)。契約交渉を行います。
          </div>
        </div>
      </div>
    </div>

    <div class="continued-support">
      <div class="t"><strong>加入後の継続サポート</strong>(希望者のみ)— チームとのコミュニケーションサポート</div>
      <div class="rate">月間給料の 3%</div>
    </div>

    <h3 class="subblock-title">オプション</h3>
    <div class="option-table">
      <div class="option-row">
        <div><span class="cell-label">Option</span><span class="name">動画作成プラン</span></div>
        <div><span class="cell-label">内容</span><span class="content">選手紹介・プレー動画の作成</span></div>
        <div class="price">¥5,000<span class="tax">(税込)</span></div>
      </div>
      <div class="option-row">
        <div><span class="cell-label">Option</span><span class="name">個人用ホームページ作成プラン</span></div>
        <div><span class="cell-label">内容</span><span class="content">スポンサー獲得やポートフォリオとして使えるホームページを作成</span></div>
        <div class="price">¥50,000〜80,000<span class="tax">(税込)</span></div>
      </div>
      <div class="option-row">
        <div><span class="cell-label">Option</span><span class="name">渡航サポート</span></div>
        <div><span class="cell-label">内容</span><span class="content">航空券やホテルの予約を電話にてサポート(予約自体はご自身で行っていただきます)</span></div>
        <div class="price">無料</div>
      </div>
    </div>

    <div class="payment-methods">
      <span class="label">お支払い方法</span>
      <ul>
        <li>クレジットカード</li>
        <li>銀行振込</li>
        <li>コンビニ決済(Stripe決済)</li>
      </ul>
    </div>
  </div>
</section>

<!-- ============================================================
     4. Results / voices — empty state
     ============================================================ -->
<section id="results">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Voices</span>
      <h2>実績・選手の声</h2>
      <p class="sub">実際にサポートした選手のご紹介・コメントを、準備が整い次第この枠に掲載いたします。</p>
    </div>

    <div class="results-grid">
      <div class="result-card">
        <div class="media-slot cut">
          <img id="result1-img" class="media-slot__ph" alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 400'><rect width='320' height='400' fill='%23171B1E'/><defs><pattern id='r1' width='22' height='22' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='22' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='320' height='400' fill='url(%23r1)'/><g transform='translate(160,200)' fill='none' stroke='%23E2792E' stroke-opacity='0.4' stroke-width='2.5'><circle cx='0' cy='-30' r='26'/><path d='M-46,54 C-46,4 46,4 46,54'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#result1-img</span>
          </div>
        <div class="result-body">
          <span class="quote-mark">"</span>
          <p class="msg">選手プロフィール・移籍前後の状況を掲載予定です。</p>
        </div>
      </div>

      <div class="result-card">
        <div class="media-slot cut">
          <img id="result2-img" class="media-slot__ph" alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 400'><rect width='320' height='400' fill='%23171B1E'/><defs><pattern id='r2' width='22' height='22' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='22' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='320' height='400' fill='url(%23r2)'/><g transform='translate(160,200)' fill='none' stroke='%23E2792E' stroke-opacity='0.4' stroke-width='2.5'><circle cx='0' cy='-30' r='26'/><path d='M-46,54 C-46,4 46,4 46,54'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#result2-img</span>
          </div>
        <div class="result-body">
          <span class="quote-mark">"</span>
          <p class="msg">サポートを受けた感想を掲載予定です。</p>
        </div>
      </div>

      <div class="result-card">
        <div class="media-slot cut">
          <img id="result3-img" class="media-slot__ph" alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 400'><rect width='320' height='400' fill='%23171B1E'/><defs><pattern id='r3' width='22' height='22' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='22' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='320' height='400' fill='url(%23r3)'/><g transform='translate(160,200)' fill='none' stroke='%23E2792E' stroke-opacity='0.4' stroke-width='2.5'><circle cx='0' cy='-30' r='26'/><path d='M-46,54 C-46,4 46,4 46,54'/></g></svg>">
            <span class="media-slot__tag"><b>差替:</b>&nbsp;#result3-img</span>
          </div>
        <div class="result-body">
          <span class="quote-mark">"</span>
          <p class="msg">Before / After(移籍先・活動状況)を掲載予定です。</p>
        </div>
      </div>
    </div>

    <p class="results-note">
      掲載には本人の経歴・コメント・写真使用許可の確認が必要なため、確認が取れた選手から順次公開いたします。
    </p>
  </div>
</section>

<!-- ============================================================
     5. About / founder
     ============================================================ -->
<section id="about" class="bleed-alt">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">About</span>
      <h2>運営者情報</h2>
    </div>

    <div class="about-layout">
      <div class="media-slot">
        <img id="about-img" class="media-slot__ph" alt=""
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23171B1E'/><defs><pattern id='ab' width='26' height='26' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'><line x1='0' y1='0' x2='0' y2='26' stroke='%23E2792E' stroke-opacity='0.12' stroke-width='2'/></pattern></defs><rect width='400' height='500' fill='url(%23ab)'/><g transform='translate(200,250)' fill='none' stroke='%23E2792E' stroke-opacity='0.4' stroke-width='2.5'><circle cx='0' cy='-40' r='34'/><path d='M-62,70 C-62,4 62,4 62,70'/></g></svg>">
        <span class="media-slot__tag"><b>差替:</b>&nbsp;#about-img / 代表者または現地クラブ視察の写真</span>
      </div>
      <div class="about-body">
        <span class="role">代表挨拶</span>
        <div class="name">Link×Football</div>
        <div class="locales">
          対応地域<br>
          オーストラリア / ニュージーランド / モンゴル<br>
          アジア・オセアニア全域
        </div>
        <div class="about-message">
          <p>
            日本には、本気で海外に挑戦したいと思っている選手がたくさんいます。しかし、その一歩を踏み出す環境や情報は、
            まだまだ十分に整っていません。
          </p>
          <p>
            私たちLink×Footballは、そんな選手たちのために立ち上がりました。オーストラリア・ニュージーランド・
            モンゴルをはじめとするアジア・オセアニアのクラブとの強いつながりを活かし、一人ひとりに本気で向き合いながら
            契約交渉をサポートします。
          </p>
          <p>
            「本気で挑戦したい」その想いさえあれば、あとは私たちが全力で後押しします。一緒に、海外という新しい景色を
            目指しましょう。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     6. Contact
     ============================================================ -->
<section id="contact">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Contact</span>
      <h2>お問い合わせ</h2>
    </div>

    <div class="contact-cta">
      <div class="t">
        <span class="k">Free Consultation</span>
        <h3>ご相談は下記いずれかの窓口よりお気軽にご連絡ください。</h3>
      </div>
      <a class="btn btn-accent" href="https://lin.ee/6agJDsY" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5c0 4.7-4.7 8.5-9.5 8.5-1 0-2-.15-2.9-.45L4 21l1.1-3.8C3.8 15.9 3 13.8 3 11.5 3 6.8 7.7 3 12.5 3S21 6.8 21 11.5Z"/></svg>
        公式LINEで無料相談する
      </a>
    </div>

    <div class="contact-grid">
      <a class="contact-card" href="https://lin.ee/6agJDsY" target="_blank" rel="noopener">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5c0 4.7-4.7 8.5-9.5 8.5-1 0-2-.15-2.9-.45L4 21l1.1-3.8C3.8 15.9 3 13.8 3 11.5 3 6.8 7.7 3 12.5 3S21 6.8 21 11.5Z"/></svg></span>
        <span class="info"><span class="channel">公式LINE</span><span class="detail">lin.ee/6agJDsY</span></span>
      </a>
      <a class="contact-card" href="https://www.threads.com/@link.football_" target="_blank" rel="noopener">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 8a3 3 0 1 1-2.1 5.1"/></svg></span>
        <span class="info"><span class="channel">公式Threads</span><span class="detail">@link.football_</span></span>
      </a>
      <a class="contact-card" href="https://www.instagram.com/link.football_" target="_blank" rel="noopener">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1"/></svg></span>
        <span class="info"><span class="channel">公式Instagram</span><span class="detail">@link.football_</span></span>
      </a>
      <a class="contact-card" href="https://wa.me/message/OH776LDKUG5LB1" target="_blank" rel="noopener">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l1.3-3.9A8 8 0 1 1 8.6 19L4 20Z"/><path d="M8.5 9.5c.3 2.6 2.4 4.7 5 5"/></svg></span>
        <span class="info"><span class="channel">WhatsApp</span><span class="detail">メッセージを送る</span></span>
      </a>
      <a class="contact-card" href="mailto:linkfootball13@gmail.com" style="grid-column:1/-1;">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 6.5 12 13l8-6.5"/></svg></span>
        <span class="info"><span class="channel">メールアドレス</span><span class="detail">linkfootball13@gmail.com</span></span>
      </a>
    </div>
  </div>
</section>

</main>

<!-- ============================================================
     Footer
     ============================================================ -->
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="brand-wordmark">Link<span class="x">×</span>Football</span>
        <p>本気で海外を目指す選手のためのキャリアサポートサービス。オーストラリア・ニュージーランド・モンゴルをはじめとするアジア・オセアニア地域への移籍をサポートします。</p>
      </div>
      <div class="footer-col">
        <h4>Menu</h4>
        <ul>
          <li><a href="#service">サービス</a></li>
          <li><a href="#plans">プラン</a></li>
          <li><a href="#results">実績</a></li>
          <li><a href="#about">運営者情報</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="https://lin.ee/6agJDsY" target="_blank" rel="noopener">公式LINE</a></li>
          <li><a href="https://www.instagram.com/link.football_" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="mailto:linkfootball13@gmail.com">メール</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Region</h4>
        <ul>
          <li>Australia</li>
          <li>New Zealand</li>
          <li>Mongolia</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="year"></span> Link×Football. All rights reserved.</span>
    </div>
  </div>
</footer>

<!--
  制作メモ(公開前にご確認ください):
  ・特定商取引法に基づく表記ページは今回未作成です(構成案の保留事項のため)。決済導線を公開する前に追加してください。
  ・実績・選手の声セクションは、情報が揃い次第カードを差し替えてください(該当箇所は #results 内の .result-card)。
  ・画像プレースホルダーの一覧・差し替え方法は、ファイル冒頭のコメントを参照してください。
-->

<script>
(function(){
  "use strict";

  var header = document.querySelector('.site-header');
  var onScroll = function(){
    if(window.scrollY > 8){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  var toggle = document.querySelector('.menu-toggle');
  var navMobile = document.getElementById('nav-mobile');
  function closeMenu(){
    toggle.setAttribute('aria-expanded','false');
    navMobile.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function openMenu(){
    toggle.setAttribute('aria-expanded','true');
    navMobile.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  toggle.addEventListener('click', function(){
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });
  navMobile.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', function(){
    if(window.innerWidth > 860) closeMenu();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
</script>
</body>
</html>
