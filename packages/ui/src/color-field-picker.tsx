"use client";
import { useState, type CSSProperties, type PointerEvent } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useStaq } from "./foundations";

type HSV = { hue: number; saturation: number; brightness: number };

function fromHex(hex: string): HSV {
  const rgb = Number.parseInt(hex.slice(1), 16);
  const red = (rgb >> 16) / 255;
  const green = ((rgb >> 8) & 255) / 255;
  const blue = (rgb & 255) / 255;
  const brightness = Math.max(red, green, blue);
  const delta = brightness - Math.min(red, green, blue);
  let hue = 0;
  if (delta) {
    if (brightness === red) hue = (green - blue) / delta;
    else if (brightness === green) hue = 2 + (blue - red) / delta;
    else hue = 4 + (red - green) / delta;
  }
  return {
    hue: (hue * 60 + 360) % 360,
    saturation: brightness ? delta / brightness : 0,
    brightness,
  };
}

function toHex({ hue, saturation, brightness }: HSV) {
  const channel = (offset: number) => {
    const position = (offset + hue / 60) % 6;
    const weight = Math.max(0, Math.min(position, 4 - position, 1));
    return Math.round(255 * brightness * (1 - saturation * weight))
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ColorFieldPicker({
  color,
  label,
  disabled,
  onChange,
}: {
  color: string;
  label: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const { theme } = useStaq();
  const hex = /^#[0-9a-f]{6}$/i.test(color) ? color : "#000000";
  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        className="sq-color-input"
        aria-label={`${label} picker`}
        disabled={disabled}
        style={{ backgroundColor: hex }}
      />
      <Popover.Portal>
        <Popover.Content
          className="sq-popover sq-color-field-picker"
          data-staq-theme={theme}
          aria-label={`${label} color picker`}
          align="start"
          sideOffset={8}
          collisionPadding={12}
          hidden={disabled}
        >
          <ColorControls
            color={color}
            label={label}
            disabled={disabled}
            onChange={onChange}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function ColorControls({
  color,
  label,
  disabled,
  onChange,
}: {
  color: string;
  label: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const hex = /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : "#000000";
  const [draft, setDraft] = useState<{ hex: string; hsv: HSV }>();
  const hsv = draft?.hex === hex ? draft.hsv : fromHex(hex);

  function update(next: HSV) {
    const value = toHex(next);
    setDraft({ hex: value, hsv: next });
    if (value !== hex || color.toLowerCase() !== hex) onChange(value);
  }

  function choosePoint(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    update({
      ...hsv,
      saturation: clamp((event.clientX - rect.left) / rect.width),
      brightness: 1 - clamp((event.clientY - rect.top) / rect.height),
    });
  }

  return (
    <fieldset
      className="sq-color-controls"
      aria-label={label}
      disabled={disabled}
    >
      <div
        className="sq-color-plane"
        style={{ "--sq-picker-hue": hsv.hue } as CSSProperties}
        onPointerDown={(event) => {
          if (disabled || event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          choosePoint(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            choosePoint(event);
        }}
      >
        <span
          className="sq-color-marker"
          style={{
            left: `${hsv.saturation * 100}%`,
            top: `${(1 - hsv.brightness) * 100}%`,
            backgroundColor: hex,
          }}
        />
        <input
          className="sq-color-plane-slider"
          type="range"
          aria-label="Saturation"
          min={0}
          max={100}
          value={Math.round(hsv.saturation * 100)}
          onChange={(event) =>
            update({ ...hsv, saturation: event.target.valueAsNumber / 100 })
          }
        />
        <input
          className="sq-color-plane-slider"
          type="range"
          aria-label="Brightness"
          min={0}
          max={100}
          value={Math.round(hsv.brightness * 100)}
          onChange={(event) =>
            update({ ...hsv, brightness: event.target.valueAsNumber / 100 })
          }
        />
      </div>
      <input
        className="sq-color-hue"
        type="range"
        aria-label="Hue"
        min={0}
        max={360}
        value={Math.round(hsv.hue)}
        onChange={(event) =>
          update({ ...hsv, hue: event.target.valueAsNumber })
        }
      />
    </fieldset>
  );
}
