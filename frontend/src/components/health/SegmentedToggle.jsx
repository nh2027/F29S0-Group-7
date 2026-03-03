export const SegmentedToggle = ({ options, value, onChange }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        border: "1px solid #1e293b",
        borderRadius: 999,
        padding: 4,
        background: "#0b1220",
        gap: 4,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "8px 12px",
              background: active ? "#111c33" : "transparent",
              cursor: "pointer",
              fontWeight: 800,
              color: active ? "#f1f5f9" : "#94a3b8",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};