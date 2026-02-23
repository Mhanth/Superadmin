import { useState, useEffect, useRef } from "react";
const T = {
  bg: "#070d1b", surface: "#0e1a2e", surface2: "#162035", surface3: "#1c2a40",
  border: "rgba(255,255,255,0.06)", borderHover: "rgba(255,255,255,0.12)",
  accent: "#00c6ff", accent2: "#7c5cfc", green: "#00e98d", orange: "#ff8c42",
  red: "#ff4b6e", yellow: "#ffc844", text: "#dde7f5", muted: "#4d6a8a", mutedLight: "#7a99bc"
};

const HOSPITALS = [
  { id: 1, name: "Apollo Nagpur", location: "Nagpur, MH", contact: "Dr. Ramesh Iyer", email: "admin@apollonagpur.in", phone: "+91 9876543210", type: "SaaS", plan: "Enterprise", status: "Active", modules: 10, users: 48, startDate: "2024-01-15", expiry: "2026-01-14", paymentStatus: "Paid", gstin: "27AAPFU0939F1ZV", revenue: 480000 },
  { id: 2, name: "City Care Pune", location: "Pune, MH", contact: "Dr. Sneha Patil", email: "admin@citycarepune.in", phone: "+91 9123456789", type: "On-Prem", plan: "Standard", status: "Active", modules: 7, users: 22, startDate: "2024-03-10", expiry: "2026-02-28", paymentStatus: "Paid", gstin: "27BBBPT1234A1ZQ", revenue: 180000 },
  { id: 3, name: "LifeLine Mumbai", location: "Mumbai, MH", contact: "Mr. Aakash Shah", email: "admin@lifelinemumbai.in", phone: "+91 9988776655", type: "SaaS", plan: "Trial", status: "Trial", modules: 3, users: 5, startDate: "2025-12-20", expiry: "2026-01-30", paymentStatus: "Pending", gstin: "", revenue: 0 },
  { id: 4, name: "MedCare Delhi", location: "New Delhi, DL", contact: "Dr. Priya Kapoor", email: "admin@medcaredelhi.in", phone: "+91 9011223344", type: "On-Prem", plan: "Enterprise", status: "Active", modules: 10, users: 65, startDate: "2023-08-01", expiry: "2026-07-31", paymentStatus: "Paid", gstin: "07AABCM4567D1ZX", revenue: 720000 },
  { id: 5, name: "Sunrise Jaipur", location: "Jaipur, RJ", contact: "Dr. Mohit Gupta", email: "admin@sunrisejaipur.in", phone: "+91 9555666777", type: "SaaS", plan: "Standard", status: "Suspended", modules: 0, users: 0, startDate: "2024-06-01", expiry: "2025-12-31", paymentStatus: "Overdue", gstin: "08AAFCS8901G2ZY", revenue: 120000 },
  { id: 6, name: "Rainbow Children Blr", location: "Bengaluru, KA", contact: "Dr. Kavitha R.", email: "admin@rainbowblr.in", phone: "+91 9444333222", type: "SaaS", plan: "Basic", status: "Active", modules: 5, users: 14, startDate: "2025-02-01", expiry: "2026-02-18", paymentStatus: "Paid", gstin: "29AABCR2345E1ZT", revenue: 96000 },
  { id: 7, name: "Fortis Hyderabad", location: "Hyderabad, TS", contact: "Dr. Suresh Reddy", email: "admin@fortishyd.in", phone: "+91 9700112233", type: "On-Prem", plan: "Enterprise", status: "Active", modules: 9, users: 38, startDate: "2024-02-15", expiry: "2026-02-05", paymentStatus: "Paid", gstin: "36AADCF6789H1ZU", revenue: 560000 },
  { id: 8, name: "HealthFirst Bhopal", location: "Bhopal, MP", contact: "Dr. Anita Singh", email: "admin@healthfirstbpl.in", phone: "+91 9333444555", type: "SaaS", plan: "Basic", status: "Active", modules: 4, users: 8, startDate: "2026-01-10", expiry: "2027-01-09", paymentStatus: "Paid", gstin: "23AABCH3456I1ZS", revenue: 72000 },
];

const ALL_MODULES = [
  { id: "opd", name: "Registration & OPD", icon: "🏥" },
  { id: "ipd", name: "IPD & Bed Management", icon: "🛏️" },
  { id: "emr", name: "EMR / EHR", icon: "📋" },
  { id: "pharmacy", name: "Pharmacy", icon: "💊" },
  { id: "lab", name: "Laboratory", icon: "🔬" },
  { id: "radiology", name: "Radiology", icon: "📡" },
  { id: "billing", name: "Billing & Accounts", icon: "💳" },
  { id: "hr", name: "HR & Payroll", icon: "👤" },
  { id: "inventory", name: "Inventory", icon: "📦" },
  { id: "reports", name: "Reports & Analytics", icon: "📊" },
  { id: "mobile", name: "Mobile App Access", icon: "📱" },
];

const PLANS = [
  { name: "Trial", price: 0, duration: 30, maxModules: 3, maxUsers: 5, color: T.muted },
  { name: "Basic", price: 8000, duration: 365, maxModules: 5, maxUsers: 15, color: T.yellow },
  { name: "Standard", price: 15000, duration: 365, maxModules: 8, maxUsers: 30, color: T.accent },
  { name: "Enterprise", price: 40000, duration: 365, maxModules: 11, maxUsers: 999, color: T.accent2 },
];

const INVOICES = [
  { id: "INV-2026-001", hospital: "Apollo Nagpur", amount: 480000, plan: "Enterprise", date: "2026-01-15", due: "2026-01-30", status: "Paid", gstin: "27AAPFU0939F1ZV" },
  { id: "INV-2026-002", hospital: "MedCare Delhi", amount: 720000, plan: "Enterprise", date: "2026-01-08", due: "2026-01-23", status: "Paid", gstin: "07AABCM4567D1ZX" },
  { id: "INV-2026-003", hospital: "Fortis Hyderabad", amount: 560000, plan: "Enterprise", date: "2026-01-10", due: "2026-01-25", status: "Paid", gstin: "36AADCF6789H1ZU" },
  { id: "INV-2026-004", hospital: "City Care Pune", amount: 180000, plan: "Standard", date: "2026-01-12", due: "2026-01-27", status: "Paid", gstin: "27BBBPT1234A1ZQ" },
  { id: "INV-2026-005", hospital: "LifeLine Mumbai", amount: 0, plan: "Trial", date: "2025-12-20", due: "2026-01-04", status: "Pending", gstin: "" },
  { id: "INV-2026-006", hospital: "Sunrise Jaipur", amount: 120000, plan: "Standard", date: "2025-12-01", due: "2025-12-16", status: "Overdue", gstin: "08AAFCS8901G2ZY" },
  { id: "INV-2026-007", hospital: "Rainbow Children Blr", amount: 96000, plan: "Basic", date: "2026-01-18", due: "2026-02-02", status: "Paid", gstin: "29AABCR2345E1ZT" },
  { id: "INV-2026-008", hospital: "HealthFirst Bhopal", amount: 72000, plan: "Basic", date: "2026-01-10", due: "2026-01-25", status: "Paid", gstin: "23AABCH3456I1ZS" },
];

const USERS_INTERNAL = [
  { id: 1, name: "Ravi Sharma", email: "ravi@pulsehis.com", role: "Super Admin", dept: "Operations", status: "Active", lastLogin: "2026-01-23 09:14", access: "Full Control" },
  { id: 2, name: "Priya Kapoor", email: "priya@pulsehis.com", role: "Support", dept: "Support", status: "Active", lastLogin: "2026-01-23 08:52", access: "Edit" },
  { id: 3, name: "Anil Mehta", email: "anil@pulsehis.com", role: "Sales", dept: "Sales", status: "Active", lastLogin: "2026-01-22 17:30", access: "Read Only" },
  { id: 4, name: "Deepa Nair", email: "deepa@pulsehis.com", role: "Finance", dept: "Finance", status: "Active", lastLogin: "2026-01-23 10:01", access: "Edit" },
  { id: 5, name: "Karan Joshi", email: "karan@pulsehis.com", role: "Product", dept: "Product", status: "Inactive", lastLogin: "2026-01-18 14:22", access: "Read Only" },
];

const SUPPORT_TICKETS = [
  { id: "TKT-001", hospital: "LifeLine Mumbai", subject: "Login not working for nurses", priority: "High", status: "Open", created: "2026-01-23", assignee: "Priya Kapoor" },
  { id: "TKT-002", hospital: "City Care Pune", subject: "Pharmacy module showing error", priority: "Medium", status: "In Progress", created: "2026-01-22", assignee: "Anil Mehta" },
  { id: "TKT-003", hospital: "Rainbow Children Blr", subject: "Reports not exporting to PDF", priority: "Low", status: "Resolved", created: "2026-01-20", assignee: "Priya Kapoor" },
  { id: "TKT-004", hospital: "Apollo Nagpur", subject: "Need additional user licenses", priority: "Medium", status: "Open", created: "2026-01-23", assignee: "Ravi Sharma" },
  { id: "TKT-005", hospital: "Fortis Hyderabad", subject: "Backup not running since 2 days", priority: "High", status: "In Progress", created: "2026-01-21", assignee: "Ravi Sharma" },
];

const ACTIVITY_LOG = [
  { id: 1, action: "Plan upgraded to Enterprise", hospital: "Apollo Nagpur", by: "Ravi S.", time: "2 min ago", icon: "⬆️", color: T.green },
  { id: 2, action: "Subscription suspended (non-payment)", hospital: "Sunrise Jaipur", by: "Auto-System", time: "1 hr ago", icon: "🚫", color: T.red },
  { id: 3, action: "New hospital onboarded", hospital: "HealthFirst Bhopal", by: "Priya K.", time: "3 hr ago", icon: "🏨", color: T.accent },
  { id: 4, action: "Renewal alert sent via email", hospital: "LifeLine Mumbai", by: "Auto-System", time: "5 hr ago", icon: "🔔", color: T.yellow },
  { id: 5, action: "Radiology module disabled", hospital: "City Care Pune", by: "Anil M.", time: "Yesterday", icon: "🧩", color: T.accent2 },
  { id: 6, action: "Payment received ₹5,60,000", hospital: "Fortis Hyderabad", by: "Finance Team", time: "Yesterday", icon: "💳", color: T.green },
  { id: 7, action: "Support ticket #TKT-003 resolved", hospital: "Rainbow Children Blr", by: "Priya K.", time: "2 days ago", icon: "✅", color: T.green },
  { id: 8, action: "IP restriction enabled", hospital: "MedCare Delhi", by: "Ravi S.", time: "2 days ago", icon: "🔐", color: T.orange },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const daysLeft = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
const fmt = (n) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;
const statusColor = (s) => ({ Active: T.green, Trial: T.yellow, Suspended: T.red, "In Progress": T.orange, Open: T.red, Resolved: T.green, Paid: T.green, Pending: T.yellow, Overdue: T.red }[s] || T.muted);
const planColor = (p) => ({ Enterprise: T.accent2, Standard: T.accent, Basic: T.yellow, Trial: T.muted }[p] || T.muted);
const initials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

// ─── COMMON COMPONENTS ───────────────────────────────────────────────────────
const css = (obj) => Object.entries(obj).map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}:${v}`).join(";");

function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const bg = { success: T.green, error: T.red, info: T.accent, warning: T.orange }[type];
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, background: T.surface2, border: `1px solid ${bg}`, borderLeft: `4px solid ${bg}`, borderRadius: 10, padding: "12px 18px", color: T.text, fontSize: 13, display: "flex", alignItems: "center", gap: 10, zIndex: 9999, boxShadow: `0 8px 32px rgba(0,0,0,0.5)`, minWidth: 260, animation: "slideUp .25s ease" }}>
      <span>{type === "success" ? "✅" : type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️"}</span>
      <span>{msg}</span>
    </div>
  );
}

function Modal({ title, onClose, children, width = 560 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, width, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", padding: 0 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16 }}>{title}</div>
          <button onClick={onClose} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: T.mutedLight, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 12px", color: T.text, fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />;
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 12px", color: T.text, fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false }) {
  const bg = variant === "primary" ? T.accent : variant === "danger" ? T.red : variant === "success" ? T.green : T.surface2;
  const col = (variant === "primary" || variant === "danger" || variant === "success") ? "#000" : T.text;
  const pad = size === "sm" ? "5px 12px" : "8px 18px";
  return <button onClick={onClick} disabled={disabled} style={{ background: bg, color: col, border: variant === "ghost" ? `1px solid ${T.border}` : "none", borderRadius: 8, padding: pad, fontSize: size === "sm" ? 12 : 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif", opacity: disabled ? 0.5 : 1, transition: "opacity .15s", whiteSpace: "nowrap" }}>{children}</button>;
}

function Badge({ text, color }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${color}18`, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>● {text}</span>;
}

function Card({ title, action, children, style = {} }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", ...style }}>
      {title && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{title}</div>
        {action}
      </div>}
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function KpiCard({ icon, val, label, trend, trendUp, color }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", position: "relative", overflow: "hidden", transition: "transform .2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 70, height: 70, borderRadius: "0 14px 0 70px", background: color, opacity: 0.12 }} />
      <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{label}</div>
      {trend && <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10, fontSize: 11, fontWeight: 700, background: `${trendUp ? T.green : T.red}15`, color: trendUp ? T.green : T.red, padding: "2px 8px", borderRadius: 20 }}>{trendUp ? "↑" : "↓"} {trend}</div>}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{ width: 38, height: 20, background: on ? T.green : T.surface3, borderRadius: 20, cursor: "pointer", position: "relative", border: `1px solid ${on ? T.green : T.border}`, transition: "all .2s", flexShrink: 0 }}>
      <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: on ? 21 : 2, transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );
}

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "7px 12px", fontSize: 13, color: T.muted }}>
      <span>🔍</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ background: "none", border: "none", outline: "none", color: T.text, fontSize: 13, fontFamily: "'DM Sans',sans-serif", width: "100%" }} />
    </div>
  );
}

function Table({ cols, rows, onRowClick }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {cols.map(c => <th key={c.key} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} onClick={() => onRowClick && onRowClick(r)} style={{ cursor: onRowClick ? "pointer" : "default" }}
              onMouseEnter={e => { for (const td of e.currentTarget.children) td.style.background = T.surface2; }}
              onMouseLeave={e => { for (const td of e.currentTarget.children) td.style.background = ""; }}>
              {cols.map(c => <td key={c.key} style={{ padding: "12px 14px", fontSize: 13, borderBottom: `1px solid ${T.border}`, verticalAlign: "middle", transition: "background .15s" }}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={cols.length} style={{ padding: "40px", textAlign: "center", color: T.muted, fontSize: 13 }}>No records found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return <div style={{ height: 4, background: T.surface3, borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width .5s ease" }} /></div>;
}

function PageHeader({ title, sub, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", gap: 10 }}>{children}</div>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

// DASHBOARD
function Dashboard({ hospitals, onToast }) {
  const active = hospitals.filter(h => h.status === "Active").length;
  const expiring = hospitals.filter(h => daysLeft(h.expiry) <= 30 && h.status !== "Suspended").length;
  const totalRev = hospitals.reduce((s, h) => s + h.revenue, 0);
  const moduleUsage = ALL_MODULES.map(m => ({ ...m, count: Math.floor(Math.random() * 60 + 50) }));

  const barData = [
    { month: "Aug", val: 28 }, { month: "Sep", val: 34 }, { month: "Oct", val: 38 },
    { month: "Nov", val: 42 }, { month: "Dec", val: 40 }, { month: "Jan", val: 48 }
  ];
  const maxBar = Math.max(...barData.map(b => b.val));

  return (
    <div>
      <PageHeader title="Dashboard" sub="Welcome back, Ravi. Here's your system overview." />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <KpiCard icon="🏨" val={hospitals.length} label="Total Hospitals" trend="8 this month" trendUp color={T.accent} />
        <KpiCard icon="✅" val={active} label="Active Subscriptions" trend="87.9% rate" trendUp color={T.green} />
        <KpiCard icon="⚠️" val={expiring} label="Expiring in 30 Days" trend="3 urgent" trendUp={false} color={T.orange} />
        <KpiCard icon="💰" val={fmt(totalRev)} label="Total Revenue" trend="12% vs last month" trendUp color={T.accent2} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Revenue Chart */}
        <Card title="Monthly Revenue (₹L)">
          <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
            {[["This Month", "₹48.2L", T.accent], ["Outstanding", "₹6.1L", T.orange], ["Avg/Hospital", "₹38.9K", T.green]].map(([l, v, c]) => (
              <div key={l}><div style={{ fontSize: 11, color: T.muted }}>{l}</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: c }}>{v}</div></div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, padding: "0 4px" }}>
            {barData.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(b.val / maxBar) * 100}%`, background: i === 5 ? `linear-gradient(to top,${T.accent},${T.accent}88)` : `linear-gradient(to top,${T.accent2},${T.accent2}55)`, borderRadius: "6px 6px 0 0", transition: "opacity .2s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"} />
                </div>
                <div style={{ fontSize: 10, color: i === 5 ? T.accent : T.muted, fontWeight: i === 5 ? 700 : 400 }}>{b.month}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Expiry Alerts */}
        <Card title="⏳ Expiry Alerts" action={<Btn variant="ghost" size="sm">Send All</Btn>}>
          {hospitals.filter(h => daysLeft(h.expiry) <= 30 && h.status !== "Suspended").sort((a, b) => daysLeft(a.expiry) - daysLeft(b.expiry)).slice(0, 4).map(h => {
            const d = daysLeft(h.expiry);
            const c = d <= 10 ? T.red : d <= 20 ? T.orange : T.yellow;
            return (
              <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{h.expiry} · {h.plan}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: c }}>{d}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>days left</div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Module Usage */}
        <Card title="Module Adoption">
          {ALL_MODULES.slice(0, 6).map((m, i) => {
            const count = [118, 102, 97, 74, 61, 55][i];
            const pct = Math.round(count / hospitals.length * 100);
            return (
              <div key={m.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span>{m.icon} {m.name}</span><span style={{ color: T.muted }}>{count}/{hospitals.length}</span>
                </div>
                <ProgressBar pct={pct} color={[T.accent, T.accent2, T.green, T.yellow, T.orange, T.red][i]} />
              </div>
            );
          })}
        </Card>

        {/* System Health */}
        <Card title="System Health">
          {[["API Server", "ok"], ["Database Cluster", "ok"], ["Backup Service", "warn"], ["Email / SMS Gateway", "ok"], ["WhatsApp API", "ok"], ["File Storage", "warn"]].map(([name, s]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s === "ok" ? T.green : T.orange, boxShadow: `0 0 6px ${s === "ok" ? T.green : T.orange}`, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: s === "ok" ? T.green : T.orange }}>{s === "ok" ? "Operational" : "Degraded"}</span>
            </div>
          ))}
        </Card>

        {/* Activity Feed */}
        <Card title="Recent Activity">
          {ACTIVITY_LOG.slice(0, 6).map(a => (
            <div key={a.id} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{a.action}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{a.hospital} · {a.time}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// HOSPITAL MANAGEMENT
function HospitalManagement({ hospitals, setHospitals, onToast }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewHosp, setViewHosp] = useState(null);

  const blankForm = { name: "", location: "", contact: "", email: "", phone: "", type: "SaaS", plan: "Basic", status: "Active", gstin: "" };
  const [form, setForm] = useState(blankForm);

  const filtered = hospitals.filter(h => {
    const q = search.toLowerCase();
    return (h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.contact.toLowerCase().includes(q))
      && (filterType === "All" || h.type === filterType)
      && (filterStatus === "All" || h.status === filterStatus);
  });

  const openEdit = (h) => { setForm({ ...h }); setSelected(h); setShowAdd(true); };
  const openAdd = () => { setForm(blankForm); setSelected(null); setShowAdd(true); };

  const save = () => {
    if (!form.name || !form.location || !form.contact) { onToast("Please fill required fields", "error"); return; }
    if (selected) {
      setHospitals(prev => prev.map(h => h.id === selected.id ? { ...h, ...form } : h));
      onToast("Hospital updated successfully", "success");
    } else {
      setHospitals(prev => [...prev, { ...form, id: Date.now(), modules: 0, users: 0, startDate: new Date().toISOString().split("T")[0], expiry: "", paymentStatus: "Pending", revenue: 0 }]);
      onToast("Hospital onboarded successfully!", "success");
    }
    setShowAdd(false);
  };

  const suspend = (h) => {
    setHospitals(prev => prev.map(x => x.id === h.id ? { ...x, status: x.status === "Suspended" ? "Active" : "Suspended" } : x));
    onToast(`${h.name} ${h.status === "Suspended" ? "activated" : "suspended"}`, "info");
  };

  const deleteH = (h) => {
    setHospitals(prev => prev.filter(x => x.id !== h.id));
    onToast(`${h.name} deleted`, "warning");
  };

  const cols = [
    { key: "name", label: "Hospital", render: r => <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🏥</div><div><div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div><div style={{ fontSize: 11, color: T.muted }}>{r.location}</div></div></div> },
    { key: "type", label: "Type", render: r => <Badge text={r.type} color={r.type === "SaaS" ? T.accent : T.accent2} /> },
    { key: "plan", label: "Plan", render: r => <span style={{ fontSize: 11, fontWeight: 700, background: `${planColor(r.plan)}18`, color: planColor(r.plan), padding: "2px 8px", borderRadius: 4 }}>{r.plan}</span> },
    { key: "status", label: "Status", render: r => <Badge text={r.status} color={statusColor(r.status)} /> },
    { key: "modules", label: "Modules" },
    { key: "users", label: "Users" },
    { key: "expiry", label: "Expiry", render: r => { const d = daysLeft(r.expiry); return <span style={{ color: d <= 30 ? T.orange : T.mutedLight, fontWeight: d <= 30 ? 700 : 400 }}>{r.expiry || "—"}{d <= 30 && d > 0 ? ` (${d}d)` : ""}</span>; } },
    { key: "actions", label: "Actions", render: r => (
      <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
        <Btn size="sm" variant="ghost" onClick={() => setViewHosp(r)}>View</Btn>
        <Btn size="sm" variant="ghost" onClick={() => openEdit(r)}>Edit</Btn>
        <Btn size="sm" variant={r.status === "Suspended" ? "success" : "danger"} onClick={() => suspend(r)}>{r.status === "Suspended" ? "Activate" : "Suspend"}</Btn>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="Hospital Management" sub={`${hospitals.length} hospitals registered`}>
        <Btn onClick={openAdd}>+ Add Hospital</Btn>
      </PageHeader>

      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search hospitals..." /></div>
          <Select value={filterType} onChange={setFilterType} options={[{ value: "All", label: "All Types" }, "SaaS", "On-Prem"]} />
          <Select value={filterStatus} onChange={setFilterStatus} options={[{ value: "All", label: "All Status" }, "Active", "Trial", "Suspended"]} />
        </div>
        <Table cols={cols} rows={filtered} onRowClick={setViewHosp} />
      </Card>

      {/* Add / Edit Modal */}
      {showAdd && (
        <Modal title={selected ? `Edit – ${selected.name}` : "Onboard New Hospital"} onClose={() => setShowAdd(false)} width={620}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ gridColumn: "span 2" }}><Field label="Hospital Name *"><Input value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Apollo Nagpur" /></Field></div>
            <Field label="Location *"><Input value={form.location} onChange={v => setForm(p => ({ ...p, location: v }))} placeholder="City, State" /></Field>
            <Field label="Contact Person *"><Input value={form.contact} onChange={v => setForm(p => ({ ...p, contact: v }))} placeholder="Dr. Name" /></Field>
            <Field label="Email"><Input value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="admin@hospital.in" /></Field>
            <Field label="Phone"><Input value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="+91 XXXXXXXXXX" /></Field>
            <Field label="Deployment Type"><Select value={form.type} onChange={v => setForm(p => ({ ...p, type: v }))} options={["SaaS", "On-Prem"]} /></Field>
            <Field label="Plan"><Select value={form.plan} onChange={v => setForm(p => ({ ...p, plan: v }))} options={["Trial", "Basic", "Standard", "Enterprise"]} /></Field>
            <Field label="Status"><Select value={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} options={["Active", "Trial", "Suspended"]} /></Field>
            <Field label="GSTIN"><Input value={form.gstin} onChange={v => setForm(p => ({ ...p, gstin: v }))} placeholder="Optional" /></Field>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={save}>{selected ? "Save Changes" : "Onboard Hospital"}</Btn>
          </div>
        </Modal>
      )}

      {/* View Detail Modal */}
      {viewHosp && (
        <Modal title={viewHosp.name} onClose={() => setViewHosp(null)} width={680}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["Location", viewHosp.location], ["Contact", viewHosp.contact], ["Email", viewHosp.email], ["Phone", viewHosp.phone], ["Deployment", viewHosp.type], ["Plan", viewHosp.plan], ["Status", viewHosp.status], ["Start Date", viewHosp.startDate], ["Expiry", viewHosp.expiry], ["Payment", viewHosp.paymentStatus], ["GSTIN", viewHosp.gstin || "N/A"], ["Active Users", viewHosp.users], ["Modules Enabled", viewHosp.modules], ["Revenue", fmt(viewHosp.revenue)]].map(([k, v]) => (
              <div key={k} style={{ background: T.surface2, borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Btn onClick={() => { setViewHosp(null); openEdit(viewHosp); }}>Edit</Btn>
            <Btn variant={viewHosp.status === "Suspended" ? "success" : "danger"} onClick={() => { suspend(viewHosp); setViewHosp(null); }}>{viewHosp.status === "Suspended" ? "Activate" : "Suspend"}</Btn>
            <Btn variant="ghost" onClick={() => setViewHosp(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// SUBSCRIPTIONS
function Subscriptions({ hospitals, setHospitals, onToast }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editSub, setEditSub] = useState(null);
  const [form, setForm] = useState({});

  const filtered = hospitals.filter(h => {
    const q = search.toLowerCase();
    return (h.name.toLowerCase().includes(q)) && (filter === "All" || h.plan === filter || h.status === filter);
  });

  const openEdit = (h) => { setEditSub(h); setForm({ plan: h.plan, expiry: h.expiry, status: h.status, paymentStatus: h.paymentStatus }); };
  const save = () => {
    setHospitals(prev => prev.map(h => h.id === editSub.id ? { ...h, ...form } : h));
    onToast("Subscription updated", "success");
    setEditSub(null);
  };

  const cols = [
    { key: "name", label: "Hospital", render: r => <div style={{ fontWeight: 600 }}>{r.name}<div style={{ fontSize: 11, color: T.muted }}>{r.type}</div></div> },
    { key: "plan", label: "Plan", render: r => <span style={{ fontSize: 11, fontWeight: 700, background: `${planColor(r.plan)}18`, color: planColor(r.plan), padding: "2px 8px", borderRadius: 4 }}>{r.plan}</span> },
    { key: "startDate", label: "Start Date" },
    { key: "expiry", label: "Expiry" },
    { key: "remaining", label: "Days Left", render: r => { const d = daysLeft(r.expiry); return <span style={{ color: d <= 10 ? T.red : d <= 30 ? T.orange : T.green, fontWeight: 700 }}>{d > 0 ? d : "Expired"}</span>; } },
    { key: "paymentStatus", label: "Payment", render: r => <Badge text={r.paymentStatus} color={statusColor(r.paymentStatus)} /> },
    { key: "status", label: "Status", render: r => <Badge text={r.status} color={statusColor(r.status)} /> },
    { key: "actions", label: "", render: r => <Btn size="sm" variant="ghost" onClick={e => { e.stopPropagation(); openEdit(r); }}>Manage</Btn> },
  ];

  const planStats = PLANS.map(p => ({ ...p, count: hospitals.filter(h => h.plan === p.name).length }));

  return (
    <div>
      <PageHeader title="Subscriptions & Plans" sub="Manage all hospital subscription plans and renewals">
        <Btn variant="ghost" onClick={() => onToast("Renewal alerts sent to all expiring hospitals", "success")}>📧 Send Renewal Alerts</Btn>
      </PageHeader>

      {/* Plan Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {planStats.map(p => (
          <div key={p.name} style={{ background: T.surface, border: `1px solid ${p.color}30`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: p.color, margin: "8px 0 4px" }}>{p.count}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{p.price ? `₹${p.price.toLocaleString("en-IN")}/yr` : "Free"}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Up to {p.maxModules} modules · {p.maxUsers === 999 ? "Unlimited" : p.maxUsers} users</div>
          </div>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}><SearchBar value={search} onChange={setSearch} placeholder="Search subscriptions..." /></div>
          <Select value={filter} onChange={setFilter} options={[
            { value: "All", label: "All" }, "Trial", "Basic", "Standard", "Enterprise", "Active", "Suspended"
          ]} />
        </div>
        <Table cols={cols} rows={filtered} />
      </Card>

      {editSub && (
        <Modal title={`Manage Subscription – ${editSub.name}`} onClose={() => setEditSub(null)}>
          <Field label="Plan">
            <Select value={form.plan} onChange={v => setForm(p => ({ ...p, plan: v }))} options={["Trial", "Basic", "Standard", "Enterprise"]} />
          </Field>
          <Field label="Expiry Date">
            <Input type="date" value={form.expiry} onChange={v => setForm(p => ({ ...p, expiry: v }))} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} options={["Active", "Trial", "Suspended"]} />
          </Field>
          <Field label="Payment Status">
            <Select value={form.paymentStatus} onChange={v => setForm(p => ({ ...p, paymentStatus: v }))} options={["Paid", "Pending", "Overdue"]} />
          </Field>
          <div style={{ background: `${T.accent}10`, border: `1px solid ${T.accent}30`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: T.accent, fontWeight: 600 }}>Plan Details – {form.plan}</div>
            {PLANS.filter(p => p.name === form.plan).map(p => (
              <div key={p.name} style={{ fontSize: 12, color: T.mutedLight, marginTop: 4 }}>
                {p.price ? `₹${p.price.toLocaleString("en-IN")}/year` : "Free"} · {p.maxModules} modules · {p.maxUsers === 999 ? "Unlimited" : p.maxUsers} users
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setEditSub(null)}>Cancel</Btn>
            <Btn onClick={save}>Update Subscription</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// MODULE MANAGEMENT
function ModuleManagement({ hospitals, setHospitals, onToast }) {
  const [selectedHosp, setSelectedHosp] = useState(hospitals[0]);
  const [modules, setModules] = useState(() => {
    const m = {};
    hospitals.forEach(h => {
      m[h.id] = {};
      ALL_MODULES.forEach((mod, i) => { m[h.id][mod.id] = { on: i < h.modules, limit: i < 3 ? 999 : 50 }; });
    });
    return m;
  });

  const hospModules = modules[selectedHosp?.id] || {};

  const toggleModule = (modId) => {
    setModules(prev => ({ ...prev, [selectedHosp.id]: { ...prev[selectedHosp.id], [modId]: { ...prev[selectedHosp.id][modId], on: !prev[selectedHosp.id][modId]?.on } } }));
  };

  const setLimit = (modId, val) => {
    setModules(prev => ({ ...prev, [selectedHosp.id]: { ...prev[selectedHosp.id], [modId]: { ...prev[selectedHosp.id][modId], limit: val } } }));
  };

  const apply = () => {
    const enabledCount = Object.values(hospModules).filter(m => m.on).length;
    setHospitals(prev => prev.map(h => h.id === selectedHosp.id ? { ...h, modules: enabledCount } : h));
    onToast(`Modules updated for ${selectedHosp.name}`, "success");
  };

  const enableAll = () => {
    const updated = {};
    ALL_MODULES.forEach(m => { updated[m.id] = { ...hospModules[m.id], on: true }; });
    setModules(prev => ({ ...prev, [selectedHosp.id]: updated }));
  };

  const disableAll = () => {
    const updated = {};
    ALL_MODULES.forEach(m => { updated[m.id] = { ...hospModules[m.id], on: false }; });
    setModules(prev => ({ ...prev, [selectedHosp.id]: updated }));
  };

  const enabledCount = Object.values(hospModules).filter(m => m.on).length;
  const planMax = PLANS.find(p => p.name === selectedHosp?.plan)?.maxModules || 3;

  return (
    <div>
      <PageHeader title="Module Management" sub="Enable or disable features per hospital" />
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        {/* Hospital List */}
        <Card title="Select Hospital">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {hospitals.map(h => (
              <div key={h.id} onClick={() => setSelectedHosp(h)} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", background: selectedHosp?.id === h.id ? `${T.accent}15` : T.surface2, border: `1px solid ${selectedHosp?.id === h.id ? T.accent : T.border}`, transition: "all .15s" }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{h.plan} · {h.modules} modules on</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Module Grid */}
        {selectedHosp && (
          <div>
            <Card>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700 }}>{selectedHosp.name}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{enabledCount} / {ALL_MODULES.length} modules enabled · Plan allows {planMax === 11 ? "all" : planMax}</div>
                  {enabledCount > planMax && <div style={{ fontSize: 12, color: T.orange, marginTop: 4 }}>⚠️ Exceeds plan limit for {selectedHosp.plan}</div>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn variant="ghost" size="sm" onClick={enableAll}>Enable All</Btn>
                  <Btn variant="ghost" size="sm" onClick={disableAll}>Disable All</Btn>
                  <Btn size="sm" onClick={apply}>Apply Changes</Btn>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {ALL_MODULES.map(m => {
                  const ms = hospModules[m.id] || { on: false, limit: 50 };
                  return (
                    <div key={m.id} style={{ background: T.surface2, border: `1px solid ${ms.on ? T.accent + "40" : T.border}`, borderRadius: 10, padding: "14px 16px", transition: "border-color .2s" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ms.on ? 10 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                          <span style={{ fontSize: 18 }}>{m.icon}</span> {m.name}
                        </div>
                        <Toggle on={ms.on} onChange={() => toggleModule(m.id)} />
                      </div>
                      {ms.on && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                          <span style={{ fontSize: 11, color: T.muted, whiteSpace: "nowrap" }}>User limit:</span>
                          <input type="number" value={ms.limit === 999 ? "" : ms.limit} onChange={e => setLimit(m.id, e.target.value ? parseInt(e.target.value) : 999)} placeholder="Unlimited" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: "3px 8px", color: T.text, fontSize: 12, width: 80, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// BILLING & FINANCE
function Billing({ hospitals, onToast }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewInv, setViewInv] = useState(null);

  const totalRev = INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = INVOICES.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const overdue = INVOICES.filter(i => i.status === "Overdue").length;

  const filtered = INVOICES.filter(i => {
    const q = search.toLowerCase();
    return (i.hospital.toLowerCase().includes(q) || i.id.toLowerCase().includes(q))
      && (filterStatus === "All" || i.status === filterStatus);
  });

  const cols = [
    { key: "id", label: "Invoice #", render: r => <span style={{ fontFamily: "monospace", fontSize: 12, color: T.accent }}>{r.id}</span> },
    { key: "hospital", label: "Hospital", render: r => <div style={{ fontWeight: 600 }}>{r.hospital}</div> },
    { key: "plan", label: "Plan", render: r => <span style={{ fontSize: 11, fontWeight: 700, background: `${planColor(r.plan)}18`, color: planColor(r.plan), padding: "2px 8px", borderRadius: 4 }}>{r.plan}</span> },
    { key: "amount", label: "Amount", render: r => <span style={{ fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>{r.amount ? fmt(r.amount) : "—"}</span> },
    { key: "date", label: "Invoice Date" },
    { key: "due", label: "Due Date" },
    { key: "status", label: "Status", render: r => <Badge text={r.status} color={statusColor(r.status)} /> },
    { key: "actions", label: "", render: r => (
      <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
        <Btn size="sm" variant="ghost" onClick={() => setViewInv(r)}>View</Btn>
        {r.status !== "Paid" && <Btn size="sm" variant="primary" onClick={() => onToast(`Payment reminder sent for ${r.id}`, "info")}>Remind</Btn>}
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="Billing & Finance" sub="Invoices, payments and revenue tracking">
        <Btn variant="ghost" onClick={() => onToast("Revenue report exported", "success")}>📥 Export Report</Btn>
        <Btn onClick={() => onToast("New invoice created", "success")}>+ New Invoice</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        <KpiCard icon="💰" val={fmt(totalRev)} label="Total Revenue Collected" trendUp trend="12%" color={T.green} />
        <KpiCard icon="⏳" val={fmt(outstanding)} label="Outstanding Amount" trendUp={false} trend="6.1L due" color={T.orange} />
        <KpiCard icon="🔴" val={overdue} label="Overdue Invoices" trendUp={false} trend="needs action" color={T.red} />
        <KpiCard icon="📄" val={INVOICES.length} label="Total Invoices" trendUp trend="this cycle" color={T.accent} />
      </div>

      {/* Revenue by Plan */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <Card title="Revenue by Plan">
          {PLANS.filter(p => p.name !== "Trial").map(p => {
            const rev = INVOICES.filter(i => i.plan === p.name && i.status === "Paid").reduce((s, i) => s + i.amount, 0);
            const pct = totalRev ? Math.round(rev / totalRev * 100) : 0;
            return (
              <div key={p.name} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span><span style={{ color: T.muted }}>{fmt(rev)} ({pct}%)</span>
                </div>
                <ProgressBar pct={pct} color={p.color} />
              </div>
            );
          })}
        </Card>
        <Card title="Payment Summary">
          {[["Paid", T.green], ["Pending", T.yellow], ["Overdue", T.red]].map(([s, c]) => {
            const count = INVOICES.filter(i => i.status === s).length;
            const amt = INVOICES.filter(i => i.status === s).reduce((x, i) => x + i.amount, 0);
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{count} invoices</div>
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: c }}>{fmt(amt)}</div>
              </div>
            );
          })}
        </Card>
      </div>

      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}><SearchBar value={search} onChange={setSearch} placeholder="Search invoices..." /></div>
          <Select value={filterStatus} onChange={setFilterStatus} options={[{ value: "All", label: "All Status" }, "Paid", "Pending", "Overdue"]} />
        </div>
        <Table cols={cols} rows={filtered} onRowClick={setViewInv} />
      </Card>

      {viewInv && (
        <Modal title={`Invoice ${viewInv.id}`} onClose={() => setViewInv(null)}>
          <div style={{ background: T.surface2, borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>INVOICE</div><div style={{ fontSize: 12, color: T.muted }}>{viewInv.id}</div></div>
              <Badge text={viewInv.status} color={statusColor(viewInv.status)} />
            </div>
            {[["Hospital", viewInv.hospital], ["Plan", viewInv.plan], ["GSTIN", viewInv.gstin || "N/A"], ["Invoice Date", viewInv.date], ["Due Date", viewInv.due], ["Amount", fmt(viewInv.amount)], ["GST (18%)", fmt(Math.round(viewInv.amount * 0.18))], ["Total", fmt(Math.round(viewInv.amount * 1.18))]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                <span style={{ color: T.muted }}>{k}</span><span style={{ fontWeight: k === "Total" ? 800 : 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => { onToast("Invoice downloaded", "success"); setViewInv(null); }}>📥 Download PDF</Btn>
            {viewInv.status !== "Paid" && <Btn onClick={() => { onToast("Payment reminder sent", "info"); setViewInv(null); }}>📧 Send Reminder</Btn>}
          </div>
        </Modal>
      )}
    </div>
  );
}

// USERS & ROLES
function UsersRoles({ onToast }) {
  const [users, setUsers] = useState(USERS_INTERNAL);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const blank = { name: "", email: "", role: "Support", dept: "Support", access: "Read Only", status: "Active" };
  const [form, setForm] = useState(blank);

  const openEdit = (u) => { setForm({ ...u }); setEditUser(u); setShowAdd(true); };
  const save = () => {
    if (!form.name || !form.email) { onToast("Name and email required", "error"); return; }
    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...form } : u));
      onToast("User updated", "success");
    } else {
      setUsers(prev => [...prev, { ...form, id: Date.now(), lastLogin: "Never" }]);
      onToast("User created", "success");
    }
    setShowAdd(false); setEditUser(null);
  };

  const cols = [
    { key: "name", label: "User", render: r => <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent2},${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{initials(r.name)}</div><div><div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div><div style={{ fontSize: 11, color: T.muted }}>{r.email}</div></div></div> },
    { key: "role", label: "Role", render: r => <Badge text={r.role} color={{ "Super Admin": T.accent2, Sales: T.accent, Support: T.orange, Finance: T.green, Product: T.yellow }[r.role] || T.muted} /> },
    { key: "dept", label: "Department" },
    { key: "access", label: "Access Level", render: r => <span style={{ fontSize: 12, color: { "Full Control": T.red, Edit: T.orange, "Read Only": T.muted }[r.access] || T.muted, fontWeight: 700 }}>{r.access}</span> },
    { key: "status", label: "Status", render: r => <Badge text={r.status} color={r.status === "Active" ? T.green : T.muted} /> },
    { key: "lastLogin", label: "Last Login", render: r => <span style={{ fontSize: 12, color: T.muted }}>{r.lastLogin}</span> },
    { key: "actions", label: "", render: r => (
      <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
        <Btn size="sm" variant="ghost" onClick={() => openEdit(r)}>Edit</Btn>
        <Btn size="sm" variant="danger" onClick={() => { setUsers(prev => prev.filter(u => u.id !== r.id)); onToast("User removed", "warning"); }}>Remove</Btn>
      </div>
    )},
  ];

  const roleColors = { "Super Admin": T.accent2, Sales: T.accent, Support: T.orange, Finance: T.green, Product: T.yellow };

  return (
    <div>
      <PageHeader title="Users & Roles" sub="Manage internal team access and permissions">
        <Btn onClick={() => { setForm(blank); setEditUser(null); setShowAdd(true); }}>+ Add User</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 24 }}>
        {["Super Admin", "Sales", "Support", "Finance", "Product"].map(role => {
          const count = users.filter(u => u.role === role).length;
          return <div key={role} style={{ background: T.surface, border: `1px solid ${roleColors[role]}30`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: T.muted }}>{role}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: roleColors[role] }}>{count}</div>
          </div>;
        })}
      </div>

      {/* Permissions Reference */}
      <Card title="Role Permissions Matrix" style={{ marginBottom: 20 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, color: T.muted, borderBottom: `1px solid ${T.border}` }}>Permission</th>
                {["Super Admin", "Sales", "Support", "Finance", "Product"].map(r => <th key={r} style={{ padding: "8px 14px", textAlign: "center", fontSize: 11, color: roleColors[r], borderBottom: `1px solid ${T.border}` }}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {[["View Hospitals", "✅", "✅", "✅", "✅", "✅"], ["Edit Hospitals", "✅", "✅", "❌", "❌", "✅"], ["Manage Subscriptions", "✅", "✅", "❌", "✅", "❌"], ["Control Modules", "✅", "❌", "✅", "❌", "✅"], ["View Billing", "✅", "✅", "❌", "✅", "❌"], ["Create Invoices", "✅", "❌", "❌", "✅", "❌"], ["Access Support", "✅", "❌", "✅", "❌", "❌"], ["System Settings", "✅", "❌", "❌", "❌", "❌"]].map(([perm, ...vals]) => (
                <tr key={perm} onMouseEnter={e => { for (const c of e.currentTarget.children) c.style.background = T.surface2; }} onMouseLeave={e => { for (const c of e.currentTarget.children) c.style.background = ""; }}>
                  <td style={{ padding: "10px 14px", fontSize: 13, borderBottom: `1px solid ${T.border}`, transition: "background .1s" }}>{perm}</td>
                  {vals.map((v, i) => <td key={i} style={{ padding: "10px 14px", textAlign: "center", fontSize: 14, borderBottom: `1px solid ${T.border}`, transition: "background .1s" }}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card><Table cols={cols} rows={users} /></Card>

      {showAdd && (
        <Modal title={editUser ? `Edit – ${editUser.name}` : "Add Team Member"} onClose={() => setShowAdd(false)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "span 2" }}><Field label="Full Name *"><Input value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Full name" /></Field></div>
            <div style={{ gridColumn: "span 2" }}><Field label="Email *"><Input value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="email@pulsehis.com" /></Field></div>
            <Field label="Role"><Select value={form.role} onChange={v => setForm(p => ({ ...p, role: v }))} options={["Super Admin", "Sales", "Support", "Finance", "Product"]} /></Field>
            <Field label="Department"><Select value={form.dept} onChange={v => setForm(p => ({ ...p, dept: v }))} options={["Operations", "Sales", "Support", "Finance", "Product"]} /></Field>
            <Field label="Access Level"><Select value={form.access} onChange={v => setForm(p => ({ ...p, access: v }))} options={["Read Only", "Edit", "Full Control"]} /></Field>
            <Field label="Status"><Select value={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} options={["Active", "Inactive"]} /></Field>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
            <Btn onClick={save}>{editUser ? "Save Changes" : "Create User"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ALERTS
function Alerts({ hospitals, onToast }) {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "Expiry", hospital: "LifeLine Mumbai", message: "Subscription expires in 7 days", priority: "High", sent: false, channel: "Email" },
    { id: 2, type: "Payment", hospital: "Sunrise Jaipur", message: "Payment overdue by 23 days", priority: "High", sent: true, channel: "WhatsApp" },
    { id: 3, type: "Expiry", hospital: "Fortis Hyderabad", message: "Subscription expires in 13 days", priority: "Medium", sent: false, channel: "Email" },
    { id: 4, type: "Trial", hospital: "LifeLine Mumbai", message: "Trial ending soon — convert to paid", priority: "Medium", sent: true, channel: "SMS" },
    { id: 5, type: "Expiry", hospital: "Rainbow Children Blr", message: "Subscription expires in 26 days", priority: "Low", sent: false, channel: "Email" },
  ]);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({ email: true, sms: true, whatsapp: false, days7: true, days15: true, days30: true });

  const sendAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, sent: true } : a));
    onToast("Alert sent successfully!", "success");
  };

  const sendAll = () => {
    setAlerts(prev => prev.map(a => ({ ...a, sent: true })));
    onToast("All alerts sent!", "success");
  };

  const prioColor = (p) => ({ High: T.red, Medium: T.orange, Low: T.yellow }[p] || T.muted);
  const typeColor = (t) => ({ Expiry: T.orange, Payment: T.red, Trial: T.yellow }[t] || T.muted);

  return (
    <div>
      <PageHeader title="Alerts & Automation" sub="Subscription, trial, and payment alert management">
        <Btn variant="ghost" onClick={() => setShowConfig(true)}>⚙️ Alert Config</Btn>
        <Btn onClick={sendAll}>📤 Send All Pending</Btn>
      </PageHeader>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[["🔴 High Priority", alerts.filter(a => a.priority === "High").length, T.red], ["🟡 Medium Priority", alerts.filter(a => a.priority === "Medium").length, T.orange], ["✅ Sent Alerts", alerts.filter(a => a.sent).length, T.green]].map(([l, v, c]) => (
          <div key={l} style={{ background: T.surface, border: `1px solid ${c}30`, borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 12, color: T.muted }}>{l}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Alert Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {alerts.map(a => (
          <div key={a.id} style={{ background: T.surface, border: `1px solid ${prioColor(a.priority)}30`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${typeColor(a.type)}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {a.type === "Expiry" ? "⏳" : a.type === "Payment" ? "💳" : "🏃"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{a.hospital}</span>
                <span style={{ fontSize: 11, background: `${prioColor(a.priority)}18`, color: prioColor(a.priority), padding: "1px 8px", borderRadius: 20, fontWeight: 700 }}>{a.priority}</span>
                <span style={{ fontSize: 11, background: `${typeColor(a.type)}18`, color: typeColor(a.type), padding: "1px 8px", borderRadius: 20 }}>{a.type}</span>
              </div>
              <div style={{ fontSize: 13, color: T.mutedLight }}>{a.message}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Channel: {a.channel}</div>
            </div>
            <div>
              {a.sent ? <span style={{ color: T.green, fontSize: 12, fontWeight: 700 }}>✅ Sent</span>
                : <Btn size="sm" onClick={() => sendAlert(a.id)}>Send Alert</Btn>}
            </div>
          </div>
        ))}
      </div>

      {/* Config Modal */}
      {showConfig && (
        <Modal title="Alert Configuration" onClose={() => setShowConfig(false)}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Notification Channels</div>
            {[["email", "📧 Email"], ["sms", "📱 SMS"], ["whatsapp", "💬 WhatsApp"]].map(([k, l]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13 }}>{l}</span>
                <Toggle on={config[k]} onChange={v => setConfig(p => ({ ...p, [k]: v }))} />
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Auto-Alert Triggers</div>
            {[["days7", "Alert when 7 days left"], ["days15", "Alert when 15 days left"], ["days30", "Alert when 30 days left"]].map(([k, l]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13 }}>{l}</span>
                <Toggle on={config[k]} onChange={v => setConfig(p => ({ ...p, [k]: v }))} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
            <Btn variant="ghost" onClick={() => setShowConfig(false)}>Cancel</Btn>
            <Btn onClick={() => { onToast("Alert configuration saved", "success"); setShowConfig(false); }}>Save Config</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// SUPPORT & LOGS
function Support({ onToast }) {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewTicket, setViewTicket] = useState(null);
  const [logSearch, setLogSearch] = useState("");
  const [tab, setTab] = useState("tickets");

  const filteredTickets = tickets.filter(t => {
    const q = search.toLowerCase();
    return (t.hospital.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
      && (filterStatus === "All" || t.status === filterStatus);
  });

  const filteredLogs = ACTIVITY_LOG.filter(a => {
    const q = logSearch.toLowerCase();
    return a.action.toLowerCase().includes(q) || a.hospital.toLowerCase().includes(q);
  });

  const priorityColor = (p) => ({ High: T.red, Medium: T.orange, Low: T.yellow }[p] || T.muted);

  const cols = [
    { key: "id", label: "Ticket", render: r => <span style={{ fontFamily: "monospace", fontSize: 12, color: T.accent }}>{r.id}</span> },
    { key: "hospital", label: "Hospital", render: r => <div style={{ fontWeight: 600 }}>{r.hospital}</div> },
    { key: "subject", label: "Subject", render: r => <div style={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 13 }}>{r.subject}</div> },
    { key: "priority", label: "Priority", render: r => <Badge text={r.priority} color={priorityColor(r.priority)} /> },
    { key: "status", label: "Status", render: r => <Badge text={r.status} color={statusColor(r.status)} /> },
    { key: "assignee", label: "Assignee", render: r => <span style={{ fontSize: 12, color: T.mutedLight }}>{r.assignee}</span> },
    { key: "created", label: "Created" },
    { key: "actions", label: "", render: r => (
      <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
        <Btn size="sm" variant="ghost" onClick={() => setViewTicket(r)}>View</Btn>
        {r.status !== "Resolved" && <Btn size="sm" variant="success" onClick={() => { setTickets(prev => prev.map(t => t.id === r.id ? { ...t, status: "Resolved" } : t)); onToast("Ticket resolved", "success"); }}>Resolve</Btn>}
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="Support & Logs" sub="Tickets, system logs and admin activity">
        <Btn onClick={() => onToast("New ticket created", "info")}>+ New Ticket</Btn>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[["📋 Total Tickets", tickets.length, T.accent], ["🔴 Open", tickets.filter(t => t.status === "Open").length, T.red], ["🟡 In Progress", tickets.filter(t => t.status === "In Progress").length, T.orange], ["✅ Resolved", tickets.filter(t => t.status === "Resolved").length, T.green]].map(([l, v, c]) => (
          <div key={l} style={{ background: T.surface, border: `1px solid ${c}30`, borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, color: T.muted }}>{l}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: T.surface2, borderRadius: 10, padding: 4, width: "fit-content", marginBottom: 20 }}>
        {["tickets", "logs"].map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ padding: "6px 20px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, background: tab === t ? T.surface : "transparent", color: tab === t ? T.text : T.muted, textTransform: "capitalize", transition: "all .15s" }}>{t === "tickets" ? "🎫 Support Tickets" : "📋 Activity Logs"}</div>
        ))}
      </div>

      {tab === "tickets" && (
        <Card>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}><SearchBar value={search} onChange={setSearch} placeholder="Search tickets..." /></div>
            <Select value={filterStatus} onChange={setFilterStatus} options={[{ value: "All", label: "All Status" }, "Open", "In Progress", "Resolved"]} />
          </div>
          <Table cols={cols} rows={filteredTickets} onRowClick={setViewTicket} />
        </Card>
      )}

      {tab === "logs" && (
        <Card>
          <div style={{ marginBottom: 16 }}><SearchBar value={logSearch} onChange={setLogSearch} placeholder="Search activity logs..." /></div>
          <div>
            {filteredLogs.map(a => (
              <div key={a.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}`, alignItems: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{a.hospital} · By {a.by}</div>
                </div>
                <div style={{ fontSize: 11, color: T.muted, whiteSpace: "nowrap" }}>{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {viewTicket && (
        <Modal title={`${viewTicket.id} – ${viewTicket.hospital}`} onClose={() => setViewTicket(null)}>
          {[["Hospital", viewTicket.hospital], ["Subject", viewTicket.subject], ["Priority", viewTicket.priority], ["Status", viewTicket.status], ["Assignee", viewTicket.assignee], ["Created", viewTicket.created]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
              <span style={{ color: T.muted }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, background: T.surface2, borderRadius: 8, padding: 14, fontSize: 13, color: T.mutedLight }}>
            No notes yet. Add resolution notes below.
          </div>
          <textarea placeholder="Add notes or resolution..." style={{ width: "100%", marginTop: 12, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: 12, color: T.text, fontSize: 13, resize: "vertical", minHeight: 80, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setViewTicket(null)}>Close</Btn>
            {viewTicket.status !== "Resolved" && <Btn variant="success" onClick={() => { setTickets(prev => prev.map(t => t.id === viewTicket.id ? { ...t, status: "Resolved" } : t)); onToast("Ticket resolved!", "success"); setViewTicket(null); }}>Mark Resolved</Btn>}
            <Btn onClick={() => { onToast("Notes saved", "info"); setViewTicket(null); }}>Save Notes</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// SETTINGS & SECURITY
function Settings({ onToast }) {
  const [general, setGeneral] = useState({ orgName: "Pulse Hospital IS", supportEmail: "support@pulsehis.com", timezone: "Asia/Kolkata", currency: "INR", gstRate: "18" });
  const [security, setSecurity] = useState({ twoFA: true, ipRestriction: false, sessionTimeout: "30", loginAttempts: "5" });
  const [backup, setBackup] = useState({ autoBackup: true, frequency: "Daily", retention: "30", lastBackup: "2026-01-23 03:00 AM" });
  const [notif, setNotif] = useState({ emailNotif: true, smsNotif: true, whatsappNotif: false, dailyReport: true });

  return (
    <div>
      <PageHeader title="Settings & Security" sub="System configuration, security policies and backups" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* General */}
        <Card title="⚙️ General Settings">
          <Field label="Organization Name"><Input value={general.orgName} onChange={v => setGeneral(p => ({ ...p, orgName: v }))} /></Field>
          <Field label="Support Email"><Input value={general.supportEmail} onChange={v => setGeneral(p => ({ ...p, supportEmail: v }))} /></Field>
          <Field label="Timezone"><Select value={general.timezone} onChange={v => setGeneral(p => ({ ...p, timezone: v }))} options={["Asia/Kolkata", "UTC", "America/New_York"]} /></Field>
          <Field label="Currency"><Select value={general.currency} onChange={v => setGeneral(p => ({ ...p, currency: v }))} options={["INR", "USD", "EUR"]} /></Field>
          <Field label="GST Rate (%)"><Input value={general.gstRate} onChange={v => setGeneral(p => ({ ...p, gstRate: v }))} /></Field>
          <Btn onClick={() => onToast("General settings saved", "success")}>Save General Settings</Btn>
        </Card>

        {/* Security */}
        <Card title="🔐 Security & Access">
          {[["Two-Factor Authentication (2FA)", "twoFA"], ["IP Restriction", "ipRestriction"]].map(([l, k]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 13 }}>{l}</span>
              <Toggle on={security[k]} onChange={v => setSecurity(p => ({ ...p, [k]: v }))} />
            </div>
          ))}
          <Field label="Session Timeout (minutes)" ><Input value={security.sessionTimeout} onChange={v => setSecurity(p => ({ ...p, sessionTimeout: v }))} /></Field>
          <Field label="Max Login Attempts"><Input value={security.loginAttempts} onChange={v => setSecurity(p => ({ ...p, loginAttempts: v }))} /></Field>
          <div style={{ marginBottom: 16 }}>
            <Btn variant="danger" size="sm" onClick={() => onToast("All active sessions cleared", "warning")}>🔒 Force Logout All Sessions</Btn>
          </div>
          <Btn onClick={() => onToast("Security settings saved", "success")}>Save Security Settings</Btn>
        </Card>

        {/* Backup */}
        <Card title="💾 Backup & Data">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 13 }}>Auto Backup</span>
            <Toggle on={backup.autoBackup} onChange={v => setBackup(p => ({ ...p, autoBackup: v }))} />
          </div>
          <Field label="Backup Frequency"><Select value={backup.frequency} onChange={v => setBackup(p => ({ ...p, frequency: v }))} options={["Daily", "Weekly", "Monthly"]} /></Field>
          <Field label="Retention Period (days)"><Input value={backup.retention} onChange={v => setBackup(p => ({ ...p, retention: v }))} /></Field>
          <div style={{ background: `${T.green}15`, border: `1px solid ${T.green}30`, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: T.green }}>
            ✅ Last backup: {backup.lastBackup}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" onClick={() => onToast("Manual backup started...", "info")}>Run Backup Now</Btn>
            <Btn onClick={() => onToast("Backup settings saved", "success")}>Save</Btn>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="🔔 Notification Settings">
          {[["Email Notifications", "emailNotif"], ["SMS Notifications", "smsNotif"], ["WhatsApp Alerts", "whatsappNotif"], ["Daily Summary Report", "dailyReport"]].map(([l, k]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 13 }}>{l}</span>
              <Toggle on={notif[k]} onChange={v => setNotif(p => ({ ...p, [k]: v }))} />
            </div>
          ))}
          <div style={{ marginTop: 16 }}><Btn onClick={() => onToast("Notification settings saved", "success")}>Save Notification Settings</Btn></div>
        </Card>

        {/* System Info */}
        <div style={{ gridColumn: "span 2" }}>
          <Card title="ℹ️ System Information">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[["Version", "Pulse HIS v3.2.1"], ["Environment", "Production"], ["Node Version", "18.x LTS"], ["Database", "PostgreSQL 15"], ["Last Deploy", "2026-01-20"], ["Uptime", "99.98%"], ["Total DB Size", "48.2 GB"], ["Active Sessions", "142"]].map(([k, v]) => (
                <div key={k} style={{ background: T.surface2, borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: T.muted }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "hospitals", icon: "🏨", label: "Hospitals" },
  { id: "subscriptions", icon: "📋", label: "Subscriptions" },
  { id: "modules", icon: "🧩", label: "Modules" },
  { id: "billing", icon: "💳", label: "Billing & Finance" },
  { id: "users", icon: "👥", label: "Users & Roles" },
  { id: "alerts", icon: "🔔", label: "Alerts" },
  { id: "support", icon: "🛟", label: "Support & Logs" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function PulseAdminPanel() {
  const [page, setPage] = useState("dashboard");
  const [hospitals, setHospitals] = useState(HOSPITALS);
  const [toast, setToast] = useState(null);

  const onToast = (msg, type = "info") => setToast({ msg, type });

  const renderPage = () => {
    const props = { hospitals, setHospitals, onToast };
    switch (page) {
      case "dashboard": return <Dashboard {...props} />;
      case "hospitals": return <HospitalManagement {...props} />;
      case "subscriptions": return <Subscriptions {...props} />;
      case "modules": return <ModuleManagement {...props} />;
      case "billing": return <Billing {...props} />;
      case "users": return <UsersRoles onToast={onToast} />;
      case "alerts": return <Alerts {...props} />;
      case "support": return <Support onToast={onToast} />;
      case "settings": return <Settings onToast={onToast} />;
      default: return <Dashboard {...props} />;
    }
  };

  const expiringSoon = hospitals.filter(h => daysLeft(h.expiry) <= 7 && h.status !== "Suspended").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:${T.bg}; color:${T.text}; font-family:'DM Sans',sans-serif; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:${T.surface}; }
        ::-webkit-scrollbar-thumb { background:${T.surface3}; border-radius:3px; }
        select option { background:${T.surface2}; }
        @keyframes slideUp { from { transform:translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <aside style={{ width: 230, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
          {/* Logo */}
          <div style={{ padding: "20px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: `linear-gradient(135deg,${T.accent},${T.accent2})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🏥</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17, lineHeight: 1 }}>Pulse HIS</div>
              <div style={{ fontSize: 10, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>Super Admin</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
            {NAV_ITEMS.map(item => {
              const isActive = page === item.id;
              const badge = item.id === "alerts" ? expiringSoon : item.id === "hospitals" ? hospitals.filter(h => h.status === "Trial").length : 0;
              return (
                <div key={item.id} onClick={() => setPage(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: isActive ? T.accent : T.muted, background: isActive ? `${T.accent}12` : "transparent", marginBottom: 2, position: "relative", transition: "all .15s", fontWeight: isActive ? 600 : 400 }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.surface2; e.currentTarget.style.color = T.text; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isActive ? T.accent : T.muted; }}>
                  {isActive && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "60%", background: T.accent, borderRadius: "0 3px 3px 0" }} />}
                  <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {badge > 0 && <span style={{ background: T.red, color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 20, fontWeight: 700 }}>{badge}</span>}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div style={{ padding: 14, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent2},${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>RS</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ravi Sharma</div>
              <div style={{ fontSize: 11, color: T.muted }}>Super Admin</div>
            </div>
            <span style={{ fontSize: 14, color: T.muted, cursor: "pointer" }} onClick={() => onToast("Logged out", "info")}>↩</span>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ marginLeft: 230, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Topbar */}
          <header style={{ display: "flex", alignItems: "center", padding: "0 28px", height: 58, borderBottom: `1px solid ${T.border}`, background: T.surface, position: "sticky", top: 0, zIndex: 50, gap: 16 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, flex: 1 }}>
              {NAV_ITEMS.find(n => n.id === page)?.label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {expiringSoon > 0 && (
                <div onClick={() => setPage("alerts")} style={{ display: "flex", alignItems: "center", gap: 6, background: `${T.red}15`, border: `1px solid ${T.red}40`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, color: T.red, fontWeight: 600 }}>
                  ⚠️ {expiringSoon} expiring soon
                </div>
              )}
              <div style={{ width: 34, height: 34, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }} onClick={() => setPage("alerts")}>🔔</div>
              <div style={{ width: 34, height: 34, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }} onClick={() => onToast("Help documentation opened", "info")}>❓</div>
            </div>
          </header>

          {/* Content */}
          <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
            {renderPage()}
          </main>
        </div>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </>
  );
}
