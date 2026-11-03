import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ColorField } from "../src";

it("updates the hex field from the picker and restores focus when dismissed", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(
    <ColorField
      label="Brand color"
      defaultValue="#008060"
      onValueChange={change}
    />,
  );

  const trigger = screen.getByRole("button", { name: "Brand color picker" });
  await user.click(trigger);
  fireEvent.change(screen.getByRole("slider", { name: "Hue" }), {
    target: { value: "0" },
  });

  expect(screen.getByRole("textbox", { name: "Brand color" })).toHaveValue(
    "#800000",
  );
  expect(change).toHaveBeenCalledWith("#800000");
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(trigger).toHaveFocus();
});
