/* ShipMind AI - FINAL WORKING FRONTEND */
(() => {
  'use strict';
  const shipments = [
    {id:'SPX-28491',route:'Chennai → Hyderabad',customer:'Nova Retail',status:'In Transit',eta:'Tomorrow · 2:40 PM',risk:'Low',phone:'+91 98765 12001',vehicle:'TN 38 AB 4521',driver:'Arun Kumar',location:'Bengaluru, Karnataka',from:'Chennai, Tamil Nadu',to:'Hyderabad, Telangana',type:'Electronics',weight:'18.5 kg',value:'₹48,500',progress:78},
    {id:'SPX-28477',route:'Bengaluru → Pune',customer:'TechMart',status:'In Transit',eta:'Oct 07 · 11:20 AM',risk:'Medium',phone:'+91 98765 12002',vehicle:'KA 05 MN 7812',driver:'Vijay Rao',location:'Hubballi, Karnataka',from:'Bengaluru, Karnataka',to:'Pune, Maharashtra',type:'Consumer Goods',weight:'32 kg',value:'₹72,000',progress:61},
    {id:'SPX-28465',route:'Chennai → Mumbai',customer:'Urban Cart',status:'At Risk',eta:'Oct 08 · 4:10 PM',risk:'High',phone:'+91 98765 12003',vehicle:'TN 09 CD 8821',driver:'Karthik S',location:'Chennai Hub',from:'Chennai, Tamil Nadu',to:'Mumbai, Maharashtra',type:'Fashion',weight:'44 kg',value:'₹1,15,000',progress:39},
    {id:'SPX-28442',route:'Hyderabad → Delhi',customer:'Apex Stores',status:'Delivered',eta:'Today · 1:05 PM',risk:'Low',phone:'+91 98765 12004',vehicle:'TS 08 EF 2345',driver:'Ramesh Kumar',location:'Delhi, Delhi',from:'Hyderabad, Telangana',to:'Delhi, Delhi',type:'Retail Stock',weight:'21 kg',value:'₹55,000',progress:100},
    {id:'SPX-28431',route:'Pune → Chennai',customer:'Green Basket',status:'In Transit',eta:'Oct 06 · 6:30 PM',risk:'Low',phone:'+91 98765 12005',vehicle:'MH 12 GH 9102',driver:'Suresh Patil',location:'Krishnagiri, Tamil Nadu',from:'Pune, Maharashtra',to:'Chennai, Tamil Nadu',type:'Grocery',weight:'27 kg',value:'₹39,800',progress:72},
    {id:'SPX-28419',route:'Mumbai → Bengaluru',customer:'Orbit Labs',status:'Delivered',eta:'Today · 10:40 AM',risk:'Low',phone:'+91 98765 12006',vehicle:'MH 04 JK 3321',driver:'Imran Khan',location:'Bengaluru, Karnataka',from:'Mumbai, Maharashtra',to:'Bengaluru, Karnataka',type:'IT Hardware',weight:'12 kg',value:'₹92,000',progress:100},
    {id:'SPX-28398',route:'Chennai → Kochi',customer:'Coastal Mart',status:'At Risk',eta:'Oct 07 · 9:00 PM',risk:'High',phone:'+91 98765 12007',vehicle:'TN 41 LM 6204',driver:'Manoj R',location:'Coimbatore, Tamil Nadu',from:'Chennai, Tamil Nadu',to:'Kochi, Kerala',type:'Home Supplies',weight:'36 kg',value:'₹61,400',progress:55},
    {id:'SPX-28377',route:'Delhi → Hyderabad',customer:'Prime Goods',status:'In Transit',eta:'Oct 09 · 3:45 PM',risk:'Medium',phone:'+91 98765 12008',vehicle:'DL 01 PQ 7821',driver:'Deepak Singh',location:'Agra, Uttar Pradesh',from:'Delhi, Delhi',to:'Hyderabad, Telangana',type:'Industrial Parts',weight:'64 kg',value:'₹1,42,000',progress:43}
  ];
  let currentFilter='All';
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const safe = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function toast(msg){const t=$('#toast'); if(!t)return; t.textContent=msg; t.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove('show'),2300)}
  function closeOverlays(){ $$('.overlay').forEach(x=>x.classList.remove('show')); }
  function showPage(id){
    const page=$('#'+id); if(!page)return;
    $$('.page').forEach(p=>p.classList.remove('activePage'));
    page.classList.add('activePage');
    $$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===id));
    $$('.sidebar').forEach(s=>s.classList.remove('open'));
    closeOverlays();
    if(id==='dashboard') drawChart('performanceChart');
    if(id==='analytics') drawChart('analyticsChart');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function riskClass(s){return s==='At Risk'?'red':s==='Delivered'?'green':'orange'}
  function renderDash(){
    const box=$('#dashRows'); if(!box)return;
    box.innerHTML=shipments.slice(0,4).map(s=>`<div class="shipRow"><span class="shipIcon">▣</span><div><b>${safe(s.id)}</b><small>${safe(s.route)}</small></div><span class="pill ${riskClass(s.status)}">${safe(s.status)}</span><b>${safe(s.eta.split(' · ')[0])}</b></div>`).join('');
  }
  function renderShipments(){
    const table=$('#shipmentTable'); if(!table)return;
    const q=($('#shipmentSearch')?.value||'').trim().toLowerCase();
    const data=shipments.filter(s=>(currentFilter==='All'||s.status===currentFilter)&&Object.values(s).join(' ').toLowerCase().includes(q));
    table.innerHTML=data.length?data.map(s=>`<tr><td><b>${safe(s.id)}</b></td><td>${safe(s.route)}</td><td>${safe(s.customer)}</td><td><span class="pill ${riskClass(s.status)}">${safe(s.status)}</span></td><td>${safe(s.eta)}</td><td>${safe(s.risk)}</td><td><button class="ghost trackBtn" data-id="${safe(s.id)}">Track ↗</button></td></tr>`).join(''):`<tr><td colspan="7" style="text-align:center;padding:30px">No shipments found.</td></tr>`;
  }
  function selectedShipment(id){return shipments.find(s=>s.id===id)||shipments[0]}
  function openTracking(id){
    const s=selectedShipment(id); if(!s)return;
    $('#selectedId').textContent=s.id;
    $('#trackingDetails').innerHTML=`
      <div class="detailGrid">
        <div><span>Customer</span><b>${safe(s.customer)}</b></div><div><span>Phone</span><b>${safe(s.phone)}</b></div>
        <div><span>Current location</span><b>${safe(s.location)}</b></div><div><span>Vehicle</span><b>${safe(s.vehicle)}</b></div>
        <div><span>Driver</span><b>${safe(s.driver)}</b></div><div><span>Package type</span><b>${safe(s.type)}</b></div>
        <div><span>Weight</span><b>${safe(s.weight)}</b></div><div><span>Shipment value</span><b>${safe(s.value)}</b></div>
        <div><span>Origin</span><b>${safe(s.from)}</b></div><div><span>Destination</span><b>${safe(s.to)}</b></div>
      </div>
      <div class="progressWrap"><div><span>Delivery progress</span><b>${s.progress}%</b></div><i><u style="width:${s.progress}%"></u></i></div>`;
    const eta=$('#trackingEta'); if(eta)eta.innerHTML=`<small>Estimated arrival</small><b>${safe(s.eta)}</b><span>AI confidence · ${s.risk==='High'?78:s.risk==='Medium'?86:92}%</span>`;
    showPage('tracking'); toast('Tracking '+s.id);
  }
  function answer(q){
    q=(q||'Give me a shipment summary').trim();
    const atRisk=shipments.filter(s=>s.status==='At Risk').length;
    const delivered=shipments.filter(s=>s.status==='Delivered').length;
    return `<div class="response"><b>✦ ShipMind AI Response</b><p style="margin:9px 0">I analyzed your logistics data for: <b>“${safe(q)}”</b></p><hr style="border:0;border-top:1px solid #eee;margin:10px 0"><b>Summary</b><p style="margin-top:5px">${atRisk} sample shipments are flagged as at risk and ${delivered} sample shipments are delivered. Network on-time performance is <b>98.2%</b>.</p><p style="margin-top:8px"><b>Recommendation:</b> Review Chennai → Mumbai and Chennai → Kochi, then proactively notify affected customers.</p></div>`;
  }
  function drawChart(id){
    const c=$('#'+id); if(!c)return; const ctx=c.getContext('2d'); if(!ctx)return;
    const d=window.devicePixelRatio||1,w=c.clientWidth||700,h=220;c.width=w*d;c.height=h*d;ctx.clearRect(0,0,w*d,h*d);ctx.scale(d,d);
    ctx.strokeStyle='#edf0f5';ctx.lineWidth=1;for(let y=25;y<h;y+=42){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
    const vals=[55,82,68,112,96,146,128,175],max=190;ctx.strokeStyle='#7c3aed';ctx.lineWidth=3;ctx.beginPath();vals.forEach((v,i)=>{const x=i*(w/(vals.length-1)),y=h-(v/max*h)-15;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
    vals.forEach((v,i)=>{const x=i*(w/(vals.length-1)),y=h-(v/max*h)-15;ctx.fillStyle='#7c3aed';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill()});
  }
  function init(){
    renderDash();renderShipments();drawChart('performanceChart');
    $$('.nav').forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
    document.addEventListener('click',e=>{
      const go=e.target.closest('[data-page-go]'); if(go){e.preventDefault();showPage(go.dataset.pageGo);return;}
      const track=e.target.closest('.trackBtn'); if(track){openTracking(track.dataset.id);return;}
      const close=e.target.closest('[data-close]'); if(close){closeOverlays();return;}
    });
    $('#shipmentSearch')?.addEventListener('input',renderShipments);
    $$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;renderShipments()}));
    $('#globalSearch')?.addEventListener('click',()=>$('#commandModal')?.classList.add('show'));
    $('#cmdBtn')?.addEventListener('click',()=>$('#commandModal')?.classList.add('show'));
    $('#newShipment')?.addEventListener('click',()=>$('#newModal')?.classList.add('show'));
    $('#mobileMenu')?.addEventListener('click',()=>$('.sidebar')?.classList.toggle('open'));
    $('#bell')?.addEventListener('click',()=>showPage('notifications'));
    $$('[data-open-ai]').forEach(b=>b.addEventListener('click',()=>showPage('assistant')));
    document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#commandModal')?.classList.add('show');$('#commandInput')?.focus()}if(e.key==='Escape')closeOverlays()});
    $('#commandInput')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('#commandList button').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(q)?'block':'none')});
    $$('.suggestions button').forEach(b=>b.addEventListener('click',()=>{$('#assistantInput').value=b.dataset.query;$('#assistantAsk').click()}));
    $('#assistantAsk')?.addEventListener('click',()=>$('#assistantAnswer').innerHTML=answer($('#assistantInput').value));
    $('#assistantInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('#assistantAsk').click()});
    $('#searchAsk')?.addEventListener('click',()=>$('#searchResult').innerHTML=answer($('#searchQuery').value));
    $('#askData')?.addEventListener('click',()=>{showPage('search');$('#searchQuery').value='Show me the highest risk shipments';$('#searchAsk').click()});
    $('#copilotScan')?.addEventListener('click',()=>{$('#copilotResult').innerHTML=answer('Run a full network risk scan');toast('AI network scan completed')});
    $('#generateContent')?.addEventListener('click',()=>{const type=$('#contentType').value,topic=$('#contentTopic').value||'shipment SPX-28491';$('#contentResult').value=`Hello,\n\nThis is an update regarding ${topic}.\n\n${type}: Our AI logistics system is monitoring the shipment closely and optimizing the route. We will keep you updated on the expected delivery.\n\nThank you,\nShipMind Logistics`;toast('AI content generated')});
    $('#summarize')?.addEventListener('click',()=>{const text=$('#docText').value.trim();$('#summaryResult').innerHTML=`<div class="response"><b>✦ AI Summary</b><p style="margin-top:8px">${text?'The document contains '+text.split(/\s+/).length+' words. Key items to review include shipment IDs, dates, routes, costs and exceptions.':'Please paste a document first. ShipMind can summarize manifests, invoices, emails and shipment notes.'}</p></div>`});
    $('#makeChart')?.addEventListener('click',()=>{drawChart('analyticsChart');toast('AI chart generated')});
    $('#period')?.addEventListener('change',()=>{drawChart('performanceChart');toast('Chart updated')});
    const report=()=>{if(!$('#reportOutput'))return;$('#reportOutput').innerHTML=`<div class="card" style="margin-top:15px"><label>AI-GENERATED REPORT</label><h2 style="margin-top:6px">Executive Logistics Summary</h2><p style="font-size:10px;color:#788397;margin-top:5px">Generated for Sandeep · ${new Date().toLocaleDateString()}</p><p style="font-size:11px;line-height:1.8;margin-top:15px"><b>Performance:</b> 98.2% successful delivery rate.<br><b>Volume:</b> 1,284 shipments analyzed.<br><b>Risk:</b> 23 shipments flagged, 7 high priority.<br><b>Optimization:</b> ₹84,200 estimated opportunity across four routes.</p><button class="primary exportBtn" style="margin-top:12px">Export PDF ↗</button></div>`;toast('AI report generated')};
    $('#generateReport')?.addEventListener('click',report);$$('.generate').forEach(b=>b.addEventListener('click',report));
    $('#reportOutput')?.addEventListener('click',e=>{if(e.target.closest('.exportBtn'))toast('Demo PDF export ready')});
    $('#createShipment')?.addEventListener('click',()=>{const c=$('#newCustomer').value||'New Customer',r=$('#newRoute').value||'Chennai → Delhi',e=$('#newEta').value||'Oct 10',id='SPX-'+(28500+shipments.length);shipments.unshift({id,route:r,customer:c,status:'In Transit',eta:e,risk:'Low',phone:'+91 90000 00000',vehicle:'TN 00 AA 0000',driver:'New Driver',location:'Chennai Hub',from:r.split(' → ')[0],to:r.split(' → ')[1]||'Delhi',type:'General',weight:'10 kg',value:'₹10,000',progress:15});renderShipments();renderDash();closeOverlays();showPage('shipments');toast(id+' created successfully')});
    $('#invite')?.addEventListener('click',()=>toast('Invitation dialog ready — demo mode'));
    $('#clearNotifications')?.addEventListener('click',()=>{$$('.notification').forEach(n=>n.classList.remove('unread'));toast('All notifications marked as read')});
    $('#saveSettings')?.addEventListener('click',()=>{const n=$('#nameInput').value||'Sandeep';$$('.profile b').forEach(x=>x.textContent=n);toast('Settings saved successfully')});
    $('#themeBtn')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.theme=document.body.classList.contains('dark')?'dark':'light'});if(localStorage.theme==='dark')document.body.classList.add('dark');
    window.addEventListener('resize',()=>{drawChart('performanceChart');drawChart('analyticsChart')});
    if(!window.matchMedia('(pointer: coarse)').matches){const dot=document.createElement('div'),ring=document.createElement('div');dot.className='cursorDot';ring.className='cursorRing';document.body.append(dot,ring);let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;document.documentElement.style.setProperty('--mx',mx+'px');document.documentElement.style.setProperty('--my',my+'px');dot.style.left=mx+'px';dot.style.top=my+'px'});(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();document.addEventListener('mouseover',e=>{if(e.target.closest('button,a,input,textarea,select,.card,.nav'))ring.classList.add('hover')});document.addEventListener('mouseout',e=>{if(e.target.closest('button,a,input,textarea,select,.card,.nav'))ring.classList.remove('hover')})}
  }
  window.showPage=showPage;window.openTracking=openTracking;
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
