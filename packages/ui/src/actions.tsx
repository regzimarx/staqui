"use client";
import {
  forwardRef,
  useState,
  useId,
  type KeyboardEvent,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type ElementType,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cx, useControllable, type Tone, type Size } from "./shared";
import { Icon } from "./foundations";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  tone?: "neutral" | "critical";
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      tone = "neutral",
      size = "medium",
      loading,
      disabled,
      icon,
      fullWidth,
      asChild,
      children,
      className,
      type = "button",
      ...props
    },
    ref,
  ) {
    const Comp = (asChild ? Slot : "button") as ElementType;
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cx("sq-button", className)}
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        data-full-width={fullWidth}
        data-loading={!asChild && loading ? true : undefined}
        disabled={asChild ? undefined : disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="sq-button__contents">
              {icon != null && <span className="sq-button__icon">{icon}</span>}
              {children != null && (
                <span className="sq-button__label">{children}</span>
              )}
            </span>
            {loading && (
              <svg
                className="sq-button__spinner"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="10" cy="10" r="7" />
              </svg>
            )}
            {loading && <span className="sq-sr-only">Loading</span>}
          </>
        )}
      </Comp>
    );
  },
);
export function ButtonGroup({
  label,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx("sq-button-group", className)}
      {...props}
    />
  );
}
export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  label: string;
  items: readonly TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  label,
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const id = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.value ?? "";
  const [selection, setSelection] = useControllable(
    value,
    defaultValue ?? firstEnabled,
    onValueChange,
  );
  const selected = items.some(
    (item) => !item.disabled && item.value === selection,
  )
    ? selection
    : firstEnabled;

  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    const { key, currentTarget } = event;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

    const list = currentTarget.parentElement;
    if (!list) return;
    const buttons = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const index = buttons.indexOf(currentTarget);
    const rtl = getComputedStyle(list).direction === "rtl";
    const step = (key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? buttons.length - 1
          : (index + step + buttons.length) % buttons.length;
    event.preventDefault();
    buttons[next]?.focus();
    buttons[next]?.click();
  }

  return (
    <div className={cx("sq-tabs", className)} {...props}>
      <div className="sq-tab-list" role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const active = !item.disabled && item.value === selected;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              className="sq-tab"
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel-${index}`}
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              disabled={item.disabled}
              onClick={() => {
                if (!active) setSelection(item.value);
              }}
              onKeyDown={navigate}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.value}
          role="tabpanel"
          className="sq-tab-panel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={item.disabled || item.value !== selected}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

export const Clickable = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Clickable({ className, type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx("sq-clickable", className)}
      {...props}
    />
  );
});
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: "neutral" | "critical";
  variant?: "text" | "button";
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { tone = "neutral", variant = "text", className, target, rel, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(variant === "button" ? "sq-button" : "sq-link", className)}
      data-tone={tone}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      {...props}
    />
  );
});
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
  tone?: Tone;
}
export function Chip({
  onRemove,
  removeLabel = "Remove tag",
  tone = "neutral",
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span className={cx("sq-chip", className)} data-tone={tone} {...props}>
      {children}
      {onRemove && (
        <button
          className="sq-chip-remove"
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <Icon name="close" size={12} />
        </button>
      )}
    </span>
  );
}
export interface ClickableChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}
export function ClickableChip({
  selected = false,
  onRemove,
  removeLabel = "Remove filter",
  className,
  children,
  ...props
}: ClickableChipProps) {
  return (
    <span className="sq-chip-wrapper">
      <button
        type="button"
        className={cx("sq-chip", "sq-clickable-chip", className)}
        aria-pressed={selected}
        {...props}
      >
        <span className="sq-clickable-chip__check" aria-hidden="true">
          <Icon name="check" size={14} />
        </span>
        {children}
      </button>
      {onRemove && (
        <button
          type="button"
          className="sq-chip-remove"
          disabled={props.disabled}
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <Icon name="close" size={12} />
        </button>
      )}
    </span>
  );
}
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: "small" | "medium";
  icon?: ReactNode;
}
export function Badge({
  tone = "neutral",
  size = "medium",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx("sq-badge", className)}
      data-tone={tone}
      data-size={size}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  tone?: Tone;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: ReactNode;
}
export function Banner({
  title,
  tone = "info",
  dismissible,
  onDismiss,
  action,
  className,
  children,
  ...props
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div
      role={tone === "critical" ? "alert" : "status"}
      className={cx("sq-banner", className)}
      data-tone={tone}
      {...props}
    >
      <Icon
        name={tone === "critical" || tone === "warning" ? "warning" : "info"}
      />
      <div className="sq-grow">
        <strong>{title}</strong>
        {children && <div>{children}</div>}
        {action}
      </div>
      {dismissible && (
        <Button
          variant="tertiary"
          size="small"
          aria-label="Dismiss notification"
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
        >
          <Icon name="close" />
        </Button>
      )}
    </div>
  );
}
export function EmptyState({
  title,
  children,
  action,
  graphic,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  graphic?: ReactNode;
}) {
  return (
    <div className="sq-empty">
      {graphic ?? <Icon name="package" size={36} />}
      <h3>{title}</h3>
      {children && <div className="sq-muted">{children}</div>}
      {action}
    </div>
  );
}
export interface ProgressProps {
  value?: number;
  max?: number;
  label: string;
  showValue?: boolean;
}
export function Progress({
  value,
  max = 100,
  label,
  showValue = true,
}: ProgressProps) {
  const safeMax = Math.max(1, max);
  const safeValue =
    value === undefined ? undefined : Math.min(safeMax, Math.max(0, value));
  return (
    <div className="sq-progress">
      <div>
        <span>{label}</span>
        {showValue && safeValue !== undefined && (
          <span>{Math.round((safeValue / safeMax) * 100)}%</span>
        )}
      </div>
      <progress aria-label={label} max={safeMax} value={safeValue} />
    </div>
  );
}
export function Spinner({
  label = "Loading",
  size = "medium",
}: {
  label?: string;
  size?: Size;
}) {
  return (
    <span role="status" className="sq-spinner-wrap">
      <svg
        className="sq-spinner"
        data-size={size}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="9" />
        <circle cx="10" cy="10" r="9" />
      </svg>
      <span className="sq-sr-only">{label}</span>
    </span>
  );
}
