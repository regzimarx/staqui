import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { DateField } from "../src";

it("writes calendar choices to the date input and its change handlers", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const onChange = vi.fn();
  render(
    <DateField
      label="Launch date"
      defaultValue="2026-11-12"
      min="2026-11-12"
      onChange={onChange}
      onValueChange={onValueChange}
    />,
  );
  const trigger = screen.getByRole("button", { name: "Launch date calendar" });
  await user.click(trigger);
  expect(
    screen.getByRole("button", { name: /November 11th, 2026/ }),
  ).toBeDisabled();
  await user.click(screen.getByRole("button", { name: /November 13th, 2026/ }));
  expect(screen.getByLabelText("Launch date")).toHaveValue("2026-11-13");
  expect(onValueChange).toHaveBeenCalledWith("2026-11-13");
  expect(onChange).toHaveBeenCalledOnce();
  expect(screen.queryByRole("dialog")).toBeNull();
});
