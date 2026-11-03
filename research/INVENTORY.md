# StaqUI component inventory

The maintained catalog describes the public components, implementation notes, and accessibility behavior. API tables are generated from TypeScript exports.

## Button — Actions

Trigger an action with clear hierarchy and immediate feedback.

Implementation: Pill-shaped buttons come in three variants. Use primary for the main action, secondary for supporting actions, and tertiary for quieter actions. Apply the critical tone to destructive actions at any level of emphasis. Small, medium, and large have minimum heights of 28px, 34px, and 42px. Use fullWidth to fill the available space. On native buttons, loading disables interaction and centers a spinner while preserving the button width. Use asChild with a single link for navigation.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Runnable example: `packages/ui/examples/button.tsx`.

## ButtonGroup — Actions

Keep related actions aligned and meaningfully grouped.

Implementation: Named React children replace primary-action and secondary-actions slots. All actions retain independent tab stops.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Runnable example: `packages/ui/examples/button-group.tsx`.

## Tabs — Actions

Switch between related content panels in the same view.

Implementation: Supply items with unique values, labels, and panel content. Use defaultValue for an initial selection, or pair value with onValueChange to control it.

Accessibility: Label the tab list. Left and Right Arrow, Home, and End move focus and select a tab. Disabled tabs are skipped.

Runnable example: `packages/ui/examples/tabs.tsx`.

## Clickable — Actions

Build a custom interaction on a semantic button foundation.

Implementation: A native button for custom interactive content. Use Link for navigation and className or style for presentation.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Runnable example: `packages/ui/examples/clickable.tsx`.

## ClickableChip — Actions

Select and remove compact filters without losing context.

Implementation: Selection uses aria-pressed; removal is a separate sibling button. The parent owns selection and removal state.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Runnable example: `packages/ui/examples/clickable-chip.tsx`.

## Link — Actions

Navigate to another destination with familiar anchor behavior.

Implementation: A native anchor supports navigation and downloads. Use Button for actions.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/link.tsx`.

## Menu — Actions

Place contextual actions in a keyboard-accessible dropdown.

Implementation: Radix provides roving focus, typeahead, disabled items, Escape and focus restoration. Items support groups and links; nested submenus are not exposed.

Accessibility: Radix provides roving focus, typeahead, disabled items, Escape and focus restoration. Items support groups and links; nested submenus are not exposed.

Runnable example: `packages/ui/examples/menu.tsx`.

## Badge — Feedback

Communicate a short status with color and a readable label.

Implementation: Five semantic tones communicate status with a visible text label. Badges are not live regions.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/badge.tsx`.

## Banner — Feedback

Bring important feedback and recovery actions into view.

Implementation: Dismissal is local until remounted; use onDismiss to persist it. Critical banners use alert, other tones use status. React action replaces the secondary-actions slot.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/banner.tsx`.

## EmptyState — Feedback

Explain an empty view and offer a useful next step.

Implementation: React action and graphic props replace named slots. It never fabricates content or a successful network action.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/empty-state.tsx`.

## Progress — Feedback

Show how much measurable work has been completed.

Implementation: Native progress, max defaults to 100, values are clamped. Missing value is indeterminate with a static striped fallback; it does not animate. The indicator uses the brand token rather than per-instance status tones.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/progress.tsx`.

## Spinner — Feedback

Announce ongoing work when progress cannot be measured.

Implementation: A named status region announces loading. CSS rotation stops under reduced motion, while the status label remains available.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/spinner.tsx`.

## Checkbox — Forms

Select an independent option or represent partial selection.

Implementation: Supports controlled/uncontrolled checked state and the native indeterminate property. Required and validation are native browser behavior.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/checkbox.tsx`.

## ChoiceList — Forms

Choose one or several options in a visible list.

Implementation: Uses fieldset/legend and native radio or checkbox inputs. Values are arrays in both modes. Rich secondary option content is not exposed; option labels are strings.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/choice-list.tsx`.

## ColorField — Forms

Enter a hex color directly or choose it visually.

Implementation: Six-digit RGB hex only. Alpha, HSL and wide-gamut formats are deliberately excluded. A custom picker opens from the swatch beside the editable hex value.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/color-field.tsx`.

## ColorPicker — Forms

Choose an RGB color with an inline saturation, brightness, and hue picker.

Implementation: Uses six-digit RGB hex. Drag in the color square or use the keyboard sliders to adjust saturation, brightness, and hue.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/color-picker.tsx`.

## DateField — Forms

Enter a calendar date with native format and constraint handling.

Implementation: The calendar button opens DatePicker. The input retains ISO string values, min/max, required, and readOnly.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/date-field.tsx`.

## DatePicker — Forms

Select a date or range in a keyboard-navigable calendar.

Implementation: React DayPicker supports single/range selection, one/two months, localized labels, month navigation and disabled matchers. Values are Date objects.

Accessibility: React DayPicker supports single/range selection, one/two months, localized labels, month navigation and disabled matchers. Values are Date objects.

Runnable example: `packages/ui/examples/date-picker.tsx`.

## DropZone — Forms

Accept files through a native chooser or drag and drop.

Implementation: Files remain local and are passed to onFilesChange. Type, count and maximum bytes are checked on both chooser and drop paths. No upload service, directory traversal or content scanning. Applications must submit callback files for drag-and-drop; native file FormData covers chooser selections only.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/drop-zone.tsx`.

## EmailField — Forms

Collect an email address with the right input semantics.

Implementation: Native type=email and autocomplete=email replace custom input handling. Application errors are supplied through error; browser constraints validate on form submission.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/email-field.tsx`.

## MoneyField — Forms

Enter a decimal amount with an explicit currency.

Implementation: Currency symbol and code use Intl.NumberFormat; input remains an ungrouped decimal string for predictable editing. This is not financial arithmetic, exchange conversion or locale-specific currency parsing.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/money-field.tsx`.

## NumberField — Forms

Collect a numeric value with step and range constraints.

Implementation: Native type=number exposes min/max/step and browser steppers. Values emitted by onValueChange remain strings so empty input is representable.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/number-field.tsx`.

## PasswordField — Forms

Enter a secret with an accessible visibility toggle.

Implementation: A named, pressed-state visibility toggle preserves focus and value. No password strength scoring or authentication service is included.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/password-field.tsx`.

## SearchField — Forms

Collect a search query with a recognizable search affordance.

Implementation: Native type=search with a decorative icon. Filtering is application-owned, as shown in the live example.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/search-field.tsx`.

## Select — Forms

Choose an option from a rounded, optionally grouped list.

Implementation: Single-select options can include descriptions. The selected option shows a checkmark. Multiple selection and listbox sizing use the native control.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/select.tsx`.

## Switch — Forms

Turn an independent setting on or off.

Implementation: A native checkbox with role=switch provides Space activation, form participation and checked state. Its visible label describes the setting, not the current state.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/switch.tsx`.

## TextArea — Forms

Write longer content in a resizable multiline field.

Implementation: Native textarea with rows, min/maxLength and vertical resizing. Character counting is an application composition, shown in the example.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/text-area.tsx`.

## TextField — Forms

Collect a short text value with labels and validation feedback.

Implementation: Native input attributes with label, description, error, prefix, suffix and onValueChange. Compose accessory actions using React nodes.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/text-field.tsx`.

## URLField — Forms

Collect a web address with native URL validation.

Implementation: Native type=url handles validation and input keyboard. It does not prepend a scheme or rewrite input silently.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Runnable example: `packages/ui/examples/url-field.tsx`.

## Box — Layout

Apply consistent spacing and surface treatments to a container.

Implementation: Semantic tokens control padding, surface, border and radius. Use className or style for additional layout.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/box.tsx`.

## Divider — Layout

Separate adjacent content with a subtle semantic boundary.

Implementation: Native hr is horizontal by default; vertical mode is intended for flex layouts and has the matching aria-orientation.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/divider.tsx`.

## Grid — Layout

Arrange content in responsive columns that fit their container.

Implementation: Responsive auto-fit columns replace GridItem elements and responsive DSL strings. Children can use CSS gridColumn/gridRow. minColumnWidth prevents squeezed content.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/grid.tsx`.

## OrderedList — Layout

Present items whose order is meaningful.

Implementation: Native ol/li semantics. ListItem is exported for both list components. Native ordered-list attributes such as start and reversed pass through.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/ordered-list.tsx`.

## Page — Layout

Compose a page title, actions, body, and optional aside.

Implementation: An outer div avoids injecting a second main landmark inside host applications. Provide the main landmark in your app. Heading is h1; React nodes replace named content areas.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/page.tsx`.

## QueryContainer — Layout

Create a named CSS container for responsive compositions.

Implementation: Native CSS container-type:inline-size and container-name. Write standard @container rules in the consuming application.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/query-container.tsx`.

## Section — Layout

Give related content a heading, description, and action.

Implementation: Native section is named by its heading. Default heading level is h2; nested semantic structures can be authored using Box and Heading.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/section.tsx`.

## Stack — Layout

Align items along a horizontal or vertical axis.

Implementation: Flex direction, gap, align, justify and wrapping replace the layout-specific syntax. Semantic HTML belongs in children; the wrapper is a neutral div.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/stack.tsx`.

## Table — Layout

Compare structured records with sorting, selection, and pagination.

Implementation: Generic typed columns, client sorting and controlled selection. Pagination is callback-driven. Tables scroll horizontally on small screens. Virtualization and editable spreadsheet cells are not included.

Accessibility: Generic typed columns, client sorting and controlled selection. Pagination is callback-driven. Tables scroll horizontally on small screens. Virtualization and editable spreadsheet cells are not included.

Runnable example: `packages/ui/examples/table.tsx`.

## UnorderedList — Layout

Present a set of related items without implying order.

Implementation: Native ul/li and standard list semantics; use ListItem or plain li children.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/unordered-list.tsx`.

## Avatar — Media

Represent a person with an image or a readable initials fallback.

Implementation: Name supplies accessible text and derived initials. Failed images fall back to initials. No remote avatar service or fabricated profile photographs.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/avatar.tsx`.

## Icon — Media

Use a consistent stroke-based visual language for actions.

Implementation: A curated Lucide name map with a source prop for custom Lucide icons. Decorative icons are hidden; meaningful icons require a label.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/icon.tsx`.

## Image — Media

Display responsive imagery with meaningful alternative text.

Implementation: Native img supports srcSet, sizes, loading and error handlers. Applications own image assets and fallback policy.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/image.tsx`.

## Thumbnail — Media

Place a small, consistently sized image beside content.

Implementation: Native image with small/medium/large dimensions. Alternative text is required. Source failures use native behavior unless an onError handler is provided.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/thumbnail.tsx`.

## Modal — Overlays

Focus a task in a dialog that contains and restores focus.

Implementation: Radix Dialog handles focus, Escape, background inertness and scroll lock. Controlled open/onOpenChange replaces imperative show/hide methods. Title and description are required.

Accessibility: Radix Dialog handles focus, Escape, background inertness and scroll lock. Controlled open/onOpenChange replaces imperative show/hide methods. Title and description are required.

Runnable example: `packages/ui/examples/modal.tsx`.

## Popover — Overlays

Reveal contextual controls beside their trigger.

Implementation: Radix handles anchoring, collision avoidance, Escape and focus return. It is nonmodal; use Modal for tasks that must block background interaction.

Accessibility: Radix handles anchoring, collision avoidance, Escape and focus return. It is nonmodal; use Modal for tasks that must block background interaction.

Runnable example: `packages/ui/examples/popover.tsx`.

## Chip — Typography

Show a user-created label with an optional remove action.

Implementation: The onRemove callback is parent-owned. Removal has a separately named button. Colors use the shared semantic tones.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Runnable example: `packages/ui/examples/chip.tsx`.

## Heading — Typography

Express the document outline independently of visual size.

Implementation: Explicit level and visual size are independent. No automatic hierarchy inference, accessibilityRole override or line clamping.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/heading.tsx`.

## Number — Typography

Format numeric values with locale-aware tabular typography.

Implementation: Intl.NumberFormat adds locale/currency/percent formatting beyond tabular styling. Numeric formatting is presentation, not decimal arithmetic.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/number.tsx`.

## Paragraph — Typography

Set readable blocks of prose with inline content.

Implementation: Native p accepts inline React content and semantic tone. Clamping and numeric variants can be expressed in application CSS.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/paragraph.tsx`.

## Text — Typography

Apply semantic tone, size, and emphasis to inline content.

Implementation: Native span with size, weight and semantic tone. Use strong/em/code directly for semantic emphasis rather than visual-only text variants.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Runnable example: `packages/ui/examples/text.tsx`.

## Tooltip — Typography

Provide a brief explanation on hover or keyboard focus.

Implementation: Radix opens immediately on keyboard focus and after 800ms hover. Tooltip content is plain text, dismisses on Escape, and should never contain required instructions or interactive controls.

Accessibility: Radix opens immediately on keyboard focus and after 800ms hover. Tooltip content is plain text, dismisses on Escape, and should never contain required instructions or interactive controls.

Runnable example: `packages/ui/examples/tooltip.tsx`.
