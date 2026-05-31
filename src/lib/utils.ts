import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Public folder asset path (respects Vite base, e.g. GitHub Pages /confidential-report/). */
export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL ?? "/";
  const normalized = path.replace(/^\//, "");
  return `${base}${normalized}`;
}
