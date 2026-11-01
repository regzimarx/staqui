import { useState } from "react";
export type Tone = "neutral" | "success" | "warning" | "critical" | "info";
export type Size = "small" | "medium" | "large";
export type Space = "0" | "1" | "2" | "3" | "4" | "6" | "8";
export const cx = (...values: (string | undefined | false)[]) =>
  values.filter(Boolean).join(" ");
export function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
  controlled = value !== undefined,
) {
  const [internal, setInternal] = useState(defaultValue);
  return [
    controlled ? (value as T) : internal,
    (next: T) => {
      if (!controlled) setInternal(next);
      onChange?.(next);
    },
  ] as const;
}
