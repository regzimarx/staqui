"use client";
import {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { cx, useControllable } from "./shared";
import { Icon } from "./foundations";
import { Button } from "./actions";
export interface FieldBase {
  label: string;
  description?: string;
  error?: string;
  hideLabel?: boolean;
}
function FieldShell({
  id,
  label,
  description,
  error,
  hideLabel,
  required,
  children,
}: FieldBase & { id: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="sq-field">
      <label htmlFor={id} className={hideLabel ? "sq-sr-only" : "sq-label"}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {description && (
        <div id={`${id}-help`} className="sq-field-help">
          {description}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="sq-field-error">
          <Icon name="warning" size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
export interface TextFieldProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    FieldBase {
  prefix?: ReactNode;
  suffix?: ReactNode;
  onValueChange?: (value: string) => void;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      description,
      error,
      hideLabel,
      id: givenId,
      prefix,
      suffix,
      className,
      onValueChange,
      onChange,
      required,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const id = givenId ?? uid;
    const describedBy =
      [
        description && `${id}-help`,
        error && `${id}-error`,
        props["aria-describedby"],
      ]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <FieldShell {...{ id, label, description, error, hideLabel, required }}>
        <div
          className="sq-input-wrap"
          data-error={!!error}
          data-disabled={!!props.disabled}
        >
          {prefix && <span className="sq-input-affix">{prefix}</span>}
          <input
            ref={ref}
            id={id}
            className={cx("sq-input", className)}
            required={required}
            {...props}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={describedBy}
            onChange={(e) => {
              onChange?.(e);
              onValueChange?.(e.target.value);
            }}
          />
          {suffix && <span className="sq-input-affix">{suffix}</span>}
        </div>
      </FieldShell>
    );
  },
);
export function EmailField(props: TextFieldProps) {
  return <TextField autoComplete="email" {...props} type="email" />;
}
export function URLField(props: TextFieldProps) {
  return <TextField autoComplete="url" {...props} type="url" />;
}
export function SearchField(props: TextFieldProps) {
  return <TextField prefix={<Icon name="search" />} {...props} type="search" />;
}
export function NumberField(props: TextFieldProps) {
  return <TextField inputMode="decimal" {...props} type="number" />;
}
export interface MoneyFieldProps extends TextFieldProps {
  currency?: string;
  locale?: string;
}
export function MoneyField({
  currency = "USD",
  locale = "en-US",
  ...props
}: MoneyFieldProps) {
  const symbol =
    new Intl.NumberFormat(locale, { style: "currency", currency })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currency;
  return (
    <NumberField step="0.01" prefix={symbol} suffix={currency} {...props} />
  );
}
export function PasswordField(props: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      autoComplete="current-password"
      {...props}
      type={visible ? "text" : "password"}
      suffix={
        <Button
          variant="tertiary"
          size="small"
          disabled={props.disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide" : "Show"}
        </Button>
      }
    />
  );
}
export function DateField(props: TextFieldProps) {
  return <TextField {...props} className={cx("sq-date-field", props.className)} type="date" />;
}
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBase {
  onValueChange?: (value: string) => void;
}
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      description,
      error,
      hideLabel,
      id: givenId,
      onValueChange,
      onChange,
      className,
      required,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const id = givenId ?? uid;
    return (
      <FieldShell {...{ id, label, description, error, hideLabel, required }}>
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={cx("sq-input", "sq-textarea", className)}
          required={required}
          {...props}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [
              description && `${id}-help`,
              error && `${id}-error`,
              props["aria-describedby"],
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
          }}
        />
      </FieldShell>
    );
  },
);
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}
export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>, FieldBase {
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      description,
      error,
      hideLabel,
      id: givenId,
      options,
      placeholder,
      onValueChange,
      onChange,
      className,
      required,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const id = givenId ?? uid;
    const groups = [...new Set(options.map((o) => o.group))];
    const option = (o: SelectOption) => (
      <option key={o.value} value={o.value} disabled={o.disabled}>
        {o.label}
      </option>
    );
    return (
      <FieldShell {...{ id, label, description, error, hideLabel, required }}>
        <select
          ref={ref}
          id={id}
          className={cx("sq-input", "sq-select", className)}
          required={required}
          defaultValue={
            placeholder && props.value === undefined
              ? (props.defaultValue ?? "")
              : undefined
          }
          {...props}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [
              description && `${id}-help`,
              error && `${id}-error`,
              props["aria-describedby"],
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {groups.map((group) =>
            group ? (
              <optgroup key={group} label={group}>
                {options.filter((o) => o.group === group).map(option)}
              </optgroup>
            ) : (
              options.filter((o) => !o.group).map(option)
            ),
          )}
        </select>
      </FieldShell>
    );
  },
);
export interface CheckboxProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    FieldBase {
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export function Checkbox({
  label,
  description,
  error,
  hideLabel,
  id: givenId,
  indeterminate,
  onCheckedChange,
  onChange,
  className,
  ...props
}: CheckboxProps) {
  const uid = useId();
  const id = givenId ?? uid;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <div className="sq-check-field">
      <label htmlFor={id} className={cx("sq-check-label", className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="sq-checkbox"
          {...props}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [
              description && `${id}-help`,
              error && `${id}-error`,
              props["aria-describedby"],
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onChange={(e) => {
            onChange?.(e);
            onCheckedChange?.(e.target.checked);
          }}
        />
        <span className={hideLabel ? "sq-sr-only" : undefined}>{label}</span>
      </label>
      {description && (
        <div id={`${id}-help`} className="sq-field-help">
          {description}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="sq-field-error">
          {error}
        </div>
      )}
    </div>
  );
}
export function Switch(props: Omit<CheckboxProps, "indeterminate">) {
  return (
    <Checkbox
      {...props}
      role="switch"
      className={cx("sq-switch", props.className)}
    />
  );
}
export interface ChoiceListProps extends FieldBase {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  name?: string;
  required?: boolean;
}
export function ChoiceList({
  label,
  options,
  value,
  defaultValue = [],
  onValueChange,
  multiple,
  disabled,
  name,
  required,
  description,
  error,
  hideLabel,
}: ChoiceListProps) {
  const id = useId();
  const [selected, setSelected] = useControllable(
    value,
    defaultValue,
    onValueChange,
  );
  return (
    <fieldset
      className="sq-choice-list"
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={
        [description && `${id}-help`, error && `${id}-error`]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      <legend className={hideLabel ? "sq-sr-only" : "sq-label"}>{label}</legend>
      {options.map((o) => (
        <label key={o.value} className="sq-check-label">
          <input
            className="sq-checkbox"
            type={multiple ? "checkbox" : "radio"}
            name={name ?? id}
            value={o.value}
            required={required && (!multiple || selected.length === 0)}
            disabled={o.disabled}
            checked={selected.includes(o.value)}
            onChange={(e) =>
              setSelected(
                multiple
                  ? e.target.checked
                    ? [...selected, o.value]
                    : selected.filter((v) => v !== o.value)
                  : [o.value],
              )
            }
          />
          {o.label}
        </label>
      ))}
      {description && (
        <div id={`${id}-help`} className="sq-field-help">
          {description}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="sq-field-error">
          {error}
        </div>
      )}
    </fieldset>
  );
}
export interface ColorPickerProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}
export function ColorPicker({
  label = "Color",
  value,
  defaultValue = "#0a2eb5",
  onValueChange,
  ...props
}: ColorPickerProps) {
  return (
    <label className="sq-color-picker">
      <span>{label}</span>
      <input
        type="color"
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...props}
      />
    </label>
  );
}
export function ColorField({
  value,
  defaultValue = "#0a2eb5",
  onValueChange,
  onChange,
  ...props
}: TextFieldProps) {
  const [color, setColor] = useControllable(
    value === undefined ? undefined : String(value),
    String(defaultValue),
    onValueChange,
  );
  return (
    <TextField
      {...props}
      value={color}
      pattern="#[0-9a-fA-F]{6}"
      onChange={onChange}
      onValueChange={setColor}
      prefix={
        <input
          aria-label={`${props.label} picker`}
          className="sq-color-input"
          type="color"
          disabled={props.disabled || props.readOnly}
          value={/^#[0-9a-f]{6}$/i.test(color) ? color : "#000000"}
          onChange={(e) => setColor(e.target.value)}
        />
      }
    />
  );
}
export interface DropZoneProps extends FieldBase {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number;
  name?: string;
  required?: boolean;
  onFilesChange?: (files: File[]) => void;
  onReject?: (message: string) => void;
}
export function DropZone({
  label,
  description,
  error,
  accept,
  multiple,
  disabled,
  maxSize = 10 * 1024 * 1024,
  name,
  required,
  onFilesChange,
  onReject,
}: DropZoneProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [rejection, setRejection] = useState("");
  const [dragging, setDragging] = useState(false);
  function receive(incoming: File[]) {
    if (disabled) return false;
    const patterns =
      accept
        ?.split(",")
        .map((x) => x.trim().toLowerCase())
        .filter(Boolean) ?? [];
    const invalid =
      (!multiple && incoming.length > 1) ||
      incoming.some(
        (f) =>
          f.size > maxSize ||
          (patterns.length > 0 &&
            !patterns.some((p) =>
              p.startsWith(".")
                ? f.name.toLowerCase().endsWith(p)
                : p.endsWith("/*")
                  ? f.type.startsWith(p.slice(0, -1))
                  : f.type === p,
            )),
      );
    if (invalid) {
      const message =
        "File rejected. Check the file type, size, and number of files.";
      setRejection(message);
      onReject?.(message);
      if (ref.current) ref.current.value = "";
      return false;
    }
    setRejection("");
    setFiles(incoming);
    onFilesChange?.(incoming);
    return true;
  }
  return (
    <div className="sq-field">
      <label htmlFor={id} className="sq-label">
        {label}
      </label>
      <div
        className="sq-drop-zone"
        data-dragging={dragging}
        data-disabled={disabled}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = Array.from(e.dataTransfer.files);
          if (receive(dropped) && ref.current) {
            try {
              const transfer = new DataTransfer();
              dropped.forEach((f) => transfer.items.add(f));
              ref.current.files = transfer.files;
            } catch {}
          }
        }}
      >
        <Icon name="upload" size={24} />
        <span>Drop files here or choose files</span>
        <input
          ref={ref}
          id={id}
          type="file"
          name={name}
          required={required}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={!!(error || rejection)}
          aria-describedby={`${id}-help ${id}-status`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            receive(Array.from(e.target.files ?? []))
          }
        />
      </div>
      <div id={`${id}-help`} className="sq-field-help">
        {description ??
          `Maximum ${Math.round(maxSize / 1024 / 1024)} MB per file`}
      </div>
      <div
        id={`${id}-status`}
        aria-live="polite"
        className={error || rejection ? "sq-field-error" : "sq-field-help"}
      >
        {error || rejection || files.map((f) => f.name).join(", ")}
      </div>
    </div>
  );
}
