import { RangeBadge } from "./RangeBadge";

export const MetricCard = ({ title, value, unit, sub, status, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        width: "100%",
        border: "1px solid #1e293b",
        borderRadius: 16,
        padding: 16,
        background: "#0b1220",
        cursor: onClick ? "pointer" : "default",
        color: "#f1f5f9",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 800 }}>{title}</div>
        {status ? <RangeBadge status={status} /> : null}
      </div>

      <div style={{ marginTop: 10, fontSize: 28, fontWeight: 900 }}>
        {value} <span style={{ fontSize: 14, fontWeight: 700, color: "#94a3b8" }}>{unit}</span>
      </div>

      {sub ? <div style={{ marginTop: 6, color: "#94a3b8", fontSize: 13 }}>{sub}</div> : null}
    </button>
  );
};