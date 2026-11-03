"use client";
import type { ReactNode, ReactElement } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Pop from "@radix-ui/react-popover";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import * as Tip from "@radix-ui/react-tooltip";
import { Button } from "./actions";
import { Icon, useStaq } from "./foundations";
import type { Size } from "./shared";
export interface ModalProps {
  title: string;
  description: string;
  trigger?: ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: Size;
}
export function Modal({
  title,
  description,
  trigger,
  children,
  footer,
  size = "medium",
  ...props
}: ModalProps) {
  const { theme } = useStaq();
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="sq-overlay" />
        <Dialog.Content
          data-staq-theme={theme}
          className="sq-modal"
          data-size={size}
        >
          <div className="sq-section-header">
            <Dialog.Title className="sq-heading">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="tertiary" size="small" aria-label="Close dialog">
                <Icon name="close" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sq-muted">
            {description}
          </Dialog.Description>
          <div className="sq-modal-body">{children}</div>
          {footer && <footer className="sq-modal-footer">{footer}</footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export interface PopoverProps {
  trigger: ReactElement;
  label: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}
export function Popover({
  trigger,
  label,
  children,
  align = "start",
  side = "bottom",
  ...props
}: PopoverProps) {
  const { theme } = useStaq();
  return (
    <Pop.Root {...props}>
      <Pop.Trigger asChild>{trigger}</Pop.Trigger>
      <Pop.Portal>
        <Pop.Content
          aria-label={label}
          data-staq-theme={theme}
          className="sq-popover sq-popover-panel"
          align={align}
          side={side}
          sideOffset={8}
          collisionPadding={16}
        >
          <div className="sq-popover-header">
            <span>{label}</span>
            <Pop.Close className="sq-popover-close" aria-label="Close popover">
              <Icon name="close" size={15} />
            </Pop.Close>
          </div>
          <div className="sq-popover-body">{children}</div>
        </Pop.Content>
      </Pop.Portal>
    </Pop.Root>
  );
}
export interface MenuItem {
  id: string;
  label: string;
  onSelect?: () => void;
  href?: string;
  disabled?: boolean;
  tone?: "neutral" | "critical";
  icon?: ReactNode;
  group?: string;
}
export interface MenuProps {
  trigger: ReactElement;
  label: string;
  items: MenuItem[];
  align?: "start" | "center" | "end";
  onOpenChange?: (open: boolean) => void;
}
export function Menu({
  trigger,
  label,
  items,
  align = "end",
  onOpenChange,
}: MenuProps) {
  const { theme } = useStaq();
  const groups = [...new Set(items.map((x) => x.group))];
  const item = (i: MenuItem) => (
    <Dropdown.Item
      key={i.id}
      className="sq-menu-item"
      disabled={i.disabled}
      onSelect={i.onSelect}
      data-tone={i.tone}
      asChild={!!i.href && !i.disabled}
    >
      {i.href && !i.disabled ? (
        <a href={i.href}>
          {i.icon && (
            <span className="sq-menu-item__icon" aria-hidden="true">
              {i.icon}
            </span>
          )}
          {i.label}
        </a>
      ) : (
        <>
          {i.icon && (
            <span className="sq-menu-item__icon" aria-hidden="true">
              {i.icon}
            </span>
          )}
          {i.label}
        </>
      )}
    </Dropdown.Item>
  );
  return (
    <Dropdown.Root onOpenChange={onOpenChange}>
      <Dropdown.Trigger asChild className="sq-menu-trigger">
        {trigger}
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          aria-label={label}
          data-staq-theme={theme}
          className="sq-menu"
          sideOffset={6}
          align={align}
          collisionPadding={12}
        >
          {groups.map((group, index) => (
            <Dropdown.Group key={group ?? "default"}>
              {index > 0 && <Dropdown.Separator className="sq-divider" />}
              {group && (
                <Dropdown.Label className="sq-menu-label">
                  {group}
                </Dropdown.Label>
              )}
              {items.filter((i) => i.group === group).map(item)}
            </Dropdown.Group>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
export interface TooltipProps {
  content: string;
  children: ReactElement;
  side?: "top" | "right" | "bottom" | "left";
}
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const { theme } = useStaq();
  return (
    <Tip.Provider delayDuration={800}>
      <Tip.Root>
        <Tip.Trigger asChild>{children}</Tip.Trigger>
        <Tip.Portal>
          <Tip.Content
            data-staq-theme={theme}
            className="sq-tooltip"
            side={side}
            sideOffset={8}
            collisionPadding={12}
          >
            {content}
            <Tip.Arrow className="sq-tooltip-arrow" />
          </Tip.Content>
        </Tip.Portal>
      </Tip.Root>
    </Tip.Provider>
  );
}
