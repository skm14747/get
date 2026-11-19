export type CronParts = [string, string, string, string, string];

export type CronSuccess = {
  ok: true;
  expression: string;
  parts: CronParts;
  description: string;
  nextDates: string[];
};

export type CronFailure = {
  ok: false;
  reason: string;
};

export type CronResult = CronSuccess | CronFailure;

export const CRON_PRESETS: { name: string; expression: string }[] = [
  { name: "Every minute", expression: "* * * * *" },
  { name: "Every 5 minutes", expression: "*/5 * * * *" },
  { name: "Every 15 minutes", expression: "*/15 * * * *" },
  { name: "Every hour", expression: "0 * * * *" },
  { name: "Daily at midnight", expression: "0 0 * * *" },
  { name: "Daily at 9:00 AM", expression: "0 9 * * *" },
  { name: "Weekdays at 9:00 AM", expression: "0 9 * * 1-5" },
  { name: "Every Sunday at midnight", expression: "0 0 * * 0" },
  { name: "1st of every month at midnight", expression: "0 0 1 * *" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function describeMinute(min: string): string {
  if (min === "*") return "every minute";
  if (min.startsWith("*/")) return `every ${min.slice(2)} minutes`;
  if (min.includes(",")) return `at minutes ${min}`;
  if (min.includes("-")) return `every minute from ${min.replace("-", " through ")}`;
  return `at minute ${min}`;
}

function describeHour(hr: string): string {
  if (hr === "*") return "of every hour";
  if (hr.startsWith("*/")) return `every ${hr.slice(2)} hours`;
  if (hr.includes(",")) return `at hours ${hr}`;
  if (hr.includes("-")) return `during hours ${hr.replace("-", " through ")}`;
  const pad = hr.padStart(2, "0");
  return `at ${pad}:00`;
}

function describeDayOfMonth(dom: string): string {
  if (dom === "*") return "";
  if (dom.startsWith("*/")) return `every ${dom.slice(2)} days`;
  if (dom.includes(",")) return `on days ${dom} of the month`;
  return `on day ${dom} of the month`;
}

function describeMonth(mon: string): string {
  if (mon === "*") return "";
  if (mon.startsWith("*/")) return `every ${mon.slice(2)} months`;
  const num = parseInt(mon, 10);
  if (!isNaN(num) && num >= 1 && num <= 12) {
    return `in ${MONTHS[num - 1]}`;
  }
  return `in month ${mon}`;
}

function describeDayOfWeek(dow: string): string {
  if (dow === "*") return "";
  if (dow === "1-5") return "on weekdays (Monday through Friday)";
  if (dow === "0,6" || dow === "6,0") return "on weekends (Saturday and Sunday)";
  const num = parseInt(dow, 10);
  if (!isNaN(num) && num >= 0 && num <= 6) {
    return `on ${DAYS[num]}`;
  }
  return `on day-of-week ${dow}`;
}

export function explainCron(expression: string): CronResult {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    return {
      ok: false,
      reason: `Expected 5 space-separated fields (minute, hour, day-of-month, month, day-of-week), found ${parts.length}.`,
    };
  }

  const [min, hr, dom, mon, dow] = parts as CronParts;

  // Validate characters (digits, *, /, -, ,)
  const validField = /^(\*|\d+)([\/\-,\d]+)?$/;
  for (let i = 0; i < 5; i++) {
    const f = parts[i]!;
    if (!validField.test(f) && f !== "*") {
      return { ok: false, reason: `Field #${i + 1} ('${f}') contains invalid characters.` };
    }
  }

  let desc = "";

  if (expression === "* * * * *") {
    desc = "Runs every single minute.";
  } else if (min.startsWith("*/") && hr === "*" && dom === "*" && mon === "*" && dow === "*") {
    desc = `Runs every ${min.slice(2)} minutes.`;
  } else if (min === "0" && hr.startsWith("*/") && dom === "*" && mon === "*" && dow === "*") {
    desc = `Runs every ${hr.slice(2)} hours, on the hour.`;
  } else if (min === "0" && hr === "0" && dom === "*" && mon === "*" && dow === "*") {
    desc = "Runs every day at midnight (00:00).";
  } else if (min === "0" && dom === "*" && mon === "*" && dow === "*") {
    desc = `Runs daily at ${hr.padStart(2, "0")}:00.`;
  } else {
    const details = [
      describeMinute(min),
      describeHour(hr),
      describeDayOfMonth(dom),
      describeMonth(mon),
      describeDayOfWeek(dow),
    ]
      .filter((s) => s.length > 0)
      .join(", ");

    desc = `Runs ${details}.`;
  }

  const nextDates = getNextRunDates(expression, 5);

  return {
    ok: true,
    expression: expression.trim(),
    parts: [min, hr, dom, mon, dow],
    description: desc,
    nextDates,
  };
}

function fieldMatches(val: number, field: string): boolean {
  if (field === "*") return true;
  if (field.startsWith("*/")) {
    const step = parseInt(field.slice(2), 10);
    return !isNaN(step) && step > 0 && val % step === 0;
  }
  if (field.includes(",")) {
    return field.split(",").some((sub) => fieldMatches(val, sub));
  }
  if (field.includes("-")) {
    const [startStr, endStr] = field.split("-");
    const start = parseInt(startStr!, 10);
    const end = parseInt(endStr!, 10);
    return !isNaN(start) && !isNaN(end) && val >= start && val <= end;
  }
  const exact = parseInt(field, 10);
  return val === exact;
}

export function getNextRunDates(expression: string, count: number = 5, fromDate: Date = new Date()): string[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minField, hrField, domField, monField, dowField] = parts;

  const results: string[] = [];
  const current = new Date(fromDate.getTime());
  // Advance to next whole minute
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1);

  let iterations = 0;
  const MAX_ITERATIONS = 100000; // Search window limit

  while (results.length < count && iterations < MAX_ITERATIONS) {
    iterations++;

    const m = current.getMinutes();
    const h = current.getHours();
    const dom = current.getDate();
    const mon = current.getMonth() + 1; // 1-12
    const dow = current.getDay(); // 0-6

    if (
      fieldMatches(m, minField!) &&
      fieldMatches(h, hrField!) &&
      fieldMatches(dom, domField!) &&
      fieldMatches(mon, monField!) &&
      fieldMatches(dow, dowField!)
    ) {
      const year = current.getFullYear();
      const monthStr = String(mon).padStart(2, "0");
      const dayStr = String(dom).padStart(2, "0");
      const hrStr = String(h).padStart(2, "0");
      const minStr = String(m).padStart(2, "0");
      const dayName = DAYS[dow];

      results.push(`${year}-${monthStr}-${dayStr} ${hrStr}:${minStr} (${dayName})`);
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}
