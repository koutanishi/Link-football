/* ==============================================================
   Support detail pages — ナビ・モーション(依存ライブラリなし)
   ============================================================== */
(function(){
  "use strict";
  var root = document.documentElement;
  function $all(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); }

  /* ---------- Header / mobile menu / year (motion無しでも必要) ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var navMobile = document.getElementById('nav-mobile');
  function closeMenu(){
    toggle.setAttribute('aria-expanded','false');
    navMobile.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  toggle.addEventListener('click', function(){
    if(toggle.getAttribute('aria-expanded') === 'true'){ closeMenu(); return; }
    toggle.setAttribute('aria-expanded','true');
    navMobile.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
  $all('a', navMobile).forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
  addEventListener('resize', function(){ if(innerWidth > 860) closeMenu(); });
  var year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  /* ---------- Language (トップと同じ localStorage キーで言語を共有) ---------- */
  var I18N = window.LM_I18N || {}, META = window.LM_LANG_META || {};
  var STORAGE_KEY = 'lf_lang';
  var h1 = document.querySelector('.s-hero h1');
  function splitH1(instant){
    if(!h1 || !root.classList.contains('motion') || h1.querySelector('.h1-line')) return;
    h1.innerHTML = h1.innerHTML.split(/<br\s*\/?>/i).map(function(html, i){
      return '<span class="h1-line' + (instant ? ' is-instant' : '') + '" style="--i:' + i + '"><span class="h1-line__in">' + html + '</span></span>';
    }).join('');
  }
  function translate(scope, dict){
    $all('[data-i18n]', scope).forEach(function(el){
      var v = dict[el.getAttribute('data-i18n')];
      if(v === undefined) return;
      el.textContent = v; el.hidden = (v === '');
    });
    $all('[data-i18n-html]', scope).forEach(function(el){
      var v = dict[el.getAttribute('data-i18n-html')];
      if(v === undefined) return;
      el.innerHTML = v; el.hidden = (v === '');
    });
    $all('[data-i18n-alt]', scope).forEach(function(el){
      var v = dict[el.getAttribute('data-i18n-alt')];
      if(v !== undefined) el.setAttribute('alt', v);
    });
  }
  var langTrigger = document.getElementById('lang-trigger');
  var langListbox = document.getElementById('lang-listbox');
  var langOptions = langListbox ? $all('li', langListbox) : [];
  function applyLang(lang){
    if(!I18N[lang]) lang = 'ja';
    var dict = I18N[lang];
    translate(document, dict);
    $all('template').forEach(function(t){ translate(t.content, dict); });
    $all('.price-tag .v').forEach(function(v){ v.classList.toggle('is-text', !/\d/.test(v.textContent)); });
    splitH1(true);
    root.setAttribute('lang', lang);
    var nameKey = document.body.getAttribute('data-name-key'), leadKey = document.body.getAttribute('data-lead-key');
    if(dict[nameKey]) document.title = dict[nameKey] + ' | LINK×MANAGEMENT';
    var md = document.querySelector('meta[name="description"]');
    if(md && dict[leadKey]) md.setAttribute('content', dict[leadKey]);
    var m = META[lang] || META.ja;
    if(m && langTrigger){
      document.getElementById('lang-trigger-flag').textContent = m.flag;
      document.getElementById('lang-trigger-name').textContent = m.name;
    }
    langOptions.forEach(function(li){ li.setAttribute('aria-selected', li.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }
  function switchLang(lang){
    if(document.startViewTransition && root.classList.contains('motion')) document.startViewTransition(function(){ applyLang(lang); });
    else applyLang(lang);
  }
  if(langTrigger){
    var closeList = function(){ langListbox.hidden = true; langTrigger.setAttribute('aria-expanded','false'); };
    langTrigger.addEventListener('click', function(){
      var open = langListbox.hidden;
      langListbox.hidden = !open; langTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open){ var sel = langListbox.querySelector('[aria-selected="true"]') || langOptions[0]; sel.focus(); }
    });
    document.addEventListener('click', function(e){
      if(!langListbox.hidden && !langListbox.contains(e.target) && !langTrigger.contains(e.target)) closeList();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !langListbox.hidden){ closeList(); langTrigger.focus(); }
    });
    langOptions.forEach(function(li, i){
      li.addEventListener('click', function(){ switchLang(li.getAttribute('data-lang')); closeList(); langTrigger.focus(); });
      li.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); li.click(); }
        else if(e.key === 'ArrowDown'){ e.preventDefault(); (langOptions[i+1] || langOptions[0]).focus(); }
        else if(e.key === 'ArrowUp'){ e.preventDefault(); (langOptions[i-1] || langOptions[langOptions.length-1]).focus(); }
      });
    });
  }
  var initialLang = 'ja';
  try{ var saved = localStorage.getItem(STORAGE_KEY); if(saved && I18N[saved]) initialLang = saved; }catch(e){}
  applyLang(initialLang);
  $all('.h1-line.is-instant').forEach(function(l){ l.classList.remove('is-instant'); });

  if(!root.classList.contains('motion')){
    document.addEventListener('scroll', function(){ header.classList.toggle('is-scrolled', scrollY > 8); }, {passive:true});
    return;
  }
  var reduced = root.classList.contains('rm');
  var finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Hero entrance ---------- */
  $all('.s-hero .crumb, .s-hero__copy .eyebrow, .s-hero .lead, .price-tag, .s-hero__ctas .btn').forEach(function(el, i){ el.style.setProperty('--i', i); });
  $all('.route .path').forEach(function(p, i){
    p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
    p.style.setProperty('--i', i);
  });
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ root.classList.add('is-loaded'); }); });

  /* ---------- Scroll reveals ---------- */
  $all('.section-head h2').forEach(function(h){
    var w = document.createElement('div'); w.className = 'rv-mask'; w.setAttribute('data-reveal', 'mask');
    h.parentNode.insertBefore(w, h); w.appendChild(h);
  });
  function mark(sel, type){ $all(sel).forEach(function(el){ if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', type); }); }
  mark('.section-head .eyebrow', 'line');
  mark('.section-head .sub, .fit-card > *, .inc-card > *, .flow li, .option-row > *, .note-list > *, .payment-methods, .rel-card > *, .contact-cta, .contact-card > *, .footer-brand, .footer-col, .inc-note', 'up');
  mark('.flow', 'line');
  $all('.flow--photo li').forEach(function(li){
    li.setAttribute('data-media', '');
    $all('.media-slot', li).forEach(function(slot){
      var w = document.createElement('span'); w.className = 'm-wipe'; slot.appendChild(w);
    });
  });

  var io = new IntersectionObserver(function(entries){
    entries.filter(function(e){ return e.isIntersecting; })
      .sort(function(a, b){ return a.target.compareDocumentPosition(b.target) & 2 ? 1 : -1; })
      .forEach(function(e, i){
        e.target.style.setProperty('--d', (i * 80) + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
  }, {rootMargin:'0px 0px -8% 0px', threshold:0.1});
  $all('[data-reveal], .footer-mega').forEach(function(el){ io.observe(el); });

  /* ---------- Footer wordmark fit ---------- */
  var mega = document.querySelector('.footer-mega');
  function fitMega(){
    if(!mega) return;
    var cs = getComputedStyle(mega.parentNode);
    var avail = mega.parentNode.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    mega.style.fontSize = '100px';
    mega.style.fontSize = Math.min(150, 100 * avail / mega.scrollWidth) + 'px';
  }
  fitMega();
  addEventListener('resize', fitMega);
  if(document.fonts) document.fonts.ready.then(fitMega);

  /* ---------- Frame loop: header, progress fallback, marquee ---------- */
  var progress = document.querySelector('.scroll-progress');
  var needProgressJS = !(window.CSS && CSS.supports('animation-timeline: scroll()'));
  var track = document.querySelector('.marquee__track');
  var group = track && track.querySelector('.marquee__group');
  var lastY = scrollY, lastT = performance.now(), velocity = 0, mx = 0, dir = 1;
  function frame(now){
    var dt = Math.min(64, now - lastT) / 1000; lastT = now;
    var y = scrollY, dy = y - lastY; lastY = y;
    velocity += (dy - velocity) * 0.12;
    header.classList.toggle('is-scrolled', y > 8);
    if(!navMobile.classList.contains('is-open')){
      if(dy > 4 && y > 240) header.classList.add('is-hidden');
      else if(dy < -4 || y < 240) header.classList.remove('is-hidden');
    }
    if(progress && needProgressJS){
      var max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
    if(track && group){
      if(Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      var speed = reduced ? 50 : 70 + Math.min(900, Math.abs(velocity) * 22);
      var w = group.offsetWidth;
      mx -= speed * dir * dt;
      if(mx <= -w) mx += w;
      if(mx > 0) mx -= w;
      track.style.transform = 'translate3d(' + mx + 'px,0,0)';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- Visual: video timecode ---------- */
  var tc = document.querySelector('[data-timecode]');
  if(tc){
    var t0 = performance.now();
    (function tick(now){
      var s = ((now - t0) / 1000) % 6 * 5; // 6秒ループで 0〜30秒を表示
      var ss = Math.floor(s), ff = Math.floor((s - ss) * 30);
      tc.textContent = '00:00:' + String(ss).padStart(2, '0') + ':' + String(ff).padStart(2, '0');
      requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- Visual: English chat loop ---------- */
  var chat = document.querySelector('[data-chat]');
  if(chat){
    var tpls = $all('template', chat);
    var tpl = { get length(){ return tpls.length; } };
    var stage = chat.querySelector('.chat__stage');
    var step = 0;
    function next(){
      if(step >= tpl.length){
        chat.classList.add('is-fading');
        setTimeout(function(){ stage.innerHTML = ''; chat.classList.remove('is-fading'); step = 0; setTimeout(next, 500); }, 1800);
        return;
      }
      var typing = document.createElement('div');
      typing.className = 'bubble typing' + (step % 2 ? ' me' : '');
      typing.innerHTML = '<i></i><i></i><i></i>';
      stage.appendChild(typing);
      setTimeout(function(){
        typing.remove();
        stage.appendChild(tpls[step].content.cloneNode(true));
        step++;
        setTimeout(next, 1500);
      }, 900);
    }
    setTimeout(next, 1200);
  }

  /* ---------- Pointer spotlight ---------- */
  $all('.fit-card, .inc-card, .rel-card, .contact-card, .option-row').forEach(function(el){
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  if(!finePointer) return;

  /* Magnetic buttons */
  $all('.btn, .nav-cta').forEach(function(el){
    el.classList.add('is-magnetic');
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      el.style.transform = 'translate(' + (x * .22) + 'px,' + (y * .35) + 'px)';
    });
    el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
  });

  /* Cursor follower */
  var ring = document.querySelector('.cursor'), dot = document.querySelector('.cursor-dot');
  var tx = -100, ty = -100, rx = -100, ry = -100;
  addEventListener('pointermove', function(e){
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    ring.classList.remove('is-hidden'); dot.classList.remove('is-hidden');
    ring.classList.toggle('is-hover', !!(e.target.closest && e.target.closest('a, button')));
  }, {passive:true});
  document.addEventListener('pointerleave', function(){ ring.classList.add('is-hidden'); dot.classList.add('is-hidden'); });
  (function loop(){
    rx += (tx - rx) * .18; ry += (ty - ry) * .18;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    requestAnimationFrame(loop);
  })();
})();
