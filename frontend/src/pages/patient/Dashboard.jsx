import { useNavigate } from "react-router-dom";
import { MetricCard } from "../../components/health/MetricCard";
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

export const PatientDashboard = () => {
  const nav = useNavigate();

  const hrStats = calcStatsFromToday(vitalsToday.heartRate);
  const spo2Stats = calcStatsFromToday(vitalsToday.spo2);

  // Replace these with real backend values later:
  const stepsToday = 7640;
  const caloriesBurned = 520;

  const hrWeek = calcStatsFromWeek(vitalsWeek.heartRate, "avg");
  const activeMinutes = 210;
  const sleepAvgHours = 7.2;

  const hrStatus = statusForHeartRate(hrStats.current);
  const spo2Status = statusForSpO2(spo2Stats.current);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Patient Dashboard</h1>
      <p style={{ marginTop: -6, color: "#94a3b8" }}>
        Overview of your health vitals and weekly trends.
      </p>

      {/* Top cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
        <MetricCard
          title="Heart Rate"
          value={hrStats.current}
          unit="bpm"
          sub={`Resting ${hrStats.resting} • Peak ${hrStats.peak}`}
          status={hrStatus}
          onClick={() => nav("/patient/vitals")}
        />
        <MetricCard
          title="Blood Oxygen (SpO₂)"
          value={spo2Stats.current}
          unit="%"
          sub={`Today range ${spo2Stats.resting}–${spo2Stats.peak}`}
          status={spo2Status}
          onClick={() => nav("/patient/vitals")}
        />
        <MetricCard
          title="Steps Today"
          value={stepsToday}
          unit="steps"
          sub="Daily progress"
          onClick={() => nav("/patient/vitals")}
        />
        <MetricCard
          title="Calories Burned"
          value={caloriesBurned}
          unit="kcal"
          sub="Estimated today"
          onClick={() => nav("/patient/vitals")}
        />
      </div>

      {/* Weekly Summary */}
      <div style={{ border: "1px solid #1e293b", borderRadius: 16, padding: 16, background: "#0b1220" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18 }}>Weekly Summary</h2>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>Averages and totals from the last 7 days</div>
          </div>

          <button
            onClick={() => nav("/patient/vitals")}
            style={{
              border: "1px solid #334155",
              background: "transparent",
              color: "#f1f5f9",
              padding: "8px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            View Vitals →
          </button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 14, background: "#111c33", border: "1px solid #1e293b" }}>
            <div style={{ fontWeight: 900 }}>Avg Heart Rate</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{hrWeek.avg} bpm</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>
              Resting {hrWeek.resting} • Peak {hrWeek.peak}
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 14, background: "#111c33", border: "1px solid #1e293b" }}>
            <div style={{ fontWeight: 900 }}>Active Minutes</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{activeMinutes} min</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>Weekly total</div>
          </div>

          <div style={{ padding: 12, borderRadius: 14, background: "#111c33", border: "1px solid #1e293b" }}>
            <div style={{ fontWeight: 900 }}>Sleep</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{sleepAvgHours} hrs</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>Average per night</div>
          </div>
        </div>
      </div>

      {/* Warning block */}
      {(hrStatus === "danger" || spo2Status === "danger") && (
        <div style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.10)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900, color: "#fca5a5" }}>Warning</div>
          <div style={{ marginTop: 6, color: "#fecaca" }}>
            {hrStatus === "danger" ? `High heart rate detected (${hrStats.current} bpm). ` : null}
            {spo2Status === "danger" ? `Low SpO₂ detected (${spo2Stats.current}%).` : null}
          </div>
          <div style={{ marginTop: 6, color: "#94a3b8", fontSize: 13 }}>
            If readings persist or you feel unwell, seek medical advice.
          </div>
        </div>
      )}
    </div>
  );
};