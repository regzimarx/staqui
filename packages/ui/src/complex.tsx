"use client";
import { useId, type ReactNode } from "react";
import {
  DayPicker,
  labelDayButton,
  formatDay,
  type DateRange,
  type Matcher,
} from "react-day-picker";
import { useControllable } from "./shared";
import { Button } from "./actions";
import { Icon } from "./foundations";
export type { DateRange, Matcher };
interface CalendarBase {
  label?: string;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: Matcher | Matcher[];
  numberOfMonths?: 1 | 2;
  name?: string;
  locale?: React.ComponentProps<typeof DayPicker>["locale"];
  startMonth?: Date;
  endMonth?: Date;
}
export type DatePickerProps = CalendarBase &
  (
    | {
        mode?: "single";
        value?: Date;
        defaultValue?: Date;
        onValueChange?: (value: Date | undefined) => void;
      }
    | {
        mode: "range";
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange | undefined) => void;
      }
  );
const iso = (d?: Date) =>
  d
    ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    : "";
export function DatePicker(props: DatePickerProps) {
  const { label = "Choose a date", name, ...calendar } = props;
  const [selected, setSelected] = useControllable<Date | DateRange | undefined>(
    props.value,
    props.defaultValue,
    (next) => {
      if (props.mode === "range")
        props.onValueChange?.(next as DateRange | undefined);
      else props.onValueChange?.(next as Date | undefined);
    },
    "value" in props,
  );
  const common = {
    month: calendar.month,
    defaultMonth: calendar.defaultMonth,
    onMonthChange: calendar.onMonthChange,
    disabled: calendar.disabled,
    numberOfMonths: calendar.numberOfMonths,
    locale: calendar.locale,
    startMonth: calendar.startMonth,
    endMonth: calendar.endMonth,
    showOutsideDays: true,
    labels: {
      labelDayButton: ((date, modifiers, options, dateLib) =>
        `${formatDay(date, options, dateLib)}: ${labelDayButton(date, modifiers, options, dateLib)}`) as typeof labelDayButton,
    },
  };
  return (
    <div className="sq-calendar" role="group" aria-label={label}>
      {props.mode === "range" ? (
        <DayPicker
          {...common}
          mode="range"
          selected={selected as DateRange | undefined}
          onSelect={setSelected}
          excludeDisabled
        />
      ) : (
        <DayPicker
          {...common}
          mode="single"
          selected={selected as Date | undefined}
          onSelect={setSelected}
        />
      )}
      <div className="sq-sr-only" aria-live="polite">
        {selected instanceof Date
          ? iso(selected)
          : selected?.from
            ? `${iso(selected.from)} to ${iso(selected.to) || "select end date"}`
            : "No date selected"}
      </div>
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            selected instanceof Date
              ? iso(selected)
              : selected
                ? `${iso(selected.from)}/${iso(selected.to)}`
                : ""
          }
        />
      )}
    </div>
  );
}
export interface TableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  align?: "start" | "end";
  sortValue?: (row: T) => string | number;
}
export interface TableProps<T> {
  label: string;
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  sort?: { column: string; direction: "ascending" | "descending" };
  onSortChange?: (sort: {
    column: string;
    direction: "ascending" | "descending";
  }) => void;
  selected?: string[];
  onSelectionChange?: (ids: string[]) => void;
  pagination?: {
    hasPrevious: boolean;
    hasNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
    label: string;
  };
  filters?: ReactNode;
}
export function Table<T>({
  label,
  columns,
  rows,
  rowKey,
  loading,
  emptyMessage = "No results found.",
  sort,
  onSortChange,
  selected = [],
  onSelectionChange,
  pagination,
  filters,
}: TableProps<T>) {
  const id = useId();
  const [sorting, setSorting] = useControllable<TableProps<T>["sort"]>(
    sort,
    undefined,
    (next) => {
      if (next) onSortChange?.(next);
    },
  );
  const column = columns.find((c) => c.id === sorting?.column);
  const displayed = column?.sortValue
    ? [...rows].sort((a, b) => {
        const av = column.sortValue!(a);
        const bv = column.sortValue!(b);
        return (
          (typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv))) *
          (sorting?.direction === "descending" ? -1 : 1)
        );
      })
    : rows;
  const all =
    rows.length > 0 && rows.every((r) => selected.includes(rowKey(r)));
  return (
    <div className="sq-table-container" aria-busy={loading}>
      {filters && <div className="sq-table-filters">{filters}</div>}
      <div
        className="sq-table-scroll"
        role="region"
        aria-label={`${label} table`}
        tabIndex={0}
      >
        <table className="sq-table">
          <caption id={id}>{label}</caption>
          <thead>
            <tr>
              {onSelectionChange && (
                <th scope="col">
                  <input
                    aria-label="Select all visible rows"
                    type="checkbox"
                    className="sq-checkbox"
                    checked={all}
                    onChange={(e) => {
                      const keys = rows.map(rowKey);
                      onSelectionChange(
                        e.target.checked
                          ? [...new Set([...selected, ...keys])]
                          : selected.filter((k) => !keys.includes(k)),
                      );
                    }}
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  data-align={c.align}
                  aria-sort={
                    sorting?.column === c.id ? sorting.direction : undefined
                  }
                >
                  {c.sortValue ? (
                    <button
                      className="sq-table-sort"
                      type="button"
                      onClick={() =>
                        setSorting({
                          column: c.id,
                          direction:
                            sorting?.column === c.id &&
                            sorting.direction === "ascending"
                              ? "descending"
                              : "ascending",
                        })
                      }
                    >
                      {c.header}
                      <Icon name="chevronDown" size={14} />
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((r) => (
              <tr key={rowKey(r)} data-selected={selected.includes(rowKey(r))}>
                {onSelectionChange && (
                  <td>
                    <input
                      type="checkbox"
                      className="sq-checkbox"
                      aria-label={`Select row ${rowKey(r)}`}
                      checked={selected.includes(rowKey(r))}
                      onChange={(e) =>
                        onSelectionChange(
                          e.target.checked
                            ? [...new Set([...selected, rowKey(r)])]
                            : selected.filter((k) => k !== rowKey(r)),
                        )
                      }
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.id} data-align={c.align}>
                    {c.cell(r)}
                  </td>
                ))}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={columns.length + (onSelectionChange ? 1 : 0)}>
                  {loading ? "Loading…" : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="sq-pagination">
          <span>{pagination.label}</span>
          <div>
            <Button
              size="small"
              disabled={!pagination.hasPrevious || loading}
              aria-label="Previous page"
              onClick={pagination.onPrevious}
            >
              <Icon name="chevronLeft" />
            </Button>
            <Button
              size="small"
              disabled={!pagination.hasNext || loading}
              aria-label="Next page"
              onClick={pagination.onNext}
            >
              <Icon name="chevronRight" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
