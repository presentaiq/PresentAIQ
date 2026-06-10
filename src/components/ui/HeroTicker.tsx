const rgba = (rgb: string, o: number) => `rgba(${rgb},${o})`;
const B = '123,159,204';
const L = '154,184,216';
const D = '90,133,184';
const G = '196,160,90';
const T = '100,195,175';
const P = '180,140,210';
type V = 1 | 2 | 3;

function donutArc(cx: number, cy: number, ro: number, ri: number, s: number, e: number) {
  const r = (d: number) => (d - 90) * Math.PI / 180;
  const ox1 = cx + ro * Math.cos(r(s)), oy1 = cy + ro * Math.sin(r(s));
  const ox2 = cx + ro * Math.cos(r(e - .5)), oy2 = cy + ro * Math.sin(r(e - .5));
  const ix1 = cx + ri * Math.cos(r(e - .5)), iy1 = cy + ri * Math.sin(r(e - .5));
  const ix2 = cx + ri * Math.cos(r(s)), iy2 = cy + ri * Math.sin(r(s));
  const lg = (e - s) > 180 ? 1 : 0;
  return `M${ox1},${oy1} A${ro},${ro} 0 ${lg} 1 ${ox2},${oy2} L${ix1},${iy1} A${ri},${ri} 0 ${lg} 0 ${ix2},${iy2}Z`;
}

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
        {c.bars.map((h, i) => <div key={i} style={{ flex:1,height:`${h}%`,borderRadius:'2px 2px 0 0',background:i===c.hi?`linear-gradient(180deg,${rgba(c.rgb,.9)},${rgba(c.rgb,.6)})`:rgba(c.rgb,.2) }} />)}
      </div>
      <div style={{ height:.5,background:rgba(c.rgb,.18),position:'relative' }} />
      <div style={{ display:'flex',position:'relative' }}>
        {['Jan','Mar','May','Jul','Sep','Nov','',''].map((m, i) => <div key={i} style={{ flex:1,fontSize:3.2,color:rgba(c.rgb,.3),fontFamily:'monospace',textAlign:'center' }}>{m}</div>)}
      </div>
    </div>
  );
}

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
  const gid = `ht-area-g${v}`;
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

function ThreeColSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; cols: { icon: string; lines: number[] }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0D1C32,#102038)', rgb: B, title: 'OUR APPROACH',
      cols: [{icon:'◈',lines:[90,72,82]},{icon:'◎',lines:[85,68,78]},{icon:'◇',lines:[92,75,85]}] },
    2: { bg: 'linear-gradient(145deg,#0A1F1A,#0C2218)', rgb: T, title: 'KEY PILLARS',
      cols: [{icon:'▲',lines:[88,65,75]},{icon:'●',lines:[80,70,90]},{icon:'■',lines:[95,78,68]}] },
    3: { bg: 'linear-gradient(145deg,#1A1528,#140E22)', rgb: P, title: 'SERVICE TIERS',
      cols: [{icon:'◆',lines:[75,60,80]},{icon:'★',lines:[92,85,70]},{icon:'✦',lines:[88,72,95]}] },
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

function CompareSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; title: string; left: string; right: string; rows: { label: string; l: boolean; r: boolean }[] }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#112038)', rgb: B, title: 'BEFORE vs AFTER', left: 'Before', right: 'After',
      rows: [{label:'Professional Layout',l:false,r:true},{label:'Data Visualized',l:false,r:true},{label:'On-Brand Design',l:false,r:true},{label:'Investor-Ready',l:false,r:true},{label:'Delivered 24h',l:false,r:true}] },
    2: { bg: 'linear-gradient(145deg,#1A1518,#0E0C10)', rgb: G, title: 'DIY vs PROFESSIONAL', left: 'DIY', right: 'PresentAIQ',
      rows: [{label:'Executive Quality',l:false,r:true},{label:'Think-Cell Charts',l:false,r:true},{label:'Revisions Included',l:false,r:true},{label:'Fast Turnaround',l:false,r:true},{label:'AI-Enhanced',l:false,r:true}] },
    3: { bg: 'linear-gradient(145deg,#0A1E18,#071512)', rgb: T, title: 'STANDARD vs PREMIUM', left: 'Std', right: 'Pro',
      rows: [{label:'Custom Infographics',l:false,r:true},{label:'Data Visualization',l:true,r:true},{label:'Brand Guidelines',l:true,r:true},{label:'Priority Delivery',l:false,r:true},{label:'Dedicated Designer',l:false,r:true}] },
  };
  const c = cfg[v];
  const tick = (yes: boolean, bright = false) => (
    <span style={{ fontSize:7,color:yes?(bright?`rgba(${c.rgb},.9)`:`rgba(${c.rgb},.5)`):`rgba(${c.rgb},.18)` }}>{yes?'✓':'–'}</span>
  );
  return (
    <div style={{ width:'100%',height:'100%',background:c.bg,borderRadius:10,padding:'8px 10px',display:'flex',flexDirection:'column',gap:4,boxShadow:`0 0 0 1px ${rgba(c.rgb,.2)},0 20px 60px rgba(0,0,0,.6)`,overflow:'hidden',position:'relative' }}>
      <span style={{ fontSize:4.5,letterSpacing:'0.15em',fontWeight:700,color:rgba(c.rgb,.6),textTransform:'uppercase',fontFamily:'monospace' }}>{c.title}</span>
      <div style={{ display:'flex',alignItems:'center',marginBottom:2 }}>
        <div style={{ flex:1 }} />
        <div style={{ width:32,textAlign:'center',fontSize:4,color:rgba(c.rgb,.4),fontFamily:'monospace' }}>{c.left}</div>
        <div style={{ width:32,textAlign:'center',fontSize:4.5,fontWeight:700,color:rgba(c.rgb,.8),fontFamily:'monospace' }}>{c.right}</div>
      </div>
      {c.rows.map((row, i) => (
        <div key={i} style={{ display:'flex',alignItems:'center',paddingLeft:2,borderLeft:`1px solid ${rgba(c.rgb,.1)}` }}>
          <div style={{ flex:1,fontSize:3.8,color:rgba(c.rgb,.5),fontFamily:'monospace' }}>{row.label}</div>
          <div style={{ width:32,textAlign:'center' }}>{tick(row.l)}</div>
          <div style={{ width:32,textAlign:'center' }}>{tick(row.r,true)}</div>
        </div>
      ))}
    </div>
  );
}

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

function QuoteSlide({ v }: { v: V }) {
  const cfg: Record<V, { bg: string; rgb: string; quote: string; name: string; role: string }> = {
    1: { bg: 'linear-gradient(145deg,#0D1A2E,#091420)', rgb: B,
      quote: '"The deck they delivered closed our $12M Series B. Investors were blown away by the quality."',
      name: 'Sarah Chen', role: 'CEO, Nexus AI' },
    2: { bg: 'linear-gradient(145deg,#1A1410,#100C08)', rgb: G,
      quote: '"I\'ve worked with design agencies globally. PresentAIQ is in a completely different league."',
      name: 'Marcus Webb', role: 'VP Strategy, Apex Corp' },
    3: { bg: 'linear-gradient(145deg,#0A1C18,#071410)', rgb: T,
      quote: '"Delivered overnight. Perfect quality. Worth every penny and then some. Will absolutely use again."',
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

/* ── Ticker ───────────────────────────────────────────────── */
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

export default function HeroTicker() {
  return (
    <>
      {/* Ticker rows */}
      <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',gap:12,overflow:'hidden',padding:'20px 0',zIndex:1 }}>
        <TickerRow cards={ROW1} dir="left"  speed="32s" />
        <TickerRow cards={ROW2} dir="right" speed="40s" />
        <TickerRow cards={ROW3} dir="left"  speed="26s" />
      </div>
      {/* Edge fades — use CSS class so they respect light/dark theme */}
      <div className="ticker-fade-top"    style={{ position:'absolute',top:0,left:0,right:0,height:'24%',zIndex:2,pointerEvents:'none' }} />
      <div className="ticker-fade-bottom" style={{ position:'absolute',bottom:0,left:0,right:0,height:'24%',zIndex:2,pointerEvents:'none' }} />
      <div className="ticker-fade-left"   style={{ position:'absolute',top:0,left:0,bottom:0,width:'10%',zIndex:2,pointerEvents:'none' }} />
      <div className="ticker-fade-right"  style={{ position:'absolute',top:0,right:0,bottom:0,width:'10%',zIndex:2,pointerEvents:'none' }} />
    </>
  );
}
