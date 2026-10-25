import Link from "next/link";
import { getSession } from "../data/session";
import { getDashboardData } from "./demo-orders";
import { NeighborhoodChart, OrdersChart } from "./RevenueCharts";
export const metadata = { title: "Revenue dashboard", robots: { index: false, follow: false } };
const money = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });
const fields = ["id", "date", "neighborhood", "revenue", "status"], size = 8;
function href(params, changes) { const q = new URLSearchParams(); for (const [k,v] of Object.entries({...params,...changes})) if(v) q.set(k,String(v)); return `/dashboard${q.size?`?${q}`:""}`; }
function Header({state,params}) { return <div className="dashboard-header"><div><p className="eyebrow">ADDIS EATS · OPERATIONS</p><h1>Revenue dashboard</h1><p className="dashboard-subtitle">Sales and order activity across Addis Ababa.</p></div><div className="state-switcher" aria-label="Dashboard state demonstrations"><span>View state</span>{["data","loading","empty","error"].map(s=><Link key={s} href={href(params,{state:s,page:1})} aria-current={state===s?"page":undefined}>{s[0].toUpperCase()+s.slice(1)}</Link>)}</div></div>; }
function Metric({label,value,note}) { return <article className="metric-card"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>; }
function SortHeading({label,field,sort,dir,params}) { const active=sort===field,next=active&&dir==="asc"?"desc":"asc"; return <th scope="col" aria-sort={active?(dir==="asc"?"ascending":"descending"):"none"}><Link href={href(params,{sort:field,dir:next,page:1})}>{label}<span aria-hidden="true"> {active?(dir==="asc"?"ASC":"DESC"):""}</span></Link></th>; }
export default async function DashboardPage({searchParams}) {
 const session=await getSession();
 if(!session||session.role!=="staff") return <main className="dashboard"><h1>Staff access required</h1><p>Sign in with a staff account to view this dashboard.</p><Link href="/sign-in">Sign in</Link></main>;
 const q=await searchParams,state=["loading","empty","error"].includes(q.state)?q.state:"data",params={state,sort:q.sort,dir:q.dir,page:q.page};
 if(state!=="data") return <main className="dashboard"><Header state={state} params={params}/>{state==="loading"?<div className="state-panel" role="status"><span className="loading-mark" aria-hidden="true"/><h2>Loading dashboard data</h2><p>Fetching the latest revenue and order summaries…</p></div>:state==="error"?<div className="state-panel error-panel" role="alert"><h2>We couldn’t load the dashboard</h2><p>The order summary service is unavailable. Try again when the connection is restored.</p><Link className="button-link" href={href(params,{state:"data",page:1})}>Retry dashboard</Link></div>:<div className="state-panel"><span className="empty-icon" aria-hidden="true">—</span><h2>No orders yet</h2><p>Revenue charts and order details will appear here when orders are available.</p></div>}</main>;
 const data=getDashboardData(),sort=fields.includes(q.sort)?q.sort:"date",dir=q.dir==="asc"?"asc":"desc";
 const sorted=[...data.orders].sort((a,b)=>{const n=typeof a[sort]==="number"?a[sort]-b[sort]:String(a[sort]).localeCompare(String(b[sort]));return dir==="asc"?n:-n;});
 const pageCount=Math.ceil(sorted.length/size),asked=Number.parseInt(q.page||"1",10)||1,page=Math.min(Math.max(1,asked),pageCount),rows=sorted.slice((page-1)*size,page*size);
 return <main className="dashboard"><Header state={state} params={params}/>
 <section className="metric-grid" aria-label="Revenue summary"><Metric label="Total revenue" value={money.format(data.summary.revenue)} note="Across all neighbourhoods"/><Metric label="Orders" value={data.summary.orders} note="In the last 7 days"/><Metric label="Average order" value={money.format(data.summary.average)} note="Revenue per order"/></section>
 <div className="chart-grid"><NeighborhoodChart rows={data.revenueByNeighborhood}/><OrdersChart rows={data.revenueByDate}/></div>
 <section className="dash-card order-section"><div className="order-heading"><div><h2>Recent orders</h2><p>{data.orders.length} orders · sorted by {sort}</p></div><span className="chart-period">ETB</span></div><div className="table-scroll"><table className="orders-table"><caption>Recent customer orders</caption><thead><tr><SortHeading label="Order" field="id" sort={sort} dir={dir} params={params}/><SortHeading label="Neighbourhood" field="neighborhood" sort={sort} dir={dir} params={params}/><SortHeading label="Date" field="date" sort={sort} dir={dir} params={params}/><SortHeading label="Revenue (ETB)" field="revenue" sort={sort} dir={dir} params={params}/><SortHeading label="Status" field="status" sort={sort} dir={dir} params={params}/></tr></thead><tbody>{rows.map(o=><tr key={o.id}><th scope="row">{o.id}</th><td>{o.neighborhood}</td><td><time dateTime={o.date}>{new Date(o.date+"T00:00:00").toLocaleDateString("en-ET",{day:"numeric",month:"short",year:"numeric"})}</time></td><td>{money.format(o.revenue)}</td><td><span className="status-badge">{o.status}</span></td></tr>)}</tbody></table></div><nav className="pagination" aria-label="Order table pages"><span>Page {page} of {pageCount}</span><div>{page>1&&<Link href={href(params,{page:page-1})} rel="prev">Previous</Link>}{page<pageCount&&<Link href={href(params,{page:page+1})} rel="next">Next</Link>}</div></nav></section></main>;
}



