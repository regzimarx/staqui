import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { catalog } from "../../../apps/docs/lib/catalog";
import * as web from "../src/html";

it("exposes the full catalog to HTML consumers", () => {
  for (const { name } of catalog) {
    expect(web).toHaveProperty(name);
  }
});

it("mounts nested components, forwards events, updates props and cleans up", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const save = vi.fn();
  const tree = (disabled: boolean) =>
    web.element(
      web.StaqProvider,
      { theme: "dark" },
      web.element(web.Button, { disabled, onClick: save }, "Save"),
    );

  let view!: ReturnType<typeof web.mount>;
  act(() => {
    view = web.mount(host, tree(false));
  });
  try {
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.closest("[data-staq-theme]")).toHaveAttribute(
      "data-staq-theme",
      "dark",
    );
    await userEvent.click(button);
    expect(save).toHaveBeenCalledOnce();
    act(() => view.update(tree(true)));
    expect(button).toBeDisabled();
  } finally {
    act(() => view.unmount());
    host.remove();
  }
  expect(within(host).queryByRole("button")).toBeNull();
});
