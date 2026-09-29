<script>
/* ==============================================================
   MOTION LAYER (demo) — 依存ライブラリなしの Vanilla JS。
   ============================================================== */
(function(){
  "use strict";
  var root = document.documentElement;
  if(!root.classList.contains('motion')) return;

  var finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  function $all(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); }

  /* ---------- Intro counter + loaded state ---------- */
  var count = document.querySelector('.intro__count');
  var t0 = performance.now();
  (function tick(now){
    var p = Math.min(1, (now - t0) / 1450);
    var e = 1 - Math.pow(1 - p, 3);
    if(count) count.textContent = String(Math.round(e * 100)).padStart(3, '0');
    if(p < 1) requestAnimationFrame(tick);
  })(t0);
  setTimeout(function(){ root.classList.add('is-loaded'); }, 1650);
  setTimeout(function(){ var i = document.querySelector('.intro'); if(i) i.remove(); }, 2800);

  /* ---------- Hero headline: split into masked lines ---------- */
  var h1 = document.querySelector('.hero h1');
  function splitH1(instant){
    if(!h1 || h1.querySelector('.h1-line')) return;
    var parts = h1.innerHTML.split(/<br\s*\/?>/i);
    h1.innerHTML = parts.map(function(html, i){
      return '<span class="h1-line' + (instant ? ' is-instant' : '') + '" style="--i:' + i + '"><span class="h1-line__in">' + html + '</span></span>';
    }).join('');
  }
  splitH1(false);
  if(h1){
    // 言語切替で innerHTML が差し替わったら、アニメーション無しで再分割
    new MutationObserver(function(){ splitH1(true); }).observe(h1, {childList:true});
  }
  $all('.hero-copy .eyebrow, .hero .lead, .hero-ctas .btn').forEach(function(el, i){ el.style.setProperty('--i', i); });

  /* ---------- Scroll reveals ---------- */
  function mark(sel, type){ $all(sel).forEach(function(el){ if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', type); }); }
  mark('.section-head .eyebrow', 'line');
  // 見出しはラッパーで包んでマスク(h2 自体は言語切替で textContent が差し替わるため触らない)
  $all('.section-head h2').forEach(function(h){
    var w = document.createElement('div'); w.className = 'rv-mask'; w.setAttribute('data-reveal', 'mask');
    h.parentNode.insertBefore(w, h); w.appendChild(h);
  });
  mark('.feature', 'feature');
  mark('.service-intro, .subblock-title, .eligibility, .payment-methods, .contact-cta, .about-body .name, .about-message p', 'up');
  // グリッドの 1px 罫線(親の背景色)が透けないよう、セル自体ではなく中身をリビール
  mark('.option-row > *, .plan-body > *, .contact-card > *, .region-tags li, .footer-brand, .footer-col', 'up');

  $all('.feature, .about-layout').forEach(function(el){
    el.setAttribute('data-media', '');
    if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'media');
    $all('.media-slot', el).forEach(function(slot){
      var w = document.createElement('span'); w.className = 'm-wipe'; slot.appendChild(w);
    });
  });

  var SCRAMBLE = '0123456789#/×—';
  function scramble(el){
    var final = el.textContent, start = performance.now(), dur = 900;
    (function step(now){
      var p = Math.min(1, (now - start) / dur), out = '';
      for(var i = 0; i < final.length; i++){
        out += (i < final.length * p || final[i] === ' ') ? final[i] : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      el.textContent = out;
      if(p < 1) requestAnimationFrame(step);
    })(start);
  }

  var io = new IntersectionObserver(function(entries){
    var batch = entries.filter(function(e){ return e.isIntersecting; })
      .sort(function(a, b){ return a.target.compareDocumentPosition(b.target) & 2 ? 1 : -1; });
    batch.forEach(function(e, i){
      var el = e.target;
      el.style.setProperty('--d', (i * 90) + 'ms');
      el.classList.add('is-in');
      io.unobserve(el);
      var num = el.querySelector && el.querySelector('.feature-num');
      if(num) setTimeout(function(){ scramble(num); }, 400 + i * 90);
    });
  }, {rootMargin:'0px 0px -10% 0px', threshold:0.12});
  $all('[data-reveal], .footer-mega').forEach(function(el){ io.observe(el); });

  /* ---------- Footer wordmark: fit to container width ---------- */
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

  /* ---------- Smart header + progress fallback ---------- */
  var header = document.querySelector('.site-header');
  var navMobile = document.getElementById('nav-mobile');
  var langList = document.getElementById('lang-listbox');
  var progress = document.querySelector('.scroll-progress');
  var needProgressJS = !(window.CSS && CSS.supports('animation-timeline: scroll()'));
  var lastY = window.scrollY, velocity = 0;

  /* ---------- Marquee (speed + direction follow scroll velocity) ---------- */
  var track = document.querySelector('.marquee__track');
  var group = track && track.querySelector('.marquee__group');
  var mx = 0, dir = 1, lastT = performance.now();
  var items = $all('.marquee__item');
  var fillIdx = 0;
  setInterval(function(){
    items.forEach(function(it){ it.classList.remove('is-fill'); });
    var n = items.length / 2;
    if(n){ items[fillIdx % n].classList.add('is-fill'); items[fillIdx % n + n].classList.add('is-fill'); fillIdx++; }
  }, 1400);

  function frame(now){
    var dt = Math.min(64, now - lastT) / 1000; lastT = now;
    var y = window.scrollY, dy = y - lastY; lastY = y;
    velocity += (dy - velocity) * 0.12;

    if(header && !navMobile.classList.contains('is-open') && langList.hidden){
      if(dy > 4 && y > 240) header.classList.add('is-hidden');
      else if(dy < -4 || y < 240) header.classList.remove('is-hidden');
    }
    if(progress && needProgressJS){
      var max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
    if(track && group){
      if(Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      var speed = 70 + Math.min(900, Math.abs(velocity) * 22);
      var w = group.offsetWidth;
      mx -= speed * dir * dt;
      if(mx <= -w) mx += w;
      if(mx > 0) mx -= w;
      track.style.transform = 'translate3d(' + mx + 'px,0,0)';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- Pointer spotlight (cards / rows) ---------- */
  $all('.plan-card, .contact-card, .option-row').forEach(function(el){
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  if(finePointer){
    /* 3D tilt on plan cards */
    $all('.plan-card').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'rotateX(' + (-py * 5) + 'deg) rotateY(' + (px * 6) + 'deg)';
      });
      el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
    });

    /* Magnetic buttons */
    $all('.btn, .nav-cta, .ticker-link').forEach(function(el){
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
      var hit = e.target.closest && e.target.closest('a, button, [role="option"], .plan-card');
      ring.classList.toggle('is-hover', !!hit);
    }, {passive:true});
    document.addEventListener('pointerleave', function(){ ring.classList.add('is-hidden'); dot.classList.add('is-hidden'); });
    (function loop(){
      rx += (tx - rx) * .18; ry += (ty - ry) * .18;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }
})();
</script>
