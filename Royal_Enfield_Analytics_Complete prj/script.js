const dashboardData = {
  2024:{sales:8420,revenue:248000000,bookings:10350,customers:7850,growth:8.4,revenueGrowth:7.8,
    monthly:[520,580,610,640,690,720,680,750,710,760,820,930],
    models:{"Classic 350":2450,"Hunter 350":2100,"Bullet 350":1650,"Meteor 350":1050,"Himalayan":720,"Interceptor":450},
    funnel:{visitors:185000,leads:45200,rides:21400,bookings:10350},retention:76,service:91,marketing:18500000},
  2025:{sales:9180,revenue:276000000,bookings:11250,customers:8540,growth:9.1,revenueGrowth:11.3,
    monthly:[590,620,670,710,730,760,740,790,810,850,920,990],
    models:{"Classic 350":2680,"Hunter 350":2380,"Bullet 350":1720,"Meteor 350":1080,"Himalayan":820,"Interceptor":500},
    funnel:{visitors:205000,leads:49800,rides:23600,bookings:11250},retention:78,service:92,marketing:20100000},
  2026:{sales:10450,revenue:318000000,bookings:12680,customers:9670,growth:13.8,revenueGrowth:15.2,
    monthly:[680,720,760,810,840,870,820,900,910,960,1050,1130],
    models:{"Classic 350":3020,"Hunter 350":2760,"Bullet 350":1910,"Meteor 350":1210,"Himalayan":950,"Interceptor":600},
    funnel:{visitors:238000,leads:58200,rides:28100,bookings:12680},retention:81,service:94,marketing:22800000},
  2027:{sales:11890,revenue:369000000,bookings:14180,customers:10950,growth:13.8,revenueGrowth:16.0,
    monthly:[760,790,830,870,920,960,930,990,1010,1080,1190,1270],
    models:{"Classic 350":3380,"Hunter 350":3090,"Bullet 350":2180,"Meteor 350":1320,"Himalayan":1120,"Interceptor":800},
    funnel:{visitors:272000,leads:65100,rides:31600,bookings:14180},retention:84,service:95,marketing:25600000}
};
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let currentYear=Number(localStorage.getItem("reYear"))||2026;
let charts={};

const $=id=>document.getElementById(id);
const num=n=>Number(n).toLocaleString("en-IN");
const cr=n=>"₹"+(Number(n)/10000000).toFixed(1)+" Cr";
const money=n=>"₹"+Number(n).toLocaleString("en-IN");

function setText(id,value){const e=$(id);if(e)e.textContent=value}
function setAll(sel,value){document.querySelectorAll(sel).forEach(e=>e.textContent=value)}
function validYear(y){return !!dashboardData[Number(y)]}

function setYear(year,source="page"){
  year=Number(year);
  const msg=$("yearMessage")||$("salesYearMessage")||$("reportYearMessage");
  if(!validYear(year)){if(msg){msg.textContent="Please enter a year from 2024 to 2027.";setTimeout(()=>msg.textContent="",2500)}return false}
  currentYear=year; localStorage.setItem("reYear",String(year));
  const d=dashboardData[year];
  setAll("[data-year]",year);
  ["displayYear","salesDisplayYear","reportDisplayYear"].forEach(id=>setText(id,year));
  ["yearInput","salesYearInput","reportYearInput"].forEach(id=>{if($(id))$(id).value=year});
  document.querySelectorAll("[data-set-year],[data-sales-year],[data-report-year]").forEach(b=>{
    const v=Number(b.dataset.setYear||b.dataset.salesYear||b.dataset.reportYear);
    b.classList.toggle("selected",v===year);
  });
  updateCommon(d);
  updateDashboard(d);
  updateSales(d);
  updateCustomers(d);
  updateModelsPage(d);
  updateMarketing(d);
  updateFinance(d);
  updateReports(d);
  return true;
}

function updateCommon(d){
  setText("sales",num(d.sales)); setText("growth",d.growth.toFixed(1)+"%");
  setText("revenue",cr(d.revenue)); setText("revGrowth",d.revenueGrowth.toFixed(1)+"%");
  setText("bookings",num(d.bookings)); setText("customers",num(d.customers));
}

function updateDashboard(d){
  setText("salesKpi",num(d.sales)); setText("growthKpi",d.growth.toFixed(1)+"%"); setText("growthKpi2",d.growth.toFixed(1)+"%");
  setText("revenueKpi",cr(d.revenue)); setText("revGrowthKpi",d.revenueGrowth.toFixed(1)+"%"); setText("revGrowthKpi2",d.revenueGrowth.toFixed(1)+"%");
  setText("bookingsKpi",num(d.bookings)); setText("customersKpi",num(d.customers));
  setText("visitors",num(d.funnel.visitors));setText("leads",num(d.funnel.leads));
  setText("rides",num(d.funnel.rides));setText("bookings",num(d.funnel.bookings));
  renderModels("models",d.models);
  renderLine("monthlyChart",d.monthly,"Monthly Sales");
  renderDoughnut("modelChart",d.models);
}

function updateSales(d){
  if(!$("salesMonthlyChart")&&!$("salesModelChart"))return;
  setText("sales",num(d.sales));setText("growth","+"+d.growth.toFixed(1)+"%");
  setText("revenue",cr(d.revenue));setText("revGrowth","+"+d.revenueGrowth.toFixed(1)+"%");
  setText("bookings",num(d.bookings));setText("customers",num(d.customers));
  renderLine("salesMonthlyChart",d.monthly,"Sales");
  renderDoughnut("salesModelChart",d.models);
  renderSalesTable(d);
  const entries=Object.entries(d.models).sort((a,b)=>b[1]-a[1]);
  setText("topModel",entries[0][0]);setText("bestMonth",months[d.monthly.indexOf(Math.max(...d.monthly))]);
  setText("averageSales",num(Math.round(d.sales/12)));setText("salesInsightGrowth",d.growth.toFixed(1)+"%");
}

function updateCustomers(d){
  if(!$("retention")&&!$("conv"))return;
  setText("customers",num(d.customers));setText("bookings",num(d.bookings));setText("rides",num(d.funnel.rides));
  setText("conv",(d.bookings/d.funnel.visitors*100).toFixed(2)+"%");
  setText("visitors",num(d.funnel.visitors));setText("leads",num(d.funnel.leads));setText("retention",d.retention+"%");setText("service",d.service+"%");setText("customerRides",num(d.funnel.rides));setText("customerBookings",num(d.funnel.bookings));
}

function updateModelsPage(d){
  if(!$("modelDoughnut"))return;
  renderModels("models",d.models);renderDoughnut("modelDoughnut",d.models);
}

function updateMarketing(d){
  if(!$("marketing"))return;
  setText("marketing",cr(d.marketing));setText("customers",num(d.customers));setText("bookings",num(d.bookings));
  setText("retention",d.retention+"%");setText("conversion",(d.bookings/d.funnel.leads*100).toFixed(2)+"%");
  setText("reach",num(d.funnel.visitors));setText("leads",num(d.funnel.leads));
}

function updateFinance(d){
  if(!$("rps"))return;
  setText("revenue",cr(d.revenue));setText("sales",num(d.sales));setText("marketing",cr(d.marketing));setText("financeGrowth",d.revenueGrowth.toFixed(1)+"%");
  setText("revGrowth",d.revenueGrowth.toFixed(1)+"%");setText("growth",d.growth.toFixed(1)+"%");
  setText("rps",money(Math.round(d.revenue/d.sales)));
  setText("profitEstimate",cr(d.revenue-d.marketing));setText("roi",((d.revenue-d.marketing)/d.marketing*100).toFixed(0)+"%");
}

function updateReports(d){
  if(!$("modelTable")&&!$("monthlyTable"))return;
  setText("sales",num(d.sales));setText("growth",d.growth.toFixed(1)+"%");
  setText("revenue",cr(d.revenue));setText("revGrowth",d.revenueGrowth.toFixed(1)+"%");
  setText("bookings",num(d.bookings));setText("customers",num(d.customers));
  const total=Object.values(d.models).reduce((a,b)=>a+b,0);
  if($("modelTable"))$("modelTable").innerHTML=Object.entries(d.models).sort((a,b)=>b[1]-a[1]).map(([m,v])=>`<tr><td>${m}</td><td>${num(v)}</td><td>${(v/total*100).toFixed(1)}%</td></tr>`).join("");
  if($("monthlyTable"))$("monthlyTable").innerHTML=d.monthly.map((v,i)=>`<tr><td>${months[i]}</td><td>${num(v)}</td><td>${(v/d.monthly.reduce((a,b)=>a+b,0)*100).toFixed(1)}%</td></tr>`).join("");
  const top=Object.entries(d.models).sort((a,b)=>b[1]-a[1])[0];
  setText("topModel",top?top[0]:"—");setText("bestMonth",months[d.monthly.indexOf(Math.max(...d.monthly))]);
  setText("averageSales",num(Math.round(d.sales/12)));setText("reportGrowth",d.growth.toFixed(1)+"%");
}

function renderModels(id,models){
  const box=$(id);if(!box)return;
  const max=Math.max(...Object.values(models));
  box.innerHTML=Object.entries(models).map(([name,value])=>`<div class="model-card"><div class="model-name">${name}</div><div class="model-number">${num(value)} <span>units</span></div><div class="model-bar"><i style="width:${value/max*100}%"></i></div></div>`).join("");
}
function renderSalesTable(d){
  const t=$("salesModelTable");if(!t)return;
  const total=Object.values(d.models).reduce((a,b)=>a+b,0);
  t.innerHTML=Object.entries(d.models).sort((a,b)=>b[1]-a[1]).map(([m,v])=>`<tr><td>${m}</td><td>${num(v)}</td><td>${(v/total*100).toFixed(1)}%</td></tr>`).join("");
}
function chartDefaults(){
  return {responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"#aaa",boxWidth:10}},tooltip:{backgroundColor:"#111",titleColor:"#fff",bodyColor:"#ddd"}},scales:{x:{ticks:{color:"#888"},grid:{display:false}},y:{beginAtZero:true,ticks:{color:"#888"},grid:{color:"rgba(255,255,255,.06)"}}}};
}
function renderLine(id,data,label){
  const c=$(id);if(!c||typeof Chart==="undefined")return;
  if(charts[id])charts[id].destroy();
  charts[id]=new Chart(c,{type:"line",data:{labels:months,datasets:[{label,data,borderColor:"#e21b23",backgroundColor:"rgba(226,27,35,.16)",fill:true,tension:.4,borderWidth:3,pointRadius:3}]},options:chartDefaults()});
}
function renderDoughnut(id,models){
  const c=$(id);if(!c||typeof Chart==="undefined")return;
  if(charts[id])charts[id].destroy();
  charts[id]=new Chart(c,{type:"doughnut",data:{labels:Object.keys(models),datasets:[{data:Object.values(models),backgroundColor:["#e21b23","#ff4b51","#c4141b","#8d1015","#666","#aaa"],borderColor:"#111",borderWidth:3,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:"62%",plugins:{legend:{position:"bottom",labels:{color:"#aaa",padding:12,boxWidth:10}}}}});
}

function setupYearControls(){
  [["yearBtn","yearInput"],["salesYearBtn","salesYearInput"],["reportYearBtn","reportYearInput"]].forEach(([bid,iid])=>{
    const b=$(bid),i=$(iid);if(b)b.addEventListener("click",()=>setYear(i.value));
    if(i)i.addEventListener("keydown",e=>{if(e.key==="Enter")setYear(i.value)});
  });
  document.querySelectorAll("[data-set-year],[data-sales-year],[data-report-year]").forEach(b=>{
    b.addEventListener("click",()=>setYear(b.dataset.setYear||b.dataset.salesYear||b.dataset.reportYear));
  });
}
function setupTheme(){
  const b=$("themeBtn");if(!b)return;
  const light=localStorage.getItem("reTheme")==="light";document.body.classList.toggle("light-mode",light);b.textContent=light?"☾":"☀";
  b.addEventListener("click",()=>{const on=document.body.classList.toggle("light-mode");localStorage.setItem("reTheme",on?"light":"dark");b.textContent=on?"☾":"☀"});
}
function setupReports(){
  const print=$("printBtn"),csv=$("csvBtn");
  if(print)print.onclick=()=>window.print();
  if(csv)csv.onclick=()=>{
    const d=dashboardData[currentYear];let rows=[["Royal Enfield Report",currentYear],["Sales",d.sales],["Revenue",d.revenue],["Bookings",d.bookings],["Customers",d.customers],[],["Model","Units"],...Object.entries(d.models),[],["Month","Sales"],...d.monthly.map((v,i)=>[months[i],v])];
    const blob=new Blob([rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n")],{type:"text/csv"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`royal-enfield-report-${currentYear}.csv`;a.click();URL.revokeObjectURL(a.href);
  };
}
function setupRealtime(){
  if(!$("liveVisitors"))return;
  const d=dashboardData[currentYear];
  let base={v:Math.round(d.funnel.visitors/1000),l:Math.round(d.funnel.leads/1000),b:Math.round(d.bookings/1000)};
  const tick=()=>{base.v+=Math.floor(Math.random()*9)-4;base.l+=Math.floor(Math.random()*5)-2;base.b+=Math.random()>.7?1:0;setText("liveVisitors",num(Math.max(0,base.v*1000)));setText("liveLeads",num(Math.max(0,base.l*1000)));setText("liveBookings",num(Math.max(0,base.b*1000)))};
  tick();setInterval(tick,2500);
}
document.addEventListener("DOMContentLoaded",()=>{setupYearControls();setupTheme();setupReports();setupRealtime();setYear(currentYear)});
