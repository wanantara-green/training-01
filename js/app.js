/* =====================================================================
   APP — Modul Pelatihan Zonasi Spasial (independen)
   ===================================================================== */

let currentModule = 0;
const completed = new Set();
const quizUnlocked = new Set();
const PROGRESS_STORAGE_KEY = 'training-01-modul-progress';

function loadProgress(){
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);
    if (!Array.isArray(saved)) return;

    saved.forEach(id => {
      if (Number.isInteger(id) && id >= 0 && id < MODULES.length) {
        completed.add(id);
      }
    });
  } catch (_) {
    // Abaikan data progres yang rusak atau storage yang tidak tersedia.
  }
}

function saveProgress(){
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify([...completed]));
  } catch (_) {
    // Abaikan kegagalan simpan agar alur belajar tetap berjalan.
  }
}

/* ---------- Inject content styles (prose) ---------- */
(function injectStyles(){
  const css = `
  #moduleContent{max-width:860px;}
  .module-hero{padding:0 0 1.5rem;margin-bottom:.25rem;border-bottom:1px solid #eef0ea;}
  .module-hero-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.9rem;}
  .module-kicker{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .7rem;border-radius:999px;background:var(--green-50);border:1px solid var(--green-100);font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--green-800);font-family:'Poppins';}
  .module-meta{display:inline-flex;align-items:center;gap:.45rem;font-size:.85rem;color:#6b7280;font-family:'Poppins';}
  #moduleContent h2{font-family:'Poppins';font-size:1.6rem;font-weight:700;color:var(--green-900);margin:0 0 .25rem;}
  #moduleContent .lead{color:#6b7280;font-size:1.02rem;margin:0 0 1.75rem;line-height:1.8;padding-bottom:1.25rem;border-bottom:1px solid #eef0ea;}
  .module-hero-footer{display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;}
  .module-status{display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .8rem;border-radius:999px;background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;font-size:.82rem;font-weight:600;font-family:'Poppins';}
  .module-status.is-complete{background:#f0fdf4;border-color:#bbf7d0;color:#166534;}
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
  #moduleContent blockquote{margin:1.25rem 0;padding:1rem 1.1rem;border-left:4px solid var(--green-600);background:#f8fbf8;color:#35513d;border-radius:.5rem;}
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
  /* pin gate */
  .pin-gate{text-align:center;padding:1.5rem 1rem;}
  .pin-gate .pin-hint{color:#6b7280;margin-bottom:.75rem;font-size:.92rem;}
  .pin-input{border:2px solid #e5e7eb;border-radius:.6rem;padding:.55rem .7rem;font-size:1.4rem;width:140px;text-align:center;letter-spacing:.35em;font-family:ui-monospace,monospace;font-weight:600;color:#1f2937;}
  .pin-input:focus{border-color:var(--green-600);outline:none;box-shadow:0 0 0 3px rgba(47,158,79,.15);}
  .pin-btn{display:inline-flex;align-items:center;gap:.45rem;padding:.55rem 1.3rem;border-radius:.6rem;background:var(--green-700);color:#fff;font-weight:600;font-family:'Poppins';cursor:pointer;border:none;font-size:.88rem;transition:background .2s;}
  .pin-btn:hover{background:var(--green-800);}
  .pin-error{color:#dc2626;font-size:.85rem;margin-top:.5rem;}
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
    <button onclick="openModule(${m.id})" class="mod-card reveal relative text-left bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
      <span class="modDone text-green-600 text-lg ${completed.has(m.id)?'':'invisible'} absolute top-4 right-4" data-done="${m.id}"><i class="fas fa-circle-check"></i></span>
      <span class="mod-badge inline-flex items-center self-start text-sm font-semibold tracking-wide text-green-800 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg mb-4">${m.kode}</span>
      <h4 class="font-bold text-lg text-gray-800 leading-snug">${m.judul}</h4>
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
  const quizOpen = quizUnlocked.has(m.id);
  document.getElementById('homeView').classList.remove('active');
  document.getElementById('moduleView').classList.add('active');

  // TOC
  document.getElementById('tocNav').innerHTML = m.sections.map((s,i)=>`
    <a href="#${s.id}" class="toc-link block px-3 py-2 rounded-r-md text-gray-600 hover:text-green-700" data-target="${s.id}">
      <span class="text-gray-400 mr-1.5">${i+1}.</span>${s.judul}
    </a>`).join('') + `
    <a href="#quiz" class="toc-link block px-3 py-2 rounded-r-md text-gray-600 hover:text-green-700" data-target="quiz">
      <i class="fas ${quizOpen?'fa-circle-question':'fa-lock'} mr-1.5 text-gray-400"></i>Kuis
    </a>`;

  // Content
  const moduleCompleted = completed.has(m.id);
  let html = `
    <div class="module-hero">
      <div class="module-hero-top">
        <span class="module-kicker">${m.kode}</span>
        <span class="module-meta"><i class="far fa-clock"></i> ${m.durasi}</span>
      </div>
      <h2>${m.judul}</h2>
      <p class="lead">${m.ringkas}</p>
      <div class="module-hero-footer">
        <span class="module-status ${moduleCompleted ? 'is-complete' : ''}">
          <i class="fas ${moduleCompleted ? 'fa-circle-check' : 'fa-hourglass-half'}"></i>
          ${moduleCompleted ? 'Modul sudah diselesaikan' : 'Modul belum diselesaikan'}
        </span>
      </div>
    </div>`;
  m.sections.forEach((s,i)=>{
    html += `<section id="${s.id}"><h3><span class="sx">${i+1}</span>${s.judul}</h3>${s.html}</section>`;
  });
  // quiz section
  html += `<section id="quiz"><h3><span class="sx"><i class="fas ${quizOpen?'fa-pen':'fa-lock'}"></i></span>Kuis Pemahaman</h3>
    <div id="quizHost">
      ${quizOpen ? '' : `<div id="pinGate" class="quiz-wrap pin-gate">
        <div class="pin-hint"><i class="fas fa-lock text-gray-400 mr-1.5"></i>Masukkan PIN untuk membuka kuis</div>
        <input type="text" id="pinInput" class="pin-input" maxlength="4" inputmode="numeric" pattern="[0-9]*" placeholder="••••" onkeydown="if(event.key==='Enter')unlockQuiz(${m.id})">
        <br><button class="pin-btn mt-3" onclick="unlockQuiz(${m.id})"><i class="fas fa-key"></i> Buka Kuis</button>
        <div id="pinError" class="pin-error hidden">PIN tidak tepat. Silakan coba lagi.</div>
      </div>`}
    </div></section>`;
  document.getElementById('moduleContent').innerHTML = html;

  // dynamic widgets
  if(document.getElementById('indikatorAccordion')) buildIndikatorAccordion();
  if(document.getElementById('kelasLegend')) buildKelasLegend();
  if(quizOpen) buildQuiz(m);

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
function unlockQuiz(mid){
  const m = MODULES[mid];
  const input = document.getElementById('pinInput');
  const entered = (input.value||'').trim();
  if(entered === m.pin){
    quizUnlocked.add(mid);
    const gate = document.getElementById('pinGate');
    if(gate) gate.style.display = 'none';
    buildQuiz(m);
  } else {
    const err = document.getElementById('pinError');
    err.classList.remove('hidden');
    input.value = '';
    input.focus();
  }
}

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
function renderProgress(){
  const totalModules = MODULES.length;
  const completedCount = completed.size;
  const percent = totalModules ? Math.round((completedCount / totalModules) * 100) : 0;

  const badge = document.getElementById('progressBadge');
  const progressText = document.getElementById('progressText');
  const summaryText = document.getElementById('progressSummaryText');
  const summaryPercent = document.getElementById('progressSummaryPercent');
  const summaryBar = document.getElementById('progressSummaryBar');

  if (badge) {
    if (completedCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (progressText) {
    progressText.textContent = `${completedCount} / ${totalModules} modul`;
  }

  if (summaryText) {
    summaryText.textContent = `${completedCount} dari ${totalModules} modul selesai`;
  }

  if (summaryPercent) {
    summaryPercent.textContent = `${percent}%`;
  }

  if (summaryBar) {
    summaryBar.style.width = `${percent}%`;
  }
}

function markComplete(id){
  completed.add(id);
  document.querySelectorAll(`.modDone[data-done="${id}"]`).forEach(e=>e.classList.remove('invisible'));
  saveProgress();
  renderProgress();
}

function showProgressNotice(message, tone = 'success'){
  const notice = document.getElementById('progressNotice');
  if (!notice) return;

  notice.textContent = message;
  notice.classList.remove('hidden', 'text-green-700', 'text-red-600', 'text-gray-600');
  notice.classList.add(tone === 'danger' ? 'text-red-600' : 'text-green-700');

  clearTimeout(showProgressNotice._timer);
  showProgressNotice._timer = setTimeout(() => {
    notice.classList.add('hidden');
    notice.textContent = '';
  }, 2200);
}

function resetProgress(){
  showResetModal();
}

function showResetModal(){
  const existing = document.getElementById('resetModal');
  if(existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'resetModal';
  overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/40';
  overlay.onclick = (e) => { if(e.target === overlay) closeResetModal(); };
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
      <h3 class="text-lg font-bold text-gray-900 mb-2">Reset Progres</h3>
      <p class="text-sm text-gray-600 mb-4">Reset semua progres belajar dan mulai lagi dari awal?</p>
      <label class="block text-xs font-semibold text-gray-500 mb-1">Masukkan PIN</label>
      <input type="text" id="resetPinInput" class="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-mono tracking-[.3em] focus:border-green-600 focus:outline-none" maxlength="4" inputmode="numeric" placeholder="••••" onkeydown="if(event.key==='Enter')confirmReset()">
      <p id="resetPinError" class="text-red-500 text-xs mt-2 hidden">PIN salah.</p>
      <div class="flex gap-3 mt-4">
        <button onclick="closeResetModal()" class="flex-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50">Batal</button>
        <button onclick="confirmReset()" class="flex-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2">Reset</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  setTimeout(()=>document.getElementById('resetPinInput')?.focus(), 100);
}

function closeResetModal(){
  document.getElementById('resetModal')?.remove();
}

function confirmReset(){
  const input = document.getElementById('resetPinInput');
  const entered = (input?.value || '').trim();
  if(entered !== '1234'){
    const err = document.getElementById('resetPinError');
    if(err) err.classList.remove('hidden');
    if(input){ input.value = ''; input.focus(); }
    return;
  }

  completed.clear();
  document.querySelectorAll('.modDone').forEach(e=>e.classList.add('invisible'));
  try { window.localStorage.removeItem(PROGRESS_STORAGE_KEY); } catch (_) {}

  closeResetModal();
  renderProgress();
  showProgressNotice('Progres berhasil direset. Anda dapat memulai pelatihan dari awal.');
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

document.getElementById('resetProgressBtn')?.addEventListener('click', resetProgress);

function openModuleFromQuery(){
  const params = new URLSearchParams(window.location.search);
  const rawOpen = params.get('open');
  if(rawOpen === null) return;

  const moduleId = Number(rawOpen);
  if(!Number.isInteger(moduleId) || moduleId < 0 || moduleId >= MODULES.length) return;

  openModule(moduleId);
}

/* ---------- Init ---------- */
buildHeroLayers();
loadProgress();
buildModuleGrid();
observeReveals();
renderProgress();
openModuleFromQuery();
