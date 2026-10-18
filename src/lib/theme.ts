export const THEME_MODES = ["system", "light", "dark"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const PRIMARY_COLOR_KEYS = [
  "blue",
  "indigo",
  "sky",
  "violet",
  "rose",
  "amber",
  "red",
  "yellow",
  "green"
] as const;
export type PrimaryColorKey = (typeof PRIMARY_COLOR_KEYS)[number];

export interface PaletteVariant {
  fill: string;
  onFill: string;
  accent: string;
  soft: string;
  softBorder: string;
}

export interface PrimaryPalette {
  key: PrimaryColorKey;
  label: string;
  gradient: [string, string];
  light: PaletteVariant;
  dark: PaletteVariant;
}

export const PRIMARY_PALETTES: Record<PrimaryColorKey, PrimaryPalette> = {
  blue: {
    key: "blue",
    label: "Asul",
    gradient: ["#2563EB", "#1D4ED8"],
    light: {
      fill: "#2563EB",
      onFill: "#FFFFFF",
      accent: "#2563EB",
      soft: "#EFF6FF",
      softBorder: "#DBEAFE",
    },
    dark: {
      fill: "#3B82F6",
      onFill: "#FFFFFF",
      accent: "#60A5FA",
      soft: "#172554",
      softBorder: "#1E3A8A",
    },
  },
  indigo: {
    key: "indigo",
    label: "Indigo",
    gradient: ["#4F46E5", "#4338CA"],
    light: {
      fill: "#4F46E5",
      onFill: "#FFFFFF",
      accent: "#4F46E5",
      soft: "#EEF2FF",
      softBorder: "#E0E7FF",
    },
    dark: {
      fill: "#6366F1",
      onFill: "#FFFFFF",
      accent: "#818CF8",
      soft: "#1E1B4B",
      softBorder: "#3730A3",
    },
  },
  sky: {
    key: "sky",
    label: "Sky",
    gradient: ["#0EA5E9", "#0284C7"],
    light: {
      fill: "#0EA5E9",
      onFill: "#FFFFFF",
      accent: "#0284C7",
      soft: "#F0F9FF",
      softBorder: "#E0F2FE",
    },
    dark: {
      fill: "#38BDF8",
      onFill: "#082F49",
      accent: "#7DD3FC",
      soft: "#082F49",
      softBorder: "#075985",
    },
  },
  violet: {
    key: "violet",
    label: "Violet",
    gradient: ["#7C3AED", "#6D28D9"],
    light: {
      fill: "#7C3AED",
      onFill: "#FFFFFF",
      accent: "#7C3AED",
      soft: "#F5F3FF",
      softBorder: "#EDE9FE",
    },
    dark: {
      fill: "#A855F7",
      onFill: "#FFFFFF",
      accent: "#C4B5FD",
      soft: "#2E1065",
      softBorder: "#5B21B6",
    },
  },
  rose: {
    key: "rose",
    label: "Rosas",
    gradient: ["#EC4899", "#DB2777"],
    light: {
      fill: "#EC4899",
      onFill: "#FFFFFF",
      accent: "#DB2777",
      soft: "#FDF2F8",
      softBorder: "#FBCFE8",
    },
    dark: {
      fill: "#EC4899",
      onFill: "#FFFFFF",
      accent: "#F472B6",
      soft: "#3B1930",
      softBorder: "#873D68",
    },
  },
  amber: {
    key: "amber",
    label: "Amber",
    gradient: ["#D97706", "#B45309"],
    light: {
      fill: "#FEF3C7",
      onFill: "#78350F",
      accent: "#B45309",
      soft: "#FFFBEB",
      softBorder: "#FDE68A",
    },
    dark: {
      fill: "#FDE68A",
      onFill: "#422006",
      accent: "#FCD34D",
      soft: "#451A03",
      softBorder: "#92400E",
    },
  },
  red: {
    key: "red",
    label: "pula",
    gradient: ["#BA1A1A", "#930000"],
    light: {
      fill: "#BA1A1A",
      onFill: "#FFFFFF",
      accent: "#BA1A1A",
      soft: "#FFF0EF",
      softBorder: "#FFDAD6",
    },
    dark: {
      fill: "#BA1A1A",
      onFill: "#FFFFFF",
      accent: "#FFB4AB",
      soft: "#410002",
      softBorder: "#93000A",
    },
  },
  yellow: {
    key: "yellow",
    label: "Dilaw",
    gradient: ["#FFFF00", "#E6E600"],
    light: {
      fill: "#FFFF00",
      onFill: "#171717",
      accent: "#B3B300",
      soft: "#FFFFCC",
      softBorder: "#E6E600",
    },
    dark: {
      fill: "#FFFF00",
      onFill: "#171717",
      accent: "#FFFF66",
      soft: "#333300",
      softBorder: "#666600",
    },
  },
  green: {
    key: "green",
    label: "Berde",
    gradient: ["#16A34A", "#15803D"],
    light: {
      fill: "#16A34A",
      onFill: "#FFFFFF",
      accent: "#15803D",
      soft: "#F0FDF4",
      softBorder: "#BBF7D0",
    },
    dark: {
      fill: "#16A34A",
      onFill: "#FFFFFF",
      accent: "#4ADE80",
      soft: "#142D1C",
      softBorder: "#326642",
    },
  },
};

export interface ThemeColors extends PaletteVariant {
  gradient: [string, string];
  background: string;
  surface: string;
  subtle: string;
  border: string;
  strong: string;
  text: string;
  textMuted: string;
  faint: string;
}

export const NEUTRAL_COLORS = {
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    subtle: "#E2E8F0",
    border: "#E2E8F0",
    strong: "#CBD5E1",
    text: "#0F172A",
    textMuted: "#64748B",
    faint: "#94A3B8",
  },
  dark: {
    background: "#020617",
    surface: "#0F172A",
    subtle: "#1E293B",
    border: "#334155",
    strong: "#475569",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    faint: "#64748B",
  },
} as const;

export function resolveThemeColors(
  primaryKey: PrimaryColorKey,
  isDark: boolean,
): ThemeColors {
  const palette = PRIMARY_PALETTES[primaryKey];
  const variant = isDark ? palette.dark : palette.light;
  const neutral = isDark ? NEUTRAL_COLORS.dark : NEUTRAL_COLORS.light;

  return {
    ...variant,
    gradient: palette.gradient,
    ...neutral,
  };
}

export function hexToRgbChannels(hex: string): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

export function buildThemeVariables(colors: ThemeColors) {
  return {
    "--color-primary": hexToRgbChannels(colors.fill),
    "--color-primary-soft": hexToRgbChannels(colors.soft),
    "--color-primary-line": hexToRgbChannels(colors.softBorder),
    "--color-primary-accent": hexToRgbChannels(colors.accent),
    "--color-on-primary": hexToRgbChannels(colors.onFill),
    "--color-background": hexToRgbChannels(colors.background),
    "--color-surface": hexToRgbChannels(colors.surface),
    "--color-subtle": hexToRgbChannels(colors.subtle),
    "--color-line": hexToRgbChannels(colors.border),
    "--color-strong": hexToRgbChannels(colors.strong),
    "--color-foreground": hexToRgbChannels(colors.text),
    "--color-muted": hexToRgbChannels(colors.textMuted),
    "--color-faint": hexToRgbChannels(colors.faint),
  };
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return (
    typeof value === "string" &&
    (THEME_MODES as readonly string[]).includes(value)
  );
}

export function isPrimaryColorKey(value: unknown): value is PrimaryColorKey {
  return (
    typeof value === "string" &&
    (PRIMARY_COLOR_KEYS as readonly string[]).includes(value)
  );
}
