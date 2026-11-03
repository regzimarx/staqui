"use client";
import {
  forwardRef,
  useId,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { CalendarDays, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { cx, useControllable } from "./shared";
import { Icon, useStaq } from "./foundations";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as Popover from "@radix-ui/react-popover";
import { DatePicker } from "./complex";
import { Button } from "./actions";
import { ColorControls, ColorFieldPicker } from "./color-field-picker";
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
function FormatField({
  type,
  error,
  onChange,
  ...props
}: TextFieldProps & { type: "email" | "url" }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidFormat, setInvalidFormat] = useState(false);
  const formatError =
    type === "url" ? "Enter a valid URL." : "Enter a valid email address.";
  useEffect(() => {
    setInvalidFormat(inputRef.current?.validity.typeMismatch ?? false);
  }, [props.value, props.defaultValue, props.multiple]);

  return (
    <TextField
      autoComplete={type}
      {...props}
      ref={inputRef}
      type={type}
      error={error || (invalidFormat ? formatError : undefined)}
      onChange={(event) => {
        setInvalidFormat(event.currentTarget.validity.typeMismatch);
        onChange?.(event);
      }}
    />
  );
}
export function EmailField(props: TextFieldProps) {
  return <FormatField {...props} type="email" />;
}
export function URLField(props: TextFieldProps) {
  return <FormatField {...props} type="url" />;
}
export function SearchField({ className, ...props }: TextFieldProps) {
  return (
    <TextField
      prefix={<Icon name="search" size={16} />}
      {...props}
      className={cx("sq-search-field", className)}
      type="search"
    />
  );
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
      className={cx("sq-password-field", props.className)}
      prefix={props.prefix ?? <Icon source={LockKeyhole} size={15} />}
      type={visible ? "text" : "password"}
      suffix={
        <button
          type="button"
          className="sq-password-toggle"
          disabled={props.disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          <Icon source={visible ? EyeOff : Eye} size={16} />
        </button>
      }
    />
  );
}
function parseDateField(value: TextFieldProps["value"]) {
  if (typeof value !== "string" || !/^\d{4,}-\d{2}-\d{2}$/.test(value)) return;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
    return date;
}

export function DateField({ suffix, ...props }: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useStaq();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const min = parseDateField(props.min);
  const max = parseDateField(props.max);
  const disabled = props.disabled || props.readOnly;

  function selectDate(next: Date | undefined) {
    const input = inputRef.current;
    if (!input || !next) return;
    const value = [
      String(next.getFullYear()).padStart(4, "0"),
      String(next.getMonth() + 1).padStart(2, "0"),
      String(next.getDate()).padStart(2, "0"),
    ].join("-");
    if (value !== input.value) {
      // Use the native setter so React receives the calendar choice as a field change.
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;
      setter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    setOpen(false);
  }

  return (
    <TextField
      {...props}
      ref={inputRef}
      className={cx("sq-date-field", props.className)}
      type="date"
      suffix={
        <>
          {suffix}
          <Popover.Root
            open={open && !disabled}
            onOpenChange={(next) => {
              if (next) setDate(parseDateField(inputRef.current?.value));
              setOpen(next);
            }}
          >
            <Popover.Trigger
              type="button"
              className="sq-date-trigger"
              aria-label={`${props.label} calendar`}
              disabled={disabled}
            >
              <Icon source={CalendarDays} size={16} />
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="sq-popover sq-date-field-popover"
                data-staq-theme={theme}
                aria-label={`${props.label} calendar`}
                align="end"
                sideOffset={8}
              >
                <DatePicker
                  value={date}
                  defaultMonth={date ?? min}
                  startMonth={min}
                  endMonth={max}
                  disabled={[
                    ...(min ? [{ before: min }] : []),
                    ...(max ? [{ after: max }] : []),
                  ]}
                  onValueChange={selectDate}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </>
      }
    />
  );
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
  description?: string;
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
    const { theme } = useStaq();
    const native = useRef<HTMLSelectElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const nativeOnly = props.multiple || (props.size ?? 1) > 1;
    const groups = [...new Set(options.map((o) => o.group))];
    const [selected, setSelected] = useState(() => {
      const initial = props.value ?? props.defaultValue;
      if (initial !== undefined) {
        return options.find((option) => option.value === String(initial))
          ?.value;
      }
      return placeholder
        ? undefined
        : options.find((option) => !option.disabled)?.value;
    });
    useImperativeHandle(ref, () => native.current!, []);
    useEffect(() => {
      const select = native.current;
      if (!select || nativeOnly) return;
      const sync = () =>
        setSelected(
          select.selectedIndex >= 0 &&
            !select.selectedOptions[0]?.hasAttribute("data-placeholder")
            ? select.value
            : undefined,
        );
      sync();
      const form = select.form;
      let reset: ReturnType<typeof setTimeout>;
      const afterReset = () => {
        reset = setTimeout(sync, 0);
      };
      form?.addEventListener("reset", afterReset);
      return () => {
        clearTimeout(reset);
        form?.removeEventListener("reset", afterReset);
      };
    }, [nativeOnly, options, placeholder, props.value, props.form]);

    const describedBy =
      [
        description && `${id}-help`,
        error && `${id}-error`,
        props["aria-describedby"],
      ]
        .filter(Boolean)
        .join(" ") || undefined;
    const nativeOption = (o: SelectOption) => (
      <option key={o.value} value={o.value} disabled={o.disabled}>
        {o.label}
      </option>
    );

    return (
      <FieldShell {...{ id, label, description, error, hideLabel, required }}>
        <select
          ref={native}
          id={nativeOnly ? id : `${id}-native`}
          className={
            nativeOnly ? cx("sq-input", "sq-select", className) : "sq-sr-only"
          }
          required={required}
          defaultValue={
            placeholder && props.value === undefined ? "" : undefined
          }
          {...props}
          autoFocus={nativeOnly ? props.autoFocus : undefined}
          tabIndex={nativeOnly ? props.tabIndex : -1}
          aria-hidden={nativeOnly ? props["aria-hidden"] : true}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={describedBy}
          onInvalid={(event) => {
            props.onInvalid?.(event);
            if (!nativeOnly && !event.defaultPrevented) {
              event.preventDefault();
              trigger.current?.focus();
            }
          }}
          onChange={(event) => {
            if (props.value === undefined)
              setSelected(event.currentTarget.value);
            onChange?.(event);
            onValueChange?.(event.currentTarget.value);
          }}
        >
          {placeholder && (
            <option value="" disabled data-placeholder>
              {placeholder}
            </option>
          )}
          {groups.map((group) =>
            group ? (
              <optgroup key={group} label={group}>
                {options.filter((o) => o.group === group).map(nativeOption)}
              </optgroup>
            ) : (
              options.filter((o) => !o.group).map(nativeOption)
            ),
          )}
        </select>
        {!nativeOnly && (
          <SelectPrimitive.Root
            value={selected === undefined ? "" : `option:${selected}`}
            disabled={props.disabled}
            onValueChange={(value) => {
              const select = native.current;
              if (!select) return;
              select.value = value.slice("option:".length);
              select.dispatchEvent(new Event("change", { bubbles: true }));
            }}
          >
            <SelectPrimitive.Trigger
              ref={trigger}
              id={id}
              autoFocus={props.autoFocus}
              className={cx("sq-input", "sq-select-trigger", className)}
              tabIndex={props.tabIndex}
              aria-label={props["aria-label"]}
              aria-labelledby={props["aria-labelledby"]}
              aria-describedby={describedBy}
              aria-invalid={error ? true : props["aria-invalid"]}
              aria-required={required}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon asChild>
                <Icon name="chevronDown" size={16} />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className="sq-select-popup"
                data-staq-theme={theme}
                position="popper"
                align="start"
                sideOffset={8}
                collisionPadding={12}
              >
                <SelectPrimitive.Viewport>
                  {groups.map((group) => (
                    <SelectPrimitive.Group key={group ?? ""}>
                      {group && (
                        <SelectPrimitive.Label className="sq-menu-label">
                          {group}
                        </SelectPrimitive.Label>
                      )}
                      {options
                        .filter((option) => option.group === group)
                        .map((option) => (
                          <SelectPrimitive.Item
                            key={option.value}
                            className="sq-select-option"
                            value={`option:${option.value}`}
                            disabled={option.disabled}
                          >
                            <span className="sq-select-option-copy">
                              <SelectPrimitive.ItemText>
                                {option.label}
                              </SelectPrimitive.ItemText>
                              {option.description && (
                                <span className="sq-field-help">
                                  {option.description}
                                </span>
                              )}
                            </span>
                            <SelectPrimitive.ItemIndicator className="sq-select-check">
                              <Icon name="check" size={16} />
                            </SelectPrimitive.ItemIndicator>
                          </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Group>
                  ))}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        )}
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
export interface ChoiceOption extends SelectOption {
  description?: string;
  icon?: ReactNode;
  badge?: ReactNode;
}
export interface ChoiceListProps extends FieldBase {
  options: ChoiceOption[];
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
      {options.map((o, index) => (
        <label key={o.value} className="sq-check-label">
          <input
            className="sq-checkbox"
            aria-labelledby={`${id}-option-${index}`}
            aria-describedby={
              o.description ? `${id}-option-${index}-help` : undefined
            }
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
          {o.icon && (
            <span className="sq-choice-icon" aria-hidden="true">
              {o.icon}
            </span>
          )}
          <span className="sq-choice-copy">
            <span id={`${id}-option-${index}`}>{o.label}</span>
            {o.description && (
              <span className="sq-field-help" id={`${id}-option-${index}-help`}>
                {o.description}
              </span>
            )}
          </span>
          {o.badge && <span className="sq-choice-badge">{o.badge}</span>}
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
  disabled,
  name,
}: ColorPickerProps) {
  const [color, setColor] = useControllable(value, defaultValue, onValueChange);
  return (
    <div className="sq-color-picker">
      <ColorControls
        color={color}
        label={label}
        disabled={disabled}
        onChange={setColor}
      />
      {name && (
        <input type="hidden" name={name} value={color} disabled={disabled} />
      )}
    </div>
  );
}
export function ColorField({
  value,
  defaultValue = "#0a2eb5",
  onValueChange,
  onChange,
  className,
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
      className={cx("sq-color-field", className)}
      value={color}
      pattern="#[0-9a-fA-F]{6}"
      onChange={onChange}
      onValueChange={setColor}
      prefix={
        <ColorFieldPicker
          label={props.label}
          color={color}
          disabled={props.disabled || props.readOnly}
          onChange={setColor}
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
  hideLabel,
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
      <label htmlFor={id} className={hideLabel ? "sq-sr-only" : "sq-label"}>
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
        onDragLeave={(event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            setDragging(false);
          }
        }}
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
        <span className="sq-drop-icon">
          <Icon name="upload" size={20} />
        </span>
        <span className="sq-drop-title">
          {multiple ? "Drag and drop files here" : "Drag and drop a file here"}
        </span>
        <input
          ref={ref}
          id={id}
          type="file"
          className="sq-sr-only"
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
        <label htmlFor={id} className="sq-drop-action" aria-hidden="true">
          {multiple ? "Choose files" : "Choose file"}
        </label>
        <div id={`${id}-help`} className="sq-field-help">
          {description ??
            `Maximum ${Math.round(maxSize / 1024 / 1024)} MB per file`}
        </div>
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
