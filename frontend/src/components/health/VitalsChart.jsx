import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function formatTimeLabel(iso) {
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export const VitalsChart = ({ mode, title, data, dataKey }) => {
  return (
    <div
      style={{
        border: "1px solid #1e293b",
        borderRadius: 16,
        padding: 16,
        background: "#0b1220",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>{title}</div>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: 8, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={mode === "today" ? "t" : "day"}
              tickFormatter={mode === "today" ? formatTimeLabel : undefined}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(l) => (mode === "today" ? `Time: ${formatTimeLabel(l)}` : `Day: ${l}`)}
            />
            <Line type="monotone" dataKey={dataKey} dot={false} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};