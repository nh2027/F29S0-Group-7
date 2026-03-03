export const RangeBadge = ({ status }) => {
  const map = {
    ok: { label: "Normal", bg: "rgba(16,185,129,0.15)", fg: "#34d399", br: "rgba(16,185,129,0.3)" },
    warn: { label: "Warning", bg: "rgba(245,158,11,0.15)", fg: "#fbbf24", br: "rgba(245,158,11,0.3)" },
    danger: { label: "High", bg: "rgba(239,68,68,0.15)", fg: "#f87171", br: "rgba(239,68,68,0.3)" },
  };

  const s = map[status] || map.ok;

  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 999,
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.br}`,
      }}
    >
      {s.label}
    </span>
  );
};