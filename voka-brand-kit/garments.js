/* ===== VÖKA garment review board ===== */
(function(){
const PAL = {
  offwhite:{name:'Off-white', hex:'#f5f0eb', dark:false},
  sand:    {name:'Areia',     hex:'#c4b5a2', dark:false},
  charcoal:{name:'Charcoal',  hex:'#2d2926', dark:true},
  black:   {name:'Preto',     hex:'#0a0a0a', dark:true},
};
const ORDER = ['offwhite','sand','charcoal','black'];

/* ---- color math ---- */
function hx(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function toHex(r,g,b){const c=v=>('0'+Math.max(0,Math.min(255,Math.round(v))).toString(16)).slice(-2);return '#'+c(r)+c(g)+c(b);}
function shade(hex,amt){const [r,g,b]=hx(hex);return toHex(r+amt,g+amt,b+amt);}
function mix(hex,t,amt){return shade(hex, amt);} // alias

/* derive fabric tones from base */
function tones(key){
  const base = PAL[key].hex;
  const dark = PAL[key].dark;
  return {
    base,
    hi:  shade(base, dark? 22: 12),
    lo:  shade(base, dark? -14: -20),
    lo2: shade(base, dark? -24: -34),
    seam:shade(base, dark? -30: -42),
    rib: shade(base, dark? -8: -10),
  };
}
/* mark color given treatment */
function markColor(key, treat){
  const dark = PAL[key].dark;
  if(treat==='contrast') return dark? '#f5f0eb' : '#2d2926';
  // tonal: subtle, slightly darker on light, slightly lighter on dark
  return shade(PAL[key].hex, dark? 30 : -34);
}

/* O Par mark, scaled+placed. cx,cy center; s scale (radius of dot). */
function mark(cx,cy,s,col,rot){
  const r=s, sw=s*0.36, gap=s*2.4;
  const t = rot? ` transform="rotate(${rot} ${cx} ${cy})"`:'';
  return `<g${t}><circle cx="${cx-gap/2}" cy="${cy}" r="${r}" fill="${col}"/><circle cx="${cx+gap/2}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}"/></g>`;
}

/* chest lockup: symbol, optionally with VÖKA wordmark beneath. */
function lockup(cx,cy,s,col){
  if(!window.__vkName){ return mark(cx,cy,s,col,0); }
  const sym = mark(cx, cy-s*0.7, s*0.85, col, 0);
  const fs = s*1.5;
  const txt = `<text x="${cx}" y="${cy+s*1.7}" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="300" font-size="${fs}" letter-spacing="${fs*0.22}" fill="${col}" style="dominant-baseline:middle">VÖKA</text>`;
  return sym+txt;
}

/* shared svg helpers */
function defs(id,t){
  return `<defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.hi}"/><stop offset="0.5" stop-color="${t.base}"/><stop offset="1" stop-color="${t.lo}"/>
    </linearGradient>
    <radialGradient id="r-${id}" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0" stop-color="${t.hi}"/><stop offset="0.7" stop-color="${t.base}"/><stop offset="1" stop-color="${t.lo2}"/>
    </radialGradient>
    <filter id="sh-${id}" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#000" flood-opacity="0.16"/>
    </filter>
  </defs>`;
}
const FILL=id=>`fill="url(#r-${id})"`;
const stroke=t=>`stroke="${t.seam}"`;

/* ============ GARMENTS ============ */
/* each: (id,t,col,treat,view) -> inner svg (viewBox 0 0 300 320) */

function sweatshirt(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.4" stroke-linecap="round" opacity="0.55"`;
  const fold=`fill="none" stroke="${t.lo2}" stroke-width="1.2" stroke-linecap="round" opacity="0.4"`;
  const ribC=t.rib;
  // body path (oversized crewneck)
  const body=`M108,70 L84,72 L44,92 L30,176 Q29,184 37,186 L66,192 L80,120 L78,250 Q78,258 86,258 L214,258 Q222,258 222,250 L220,120 L234,192 L263,186 Q271,184 270,176 L256,92 L216,72 L192,70 Q150,90 108,70 Z`;
  const neck = view==='front'
    ? `<path d="M110,70 Q150,96 190,70" fill="${ribC}" stroke="${t.seam}" stroke-width="1" /><path d="M114,70 Q150,90 186,70 Q150,104 114,70 Z" fill="url(#g-${id})" opacity="0.9"/>`
    : `<path d="M110,70 Q150,84 190,70 L186,78 Q150,90 114,78 Z" fill="${ribC}" stroke="${t.seam}" stroke-width="1"/>`;
  // ribbing cuffs + hem
  const cuffs=`<rect x="30" y="176" width="40" height="14" rx="6" fill="${ribC}"/><rect x="230" y="176" width="40" height="14" rx="6" fill="${ribC}"/>
    <g stroke="${t.lo2}" stroke-width="0.8" opacity="0.5">${[34,40,46,52,58,64].map(x=>`<line x1="${x}" y1="178" x2="${x}" y2="188"/>`).join('')}${[236,242,248,254,260,266].map(x=>`<line x1="${x}" y1="178" x2="${x}" y2="188"/>`).join('')}</g>`;
  const hem=`<rect x="80" y="246" width="142" height="14" rx="4" fill="${ribC}"/><g stroke="${t.lo2}" stroke-width="0.8" opacity="0.45">${Array.from({length:20},(_,i)=>`<line x1="${86+i*7}" y1="248" x2="${86+i*7}" y2="258"/>`).join('')}</g>`;
  const folds=view==='front'
    ? `<path d="M150,110 Q146,180 150,244" ${fold}/><path d="M110,120 Q108,180 116,240" ${fold}/><path d="M190,120 Q192,180 184,240" ${fold}/><path d="M70,120 Q60,150 66,184" ${seam}/><path d="M230,120 Q240,150 234,184" ${seam}/>`
    : `<path d="M150,90 Q150,170 150,244" ${seam}/><path d="M118,120 Q116,180 122,240" ${fold}/><path d="M182,120 Q184,180 178,240" ${fold}/>`;
  // mark: left chest front (viewer right is wearer left -> place at x~118), back none (neck label)
  const mk = view==='front' ? lockup(116,126,5.4,mc) : '';
  const backLabel = view==='back' ? `<rect x="134" y="80" width="32" height="11" rx="2" fill="${PAL[col].dark?t.hi:t.lo}" opacity="0.6"/>${mark(150,86,2.2,mc,0)}` : '';
  return `${defs(id,t)}<g filter="url(#sh-${id})"><path d="${body}" ${FILL(id)} stroke="${t.seam}" stroke-width="1.2"/></g>${cuffs}${hem}${neck}${folds}${mk}${backLabel}`;
}

function tee(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.3" stroke-linecap="round" opacity="0.5"`;
  const fold=`fill="none" stroke="${t.lo2}" stroke-width="1.1" stroke-linecap="round" opacity="0.38"`;
  const ribC=t.rib;
  const body=`M112,66 L88,68 L52,86 L60,128 L84,120 L80,250 Q80,258 88,258 L212,258 Q220,258 220,250 L216,120 L240,128 L248,86 L212,68 L188,66 Q150,86 112,66 Z`;
  const neck=view==='front'
    ? `<path d="M112,66 Q150,90 188,66" fill="none" stroke="${ribC}" stroke-width="6" stroke-linecap="round"/><path d="M116,66 Q150,86 184,66 Q150,100 116,66 Z" fill="url(#g-${id})" opacity="0.85"/>`
    : `<path d="M112,66 Q150,78 188,66" fill="none" stroke="${ribC}" stroke-width="6" stroke-linecap="round"/>`;
  const sleeves=`<path d="M60,124 L84,118" ${seam}/><path d="M240,124 L216,118" ${seam}/>`;
  const hem=`<path d="M82,252 L218,252" ${seam}/>`;
  const folds=view==='front'
    ? `<path d="M150,104 Q147,180 150,248" ${fold}/><path d="M112,118 Q110,180 117,244" ${fold}/><path d="M188,118 Q190,180 183,244" ${fold}/>`
    : `<path d="M150,80 Q150,170 150,248" ${seam}/><path d="M118,118 Q116,180 122,244" ${fold}/><path d="M182,118 Q184,180 178,244" ${fold}/>`;
  const mk=view==='front'?lockup(120,118,4.4,mc):'';
  const backLabel=view==='back'?`<rect x="136" y="76" width="28" height="10" rx="2" fill="${PAL[col].dark?t.hi:t.lo}" opacity="0.55"/>${mark(150,81,2,mc,0)}`:'';
  return `${defs(id,t)}<g filter="url(#sh-${id})"><path d="${body}" ${FILL(id)} stroke="${t.seam}" stroke-width="1.2"/></g>${sleeves}${hem}${neck}${folds}${mk}${backLabel}`;
}

function longsleeve(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.3" stroke-linecap="round" opacity="0.5"`;
  const fold=`fill="none" stroke="${t.lo2}" stroke-width="1.1" stroke-linecap="round" opacity="0.38"`;
  const ribC=t.rib;
  const body=`M112,66 L88,68 L48,86 L34,176 Q33,183 41,185 L66,190 L82,118 L80,250 Q80,258 88,258 L212,258 Q220,258 220,250 L218,118 L234,190 L259,185 Q267,183 266,176 L252,86 L212,68 L188,66 Q150,86 112,66 Z`;
  const neck=view==='front'
    ? `<path d="M112,66 Q150,90 188,66" fill="none" stroke="${ribC}" stroke-width="6" stroke-linecap="round"/><path d="M116,66 Q150,86 184,66 Q150,100 116,66 Z" fill="url(#g-${id})" opacity="0.85"/>`
    : `<path d="M112,66 Q150,78 188,66" fill="none" stroke="${ribC}" stroke-width="6" stroke-linecap="round"/>`;
  const cuffs=`<rect x="34" y="176" width="34" height="12" rx="5" fill="${ribC}"/><rect x="232" y="176" width="34" height="12" rx="5" fill="${ribC}"/>
    <g stroke="${t.lo2}" stroke-width="0.7" opacity="0.5">${[38,44,50,56,62].map(x=>`<line x1="${x}" y1="178" x2="${x}" y2="186"/>`).join('')}${[236,242,248,254,260].map(x=>`<line x1="${x}" y1="178" x2="${x}" y2="186"/>`).join('')}</g>`;
  const hem=`<path d="M82,252 L218,252" ${seam}/>`;
  const folds=view==='front'
    ? `<path d="M150,104 Q147,180 150,248" ${fold}/><path d="M66,120 Q58,150 64,182" ${seam}/><path d="M234,120 Q242,150 236,182" ${seam}/>`
    : `<path d="M150,80 Q150,170 150,248" ${seam}/>`;
  // mark on left cuff (viewer right cuff = x~249) front; tonal small
  const mk=mark(249,182,3.4,mc,0);
  const backLabel=view==='back'?`<rect x="136" y="76" width="28" height="10" rx="2" fill="${PAL[col].dark?t.hi:t.lo}" opacity="0.55"/>${mark(150,81,2,mc,0)}`:'';
  return `${defs(id,t)}<g filter="url(#sh-${id})"><path d="${body}" ${FILL(id)} stroke="${t.seam}" stroke-width="1.2"/></g>${cuffs}${hem}${neck}${folds}${mk}${backLabel}`;
}

function pants(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.3" stroke-linecap="round" opacity="0.5"`;
  const fold=`fill="none" stroke="${t.lo2}" stroke-width="1.1" stroke-linecap="round" opacity="0.36"`;
  const wb=t.rib;
  const body=`M96,52 L204,52 L206,150 L196,286 Q196,292 189,292 L168,292 Q162,292 161,286 L150,176 L139,286 Q138,292 132,292 L111,292 Q104,292 104,286 L94,150 Z`;
  const waist=`<rect x="94" y="48" width="112" height="16" rx="3" fill="${wb}" stroke="${t.seam}" stroke-width="1"/>`;
  const pockets=view==='front'
    ? `<path d="M104,72 L120,62" ${seam}/><path d="M196,72 L180,62" ${seam}/><rect x="120" y="150" width="30" height="44" rx="3" ${seam} fill="none"/><path d="M120,150 L135,142 L150,150" ${seam}/>`
    : `<rect x="112" y="74" width="30" height="26" rx="2" ${seam} fill="none"/><rect x="158" y="74" width="30" height="26" rx="2" ${seam} fill="none"/>`;
  const center=view==='front'?`<path d="M150,64 L150,168" ${seam}/>`:`<path d="M150,52 L150,170" ${seam}/>`;
  const folds=`<path d="M120,170 Q116,230 122,286" ${fold}/><path d="M180,170 Q184,230 178,286" ${fold}/>`;
  const drawcord=view==='front'?`<path d="M138,58 Q150,70 162,58" fill="none" stroke="${t.lo2}" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`:'';
  // mark: front right thigh (viewer left x~120) ; back waistband label
  const mk=view==='front'?mark(122,108,4,mc,0):`<rect x="158" y="50" width="30" height="11" rx="2" fill="${PAL[col].dark?t.hi:t.lo}" opacity="0.6"/>${mark(173,56,2.2,mc,0)}`;
  return `${defs(id,t)}<g filter="url(#sh-${id})"><path d="${body}" ${FILL(id)} stroke="${t.seam}" stroke-width="1.2"/></g>${waist}${pockets}${center}${folds}${drawcord}${mk}`;
}

function shorts(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.3" stroke-linecap="round" opacity="0.5"`;
  const fold=`fill="none" stroke="${t.lo2}" stroke-width="1.1" stroke-linecap="round" opacity="0.36"`;
  const wb=t.rib;
  const body=`M92,86 L208,86 L210,150 L200,212 Q200,218 193,218 L165,218 Q159,218 158,212 L150,176 L142,212 Q141,218 135,218 L107,218 Q100,218 100,212 L90,150 Z`;
  const waist=`<rect x="90" y="80" width="120" height="18" rx="4" fill="${wb}" stroke="${t.seam}" stroke-width="1"/>`;
  const cord=view==='front'?`<path d="M136,90 Q150,104 164,90" fill="none" stroke="${t.lo2}" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>`:'';
  const center=`<path d="M150,98 L150,170" ${seam}/>`;
  const pocket=view==='front'?`<path d="M100,104 L100,128 L120,128" ${seam}/><path d="M200,104 L200,128 L180,128" ${seam}/>`:`<rect x="158" y="104" width="28" height="24" rx="2" ${seam} fill="none"/>`;
  const folds=`<path d="M122,170 Q118,196 124,212" ${fold}/><path d="M178,170 Q182,196 176,212" ${fold}/>`;
  // mark front left hem (viewer right x~178)
  const mk=view==='front'?mark(176,196,3.6,mc,0):`<rect x="158" y="82" width="28" height="11" rx="2" fill="${PAL[col].dark?t.hi:t.lo}" opacity="0.6"/>${mark(172,88,2.1,mc,0)}`;
  return `${defs(id,t)}<g filter="url(#sh-${id})"><path d="${body}" ${FILL(id)} stroke="${t.seam}" stroke-width="1.2"/></g>${waist}${cord}${center}${pocket}${folds}${mk}`;
}

function socks(id,t,col,treat,view){
  const mc=markColor(col,treat);
  const seam=`fill="none" stroke="${t.seam}" stroke-width="1.2" stroke-linecap="round" opacity="0.45"`;
  const ribC=t.rib;
  // two socks
  function one(ox){
    return `<g transform="translate(${ox},0)">
      <path d="M120,70 L156,70 L156,158 Q156,168 168,172 L196,182 Q210,188 210,202 Q210,216 196,218 L150,222 Q132,222 130,204 L120,158 Z" ${FILL(id)} stroke="${t.seam}" stroke-width="1.1" filter="url(#sh-${id})"/>
      <rect x="118" y="66" width="40" height="16" rx="3" fill="${ribC}"/>
      <g stroke="${t.lo2}" stroke-width="0.7" opacity="0.5">${[124,130,136,142,148,154].map(x=>`<line x1="${x}" y1="68" x2="${x}" y2="80"/>`).join('')}</g>
      <path d="M132,196 Q150,206 166,196" ${seam}/>
      <path d="M196,206 Q204,208 206,202" ${seam}/>
    </g>`;
  }
  // mark at outer ankle on each
  const mk=`${mark( -40+150,150,3,mc,0)}${mark( 60+150,150,3,mc,0)}`;
  return `${defs(id,t)}${one(-55)}${one(55)}<g>${mark(95,150,3,mc,0)}${mark(205,150,3,mc,0)}</g>`;
}

/* ---- piece registry ---- */
const PIECES=[
  {id:'moletom', num:'01', name:'Moletom Essential', ref:'VK-0420', fit:'Oversized', fab:'Moletom 320g',
   render:sweatshirt, mark:'Peito esq. · 18 cm da gola', back:true},
  {id:'camiseta', num:'02', name:'Camiseta Core', ref:'VK-0210', fit:'Regular', fab:'Jersey 200g',
   render:tee, mark:'Peito esq. · 16 cm da gola', back:true},
  {id:'manga', num:'03', name:'Manga Longa', ref:'VK-0515', fit:'Regular', fab:'Jersey 300g',
   render:longsleeve, mark:'Punho esquerdo', back:true},
  {id:'calca', num:'04', name:'Calça Utility', ref:'VK-0640', fit:'Reto', fab:'Sarja 300g',
   render:pants, mark:'Coxa frontal dir. + cós', back:true},
  {id:'shorts', num:'05', name:'Shorts Court', ref:'VK-0725', fit:'Reto', fab:'Sarja 300g',
   render:shorts, mark:'Barra frontal esq.', back:true},
  {id:'meias', num:'06', name:'Meias Par', ref:'VK-0810', fit:'Cano médio', fab:'Algodão egípcio',
   render:socks, mark:'Tornozelo · ambos os pés', back:false},
];

/* ---- state ---- */
const state = { global:'offwhite', treat:'tonal', view:'front', name:'symbol',
  per:Object.fromEntries(PIECES.map(p=>[p.id,{col:'offwhite', view:'front'}])) };
window.__vkName = false;

function renderPiece(p){
  const st=state.per[p.id];
  const col=st.col, view=(p.back?st.view:'front'), treat=state.treat;
  const t=tones(col);
  const stageBg = PAL[col].dark ? '#e3dccf' : (col==='offwhite'?'#ece5db':'#e8e0d4');
  const svg=`<svg viewBox="0 0 300 320" preserveAspectRatio="xMidYMid meet">${p.render(p.id+'-'+col+'-'+view, t, col, treat, view)}</svg>`;
  return {svg, stageBg};
}

function paint(){
  const board=document.getElementById('board');
  board.innerHTML = PIECES.map(p=>{
    const {svg,stageBg}=renderPiece(p);
    const st=state.per[p.id];
    const swatches=ORDER.map(k=>`<button data-piece="${p.id}" data-col="${k}" class="${st.col===k?'on':''}" style="background:${PAL[k].hex}" title="${PAL[k].name}"></button>`).join('');
    const viewBtns=p.back?`<div class="viewtog">
      <button data-piece="${p.id}" data-view="front" class="${st.view==='front'?'on':''}">Frente</button>
      <button data-piece="${p.id}" data-view="back" class="${st.view==='back'?'on':''}">Costas</button></div>`:'';
    return `<div class="gcard">
      <div class="gstage" style="background:${stageBg}"><span class="gnum">${p.num}</span>${viewBtns}${svg}</div>
      <div class="gmeta">
        <div class="top"><h3>${p.name}</h3><span class="ref">${p.ref}</span></div>
        <div class="row"><div class="sw-sm">${swatches}</div></div>
        <div class="gspecs">
          <div class="s"><span class="k">Corte</span><span class="v">${p.fit}</span></div>
          <div class="s"><span class="k">Material</span><span class="v">${p.fab}</span></div>
          <div class="s"><span class="k">Posição da marca</span><span class="v"><span class="markdot"></span>${p.mark}</span></div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* global swatches */
function paintGlobal(){
  document.getElementById('gSwatch').innerHTML = ORDER.map(k=>
    `<button data-gcol="${k}" class="${state.global===k?'on':''}" style="background:${PAL[k].hex}" title="${PAL[k].name}"></button>`).join('');
}

/* ---- events ---- */
document.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  if(b.dataset.gcol){ state.global=b.dataset.gcol; PIECES.forEach(p=>state.per[p.id].col=b.dataset.gcol); paintGlobal(); paint(); }
  else if(b.dataset.t){ state.treat=b.dataset.t; document.querySelectorAll('#gTreat button').forEach(x=>x.classList.toggle('on',x===b)); paint(); }
  else if(b.dataset.name){ state.name=b.dataset.name; window.__vkName=(b.dataset.name==='full'); document.querySelectorAll('#gName button').forEach(x=>x.classList.toggle('on',x===b)); paint(); }
  else if(b.dataset.v){ state.view=b.dataset.v; PIECES.forEach(p=>state.per[p.id].view=b.dataset.v); document.querySelectorAll('#gView button').forEach(x=>x.classList.toggle('on',x===b)); paint(); }
  else if(b.dataset.col){ state.per[b.dataset.piece].col=b.dataset.col; paint(); }
  else if(b.dataset.view){ state.per[b.dataset.piece].view=b.dataset.view; paint(); }
});

/* header mark */
document.getElementById('hpm').innerHTML=`<svg viewBox="0 0 100 60" width="100%"><circle cx="36" cy="30" r="11" fill="#2d2926"/><circle cx="64" cy="30" r="11" fill="none" stroke="#2d2926" stroke-width="4"/></svg>`;

paintGlobal(); paint();
})();
