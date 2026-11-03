import { createElement } from "react";
import { createRoot } from "react-dom/client";

export * from "./index";
export { createElement as element };

/**
 * Mount a StaqUI element into a DOM node owned by the caller.
 * Keep the host empty and let StaqUI manage its descendants.
 */
export function mount(
  host: HTMLElement,
  node: ReturnType<typeof createElement>,
) {
  const root = createRoot(host);
  const update = (next: ReturnType<typeof createElement>) => root.render(next);
  update(node);
  return {
    update,
    unmount: () => root.unmount(),
  };
}
