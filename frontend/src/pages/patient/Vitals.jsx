import { useMemo, useState } from "react";
import { MetricCard } from "../../components/health/MetricCard";
import { SegmentedToggle } from "../../components/health/SegmentedToggle";
import { VitalsChart } from "../../components/health/VitalsChart";
import {
  thresholds,
  vitalsToday,
  vitalsWeek,
  calcStatsFromToday,
  calcStatsFromWeek,
} from "../../data/vitalsMock";

function statusForHeartRate(hr) {
  if (hr >= thresholds.heartRate.high) return "danger";
  if (hr >= thresholds.heartRate.high - 10) return "warn";
  if (hr <= thresholds.heartRate.low) return "warn";
  return "ok";
}

function statusForSpO2(spo2) {
  if (spo2 <= thresholds.spo2.low) return "danger";
  if (spo2 <= thresholds.spo2.low + 1) return "warn";
  return "ok";
}

export const PatientVitals = () => {
  const [mode, setMode] = useState("today"); // today | week

  const hrStats = useMemo(() => {
    return mode === "today"
      ? calcStatsFromToday(vitalsToday.heartRate)
      : calcStatsFromWeek(vitalsWeek.heartRate, "avg");
  }, [mode]);

  const spo2Stats = useMemo(() => {
    return mode === "today"
      ? calcStatsFromToday(vitalsToday.spo2)
      : calcStatsFromWeek(vitalsWeek.spo2, "avg");
  }, [mode]);

  const hrStatus = statusForHeartRate(hrStats.current);
  const spo2Status = statusForSpO2(spo2Stats.current);

  const showWarning = hrStatus === "danger" || spo2Status === "danger";

  const hrChartData =
    mode === "today"
      ? vitalsToday.heartRate.map((d) => ({ ...d, value: d.v }))
      : vitalsWeek.heartRate.map((d) => ({ day: d.day, value: d.avg }));

  const spo2ChartData =
    mode === "today"
      ? vitalsToday.spo2.map((d) => ({ ...d, value: d.v }))
      : vitalsWeek.spo2.map((d) => ({ day: d.day, value: d.avg }));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Vitals</h1>
          <div style={{ color: "#94a3b8" }}>Track heart rate and blood oxygen trends.</div>
        </div>

        <SegmentedToggle
          value={mode}
          onChange={setMode}
          options={[
            { label: "Today", value: "today" },
            { label: "This Week", value: "week" },
          ]}
        />
      </div>

      {showWarning && (
        <div style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.10)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900, color: "#fca5a5" }}>Warning detected</div>
          <div style={{ marginTop: 6, color: "#fecaca" }}>
            {hrStatus === "danger" ? `High HR: ${hrStats.current} bpm (threshold ${thresholds.heartRate.high}). ` : null}
            {spo2Status === "danger" ? `Low SpO₂: ${spo2Stats.current}% (threshold ${thresholds.spo2.low}).` : null}
          </div>
          <div style={{ marginTop: 6, color: "#94a3b8", fontSize: 13 }}>
            These alerts trigger when readings are outside safe ranges.
          </div>
        </div>
      )}

      {/* Current / Resting / Peak */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        <MetricCard
          title="Heart Rate"
          value={hrStats.current}
          unit="bpm"
          sub={`Resting ${hrStats.resting} • Peak ${hrStats.peak}`}
          status={hrStatus}
        />
        <MetricCard
          title="Blood Oxygen (SpO₂)"
          value={spo2Stats.current}
          unit="%"
          sub={`Resting ${spo2Stats.resting} • Peak ${spo2Stats.peak}`}
          status={spo2Status}
        />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gap: 12 }}>
        <VitalsChart mode={mode} title="Heart Rate Trend" data={hrChartData} dataKey="value" />
        <VitalsChart mode={mode} title="SpO₂ Trend" data={spo2ChartData} dataKey="value" />
      </div>
    </div>
  );
};