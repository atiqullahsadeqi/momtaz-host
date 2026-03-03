import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell
} from "recharts";
import {
  TrendingUp, Users, ShoppingCart, Headphones,
  Globe, Server, HardDrive, Shield,
  ChevronLeft, ChevronRight, Bell, Search,
  ArrowUpRight, ArrowDownRight, LayoutDashboard,
  FileText, MessageSquare, Settings, UserCog,
  Zap, MoreHorizontal, ExternalLink, Clock
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Aug", revenue: 4200 },
  { month: "Sep", revenue: 5800 },
  { month: "Oct", revenue: 5100 },
  { month: "Nov", revenue: 7200 },
  { month: "Dec", revenue: 6400 },
  { month: "Jan", revenue: 8900 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 8240 },
];

const serviceData = [
  { name: "VPS",       value: 38, color: "#3B82F6" },
  { name: "Shared",    value: 27, color: "#10B981" },
  { name: "Dedicated", value: 15, color: "#F59E0B" },
  { name: "Domains",   value: 20, color: "#8B5CF6" },
];

const orders = [
  { id: "MH-2025-041", client: "Ahmad Karimi",   initials: "AK", type: "vps",       amount: 28.80,  payment: "stripe", status: "active",          date: "Mar 1" },
  { id: "MH-2025-040", client: "Fatima Noori",   initials: "FN", type: "domain",     amount: 12.00,  payment: "cash",   status: "pending_payment", date: "Mar 1" },
  { id: "MH-2025-039", client: "Wahid Ahmadi",   initials: "WA", type: "dedicated",  amount: 180.00, payment: "stripe", status: "active",          date: "Feb 28" },
  { id: "MH-2025-038", client: "Mariam Sultani", initials: "MS", type: "shared",     amount: 8.40,   payment: "stripe", status: "processing",      date: "Feb 28" },
  { id: "MH-2025-037", client: "Khalid Rahimi",  initials: "KR", type: "vps",        amount: 44.00,  payment: "cash",   status: "active",          date: "Feb 27" },
];

const tickets = [
  { id: "TKT-089", client: "Ahmad Karimi",  subject: "VPS unreachable after reboot",    priority: "urgent", age: "1h" },
  { id: "TKT-088", client: "Nadia Yusuf",   subject: "DNS not propagating for domain",  priority: "high",   age: "3h" },
  { id: "TKT-087", client: "Omar Barakzai", subject: "Question about invoice INV-233",  priority: "medium", age: "1d" },
];

const invoiceEvents = {
  4:  [{ id:"INV-234", client:"Wahid Ahmadi",   amount:180,  type:"dedicated", status:"due" }],
  7:  [{ id:"INV-235", client:"Ahmad Karimi",   amount:28.8, type:"vps",       status:"due" }, { id:"INV-236", client:"Sara M.", amount:8.4, type:"shared", status:"due" }],
  10: [{ id:"INV-237", client:"Fatima Noori",   amount:12,   type:"domain",    status:"overdue" }],
  12: [{ id:"INV-238", client:"Khalid Rahimi",  amount:44,   type:"vps",       status:"due" }],
  15: [{ id:"INV-239", client:"Mariam Sultani", amount:8.4,  type:"shared",    status:"due" }, { id:"INV-240", client:"Nadia Y.", amount:28.8, type:"vps", status:"due" }],
  18: [{ id:"INV-241", client:"Omar Barakzai",  amount:95,   type:"dedicated", status:"due" }],
  22: [{ id:"INV-242", client:"Laila Ahmadi",   amount:12,   type:"domain",    status:"due" }],
  25: [{ id:"INV-243", client:"Yusuf Karimi",   amount:44,   type:"vps",       status:"due" }, { id:"INV-244", client:"Hawa S.", amount:8.4, type:"shared", status:"due" }],
  28: [{ id:"INV-245", client:"Dawud Noori",    amount:180,  type:"dedicated", status:"due" }],
};

const serverHealth = [
  { name: "VPS-01 (nbg1)",  cpu: 42, ram: 61, status: "Healthy" },
  { name: "VPS-02 (fsn1)",  cpu: 78, ram: 82, status: "Warning" },
  { name: "Dedicated-01",   cpu: 23, ram: 45, status: "Healthy" },
  { name: "Shared (WHM)",   cpu: 35, ram: 57, status: "Healthy" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(n);
const fmtK = n => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;

const SERVICE_COLORS = { vps:"#3B82F6", shared:"#10B981", dedicated:"#F59E0B", domain:"#8B5CF6" };
const SERVICE_SOFT   = { vps:"#EFF6FF", shared:"#ECFDF5", dedicated:"#FFFBEB", domain:"#F5F3FF" };
const SERVICE_LABELS = { vps:"VPS", shared:"Shared", dedicated:"Dedicated", domain:"Domain" };

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Sidebar ────────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: "Overview",   active: true },
  { icon: Users,           label: "Clients",    active: false },
  { icon: ShoppingCart,    label: "Orders",     active: false },
  { icon: FileText,        label: "Invoices",   active: false },
  { icon: Globe,           label: "Domains",    active: false },
  { icon: Server,          label: "Hosting",    active: false },
  { icon: MessageSquare,   label: "Quotations", active: false },
  { icon: Headphones,      label: "Support",    active: false },
  { icon: UserCog,         label: "Staff",      active: false },
  { icon: Settings,        label: "Settings",   active: false },
];

function Sidebar() {
  return (
    <div style={{width:220,background:"#fff",borderRight:"1px solid #EAECF0",display:"flex",flexDirection:"column",padding:"20px 12px",flexShrink:0,height:"100vh",position:"sticky",top:0}}>
      {/* Logo */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"0 8px",marginBottom:28}}>
        <div style={{width:30,height:30,background:"#111827",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Zap size={15} color="#fff"/>
        </div>
        <span style={{fontWeight:700,fontSize:14,color:"#111827",letterSpacing:"-0.3px"}}>Momtaz Host</span>
      </div>

      {/* Nav */}
      <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}}>
        <p style={{fontSize:10,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.08em",padding:"0 8px",marginBottom:6}}>Main</p>
        {navItems.slice(0,8).map(item => (
          <button key={item.label} style={{
            display:"flex",alignItems:"center",gap:10,padding:"9px 10px",
            borderRadius:8,border:"none",cursor:"pointer",textAlign:"left",width:"100%",
            background: item.active ? "#EFF6FF" : "transparent",
            borderLeft: item.active ? "2px solid #3B82F6" : "2px solid transparent",
            color: item.active ? "#2563EB" : "#6B7280",
            fontWeight: item.active ? 600 : 400,
            fontSize:13,
            transition:"all 0.15s",
          }}>
            <item.icon size={16}/>
            {item.label}
          </button>
        ))}
        <div style={{height:1,background:"#EAECF0",margin:"8px 8px"}}/>
        <p style={{fontSize:10,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.08em",padding:"0 8px",marginBottom:6}}>Admin</p>
        {navItems.slice(8).map(item => (
          <button key={item.label} style={{
            display:"flex",alignItems:"center",gap:10,padding:"9px 10px",
            borderRadius:8,border:"none",cursor:"pointer",textAlign:"left",width:"100%",
            background:"transparent", borderLeft:"2px solid transparent",
            color:"#6B7280", fontWeight:400, fontSize:13,
          }}>
            <item.icon size={16}/>
            {item.label}
          </button>
        ))}
      </div>

      {/* Admin profile */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 8px",background:"#F9FAFB",borderRadius:10,marginTop:12}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"#DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#2563EB",flexShrink:0}}>SA</div>
        <div style={{minWidth:0}}>
          <p style={{fontSize:13,fontWeight:600,color:"#111827",margin:0}}>Super Admin</p>
          <p style={{fontSize:11,color:"#9CA3AF",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>admin@momtazhost.com</p>
        </div>
      </div>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{height:60,background:"#fff",borderBottom:"1px solid #EAECF0",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",flexShrink:0,position:"sticky",top:0,zIndex:20}}>
      <div>
        <h1 style={{fontSize:16,fontWeight:700,color:"#111827",margin:0,letterSpacing:"-0.3px"}}>Dashboard Overview</h1>
        <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Sunday, March 1, 2025</p>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#F3F4F6",borderRadius:20,padding:"7px 14px"}}>
          <Search size={13} color="#9CA3AF"/>
          <span style={{fontSize:13,color:"#9CA3AF"}}>Search...</span>
        </div>
        <div style={{position:"relative"}}>
          <Bell size={18} color="#6B7280"/>
          <span style={{position:"absolute",top:-4,right:-4,width:16,height:16,background:"#EF4444",borderRadius:"50%",fontSize:9,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
        </div>
        <div style={{width:34,height:34,borderRadius:"50%",background:"#DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#2563EB"}}>SA</div>
      </div>
    </div>
  );
}

// ── KPI Card ───────────────────────────────────────────────────────────────
function KPICard({ icon: Icon, label, value, delta, up, sub, iconColor, iconBg }) {
  return (
    <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,padding:20}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
        <div style={{width:38,height:38,borderRadius:10,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon size={18} color={iconColor}/>
        </div>
        <ExternalLink size={14} color="#D1D5DB"/>
      </div>
      <div style={{fontSize:26,fontWeight:700,color:"#111827",letterSpacing:"-0.5px",fontFamily:"monospace",marginBottom:4}}>{value}</div>
      <div style={{fontSize:13,color:"#6B7280",marginBottom:10}}>{label}</div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{
          display:"inline-flex",alignItems:"center",gap:3,
          fontSize:11,fontWeight:600,padding:"2px 7px",borderRadius:20,
          background: up ? "#ECFDF5" : "#FEF2F2",
          color: up ? "#059669" : "#DC2626"
        }}>
          {up ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}
          {delta}
        </span>
        <span style={{fontSize:11,color:"#9CA3AF"}}>{sub}</span>
      </div>
    </div>
  );
}

// ── Custom Bar Tooltip ─────────────────────────────────────────────────────
function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:10,padding:"8px 12px",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",fontSize:12}}>
      <p style={{color:"#6B7280",marginBottom:4,fontWeight:600}}>{label}</p>
      <p style={{color:"#14B8A6",fontWeight:700,fontFamily:"monospace"}}>{fmtK(payload[0].value)}</p>
    </div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active:          { bg:"#ECFDF5", color:"#059669", label:"Active" },
    pending_payment: { bg:"#FFFBEB", color:"#D97706", label:"Pending Cash" },
    processing:      { bg:"#EFF6FF", color:"#2563EB", label:"Processing" },
    suspended:       { bg:"#FEF2F2", color:"#DC2626", label:"Suspended" },
    cancelled:       { bg:"#F3F4F6", color:"#6B7280", label:"Cancelled" },
  };
  const s = map[status] || map.cancelled;
  return <span style={{background:s.bg,color:s.color,fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:20}}>{s.label}</span>;
}

function PriorityBadge({ p }) {
  const map = {
    urgent: { bg:"#FEF2F2", color:"#DC2626", border:"#FECACA" },
    high:   { bg:"#FFF7ED", color:"#C2410C", border:"#FED7AA" },
    medium: { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A" },
    low:    { bg:"#F9FAFB", color:"#6B7280", border:"#E5E7EB" },
  };
  const s = map[p] || map.low;
  return <span style={{background:s.bg,color:s.color,border:`1px solid ${s.border}`,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,textTransform:"uppercase",letterSpacing:"0.05em"}}>{p}</span>;
}

// ── Invoice Calendar ───────────────────────────────────────────────────────
function InvoiceCalendar() {
  const [month, setMonth] = useState(2); // March
  const [year, setYear] = useState(2025);
  const [selected, setSelected] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = 1; // demo: today is March 1

  const cells = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];

  const monthTotal = Object.values(invoiceEvents).flat().reduce((a,e)=>a+e.amount,0);
  const overdueCount = Object.values(invoiceEvents).flat().filter(e=>e.status==="overdue").length;
  const selectedEvts = selected ? (invoiceEvents[selected] || []) : [];

  return (
    <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"16px 20px",borderBottom:"1px solid #EAECF0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Invoice Calendar</p>
          <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Upcoming due dates</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>setMonth(m=>m>0?m-1:11)} style={{width:28,height:28,borderRadius:8,border:"1px solid #EAECF0",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ChevronLeft size={14} color="#6B7280"/>
          </button>
          <span style={{fontSize:13,fontWeight:600,color:"#111827",minWidth:100,textAlign:"center"}}>{MONTHS[month]} {year}</span>
          <button onClick={()=>setMonth(m=>m<11?m+1:0)} style={{width:28,height:28,borderRadius:8,border:"1px solid #EAECF0",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ChevronRight size={14} color="#6B7280"/>
          </button>
        </div>
      </div>

      {/* Month summary strip */}
      <div style={{margin:"14px 16px 0",background:"#F9FAFB",borderRadius:10,padding:"10px 14px",display:"flex",gap:20}}>
        <div>
          <p style={{fontSize:10,color:"#9CA3AF",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",margin:0}}>Month Total</p>
          <p style={{fontSize:15,fontWeight:700,color:"#111827",fontFamily:"monospace",margin:0}}>{fmt(monthTotal)}</p>
        </div>
        <div style={{width:1,background:"#E5E7EB"}}/>
        <div>
          <p style={{fontSize:10,color:"#9CA3AF",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",margin:0}}>Due Dates</p>
          <p style={{fontSize:15,fontWeight:700,color:"#111827",fontFamily:"monospace",margin:0}}>{Object.keys(invoiceEvents).length}</p>
        </div>
        {overdueCount > 0 && <>
          <div style={{width:1,background:"#E5E7EB"}}/>
          <div>
            <p style={{fontSize:10,color:"#EF4444",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",margin:0}}>Overdue</p>
            <p style={{fontSize:15,fontWeight:700,color:"#EF4444",fontFamily:"monospace",margin:0}}>{overdueCount}</p>
          </div>
        </>}
      </div>

      {/* Calendar grid */}
      <div style={{padding:"14px 16px"}}>
        {/* Day headers */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
          {DAYS.map(d=>(
            <div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.08em",padding:"4px 0"}}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e${i}`}/>;
            const evts = invoiceEvents[day] || [];
            const isToday = day === today;
            const isSel = selected === day;
            const hasOverdue = evts.some(e=>e.status==="overdue");

            return (
              <button key={day} onClick={()=>setSelected(isSel ? null : day)} style={{
                aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"flex-start",paddingTop:6,borderRadius:8,border:"none",
                cursor: evts.length ? "pointer" : "default",
                background: isSel ? "#EFF6FF" : isToday ? "#111827" : "transparent",
                outline: isSel ? "1.5px solid #3B82F6" : "none",
                transition:"all 0.12s",
              }}>
                <span style={{
                  fontSize:12,fontWeight: isToday||isSel ? 700 : 400,lineHeight:1,
                  color: isToday ? "#fff" : isSel ? "#2563EB" : "#374151",
                }}>{day}</span>
                {evts.length > 0 && (
                  <div style={{display:"flex",gap:2,marginTop:3,flexWrap:"wrap",justifyContent:"center"}}>
                    {evts.slice(0,3).map((e,ei)=>(
                      <span key={ei} style={{width:5,height:5,borderRadius:"50%",background: e.status==="overdue" ? "#EF4444" : "#F59E0B",flexShrink:0}}/>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day panel */}
      {selected && (
        <div style={{borderTop:"1px solid #EAECF0",padding:"12px 16px"}}>
          <p style={{fontSize:11,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
            {MONTHS[month]} {selected} · {selectedEvts.length} invoice{selectedEvts.length!==1?"s":""}
          </p>
          {selectedEvts.length > 0 ? (
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {selectedEvts.map(ev=>(
                <div key={ev.id} style={{
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  background: ev.status==="overdue" ? "#FEF2F2" : "#F9FAFB",
                  border:`1px solid ${ev.status==="overdue" ? "#FECACA" : "#EAECF0"}`,
                  borderRadius:10,padding:"10px 12px",
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:SERVICE_COLORS[ev.type],flexShrink:0}}/>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:"#111827",margin:0}}>{ev.client}</p>
                      <p style={{fontSize:11,color:"#9CA3AF",margin:0,fontFamily:"monospace"}}>{ev.id} · {SERVICE_LABELS[ev.type]}</p>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <p style={{fontSize:13,fontWeight:700,color:"#111827",margin:0,fontFamily:"monospace"}}>{fmt(ev.amount)}</p>
                    <span style={{fontSize:10,fontWeight:600,color: ev.status==="overdue" ? "#EF4444" : "#D97706",textTransform:"capitalize"}}>{ev.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{fontSize:13,color:"#9CA3AF",textAlign:"center",padding:"12px 0"}}>No invoices on this date</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Mini Bar ───────────────────────────────────────────────────────────────
function MiniBar({ value }) {
  const color = value > 80 ? "#EF4444" : value > 65 ? "#F59E0B" : "#10B981";
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:5,background:"#F3F4F6",borderRadius:4,overflow:"hidden"}}>
        <div style={{width:`${value}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.5s"}}/>
      </div>
      <span style={{fontSize:11,fontWeight:600,fontFamily:"monospace",color,width:30,textAlign:"right"}}>{value}%</span>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeBar, setActiveBar] = useState(null);

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#F7F8FA",fontFamily:"'DM Sans',system-ui,sans-serif",fontSize:14,color:"#111827"}}>
      <Sidebar/>

      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto"}}>
        <Header/>

        {/* Page content */}
        <div style={{padding:"24px 28px",display:"flex",flexDirection:"column",gap:20}}>

          {/* Action banner */}
          <div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,background:"#FEF3C7",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:15}}>⚠️</span>
              </div>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:"#92400E",margin:0}}>2 cash orders pending your approval</p>
                <p style={{fontSize:12,color:"#B45309",margin:0}}>Confirm only after collecting payment from clients</p>
              </div>
            </div>
            <button style={{background:"#F59E0B",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              Review Now →
            </button>
          </div>

          {/* ── Row 1: KPI Cards ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            <KPICard icon={TrendingUp}   label="Monthly Revenue" value="$8,240" delta="12%" up={true}  sub="vs last month" iconColor="#14B8A6" iconBg="#F0FDFA"/>
            <KPICard icon={Users}        label="Total Clients"   value="128"    delta="4 new" up={true}  sub="this week"    iconColor="#3B82F6" iconBg="#EFF6FF"/>
            <KPICard icon={ShoppingCart} label="Active Orders"   value="47"     delta="3 new" up={true}  sub="this week"    iconColor="#8B5CF6" iconBg="#F5F3FF"/>
            <KPICard icon={Headphones}   label="Open Tickets"    value="6"      delta="2 urgent" up={false} sub="need action" iconColor="#F59E0B" iconBg="#FFFBEB"/>
          </div>

          {/* ── Row 2: Revenue Chart + Donut ── */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
            {/* Bar chart */}
            <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,padding:"20px 20px 12px"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
                <div>
                  <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Revenue Overview</p>
                  <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Monthly performance</p>
                </div>
                <div style={{display:"flex",gap:4}}>
                  {["1M","3M","6M","1Y"].map((t,i)=>(
                    <button key={t} style={{
                      padding:"4px 10px",borderRadius:8,border:"1px solid #EAECF0",
                      background: i===2 ? "#111827" : "#fff",
                      color: i===2 ? "#fff" : "#6B7280",
                      fontSize:11,fontWeight:600,cursor:"pointer"
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData} margin={{top:0,right:0,bottom:0,left:-15}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                  <XAxis dataKey="month" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
                  <Tooltip content={<BarTooltip/>} cursor={{fill:"rgba(0,0,0,0.03)"}}/>
                  <Bar dataKey="revenue" radius={[6,6,0,0]}>
                    {revenueData.map((entry, index) => (
                      <Cell key={index} fill={index === revenueData.length-1 ? "#14B8A6" : "#E5E7EB"}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut */}
            <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,padding:20}}>
              <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Services</p>
              <p style={{fontSize:12,color:"#9CA3AF",marginBottom:12}}>Active breakdown</p>
              <div style={{position:"relative"}}>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={serviceData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" strokeWidth={2} stroke="#fff">
                      {serviceData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
                    </Pie>
                    <Tooltip formatter={(v,n)=>[`${v}%`,n]} contentStyle={{background:"#fff",border:"1px solid #EAECF0",borderRadius:10,fontSize:12}}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>133</div>
                  <div style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>Active</div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
                {serviceData.map(s=>(
                  <div key={s.name} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:s.color,flexShrink:0}}/>
                    <span style={{fontSize:12,color:"#6B7280",flex:1}}>{s.name}</span>
                    <span style={{fontSize:12,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 3: Recent Orders ── */}
          <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"16px 20px",borderBottom:"1px solid #EAECF0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Recent Orders</p>
                <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Latest activity</p>
              </div>
              <button style={{fontSize:13,color:"#3B82F6",background:"none",border:"none",cursor:"pointer",fontWeight:500}}>View all →</button>
            </div>
            {/* Table header */}
            <div style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 0.8fr 0.8fr 0.8fr 1fr 0.6fr",padding:"10px 20px",background:"#F9FAFB",borderBottom:"1px solid #F3F4F6"}}>
              {["Order","Client","Type","Amount","Payment","Status","Date"].map(h=>(
                <span key={h} style={{fontSize:11,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</span>
              ))}
            </div>
            {orders.map((o,i)=>(
              <div key={o.id} style={{
                display:"grid",gridTemplateColumns:"1.2fr 1.5fr 0.8fr 0.8fr 0.8fr 1fr 0.6fr",
                padding:"13px 20px",borderBottom: i<orders.length-1 ? "1px solid #F3F4F6" : "none",
                alignItems:"center",
              }}>
                <span style={{fontSize:12,color:"#6B7280",fontFamily:"monospace"}}>{o.id}</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:SERVICE_SOFT[o.type],display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:SERVICE_COLORS[o.type],flexShrink:0}}>{o.initials}</div>
                  <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>{o.client}</span>
                </div>
                <span style={{
                  fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:20,display:"inline-block",
                  background:SERVICE_SOFT[o.type],color:SERVICE_COLORS[o.type]
                }}>{SERVICE_LABELS[o.type]}</span>
                <span style={{fontSize:13,fontWeight:700,color:"#111827",fontFamily:"monospace"}}>{fmt(o.amount)}</span>
                <span style={{fontSize:12,color:"#6B7280"}}>{o.payment==="stripe"?"💳 Stripe":"💵 Cash"}</span>
                <StatusBadge status={o.status}/>
                <span style={{fontSize:12,color:"#9CA3AF"}}>{o.date}</span>
              </div>
            ))}
          </div>

          {/* ── Row 4: Calendar + Tickets ── */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
            <InvoiceCalendar/>

            {/* Tickets */}
            <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,overflow:"hidden"}}>
              <div style={{padding:"16px 20px",borderBottom:"1px solid #EAECF0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Support Tickets</p>
                  <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Needs attention</p>
                </div>
                <span style={{background:"#FEF2F2",color:"#EF4444",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>6 open</span>
              </div>
              <div style={{padding:16,display:"flex",flexDirection:"column",gap:8}}>
                {tickets.map(t=>(
                  <div key={t.id} style={{background:"#F9FAFB",border:"1px solid #EAECF0",borderRadius:10,padding:"11px 13px",cursor:"pointer"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:6}}>
                      <p style={{fontSize:13,fontWeight:600,color:"#111827",margin:0,lineHeight:1.4}}>{t.subject}</p>
                      <PriorityBadge p={t.priority}/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#9CA3AF"}}>
                      <span>{t.client}</span>
                      <span>·</span>
                      <span style={{fontFamily:"monospace"}}>{t.id}</span>
                      <span>·</span>
                      <Clock size={10}/>
                      <span>{t.age}</span>
                    </div>
                  </div>
                ))}
                {/* Mini stats */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:4}}>
                  {[{l:"Urgent",v:1,c:"#EF4444"},{l:"High",v:2,c:"#F97316"},{l:"Medium",v:3,c:"#F59E0B"}].map(s=>(
                    <div key={s.l} style={{background:"#F9FAFB",border:"1px solid #EAECF0",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                      <p style={{fontSize:18,fontWeight:700,color:s.c,fontFamily:"monospace",margin:0}}>{s.v}</p>
                      <p style={{fontSize:10,color:"#9CA3AF",margin:0}}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Row 5: Infrastructure cards ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[
              { icon:Server,   label:"VPS Servers",    value:"18", sub:"2 provisioning", color:"#3B82F6", soft:"#EFF6FF", pct:36 },
              { icon:HardDrive,label:"Dedicated",       value:"5",  sub:"all healthy",    color:"#F59E0B", soft:"#FFFBEB", pct:50 },
              { icon:Shield,   label:"Shared Accounts", value:"67", sub:"on WHM",         color:"#10B981", soft:"#ECFDF5", pct:67 },
              { icon:Globe,    label:"Active Domains",  value:"43", sub:"3 expiring soon",color:"#8B5CF6", soft:"#F5F3FF", pct:43 },
            ].map(s=>(
              <div key={s.label} style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,padding:"16px 18px",cursor:"pointer",transition:"box-shadow 0.15s"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:s.soft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <s.icon size={17} color={s.color}/>
                  </div>
                  <div>
                    <p style={{fontSize:20,fontWeight:700,color:"#111827",fontFamily:"monospace",margin:0,lineHeight:1}}>{s.value}</p>
                    <p style={{fontSize:12,fontWeight:500,color:"#6B7280",margin:0}}>{s.label}</p>
                  </div>
                </div>
                <MiniBar value={s.pct}/>
                <p style={{fontSize:11,color:"#9CA3AF",margin:"6px 0 0"}}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Row 6: Server Health ── */}
          <div style={{background:"#fff",border:"1px solid #EAECF0",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"16px 20px",borderBottom:"1px solid #EAECF0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontSize:14,fontWeight:600,color:"#111827",margin:0}}>Server Health</p>
                <p style={{fontSize:12,color:"#9CA3AF",margin:0}}>Hetzner Cloud + WHM</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#10B981",display:"inline-block"}}/>
                <span style={{fontSize:12,color:"#10B981",fontWeight:600}}>Live</span>
              </div>
            </div>
            <div style={{padding:"0 20px"}}>
              {/* Table header */}
              <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1.5fr 1.5fr 0.8fr 0.5fr",padding:"10px 0",borderBottom:"1px solid #F3F4F6"}}>
                {["Server","Type","CPU Usage","RAM Usage","Status",""].map(h=>(
                  <span key={h} style={{fontSize:11,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</span>
                ))}
              </div>
              {serverHealth.map((s,i)=>(
                <div key={s.name} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1.5fr 1.5fr 0.8fr 0.5fr",padding:"13px 0",borderBottom: i<serverHealth.length-1?"1px solid #F3F4F6":"none",alignItems:"center"}}>
                  <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>{s.name}</span>
                  <span style={{fontSize:12,color:"#6B7280"}}>{s.name.includes("WHM") ? "Shared" : s.name.includes("Ded") ? "Dedicated" : "VPS"}</span>
                  <div style={{paddingRight:16}}><MiniBar value={s.cpu}/></div>
                  <div style={{paddingRight:16}}><MiniBar value={s.ram}/></div>
                  <span style={{
                    fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:20,display:"inline-block",
                    background: s.status==="Warning" ? "#FFFBEB" : "#ECFDF5",
                    color: s.status==="Warning" ? "#D97706" : "#059669",
                  }}>{s.status}</span>
                  <button style={{fontSize:12,color:"#3B82F6",background:"none",border:"none",cursor:"pointer"}}>View</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
