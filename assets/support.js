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

  if(!root.classList.contains('motion')){
    document.addEventListener('scroll', function(){ header.classList.toggle('is-scrolled', scrollY > 8); }, {passive:true});
    return;
  }
  var reduced = root.classList.contains('rm');
  var finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Hero entrance ---------- */
  var h1 = document.querySelector('.s-hero h1');
  if(h1){
    h1.innerHTML = h1.innerHTML.split(/<br\s*\/?>/i).map(function(html, i){
      return '<span class="h1-line" style="--i:' + i + '"><span class="h1-line__in">' + html + '</span></span>';
    }).join('');
  }
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
    var tpl = $all('template', chat).map(function(t){ return t.innerHTML; });
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
        stage.insertAdjacentHTML('beforeend', tpl[step]);
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
