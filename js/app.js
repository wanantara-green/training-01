/* =====================================================================
   APP — Modul Pelatihan Zonasi Spasial (independen)
   ===================================================================== */

let currentModule = 0;
const completed = new Set();

/* ---------- Inject content styles (prose) ---------- */
(function injectStyles(){
  const css = `
  #moduleContent h2{font-family:'Poppins';font-size:1.6rem;font-weight:700;color:var(--green-900);margin:0 0 .25rem;}
  #moduleContent .lead{color:#6b7280;font-size:1.02rem;margin-bottom:1.5rem;}
  #moduleContent section{scroll-margin-top:96px;padding:1.75rem 0;border-top:1px solid #eef0ea;}
  #moduleContent section:first-of-type{border-top:none;padding-top:.5rem;}
  #moduleContent h3{font-family:'Poppins';font-size:1.15rem;font-weight:600;color:var(--green-800);margin:0 0 .85rem;display:flex;gap:.6rem;align-items:baseline;}
  #moduleContent h3 .sx{font-size:.75rem;font-weight:600;color:#fff;background:var(--green-600);width:1.55rem;height:1.55rem;border-radius:.45rem;display:inline-flex;align-items:center;justify-content:center;flex:none;font-family:'Poppins';}
  #moduleContent p{line-height:1.8;color:#374151;margin:0 0 1rem;}
  #moduleContent ul,#moduleContent ol{margin:0 0 1rem 1.25rem;line-height:1.8;color:#374151;}
  #moduleContent li{margin-bottom:.4rem;}
  #moduleContent code{font-family:ui-monospace,monospace;background:#eef2eb;color:#15803d;padding:.1rem .4rem;border-radius:.3rem;font-size:.85em;}
  #moduleContent table{width:100%;border-collapse:collapse;margin:0 0 1.25rem;font-family:'Poppins';font-size:.88rem;}
  #moduleContent th{background:var(--green-50);color:var(--green-800);text-align:left;padding:.6rem .75rem;border-bottom:2px solid var(--green-100);font-weight:600;}
  #moduleContent td{padding:.55rem .75rem;border-bottom:1px solid #eef0ea;color:#374151;}
  #moduleContent tr:hover td{background:#fafdf9;}
  .callout{display:flex;gap:.7rem;background:var(--green-50);border:1px solid var(--green-100);border-left:4px solid var(--green-600);border-radius:.6rem;padding:.9rem 1rem;margin:1.25rem 0;color:#1f4d2c;font-size:.92rem;line-height:1.6;}
  .callout i{color:var(--green-700);margin-top:.15rem;}
  .formula{font-family:ui-monospace,monospace;background:#14361f;color:#dcfce7;padding:1rem 1.25rem;border-radius:.6rem;text-align:center;font-size:1.05rem;margin:1rem 0;}
  /* indikator accordion */
  .indik-acc{display:flex;flex-direction:column;gap:.6rem;margin:1rem 0;}
  .indik-head{width:100%;display:flex;align-items:center;gap:.85rem;padding:.85rem 1rem;background:#fff;border:1px solid #e5e7eb;border-radius:.7rem;cursor:pointer;transition:all .2s;text-align:left;}
  .indik-head:hover{border-color:var(--green-600);box-shadow:0 6px 18px -10px rgba(20,54,31,.4);}
  .indik-ico{width:2.4rem;height:2.4rem;border-radius:.55rem;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;}
  .indik-title{flex:1;}
  .indik-title .k{font-size:.72rem;color:#9ca3af;font-weight:600;}
  .indik-title .n{font-weight:600;color:#1f2937;font-family:'Poppins';}
  .indik-w{font-size:.78rem;color:var(--green-800);background:var(--green-50);border:1px solid var(--green-100);padding:.2rem .6rem;border-radius:1rem;font-weight:600;}
  .indik-body{display:none;padding:.4rem .4rem .4rem 3.7rem;}
  .indik-body.open{display:block;animation:fade .3s ease;}
  .indik-row{display:flex;align-items:center;justify-content:space-between;padding:.5rem .7rem;border-radius:.45rem;}
  .indik-row:hover{background:#f0fdf4;}
  .indik-row .lbl{font-size:.88rem;color:#374151;}
  .indik-row .lbl b{color:#15803d;font-weight:600;margin-right:.4rem;}
  .indik-row .bw{font-size:.78rem;color:#6b7280;font-family:ui-monospace,monospace;}
  /* kelas legend */
  .kelas-grid{display:flex;flex-direction:column;gap:.5rem;margin:1rem 0;}
  .kelas-item{display:flex;align-items:center;gap:.85rem;padding:.7rem .9rem;border:1px solid #e5e7eb;border-radius:.6rem;}
  .kelas-sw{width:2.4rem;height:2.4rem;border-radius:.5rem;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:'Poppins';}
  .kelas-item .kt{font-weight:600;color:#1f2937;font-family:'Poppins';font-size:.92rem;}
  .kelas-item .kd{font-size:.83rem;color:#6b7280;line-height:1.4;}
  /* quiz */
  .quiz-wrap{background:#fff;border:1px solid #e5e7eb;border-radius:.9rem;padding:1.5rem;margin-top:1rem;}
  .quiz-q{font-weight:600;color:#1f2937;font-family:'Poppins';margin-bottom:.9rem;display:flex;gap:.6rem;}
  .quiz-q .qn{color:var(--green-600);font-weight:700;}
  .quiz-opt{border:1px solid #e5e7eb;border-radius:.6rem;padding:.7rem .9rem;margin-bottom:.55rem;display:flex;align-items:center;gap:.7rem;font-size:.92rem;color:#374151;font-family:'Poppins';}
  .quiz-opt .mk{width:1.4rem;height:1.4rem;border-radius:50%;border:2px solid #cbd5e1;flex:none;display:flex;align-items:center;justify-content:center;font-size:.7rem;}
  .quiz-opt.correct .mk{border-color:#16a34a;background:#16a34a;color:#fff;}
  .quiz-opt.wrong .mk{border-color:#dc2626;background:#dc2626;color:#fff;}
  .quiz-feedback{font-size:.88rem;margin-top:.5rem;font-weight:500;}
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

/* ---------- Hero layers animation ---------- */
function buildHeroLayers(){
  const host = document.getElementById('heroLayers'); if(!host) return;
  host.innerHTML = INDIKATOR.map((g,i)=>`
    <div class="flex items-center gap-3" style="opacity:0;transform:translateX(-12px);animation:fade .5s ease forwards;animation-delay:${i*0.08}s">
      <span class="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm" style="background:${g.warna}"><i class="fas ${g.ikon}"></i></span>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700 truncate">${g.kode} · ${g.nama}</span>
          <span class="text-[11px] text-gray-400 font-mono">${g.w}</span>
        </div>
        <div class="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
          <div class="h-full rounded-full" style="width:${Math.min(100,parseFloat(g.w)*340)}%;background:${g.warna}"></div>
        </div>
      </div>
    </div>`).join('');
}

/* ---------- Module grid ---------- */
function buildModuleGrid(){
  const grid = document.getElementById('moduleGrid');
  grid.innerHTML = MODULES.map((m,i)=>`
    <button onclick="openModule(${m.id})" class="mod-card reveal text-left bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
      <div class="flex items-start justify-between mb-4">
        <span class="mod-num w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-lg transition" style="color:var(--green-700)">
          <i class="fas ${m.ikon}"></i>
        </span>
        <span class="modDone text-green-600 text-lg ${completed.has(m.id)?'':'invisible'}" data-done="${m.id}"><i class="fas fa-circle-check"></i></span>
      </div>
      <span class="text-[11px] font-semibold uppercase tracking-wide text-green-700">${m.kode}</span>
      <h4 class="font-bold text-lg text-gray-800 mt-1 leading-snug">${m.judul}</h4>
      <p class="prose-body text-sm text-gray-500 mt-2 flex-1 leading-relaxed">${m.ringkas}</p>
      <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <span class="text-xs text-gray-400 flex items-center gap-1.5"><i class="far fa-clock"></i> ${m.durasi}</span>
        <span class="mod-arrow text-green-700 opacity-60 transition flex items-center gap-1.5 text-sm font-medium" style="color:var(--green-700)">Buka <i class="fas fa-arrow-right text-xs"></i></span>
      </div>
    </button>`).join('');
  observeReveals();
}

/* ---------- Open module detail ---------- */
function openModule(id){
  currentModule = id;
  const m = MODULES[id];
  document.getElementById('homeView').classList.remove('active');
  document.getElementById('moduleView').classList.add('active');

  // TOC
  document.getElementById('tocNav').innerHTML = m.sections.map((s,i)=>`
    <a href="#${s.id}" class="toc-link block px-3 py-2 rounded-r-md text-gray-600 hover:text-green-700" data-target="${s.id}">
      <span class="text-gray-400 mr-1.5">${i+1}.</span>${s.judul}
    </a>`).join('') + `
    <a href="#quiz" class="toc-link block px-3 py-2 rounded-r-md text-gray-600 hover:text-green-700" data-target="quiz">
      <i class="fas fa-circle-question mr-1.5 text-gray-400"></i>Kuis
    </a>`;

  // Content
  let html = `<h2>${m.judul}</h2><p class="lead">${m.ringkas}</p>`;
  m.sections.forEach((s,i)=>{
    html += `<section id="${s.id}"><h3><span class="sx">${i+1}</span>${s.judul}</h3>${s.html}</section>`;
  });
  // quiz section
  html += `<section id="quiz"><h3><span class="sx"><i class="fas fa-pen"></i></span>Kuis Pemahaman</h3>
    <div id="quizHost"></div></section>`;
  document.getElementById('moduleContent').innerHTML = html;

  // dynamic widgets
  if(document.getElementById('indikatorAccordion')) buildIndikatorAccordion();
  if(document.getElementById('kelasLegend')) buildKelasLegend();
  buildQuiz(m);

  // nav buttons
  document.getElementById('prevBtn').style.visibility = id===0 ? 'hidden':'visible';
  document.getElementById('nextBtn').style.visibility = id===MODULES.length-1 ? 'hidden':'visible';

  setupScrollSpy();
  window.scrollTo({top:0,behavior:'smooth'});
}

function navModule(dir){
  const next = currentModule + dir;
  if(next>=0 && next<MODULES.length) openModule(next);
}

function goHome(){
  document.getElementById('moduleView').classList.remove('active');
  document.getElementById('homeView').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function scrollToModul(){
  goHome();
  setTimeout(()=>document.getElementById('daftar-modul').scrollIntoView({behavior:'smooth'}),100);
}

/* ---------- Indikator accordion (Modul 3) ---------- */
function buildIndikatorAccordion(){
  const host = document.getElementById('indikatorAccordion');
  host.innerHTML = INDIKATOR.map((g,gi)=>`
    <div>
      <button class="indik-head" onclick="toggleIndik(${gi})">
        <span class="indik-ico" style="background:${g.warna}"><i class="fas ${g.ikon}"></i></span>
        <span class="indik-title"><span class="k">${g.kode}</span><br><span class="n">${g.nama}</span></span>
        <span class="indik-w">W ${g.w}</span>
        <i class="fas fa-chevron-down text-gray-400 transition" id="chev-${gi}"></i>
      </button>
      <div class="indik-body" id="ibody-${gi}">
        ${g.items.map(it=>`<div class="indik-row"><span class="lbl"><b>${it[0]}</b>${it[1]}</span><span class="bw">${it[2]}</span></div>`).join('')}
      </div>
    </div>`).join('');
}
function toggleIndik(i){
  const b = document.getElementById('ibody-'+i);
  const c = document.getElementById('chev-'+i);
  const open = b.classList.toggle('open');
  c.style.transform = open ? 'rotate(180deg)' : '';
}

/* ---------- Kelas legend (Modul 4) ---------- */
function buildKelasLegend(){
  const host = document.getElementById('kelasLegend');
  host.innerHTML = KELAS5.map(k=>`
    <div class="kelas-item">
      <span class="kelas-sw" style="background:${k[2]}">${k[0]}</span>
      <div><div class="kt">Kelas ${k[0]} — ${k[1]}</div><div class="kd">${k[3]}</div></div>
    </div>`).join('');
}

/* ---------- Quiz ---------- */
function buildQuiz(m){
  const host = document.getElementById('quizHost');
  host.innerHTML = `<div class="quiz-wrap"><div id="quizItems"></div>
    <div id="quizResult" class="hidden mt-4 p-4 rounded-lg text-center"></div></div>`;
  const items = document.getElementById('quizItems');
  const state = m.quiz.map(()=>null);

  items.innerHTML = m.quiz.map((q,qi)=>`
    <div class="mb-5" data-q="${qi}">
      <div class="quiz-q"><span class="qn">${qi+1}.</span><span>${q.q}</span></div>
      ${q.opts.map((o,oi)=>`
        <div class="quiz-opt" onclick="answerQuiz(${m.id},${qi},${oi})" data-q="${qi}" data-o="${oi}">
          <span class="mk">${String.fromCharCode(65+oi)}</span><span>${o}</span>
        </div>`).join('')}
      <div class="quiz-feedback hidden" data-fb="${qi}"></div>
    </div>`).join('');

  window._quizState = window._quizState || {};
  window._quizState[m.id] = state;
}

function answerQuiz(mid, qi, oi){
  const m = MODULES[mid];
  const correct = m.quiz[qi].a;
  const state = window._quizState[mid];
  if(state[qi]!==null) return; // already answered
  state[qi] = oi;

  const opts = document.querySelectorAll(`.quiz-opt[data-q="${qi}"]`);
  opts.forEach(o=>{
    const thisO = parseInt(o.dataset.o);
    o.classList.add('disabled');
    if(thisO===correct){ o.classList.add('correct'); o.querySelector('.mk').innerHTML='<i class="fas fa-check"></i>'; }
    if(thisO===oi && oi!==correct){ o.classList.add('wrong'); o.querySelector('.mk').innerHTML='<i class="fas fa-xmark"></i>'; }
  });
  const fb = document.querySelector(`.quiz-feedback[data-fb="${qi}"]`);
  fb.classList.remove('hidden');
  if(oi===correct){ fb.style.color='#16a34a'; fb.innerHTML='<i class="fas fa-check-circle"></i> Benar.'; }
  else { fb.style.color='#dc2626'; fb.innerHTML='<i class="fas fa-circle-info"></i> Belum tepat — perhatikan jawaban yang ditandai hijau.'; }

  // check completion
  if(state.every(v=>v!==null)){
    const score = state.filter((v,i)=>v===m.quiz[i].a).length;
    const res = document.getElementById('quizResult');
    res.classList.remove('hidden');
    res.style.background = '#f0fdf4'; res.style.border='1px solid #dcfce7';
    res.innerHTML = `<div class="text-green-800 font-semibold" style="font-family:Poppins">
      <i class="fas fa-award"></i> Skor: ${score}/${m.quiz.length}</div>
      <div class="text-sm text-gray-600 mt-1">Modul ditandai selesai. Lanjut ke modul berikutnya untuk meneruskan pembelajaran.</div>`;
    markComplete(mid);
  }
}

/* ---------- Progress ---------- */
function markComplete(id){
  completed.add(id);
  document.querySelectorAll(`.modDone[data-done="${id}"]`).forEach(e=>e.classList.remove('invisible'));
  const badge = document.getElementById('progressBadge');
  badge.classList.remove('hidden');
  document.getElementById('progressText').textContent = `${completed.size} / ${MODULES.length} modul`;
}

/* ---------- Scroll spy ---------- */
function setupScrollSpy(){
  const links = document.querySelectorAll('.toc-link');
  const sections = [...document.querySelectorAll('#moduleContent section')];
  const onScroll = ()=>{
    let active = sections[0]?.id;
    const y = window.scrollY + 120;
    sections.forEach(s=>{ if(s.offsetTop<=y) active=s.id; });
    links.forEach(l=>l.classList.toggle('active', l.dataset.target===active));
  };
  window.removeEventListener('scroll', window._spy||(()=>{}));
  window._spy = onScroll;
  window.addEventListener('scroll', onScroll);
  // smooth scroll
  links.forEach(l=>l.addEventListener('click',e=>{
    e.preventDefault();
    const t = document.getElementById(l.dataset.target);
    if(t) window.scrollTo({top:t.offsetTop-90,behavior:'smooth'});
  }));
  onScroll();
}

/* ---------- Reveal on scroll ---------- */
function observeReveals(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>io.observe(el));
}

/* ---------- Mobile menu ---------- */
document.getElementById('mobileBtn').addEventListener('click',()=>{
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

/* ---------- Init ---------- */
buildHeroLayers();
buildModuleGrid();
observeReveals();
