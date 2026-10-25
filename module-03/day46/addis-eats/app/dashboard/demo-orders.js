const areas=["Bole","Kazanchis","Megenagna","Piassa"],dates=["2026-10-20","2026-10-19","2026-10-18","2026-10-17","2026-10-16","2026-10-15","2026-10-14"];
const source=Array.from({length:23},(_,i)=>({id:`AE-${String(1048+i).padStart(5,"0")}`,neighborhood:areas[(i*3+Math.floor(i/4))%4],date:dates[i%7],revenue:[780,1250,640,1890,920,1450,530,1100][i%8],status:["Delivered","Preparing","Delivered","On the way"][i%4]}));
export function getDashboardData(){
 const revenueByNeighborhood=areas.map(label=>({label,value:source.filter(o=>o.neighborhood===label).reduce((s,o)=>s+o.revenue,0)}));
 const revenueByDate=[...dates].reverse().map(date=>({label:date.slice(5).replace("-","/"),value:source.filter(o=>o.date===date).reduce((s,o)=>s+o.revenue,0)}));
 const revenue=source.reduce((s,o)=>s+o.revenue,0);
 return {summary:{revenue,orders:source.length,average:Math.round(revenue/source.length)},revenueByNeighborhood,revenueByDate,orders:source.map(({id,neighborhood,date,revenue,status})=>({id,neighborhood,date,revenue,status}))};
}
