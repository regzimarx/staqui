import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
afterEach(cleanup);
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;
HTMLElement.prototype.scrollIntoView = () => {};
if (!HTMLElement.prototype.hasPointerCapture)
  HTMLElement.prototype.hasPointerCapture = () => false;
if (!HTMLElement.prototype.setPointerCapture)
  HTMLElement.prototype.setPointerCapture = () => {};
if (!HTMLElement.prototype.releasePointerCapture)
  HTMLElement.prototype.releasePointerCapture = () => {};

// jsdom has no canvas; axe falls back to DOM names for icon-ligature checks.
HTMLCanvasElement.prototype.getContext = (() =>
  null) as typeof HTMLCanvasElement.prototype.getContext;
