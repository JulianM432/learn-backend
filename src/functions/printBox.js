// ANSI Colors & Styles
export const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  // Text colors
  white: "\x1b[37m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",

  // Bright variants
  bWhite: "\x1b[97m",
  bGreen: "\x1b[92m",
  bYellow: "\x1b[93m",
  bBlue: "\x1b[94m",
  bCyan: "\x1b[96m",
  bRed: "\x1b[91m",
  bMagenta: "\x1b[95m",
};

const THEMES = {
  default: { border: C.bCyan, label: C.bWhite, value: C.bGreen },
  success: { border: C.bGreen, label: C.bWhite, value: C.bGreen },
  error: { border: C.bRed, label: C.bWhite, value: C.bRed },
  warning: { border: C.bYellow, label: C.bWhite, value: C.bYellow },
  info: { border: C.bBlue, label: C.bWhite, value: C.bCyan },
};

export function printBox(lines = [], { theme = "default", title = "" } = {}) {
  if (!Array.isArray(lines) || lines.length === 0) {
    console.error("printBox: pass an array with at least one item.");
    return;
  }

  const { border, label, value } = THEMES[theme] ?? THEMES.default;

  // Normalize to { label, value } shape
  const normalized = lines.map((line) => (typeof line === "string" ? { label: line, value: "" } : line));

  // Calculate widths
  const labelWidth = Math.max(...normalized.map((l) => l.label.length));
  const valueWidth = Math.max(...normalized.map((l) => l.value.length));
  const hasValues = normalized.some((l) => l.value);
  const innerWidth = hasValues
    ? labelWidth + valueWidth + 3 // "label  :  value"
    : labelWidth;
  const totalWidth = Math.max(innerWidth, title.length) + 4; // +4 padding

  const top = `${border}╔${"═".repeat(totalWidth)}╗${C.reset}`;
  const bottom = `${border}╚${"═".repeat(totalWidth)}╝${C.reset}`;
  const divider = `${border}╟${"─".repeat(totalWidth)}╢${C.reset}`;
  const empty = `${border}║${" ".repeat(totalWidth)}║${C.reset}`;

  const pad = (str, len) => str + " ".repeat(Math.max(0, len - str.length));

  console.log("");
  console.log(top);
  console.log(empty);

  // Optional title
  if (title) {
    const titlePadded = pad(title, totalWidth - 4);
    console.log(`${border}║${C.reset}  ${C.bold}${label}${titlePadded}${C.reset}  ${border}║${C.reset}`);
    console.log(divider);
    console.log(empty);
  }

  // Lines
  normalized.forEach(({ label: lbl, value: val }) => {
    if (hasValues && val) {
      const row = `${label}${pad(lbl, labelWidth)}${C.dim} → ${C.reset}${value}${val}`;
      const plainLen = labelWidth + 3 + val.length; // visible chars only
      const rightPad = " ".repeat(Math.max(0, totalWidth - plainLen - 4));
      console.log(`${border}║${C.reset}  ${row}${C.reset}${rightPad}  ${border}║${C.reset}`);
    } else {
      const plainLen = lbl.length;
      const rightPad = " ".repeat(Math.max(0, totalWidth - plainLen - 4));
      console.log(`${border}║${C.reset}  ${label}${lbl}${C.reset}${rightPad}  ${border}║${C.reset}`);
    }
  });

  console.log(empty);
  console.log(bottom);
  console.log("");
}
