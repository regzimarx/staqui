"use client";
import {
  createContext,
  useContext,
  createElement,
  useId,
  useState,
  type OlHTMLAttributes,
  type HTMLAttributes,
  type CSSProperties,
  type ReactNode,
  type ImgHTMLAttributes,
} from "react";
import {
  Check,
  X,
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  CircleAlert,
  Settings,
  Copy,
  ArrowUpRight,
  Package,
  Upload,
  Moon,
  Sun,
  SlidersHorizontal,
  Code,
  Layers,
  CheckCheck,
  type LucideIcon,
} from "lucide-react";
import { cx, type Tone, type Size, type Space } from "./shared";
export type Density = "compact" | "comfortable";
export interface StaqProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: "light" | "dark" | "staqwish";
  density?: Density;
}
export const StaqContext = createContext<{
  theme: "light" | "dark" | "staqwish";
  density: Density;
}>({ theme: "light", density: "compact" });
export const useStaq = () => useContext(StaqContext);
export function StaqProvider({
  theme = "light",
  density = "compact",
  className,
  ...props
}: StaqProviderProps) {
  return (
    <StaqContext.Provider value={{ theme, density }}>
      <div
        data-staq-theme={theme}
        data-staq-density={density}
        className={cx("sq-root", className)}
        {...props}
      />
    </StaqContext.Provider>
  );
}
export const icons = {
  check: Check,
  close: X,
  search: Search,
  plus: Plus,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  info: Info,
  warning: CircleAlert,
  settings: Settings,
  copy: Copy,
  arrowUpRight: ArrowUpRight,
  package: Package,
  upload: Upload,
  moon: Moon,
  sun: Sun,
  sliders: SlidersHorizontal,
  code: Code,
  layers: Layers,
  complete: CheckCheck,
};
export interface IconProps {
  name?: keyof typeof icons;
  source?: LucideIcon;
  size?: number;
  label?: string;
  className?: string;
}
export function Icon({
  name = "info",
  source,
  size = 18,
  label,
  className,
}: IconProps) {
  const Component = source ?? icons[name];
  return (
    <Component
      size={size}
      strokeWidth={1.7}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    />
  );
}
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: Space;
  background?: "surface" | "subtle" | "transparent";
  border?: boolean;
  radius?: "small" | "medium" | "large";
}
export function Box({
  padding = "4",
  background = "transparent",
  border = false,
  radius = "medium",
  className,
  style,
  ...props
}: BoxProps) {
  return (
    <div
      className={cx("sq-box", className)}
      data-background={background}
      data-border={border}
      data-radius={radius}
      style={{ padding: `var(--sq-space-${padding})`, ...style }}
      {...props}
    />
  );
}
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: Space;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
}
export function Stack({
  direction = "column",
  gap = "4",
  align,
  justify,
  wrap = true,
  className,
  style,
  ...props
}: StackProps) {
  return (
    <div
      className={cx("sq-stack", className)}
      style={{
        flexDirection: direction,
        gap: `var(--sq-space-${gap})`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...props}
    />
  );
}
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  minColumnWidth?: string;
  gap?: Space;
}
export function Grid({
  columns = 2,
  minColumnWidth = "14rem",
  gap = "4",
  style,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cx("sq-grid", className)}
      style={
        {
          "--sq-columns": columns,
          "--sq-grid-min": minColumnWidth,
          gap: `var(--sq-space-${gap})`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
export function QueryContainer({
  name = "staq",
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { name?: string }) {
  return (
    <div
      style={{ containerType: "inline-size", containerName: name, ...style }}
      {...props}
    />
  );
}
export function Divider({
  vertical = false,
  className,
  ...props
}: HTMLAttributes<HTMLHRElement> & { vertical?: boolean }) {
  return (
    <hr
      className={cx("sq-divider", className)}
      data-vertical={vertical}
      aria-orientation={vertical ? "vertical" : "horizontal"}
      {...props}
    />
  );
}
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: Size;
}
export function Heading({
  level = 2,
  size = "medium",
  className,
  ...props
}: HeadingProps) {
  return createElement(`h${level}`, {
    className: cx("sq-heading", `sq-heading-${size}`, className),
    ...props,
  });
}
export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone | "muted";
  weight?: "regular" | "medium" | "bold";
  size?: Size;
}
export function Text({
  tone = "neutral",
  weight = "regular",
  size = "medium",
  className,
  ...props
}: TextProps) {
  return (
    <span
      className={cx("sq-text", className)}
      data-tone={tone}
      data-weight={weight}
      data-size={size}
      {...props}
    />
  );
}
export function Paragraph({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone | "muted" }) {
  return (
    <p className={cx("sq-paragraph", className)} data-tone={tone} {...props} />
  );
}
export interface NumberProps extends Omit<TextProps, "children"> {
  value: number;
  locale?: string;
  format?: Intl.NumberFormatOptions;
}
export function Number({
  value,
  locale = "en-US",
  format,
  className,
  ...props
}: NumberProps) {
  return (
    <Text className={cx("sq-number", className)} {...props}>
      {new Intl.NumberFormat(locale, format).format(value)}
    </Text>
  );
}
export function OrderedList(props: OlHTMLAttributes<HTMLOListElement>) {
  return <ol className="sq-list" {...props} />;
}
export function UnorderedList(props: HTMLAttributes<HTMLUListElement>) {
  return <ul className="sq-list" {...props} />;
}
export function ListItem(props: HTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: ReactNode;
  action?: ReactNode;
}
export function Section({
  heading,
  description,
  action,
  children,
  className,
  ...props
}: SectionProps) {
  const id = useId();
  return (
    <section
      aria-labelledby={heading ? id : undefined}
      className={cx("sq-section", className)}
      {...props}
    >
      {(heading || action) && (
        <header className="sq-section-header">
          <div>
            {heading && <Heading id={id}>{heading}</Heading>}
            {description && <Paragraph tone="muted">{description}</Paragraph>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
export interface PageProps extends SectionProps {
  aside?: ReactNode;
  breadcrumbs?: ReactNode;
  width?: "default" | "wide" | "narrow";
}
export function Page({
  heading,
  description,
  action,
  aside,
  breadcrumbs,
  width = "default",
  className,
  children,
  ...props
}: PageProps) {
  return (
    <div className={cx("sq-page", className)} data-width={width} {...props}>
      {breadcrumbs}
      <header className="sq-section-header">
        <div>
          {heading && (
            <Heading level={1} size="large">
              {heading}
            </Heading>
          )}
          {description && <Paragraph tone="muted">{description}</Paragraph>}
        </div>
        {action}
      </header>
      <div className={aside ? "sq-page-layout" : undefined}>
        <div>{children}</div>
        {aside && <aside>{aside}</aside>}
      </div>
    </div>
  );
}
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fit?: CSSProperties["objectFit"];
  aspectRatio?: string;
}
export function Image({
  alt,
  fit = "cover",
  aspectRatio,
  style,
  className,
  ...props
}: ImageProps) {
  return (
    <img
      alt={alt}
      className={cx("sq-image", className)}
      style={{ objectFit: fit, aspectRatio, ...style }}
      {...props}
    />
  );
}
export function Thumbnail({
  size = "medium",
  className,
  ...props
}: ImageProps & { size?: Size }) {
  return (
    <Image
      className={cx("sq-thumbnail", className)}
      data-size={size}
      {...props}
    />
  );
}
export interface AvatarProps {
  name: string;
  src?: string;
  size?: Size;
  className?: string;
}
export function Avatar({ name, src, size = "medium", className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("");
  return (
    <span
      className={cx("sq-avatar", className)}
      data-size={size}
      role="img"
      aria-label={name}
    >
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        initials
      )}
    </span>
  );
}
