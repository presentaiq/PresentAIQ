import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles/globals.css';

const rgba = (rgb: string, o: number) => `rgba(${rgb},${o})`;
const B = '123,159,204';
const L = '154,184,216';
const D = '90,133,184';
const G = '196,160,90';
const T = '100,195,175';
const P = '180,140,210';
type V = 1 | 2 | 3;

/* ── SVG donut arc helper ─────────────────────────────────── */
function donutArc(cx: number, cy: number, ro: number, ri: number, s: number, e: number) {
  const r = (d: number) => (d - 90) * Math.PI / 180;
  const ox1 = cx + ro * Math.cos(r(s)), oy1 = cy + ro * Math.sin(r(s));
  const ox2 = cx + ro * Math.cos(r(e - .5)), oy2 = cy + ro * Math.sin(r(e - .5));
  const ix1 = cx + ri * Math.cos(r(e - .5)), iy1 = cy + ri * Math.sin(r(e - .5));
  const ix2 = cx + ri * Math.cos(r(s)), iy2 = cy + ri * Math.sin(r(s));
  const lg = (e - s) > 180 ? 1 : 0;
  return `M${ox1},${oy1} A${ro},${ro} 0 ${lg} 1 ${ox2},${oy2} L${ix1},${iy1} A${ri},${ri} 0 ${lg} 0 ${ix2},${iy2}Z`;
}

/* ═══════════════════════════════════════════════════════════
   SLIDE THUMBNAILS
═══════════════════════════════════════════════════════════ */

/* 1. Bar Chart */
function BarChartSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; label: string; bars: number[]; hi: number }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#142240)', rgb: B, label: 'REVENUE GROWTH',  bars: [42,58,50,75,68,100,88,72], hi: 5 },
    2: { bg: 'linear-gradient(145deg,#0E1F1C,#0A1816)', rgb: T, label: 'MARKET SHARE',    bars: [55,70,45,85,60,78,92,66], hi: 6 },
    3: { bg: 'linear-gradient(145deg,#1A1528,#120E20)', rgb: P, label: 'ENGAGEMENT RATE', bars: [38,55,70,48,80,65,90,75], hi: 4 },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 11px 7px',display:'flex',flexDirection:'column',gap:3,boxShadow:`0 0 0 1px ${rgba(c.rgb,.22)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 60% at 30% 40%,${rgba(c.rgb,.07)},transparent 70%)` }} />
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative' }}>
        <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.label}</span>
        <span style={{ fontSize:4,color:rgba(c.rgb,.35),fontFamily:'monospace' }}>2024</span>
      </div>
      <div style={{ height:.5,background:`linear-gradient(90deg,${rgba(c.rgb,.4)},transparent)`,width:'60%',position:'relative' }} />
      <div style={{ flex:1,display:'flex',alignItems:'flex-end',gap:2.5,padding:'2px 0',position:'relative' }}>
        {c.bars.map((h,i) => <div key={i} style={{ flex:1,height:`${h}%`,borderRadius:'2px 2px 0 0',background:i===c.hi?`linear-gradient(180deg,${rgba(c.rgb,.9)},${rgba(c.rgb,.6)})`:rgba(c.rgb,.2) }} />)}
      </div>
      <div style={{ height:.5,background:rgba(c.rgb,.18),position:'relative' }} />
      <div style={{ display:'flex',position:'relative' }}>
        {['Jan','Mar','May','Jul','Sep','Nov','',''].map((m,i) => <div key={i} style={{ flex:1,fontSize:3.2,color:rgba(c.rgb,.3),fontFamily:'monospace',textAlign:'center' }}>{m}</div>)}
      </div>
    </div>
  );
}

/* 2. Area / Line Chart */
function AreaChartSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; label: string; data: number[]; change: string }> = {
    1: { bg: 'linear-gradient(145deg,#0D1C32,#102038)', rgb: L, label: 'ARR TRAJECTORY', data: [18,24,20,32,28,40,38,52,48,65,60,80], change: '+344%' },
    2: { bg: 'linear-gradient(145deg,#0A1F1A,#0D2820)', rgb: T, label: 'USER GROWTH',    data: [5,8,7,12,10,18,16,24,22,32,30,42],  change: '+740%' },
    3: { bg: 'linear-gradient(145deg,#1C1220,#14101C)', rgb: G, label: 'IMPRESSIONS',    data: [40,38,44,42,50,48,55,52,60,65,72,80],change: '+100%' },
  };
  const c = cfg[v];
  const W = 200, H = 52;
  const max = Math.max(...c.data);
  const coords = c.data.map((y, i) => [((i / (c.data.length - 1)) * W), H - (y / max) * H] as [number, number]);
  const ptsStr = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaStr = `0,${H} ${ptsStr} ${W},${H}`;
  const gid = `area-g${v}`;
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 11px 7px',display:'flex',flexDirection:'column',gap:4,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 50% at 70% 30%,${rgba(c.rgb,.06)},transparent 70%)` }} />
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative' }}>
        <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.label}</span>
        <span style={{ fontSize:11,fontWeight:800,color:rgba(c.rgb,.85),fontFamily:'system-ui',letterSpacing:'-0.02em' }}>{c.change}</span>
      </div>
      <div style={{ flex:1,position:'relative',overflow:'hidden' }}>
        {[0.33,0.66].map((t, i) => <div key={i} style={{ position:'absolute',left:0,right:0,top:`${(1-t)*100}%`,height:.5,background:rgba(c.rgb,.1) }} />)}
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible' }}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${c.rgb},.32)`} />
              <stop offset="100%" stopColor={`rgba(${c.rgb},0)`} />
            </linearGradient>
          </defs>
          <polygon points={areaStr} fill={`url(#${gid})`} />
          <polyline points={ptsStr} fill="none" stroke={`rgba(${c.rgb},.75)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={coords[coords.length-1][0]} cy={coords[coords.length-1][1]} r="2.5" fill={`rgba(${c.rgb},.9)`} />
        </svg>
      </div>
    </div>
  );
}

/* 3. Donut Chart */
function DonutSlide({ v }: { v: V }) {
  type Seg = { pct: number; rgb: string; name: string };
  const cfg: Record<V, { bg: string; label: string; center: string; segs: Seg[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#112038)', label: 'REVENUE MIX',   center: '$4.2M',
      segs: [{pct:42,rgb:B,name:'Enterprise'},{pct:28,rgb:L,name:'Mid-Market'},{pct:18,rgb:D,name:'SMB'},{pct:12,rgb:'70,100,150',name:'Other'}] },
    2: { bg: 'linear-gradient(145deg,#0A1F1A,#0C1E18)', label: 'CHANNEL MIX',   center: '850+',
      segs: [{pct:35,rgb:T,name:'Direct'},{pct:30,rgb:'80,165,148',name:'Partner'},{pct:22,rgb:'60,140,120',name:'Online'},{pct:13,rgb:'40,110,90',name:'Events'}] },
    3: { bg: 'linear-gradient(145deg,#1C1220,#160F1C)', label: 'AUDIENCE SPLIT', center: '92%',
      segs: [{pct:45,rgb:G,name:'C-Suite'},{pct:30,rgb:'176,142,82',name:'Directors'},{pct:16,rgb:'150,118,60',name:'Managers'},{pct:9,rgb:'120,95,45',name:'Other'}] },
  };
  const c = cfg[v];
  let cum = 0;
  const arcs = c.segs.map(seg => {
    const s = (cum / 100) * 360, e = ((cum + seg.pct) / 100) * 360;
    cum += seg.pct;
    return { d: donutArc(30, 30, 24, 14, s, e), color: `rgba(${seg.rgb},.85)`, ...seg };
  });
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'8px 11px',display:'flex',flexDirection:'column',gap:4,boxShadow:`0 0 0 1px rgba(${c.segs[0].rgb},.2),0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:`rgba(${c.segs[0].rgb},.6)`,textTransform:'uppercase',fontFamily:'monospace' }}>{c.label}</span>
      <div style={{ flex:1,display:'flex',gap:10,alignItems:'center' }}>
        <div style={{ flexShrink:0 }}>
          <svg viewBox="0 0 60 60" style={{ width:60,height:60 }}>
            {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
            <text x="30" y="31.5" textAnchor="middle" dominantBaseline="middle" fill={`rgba(${c.segs[0].rgb},.85)`} fontSize="6.5" fontWeight="800" fontFamily="system-ui">{c.center}</text>
          </svg>
        </div>
        <div style={{ flex:1,display:'flex',flexDirection:'column',gap:5,justifyContent:'center' }}>
          {c.segs.map((seg, i) => (
            <div key={i} style={{ display:'flex',alignItems:'center',gap:4 }}>
              <div style={{ width:5,height:5,borderRadius:1,flexShrink:0,background:`rgba(${seg.rgb},.85)` }} />
              <span style={{ flex:1,fontSize:4,color:`rgba(${seg.rgb},.6)`,fontFamily:'monospace',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{seg.name}</span>
              <span style={{ fontSize:5,fontWeight:700,color:`rgba(${seg.rgb},.8)`,fontFamily:'monospace' }}>{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4. Three-Column Layout */
function ThreeColSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; cols: { icon: string; head: string; lines: number[] }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0D1C32,#102038)', rgb: B, title: 'OUR APPROACH',
      cols: [{icon:'◈',head:'Strategy',lines:[90,72,82]},{icon:'◎',head:'Design',lines:[85,68,78]},{icon:'◇',head:'Delivery',lines:[92,75,85]}] },
    2: { bg: 'linear-gradient(145deg,#0A1F1A,#0C2218)', rgb: T, title: 'KEY PILLARS',
      cols: [{icon:'▲',head:'Speed',lines:[88,65,75]},{icon:'●',head:'Quality',lines:[80,70,90]},{icon:'■',head:'Impact',lines:[95,78,68]}] },
    3: { bg: 'linear-gradient(145deg,#1A1528,#140E22)', rgb: P, title: 'SERVICE TIERS',
      cols: [{icon:'◆',head:'Essential',lines:[75,60,80]},{icon:'★',head:'Premium',lines:[92,85,70]},{icon:'✦',head:'Enterprise',lines:[88,72,95]}] },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 10px 8px',display:'flex',flexDirection:'column',gap:5,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 60% at 50% 30%,${rgba(c.rgb,.05)},transparent 70%)` }} />
      <div style={{ display:'flex',alignItems:'center',gap:5,position:'relative' }}>
        <div style={{ height:.5,width:10,background:rgba(c.rgb,.6) }} />
        <span style={{ fontSize:4.5,letterSpacing:'0.18em',fontWeight:800,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.title}</span>
      </div>
      <div style={{ flex:1,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:5,position:'relative' }}>
        {c.cols.map((col, i) => (
          <div key={i} style={{ display:'flex',flexDirection:'column',gap:3,padding:'6px 5px',background:rgba(c.rgb,.05),borderRadius:4,border:`0.5px solid ${rgba(c.rgb,.12)}` }}>
            <div style={{ fontSize:10,color:rgba(c.rgb,.7),fontFamily:'system-ui',lineHeight:1 }}>{col.icon}</div>
            <div style={{ height:4,width:'80%',borderRadius:1.5,background:rgba(c.rgb,.5) }} />
            <div style={{ display:'flex',flexDirection:'column',gap:2,marginTop:1 }}>
              {col.lines.map((w, j) => <div key={j} style={{ height:2.5,width:`${w}%`,borderRadius:1,background:rgba(c.rgb,j===0?.2:.1) }} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 5. Comparison Table */
function CompareSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; left: string; right: string; rows: { label: string; l: boolean; r: boolean }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#112038)', rgb: B, title: 'BEFORE vs AFTER', left: 'Before', right: 'After',
      rows: [{label:'Professional Layout',l:false,r:true},{label:'Data Visualized',l:false,r:true},{label:'On-Brand Design',l:false,r:true},{label:'Investor-Ready',l:false,r:true},{label:'Delivered 24h',l:false,r:true}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#0E0C10)', rgb: G, title: 'DIY vs PROFESSIONAL', left: 'DIY', right: 'PresentAIQ',
      rows: [{label:'Executive Quality',l:false,r:true},{label:'Think-Cell Charts',l:false,r:true},{label:'Revisions',l:false,r:true},{label:'Fast Turnaround',l:false,r:true},{label:'AI-Enhanced',l:false,r:true}] },
    3: { bg: 'linear-gradient(145deg,#0A1E18,#071512)', rgb: T, title: 'STANDARD vs PREMIUM', left: 'Std', right: 'Pro',
      rows: [{label:'Custom Infographics',l:false,r:true},{label:'Data Viz',l:true,r:true},{label:'Branding',l:true,r:true},{label:'Priority Delivery',l:false,r:true},{label:'Dedicated Designer',l:false,r:true}] },
  };
  const c = cfg[v];
  const tick = (yes: boolean, bright = false) => (
    <span style={{ fontSize:7, color: yes ? (bright ? `rgba(${c.rgb},.9)` : `rgba(${c.rgb},.5)`) : `rgba(${c.rgb},.18)` }}>{yes ? '✓' : '–'}</span>
  );
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'8px 10px',display:'flex',flexDirection:'column',gap:4,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.title}</span>
      <div style={{ display:'flex',alignItems:'center',paddingLeft:2,gap:0,marginBottom:2 }}>
        <div style={{ flex:1 }} />
        <div style={{ width:32,textAlign:'center',fontSize:4,color:rgba(c.rgb,.4),fontFamily:'monospace' }}>{c.left}</div>
        <div style={{ width:32,textAlign:'center',fontSize:4.5,fontWeight:700,color:rgba(c.rgb,.8),fontFamily:'monospace' }}>{c.right}</div>
      </div>
      {c.rows.map((row, i) => (
        <div key={i} style={{ display:'flex',alignItems:'center',paddingLeft:2,borderLeft:`1px solid ${rgba(c.rgb,.1)}` }}>
          <div style={{ flex:1,fontSize:3.8,color:rgba(c.rgb,.5),fontFamily:'monospace' }}>{row.label}</div>
          <div style={{ width:32,textAlign:'center' }}>{tick(row.l)}</div>
          <div style={{ width:32,textAlign:'center' }}>{tick(row.r, true)}</div>
        </div>
      ))}
    </div>
  );
}

/* 6. KPI Metrics */
function KPISlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; title: string; cells: { num: string; label: string; rgb: string; up?: boolean }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#0A1420)', title: 'KEY METRICS',
      cells: [{num:'$48M+',label:'Raised',rgb:B,up:true},{num:'850+',label:'Decks',rgb:L,up:true},{num:'92%',label:'Retention',rgb:D,up:true},{num:'24h',label:'Delivery',rgb:B}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#100C10)', title: 'PERFORMANCE',
      cells: [{num:'127%',label:'Growth',rgb:G,up:true},{num:'4.8×',label:'ROI',rgb:G,up:true},{num:'$2.4M',label:'Revenue',rgb:G,up:true},{num:'98%',label:'Satisfaction',rgb:G}] },
    3: { bg: 'linear-gradient(145deg,#0A1F1A,#071512)', title: 'IMPACT STATS',
      cells: [{num:'40+',label:'Industries',rgb:T,up:true},{num:'200+',label:'Clients',rgb:T,up:true},{num:'5★',label:'Rating',rgb:T},{num:'3×',label:'Faster',rgb:T,up:true}] },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 10px 8px',display:'flex',flexDirection:'column',gap:5,boxShadow:`0 0 0 1px rgba(${c.cells[0].rgb},.2),0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 60% at 50% 50%,rgba(${c.cells[0].rgb},.05),transparent 70%)` }} />
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:`rgba(${c.cells[0].rgb},.5)`,textTransform:'uppercase',fontFamily:'monospace',position:'relative' }}>{c.title}</span>
      <div style={{ flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',gap:5,position:'relative' }}>
        {c.cells.map((cell, i) => (
          <div key={i} style={{ background:`rgba(${cell.rgb},.07)`,border:`0.5px solid rgba(${cell.rgb},.18)`,borderRadius:5,padding:'5px 7px',display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
              <span style={{ fontSize:15,fontWeight:800,color:`rgba(${cell.rgb},.9)`,fontFamily:'system-ui',lineHeight:1,letterSpacing:'-0.03em' }}>{cell.num}</span>
              {cell.up && <span style={{ fontSize:7,color:`rgba(${cell.rgb},.6)` }}>↑</span>}
            </div>
            <span style={{ fontSize:3.8,letterSpacing:'0.12em',color:`rgba(${cell.rgb},.45)`,textTransform:'uppercase',fontFamily:'monospace' }}>{cell.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 7. Timeline / Process Steps */
function TimelineSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; steps: { num: string; label: string; date: string }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#0C1A2C)', rgb: B, title: 'PROJECT TIMELINE',
      steps: [{num:'01',label:'Brief',date:'Day 1'},{num:'02',label:'Draft',date:'Day 3'},{num:'03',label:'Review',date:'Day 5'},{num:'04',label:'Final',date:'Day 7'}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#120E14)', rgb: G, title: 'LAUNCH ROADMAP',
      steps: [{num:'Q1',label:'Research',date:'Jan'},{num:'Q2',label:'Build',date:'Apr'},{num:'Q3',label:'Launch',date:'Jul'},{num:'Q4',label:'Scale',date:'Oct'}] },
    3: { bg: 'linear-gradient(145deg,#0A1E18,#081512)', rgb: T, title: 'ONBOARDING FLOW',
      steps: [{num:'1',label:'Kickoff',date:'Wk 1'},{num:'2',label:'Design',date:'Wk 2'},{num:'3',label:'Refine',date:'Wk 3'},{num:'4',label:'Deploy',date:'Wk 4'}] },
  };
  const c = cfg[v];
  const active = 3;
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 11px 8px',display:'flex',flexDirection:'column',gap:6,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 50%,${rgba(c.rgb,.05)},transparent 70%)` }} />
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace',position:'relative' }}>{c.title}</span>
      <div style={{ flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:6,position:'relative' }}>
        <div style={{ position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 6px' }}>
          <div style={{ position:'absolute',left:'5%',right:'5%',height:.5,background:rgba(c.rgb,.2),top:'50%',transform:'translateY(-50%)' }} />
          <div style={{ position:'absolute',left:'5%',width:`${(active/3)*90}%`,height:.5,background:rgba(c.rgb,.65),top:'50%',transform:'translateY(-50%)' }} />
          {c.steps.map((step, i) => (
            <div key={i} style={{ position:'relative',width:13,height:13,borderRadius:'50%',border:`1.5px solid ${rgba(c.rgb,i<=active?.8:.28)}`,background:i<=active?rgba(c.rgb,.15):'transparent',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <span style={{ fontSize:4,fontWeight:700,color:rgba(c.rgb,i<=active?.8:.28),fontFamily:'monospace' }}>{step.num}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',padding:'0 3px' }}>
          {c.steps.map((step, i) => (
            <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:1.5 }}>
              <span style={{ fontSize:4,fontWeight:600,color:rgba(c.rgb,i<=active?.7:.28),fontFamily:'monospace',textAlign:'center' }}>{step.label}</span>
              <span style={{ fontSize:3.2,color:rgba(c.rgb,.3),fontFamily:'monospace',textAlign:'center' }}>{step.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 8. Funnel */
function FunnelSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; stages: { label: string; pct: number; val: string }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#0A1520)', rgb: B, title: 'SALES FUNNEL',
      stages: [{label:'Awareness',pct:100,val:'5,200'},{label:'Interest',pct:75,val:'3,900'},{label:'Decision',pct:48,val:'2,500'},{label:'Closed',pct:22,val:'1,150'}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#0E0C10)', rgb: G, title: 'CONVERSION PIPELINE',
      stages: [{label:'Leads',pct:100,val:'1,000'},{label:'Qualified',pct:60,val:'600'},{label:'Proposal',pct:35,val:'350'},{label:'Won',pct:18,val:'180'}] },
    3: { bg: 'linear-gradient(145deg,#0A1E18,#071512)', rgb: T, title: 'HIRING FUNNEL',
      stages: [{label:'Applied',pct:100,val:'420'},{label:'Screened',pct:55,val:'230'},{label:'Interview',pct:30,val:'126'},{label:'Hired',pct:12,val:'50'}] },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'9px 10px 8px',display:'flex',flexDirection:'column',gap:5,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.title}</span>
      <div style={{ flex:1,display:'flex',flexDirection:'column',justifyContent:'space-around' }}>
        {c.stages.map((stage, i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',gap:5 }}>
            <div style={{ width:34,fontSize:3.5,color:rgba(c.rgb,.45),fontFamily:'monospace',textAlign:'right',flexShrink:0 }}>{stage.label}</div>
            <div style={{ flex:1 }}>
              <div style={{ height:9,width:`${stage.pct}%`,borderRadius:2,background:`linear-gradient(90deg,${rgba(c.rgb,.72)},${rgba(c.rgb,.38)})` }} />
            </div>
            <div style={{ width:26,fontSize:3.8,fontWeight:600,color:rgba(c.rgb,.55),fontFamily:'monospace',flexShrink:0 }}>{stage.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 9. Pull Quote */
function QuoteSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; quote: string; name: string; role: string }> = {
    1: { bg: 'linear-gradient(145deg,#0D1A2E,#091420)', rgb: B,
      quote: '"The deck they delivered closed our $12M Series B. Investors were blown away by the quality."',
      name: 'Sarah Chen', role: 'CEO, Nexus AI' },
    2: { bg: 'linear-gradient(145deg,#1A1410,#100C08)', rgb: G,
      quote: '"I\'ve worked with design agencies globally. PresentAIQ is in a completely different league."',
      name: 'Marcus Webb', role: 'VP Strategy, Apex Corp' },
    3: { bg: 'linear-gradient(145deg,#0A1C18,#071410)', rgb: T,
      quote: '"Delivered overnight. Perfect. Worth every penny and then some. Will use again."',
      name: 'Priya Sharma', role: 'Director, GrowthCo' },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'10px 12px 9px',display:'flex',flexDirection:'column',justifyContent:'space-between',boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 60% at 30% 50%,${rgba(c.rgb,.06)},transparent 75%)` }} />
      <div style={{ fontSize:32,lineHeight:.7,color:rgba(c.rgb,.3),fontFamily:'Georgia,serif',position:'relative' }}>"</div>
      <div style={{ flex:1,display:'flex',alignItems:'center',position:'relative',padding:'0 2px' }}>
        <p style={{ fontSize:5.4,lineHeight:1.75,color:rgba(c.rgb,.72),fontFamily:'Georgia,serif',fontStyle:'italic' }}>{c.quote}</p>
      </div>
      <div style={{ display:'flex',alignItems:'center',gap:6,position:'relative',paddingTop:5,borderTop:`0.5px solid ${rgba(c.rgb,.15)}` }}>
        <div style={{ width:14,height:14,borderRadius:'50%',background:rgba(c.rgb,.12),border:`1px solid ${rgba(c.rgb,.35)}`,flexShrink:0 }} />
        <div>
          <div style={{ fontSize:4.5,fontWeight:700,color:rgba(c.rgb,.75),fontFamily:'system-ui' }}>{c.name}</div>
          <div style={{ fontSize:3.8,color:rgba(c.rgb,.4),fontFamily:'monospace',letterSpacing:'0.06em' }}>{c.role}</div>
        </div>
      </div>
    </div>
  );
}

/* 10. Roadmap / Gantt */
function RoadmapSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; rows: { label: string; start: number; end: number }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#0A1420)', rgb: B, title: 'PRODUCT ROADMAP',
      rows: [{label:'Research',start:0,end:28},{label:'Prototype',start:18,end:52},{label:'Beta',start:42,end:72},{label:'Launch',start:62,end:100},{label:'Scale',start:82,end:100}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#0E0C10)', rgb: G, title: 'CAMPAIGN PLAN',
      rows: [{label:'Strategy',start:0,end:22},{label:'Content',start:12,end:50},{label:'Social',start:38,end:75},{label:'Paid Ads',start:55,end:88},{label:'Report',start:78,end:100}] },
    3: { bg: 'linear-gradient(145deg,#0A1E18,#071512)', rgb: T, title: 'IMPLEMENTATION',
      rows: [{label:'Audit',start:0,end:20},{label:'Design',start:15,end:45},{label:'Build',start:35,end:70},{label:'Test',start:60,end:85},{label:'Go Live',start:80,end:100}] },
  };
  const c = cfg[v];
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'8px 10px 7px',display:'flex',flexDirection:'column',gap:4,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.title}</span>
        <div style={{ display:'flex',gap:10 }}>
          {['Q1','Q2','Q3','Q4'].map(q => <span key={q} style={{ fontSize:3.5,color:rgba(c.rgb,.3),fontFamily:'monospace' }}>{q}</span>)}
        </div>
      </div>
      <div style={{ flex:1,position:'relative',display:'flex',flexDirection:'column',justifyContent:'space-around' }}>
        {[25,50,75].map(p => <div key={p} style={{ position:'absolute',left:`${p}%`,top:0,bottom:0,width:.5,background:rgba(c.rgb,.1) }} />)}
        {c.rows.map((row, i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',gap:5 }}>
            <div style={{ width:34,fontSize:3.5,color:rgba(c.rgb,.45),fontFamily:'monospace',textAlign:'right',flexShrink:0 }}>{row.label}</div>
            <div style={{ flex:1,position:'relative',height:7,background:rgba(c.rgb,.06),borderRadius:1.5 }}>
              <div style={{ position:'absolute',left:`${row.start}%`,width:`${row.end-row.start}%`,top:0,bottom:0,borderRadius:1.5,background:`linear-gradient(90deg,${rgba(c.rgb,.68)},${rgba(c.rgb,.42)})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Ticker ──────────────────────────────────────────────── */
const CW = 246, CH = 154, CG = 14;

function TickerRow({ cards, dir, speed }: { cards: React.ReactNode[]; dir: 'left' | 'right'; speed: string }) {
  const doubled = [...cards, ...cards];
  return (
    <div style={{ overflow:'hidden',width:'100%',flexShrink:0 }}>
      <div style={{ display:'flex',gap:CG,width:'max-content',animation:`ticker-${dir} ${speed} linear infinite`,willChange:'transform' }}>
        {doubled.map((card, i) => <div key={i} style={{ width:CW,height:CH,flexShrink:0 }}>{card}</div>)}
      </div>
    </div>
  );
}

const ROW1 = [
  <BarChartSlide v={1} />, <AreaChartSlide v={1} />, <DonutSlide v={1} />, <ThreeColSlide v={1} />,
  <CompareSlide v={1} />, <KPISlide v={1} />, <TimelineSlide v={1} />, <FunnelSlide v={1} />,
];
const ROW2 = [
  <QuoteSlide v={1} />, <RoadmapSlide v={1} />, <BarChartSlide v={2} />, <AreaChartSlide v={2} />,
  <DonutSlide v={2} />, <ThreeColSlide v={2} />, <CompareSlide v={2} />, <KPISlide v={2} />,
];
const ROW3 = [
  <TimelineSlide v={2} />, <FunnelSlide v={2} />, <QuoteSlide v={2} />, <RoadmapSlide v={2} />,
  <BarChartSlide v={3} />, <AreaChartSlide v={3} />, <DonutSlide v={3} />, <ThreeColSlide v={3} />,
];

/* ─── CONCEPT A — Infinite Gallery Ticker ────────────────── */
function ConceptA() {
  const BG = '#080F1C';
  return (
    <div style={{ position:'relative',height:'100%',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',gap:12,padding:'8px 0',background:BG }}>
      <TickerRow cards={ROW1} dir="left"  speed="32s" />
      <TickerRow cards={ROW2} dir="right" speed="40s" />
      <TickerRow cards={ROW3} dir="left"  speed="26s" />
      {/* Edge fades */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:'26%',background:`linear-gradient(180deg,${BG},transparent)`,zIndex:2,pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'26%',background:`linear-gradient(0deg,${BG},transparent)`,zIndex:2,pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:0,left:0,bottom:0,width:'10%',background:`linear-gradient(90deg,${BG},transparent)`,zIndex:2,pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:0,right:0,bottom:0,width:'10%',background:`linear-gradient(270deg,${BG},transparent)`,zIndex:2,pointerEvents:'none' }} />
      {/* Center text overlay */}
      <div style={{ position:'absolute',inset:0,zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'0 24px' }}>
        <div style={{ position:'absolute',inset:'12% 8%',background:'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(6,12,24,0.94) 20%, rgba(6,12,24,0.55) 58%, transparent 100%)',pointerEvents:'none' }} />
        <div style={{ position:'relative' }}>
          <h1 style={{ fontSize:'clamp(1.6rem,4vw,3.4rem)',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.03em',color:'#EEF2F8',marginBottom:'0.75rem',fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
            Intelligent Design,<br />
            <span style={{ color:'#7B9FCC' }}>Executive Presentation,</span><br />
            Delivered at Speed of Thought
          </h1>
          <p style={{ color:'rgba(238,242,248,.52)',fontSize:'0.92rem',marginBottom:'1.6rem',maxWidth:'36ch',marginLeft:'auto',marginRight:'auto' }}>
            AI-assisted pitch decks, slide design & data visualization — all under one roof.
          </p>
          <a href="#contact" style={{ display:'inline-flex',alignItems:'center',padding:'0.9rem 2.25rem',background:'#7B9FCC',color:'#060C18',fontWeight:600,fontSize:'0.8125rem',letterSpacing:'0.025em',borderRadius:980,textDecoration:'none' }}>
            Get Your First Slide Free
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── CONCEPT B — Live Slide Build ───────────────────────── */
function ConceptB() {
  const slideRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bars = [42, 58, 50, 76, 68, 100];
  const stats = [{ v: '+127%', l: 'Growth' }, { v: '$2.4M', l: 'Revenue' }, { v: '89%', l: 'Retention' }];

  useEffect(() => {
    if (!slideRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(slideRef.current, { opacity: 0, scale: 0.9, y: 24 });
      gsap.set(headerRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0 });
      barsRef.current.forEach(b => b && gsap.set(b, { scaleY: 0, transformOrigin: '50% 100%', opacity: 0 }));
      statsRef.current.forEach(s => s && gsap.set(s, { opacity: 0, scale: 0.8, y: 8 }));
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      tl
        .to(slideRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out' })
        .to(headerRef.current, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '+=0.15')
        .to(textRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(barsRef.current, { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.055 }, '+=0.1')
        .to(statsRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.7)', stagger: 0.09 }, '+=0.15')
        .to({}, { duration: 2.5 })
        .to(slideRef.current, { opacity: 0, scale: 0.92, y: -16, duration: 0.5, ease: 'power2.in' })
        .set(slideRef.current, { scale: 0.9, y: 24 })
        .set(barsRef.current, { scaleY: 0, opacity: 0 })
        .set(statsRef.current, { opacity: 0, scale: 0.8, y: 8 })
        .set([headerRef.current, textRef.current], { opacity: 0 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:28,background:'#080F1C',position:'relative' }}>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(123,159,204,.06) 0%, transparent 70%)',pointerEvents:'none' }} />
      <div style={{ textAlign:'center',position:'relative' }}>
        <h1 style={{ fontSize:'clamp(1.5rem,3.5vw,3rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.028em',color:'#EEF2F8',fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
          Watch your deck<br /><span style={{ color:'#7B9FCC' }}>come to life.</span>
        </h1>
        <p style={{ color:'rgba(238,242,248,.5)',fontSize:'0.875rem',marginTop:'0.5rem' }}>Every element placed. Every pixel purposeful.</p>
      </div>
      <div ref={slideRef} style={{ width:'min(500px,86vw)',position:'relative' }}>
        <div style={{ aspectRatio:'16/9',borderRadius:14,overflow:'hidden',background:'linear-gradient(165deg,#0E1B30,#142240)',boxShadow:'0 0 0 1px rgba(123,159,204,.22),0 40px 100px rgba(0,0,0,.75)',display:'flex',flexDirection:'column' }}>
          <div ref={headerRef} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 18px',borderBottom:'1px solid rgba(123,159,204,.1)',background:'rgba(123,159,204,.04)' }}>
            <span style={{ fontSize:7.5,fontWeight:700,letterSpacing:'0.15em',color:'#7B9FCC',textTransform:'uppercase',fontFamily:'system-ui' }}>Q4 2024 — Performance Review</span>
            <div style={{ display:'flex',gap:5 }}>{[.9,.4,.18].map((o,i) => <div key={i} style={{ width:6.5,height:6.5,borderRadius:'50%',background:`rgba(123,159,204,${o})` }} />)}</div>
          </div>
          <div ref={textRef} style={{ padding:'12px 18px 4px' }}>
            <div style={{ fontSize:6.5,fontWeight:700,color:'rgba(123,159,204,.6)',textTransform:'uppercase',letterSpacing:'0.1em',fontFamily:'system-ui' }}>Revenue Performance</div>
          </div>
          <div style={{ flex:1,padding:'4px 18px 8px' }}>
            <div style={{ display:'flex',alignItems:'flex-end',gap:5,height:'100%' }}>
              {bars.map((h, i) => (
                <div key={i} ref={el => { barsRef.current[i] = el; }} style={{ flex:1,height:`${h}%`,borderRadius:4,background:i===5?'linear-gradient(180deg,#9AB8D8,#5A85B8)':`rgba(123,159,204,${.18+i*.07})` }} />
              ))}
            </div>
          </div>
          <div style={{ display:'flex',padding:'4px 18px 12px',gap:7 }}>
            {stats.map(({ v, l }, i) => (
              <div key={l} ref={el => { statsRef.current[i] = el; }} style={{ flex:1,background:i===0?'rgba(123,159,204,.14)':'rgba(123,159,204,.07)',borderRadius:9,padding:'6px 9px',border:'1px solid rgba(123,159,204,.12)' }}>
                <div style={{ fontSize:13,fontWeight:800,color:'#EEF2F8',fontFamily:'system-ui',letterSpacing:'-0.02em',lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:6,color:'rgba(123,159,204,.5)',fontFamily:'system-ui',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'center',marginTop:10 }}>
          <span style={{ fontSize:'0.65rem',color:'rgba(123,159,204,.35)',fontFamily:'monospace',letterSpacing:'0.1em' }}>● DESIGNING IN REAL-TIME</span>
        </div>
      </div>
      <a href="#contact" style={{ display:'inline-flex',alignItems:'center',padding:'0.9rem 2.25rem',background:'#7B9FCC',color:'#060C18',fontWeight:600,fontSize:'0.8125rem',letterSpacing:'0.025em',borderRadius:980,textDecoration:'none',position:'relative' }}>
        Get Your First Slide Free
      </a>
    </div>
  );
}

/* ─── CONCEPT C — Before / After Split ───────────────────── */
function ConceptC() {
  const briefLines = ['Hey,','','Can you make our','Q4 data "look good"?','','• Add some charts','• Make it pop!','• Investor-ready pls','• Quick turnaround','','Thanks!'];
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:28,background:'#080F1C',position:'relative',padding:'0 24px' }}>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,159,204,.04) 0%, transparent 70%)',pointerEvents:'none' }} />
      <div style={{ textAlign:'center',position:'relative' }}>
        <h1 style={{ fontSize:'clamp(1.5rem,3.5vw,3rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.028em',color:'#EEF2F8',fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
          Your brief.<br /><span style={{ color:'#7B9FCC' }}>Our slide.</span>
        </h1>
        <p style={{ color:'rgba(238,242,248,.5)',fontSize:'0.875rem',marginTop:'0.5rem' }}>The transformation — from raw idea to boardroom-ready.</p>
      </div>
      <div style={{ display:'flex',alignItems:'center',gap:20,position:'relative',width:'100%',maxWidth:860 }}>
        <div style={{ flex:1,borderRadius:14,overflow:'hidden',background:'linear-gradient(145deg,#0A1020,#0D1525)',border:'1px solid rgba(123,159,204,.12)',padding:'18px 20px',minHeight:220,display:'flex',flexDirection:'column' }}>
          <div style={{ fontSize:'0.6rem',letterSpacing:'0.18em',color:'rgba(123,159,204,.4)',textTransform:'uppercase',fontFamily:'monospace',marginBottom:12 }}>THE BRIEF</div>
          <div style={{ fontFamily:'monospace',fontSize:'0.72rem',lineHeight:1.9,color:'rgba(238,242,248,.38)',flex:1 }}>
            {briefLines.map((line, i) => <div key={i} style={{ minHeight:line===''?'0.5rem':'auto' }}>{line}</div>)}
          </div>
        </div>
        <div style={{ width:2,alignSelf:'stretch',background:'linear-gradient(180deg,transparent,rgba(123,159,204,.55) 25%,rgba(154,184,216,.9) 50%,rgba(123,159,204,.55) 75%,transparent)',position:'relative',flexShrink:0 }}>
          <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:30,height:30,borderRadius:'50%',background:'#080F1C',border:'1.5px solid rgba(123,159,204,.5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',color:'#7B9FCC' }}>→</div>
        </div>
        <div style={{ flex:1.5,aspectRatio:'16/10' }}>
          <div style={{ width:'100%',height:'100%',borderRadius:14,overflow:'hidden',background:'linear-gradient(165deg,#0E1B30,#142240)',boxShadow:'0 0 0 1px rgba(123,159,204,.22),0 30px 80px rgba(0,0,0,.7)',display:'flex',flexDirection:'column' }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',borderBottom:'1px solid rgba(123,159,204,.1)',background:'rgba(123,159,204,.04)' }}>
              <span style={{ fontSize:7,fontWeight:700,letterSpacing:'0.15em',color:'#7B9FCC',textTransform:'uppercase',fontFamily:'system-ui' }}>Q4 2024 — Performance Review</span>
              <div style={{ display:'flex',gap:4 }}>{[.9,.4,.18].map((o,i) => <div key={i} style={{ width:6,height:6,borderRadius:'50%',background:`rgba(123,159,204,${o})` }} />)}</div>
            </div>
            <div style={{ flex:1,padding:'10px 16px 6px' }}>
              <div style={{ display:'flex',alignItems:'flex-end',gap:4,height:68 }}>
                {[42,58,50,76,68,100].map((h,i) => <div key={i} style={{ flex:1,height:`${h}%`,borderRadius:4,background:i===5?'linear-gradient(180deg,#9AB8D8,#5A85B8)':`rgba(123,159,204,${.18+i*.07})` }} />)}
              </div>
            </div>
            <div style={{ display:'flex',padding:'2px 16px 10px',gap:6 }}>
              {[{v:'+127%',l:'Growth'},{v:'$2.4M',l:'Revenue'},{v:'89%',l:'Retention'}].map(({v,l},i) => (
                <div key={l} style={{ flex:1,background:i===0?'rgba(123,159,204,.14)':'rgba(123,159,204,.07)',borderRadius:8,padding:'5px 8px',border:'1px solid rgba(123,159,204,.12)' }}>
                  <div style={{ fontSize:11,fontWeight:800,color:'#EEF2F8',fontFamily:'system-ui',letterSpacing:'-0.02em',lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:5.5,color:'rgba(123,159,204,.5)',fontFamily:'system-ui',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <a href="#contact" style={{ display:'inline-flex',alignItems:'center',padding:'0.9rem 2.25rem',background:'#7B9FCC',color:'#060C18',fontWeight:600,fontSize:'0.8125rem',letterSpacing:'0.025em',borderRadius:980,textDecoration:'none',position:'relative' }}>
        Get Your First Slide Free
      </a>
    </div>
  );
}

/* ─── CONCEPT D — Outcome Numbers ────────────────────────── */
const STATS = [
  { num: '$48M+', label: 'Raised by Clients',   sub: 'through our investor decks',      rgb: B },
  { num: '850+',  label: 'Decks Delivered',      sub: 'across 40+ industries globally',  rgb: L },
  { num: '92%',   label: 'Client Retention',     sub: 'return for the next project',     rgb: D },
  { num: '24h',   label: 'Average Delivery',     sub: 'from brief to inbox, every time', rgb: B },
];

function ConceptD() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % STATS.length); setVisible(true); }, 420);
    }, 3200);
    return () => clearInterval(iv);
  }, []);
  const s = STATS[idx];
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#080F1C',position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',gap:24,opacity:.12,filter:'blur(3px)',transform:'scale(1.1)',pointerEvents:'none' }}>
        <div style={{ width:280,height:175 }}><BarChartSlide v={1} /></div>
        <div style={{ width:340,height:212 }}><KPISlide v={1} /></div>
        <div style={{ width:280,height:175 }}><AreaChartSlide v={1} /></div>
      </div>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(8,15,28,.75) 30%, rgba(8,15,28,.95) 80%)',pointerEvents:'none' }} />
      <div style={{ textAlign:'center',position:'relative',transition:'opacity 0.4s ease, transform 0.4s ease',opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(-14px)',padding:'0 24px' }}>
        <div style={{ fontSize:'clamp(4.5rem,12vw,9rem)',fontWeight:800,lineHeight:.9,letterSpacing:'-0.05em',background:`linear-gradient(135deg,${rgba(L,.95)} 0%,${rgba(B,.8)} 60%,${rgba(D,.9)} 100%)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif',marginBottom:'0.6rem' }}>
          {s.num}
        </div>
        <div style={{ fontSize:'clamp(1rem,2.5vw,1.6rem)',fontWeight:600,color:'#EEF2F8',letterSpacing:'-0.015em',marginBottom:'0.4rem',fontFamily:'-apple-system,sans-serif' }}>{s.label}</div>
        <div style={{ fontSize:'0.875rem',color:'rgba(238,242,248,.45)',maxWidth:'32ch',margin:'0 auto' }}>{s.sub}</div>
      </div>
      <div style={{ display:'flex',gap:8,marginTop:40,position:'relative' }}>
        {STATS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width:i===idx?24:8,height:8,borderRadius:4,background:i===idx?'#7B9FCC':'rgba(123,159,204,.25)',border:'none',cursor:'pointer',transition:'all 0.3s ease',padding:0 }} />
        ))}
      </div>
      <div style={{ textAlign:'center',position:'relative',marginTop:40 }}>
        <p style={{ color:'rgba(238,242,248,.45)',fontSize:'0.875rem',marginBottom:'1.2rem' }}>
          Intelligent Design, Executive Presentation, Delivered at Speed of Thought
        </p>
        <a href="#contact" style={{ display:'inline-flex',alignItems:'center',padding:'0.9rem 2.25rem',background:'#7B9FCC',color:'#060C18',fontWeight:600,fontSize:'0.8125rem',letterSpacing:'0.025em',borderRadius:980,textDecoration:'none' }}>
          Get Your First Slide Free
        </a>
      </div>
    </div>
  );
}

/* ─── Preview Page ────────────────────────────────────────── */
const OPTIONS = [
  { id: 'optA', label: 'A — Gallery',       short: 'A' },
  { id: 'optB', label: 'B — Live Build',    short: 'B' },
  { id: 'optC', label: 'C — Before/After',  short: 'C' },
  { id: 'optD', label: 'D — Numbers',       short: 'D' },
];

export default function PreviewPage() {
  const [active, setActive] = useState('optA');
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.5 });
    OPTIONS.forEach(o => { const el = document.getElementById(o.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes ticker-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes ticker-right { from { transform: translateX(-50%) } to { transform: translateX(0)    } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #080F1C; color: #EEF2F8; overflow-x: hidden; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 20px',background:'rgba(8,15,28,0.9)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(123,159,204,.14)' }}>
        <span style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.1em',color:'rgba(238,242,248,.5)',textTransform:'uppercase',fontFamily:'monospace' }}>Hero Concept Preview</span>
        <div style={{ display:'flex',gap:6 }}>
          {OPTIONS.map(o => (
            <a key={o.id} href={`#${o.id}`} style={{ padding:'5px 14px',borderRadius:20,fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.04em',textDecoration:'none',transition:'all 0.25s ease',background:active===o.id?'#7B9FCC':'rgba(123,159,204,.1)',color:active===o.id?'#060C18':'rgba(238,242,248,.6)',border:active===o.id?'none':'1px solid rgba(123,159,204,.2)',fontFamily:'-apple-system,sans-serif' }}>
              {o.label}
            </a>
          ))}
        </div>
      </nav>
      <section id="optA" style={{ height:'100vh',paddingTop:44 }}><ConceptA /></section>
      <section id="optB" style={{ height:'100vh',paddingTop:44 }}><ConceptB /></section>
      <section id="optC" style={{ height:'100vh',paddingTop:44 }}><ConceptC /></section>
      <section id="optD" style={{ height:'100vh',paddingTop:44 }}><ConceptD /></section>
    </>
  );
}
