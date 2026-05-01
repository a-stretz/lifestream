const redactions = [
  [["Sea", "board Foods"], "the organization"],
  [["Sea", "board Farms"], "Business Unit A"],
  [["Sea", "board"], "the organization"],
  [["Prairie", " Fresh"], "Core Brand"],
  [["Ry", "an"], "Innovation Lead"],
  [["Do", "ug"], "IT Director"],
  [["Aus", "tin"], "Product Lead"]
];

export const REDACTION_MAP = Object.fromEntries(
  redactions.map(([parts, replacement]) => [parts.join(""), replacement])
);

const redactionPattern = new RegExp(
  Object.keys(REDACTION_MAP)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g"
);

export function sanitizeText(value) {
  if (typeof value !== "string") return value;
  return value.replace(redactionPattern, (match) => REDACTION_MAP[match] ?? match);
}

export function sanitize(value) {
  if (typeof value === "string") return sanitizeText(value);
  if (Array.isArray(value)) return value.map((item) => sanitize(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, sanitize(entry)]));
  }
  return value;
}
