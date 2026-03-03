export const thresholds = {
  heartRate: { low: 50, high: 120 }, // bpm
  spo2: { low: 92, high: 100 }, // %
};

function minutesAgo(n) {
  return new Date(Date.now() - n * 60 * 1000).toISOString();
}

export const vitalsToday = {
  heartRate: [
    { t: minutesAgo(180), v: 72 },
    { t: minutesAgo(150), v: 75 },
    { t: minutesAgo(120), v: 80 },
    { t: minutesAgo(90), v: 95 },
    { t: minutesAgo(60), v: 110 },
    { t: minutesAgo(30), v: 128 }, // high -> warning
    { t: minutesAgo(10), v: 122 },
    { t: minutesAgo(0), v: 118 },
  ],
  spo2: [
    { t: minutesAgo(180), v: 98 },
    { t: minutesAgo(120), v: 97 },
    { t: minutesAgo(60), v: 96 },
    { t: minutesAgo(0), v: 95 },
  ],
};

export const vitalsWeek = {
  heartRate: [
    { day: "Mon", avg: 78, resting: 62, peak: 120 },
    { day: "Tue", avg: 82, resting: 64, peak: 125 },
    { day: "Wed", avg: 79, resting: 61, peak: 118 },
    { day: "Thu", avg: 85, resting: 65, peak: 132 },
    { day: "Fri", avg: 83, resting: 63, peak: 128 },
    { day: "Sat", avg: 77, resting: 60, peak: 115 },
    { day: "Sun", avg: 81, resting: 62, peak: 140 }, // peak high -> warning
  ],
  spo2: [
    { day: "Mon", avg: 97 },
    { day: "Tue", avg: 97 },
    { day: "Wed", avg: 96 },
    { day: "Thu", avg: 96 },
    { day: "Fri", avg: 97 },
    { day: "Sat", avg: 96 },
    { day: "Sun", avg: 95 },
  ],
};

export function calcStatsFromToday(series) {
  const vals = series.map((x) => x.v);
  const current = vals[vals.length - 1];
  const peak = Math.max(...vals);
  const resting = Math.min(...vals);
  return { current, peak, resting };
}

export function calcStatsFromWeek(weekSeries, key = "avg") {
  const vals = weekSeries.map((x) => x[key]);
  const current = vals[vals.length - 1];
  const peak = Math.max(...vals);
  const resting = Math.min(...vals);
  const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  return { current, peak, resting, avg };
}