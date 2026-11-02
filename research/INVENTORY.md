# Research inventory: staqui and reference component catalog

Researched with BrowserOS Neo on 2026-11-01 (Asia/Manila). The versioning reference explicitly identifies reference component catalog. This inventory maps conceptual coverage; staqui is not a drop-in replacement or affiliated Shopify product.

[Catalog](https://shopify.dev/docs/api/app-home/latest/web-components) · [Versioning](https://shopify.dev/docs/api/app-home/latest/web-components/versioning)

Shared independent equivalents: React callbacks replace DOM commands; React nodes replace slots; standard CSS replaces the responsive property DSL; native anchors replace Shopify navigation; Radix handles overlays; React DayPicker handles calendars; Lucide supplies icons. All examples use local state, with no Shopify services.

## Button — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/button

Trigger an action with clear hierarchy and immediate feedback.

Reference API members: accessibilityLabel, command, commandFor, disabled, download, href, icon, inlineSize, interestFor, loading, target, tone, type, variant, blur, click, focus, children.

Reference example patterns: Events; Slots; Add a basic button; Add primary and secondary buttons; Set visual emphasis with variants; Communicate intent with tones; Add an icon alongside a text label; Create compact icon-only buttons for toolbars; Show loading feedback during async operations; Disable buttons and submit forms; Use buttons for navigation and downloads; Confirm destructive actions with critical tone; Trigger actions on other components.

Implementation / states / adaptations: Navigation is handled by Link rather than a polymorphic href button. DOM commandFor and interestFor become React callbacks and composed overlays. Three variants, critical tone, three sizes, loading, disabled and fullWidth are supported.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Related composition: link, button-group.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/button.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## ButtonGroup — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/button-group

Keep related actions aligned and meaningfully grouped.

Reference API members: accessibilityLabel, gap, children, primary-action, secondary-actions.

Reference example patterns: Slots; Group a primary and secondary action; Add bulk action buttons; Add icons to grouped buttons; Create a segmented button group; Confirm a destructive action.

Implementation / states / adaptations: Named React children replace primary-action and secondary-actions slots. All actions retain independent tab stops.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Related composition: button.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/button-group.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Clickable — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/clickable

Build a custom interaction on a semantic button foundation.

Reference API members: accessibilityLabel, accessibilityRole, accessibilityVisibility, background, blockSize, border, borderColor, borderRadius, borderStyle, borderWidth, command, commandFor, disabled, display, download, href, inlineSize, interestFor, loading, maxBlockSize, maxInlineSize, minBlockSize, minInlineSize, overflow, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingInline, paddingInlineEnd, paddingInlineStart, target, type, blur, click, focus, children.

Reference example patterns: Events; Slots; Create a custom interactive element; Navigate to a URL; Create a form submit button; Add a clickable action to a section; Add an accessibility label; Describe a disabled link with an accessibility label.

Implementation / states / adaptations: Always a native button. Use Link for navigation. Styling is through className/style instead of the full Shopify responsive-property DSL.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Related composition: button, link.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/clickable.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## ClickableChip — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/clickable-chip

Select and remove compact filters without losing context.

Reference API members: accessibilityLabel, color, command, commandFor, disabled, hidden, href, interestFor, removable, afterhide, click, remove, children, graphic.

Reference example patterns: Events; Slots; Add a clickable chip with default styling; Apply color variants to chips; Add an icon and a remove button to a chip; Use a chip as a link; Disable a clickable chip.

Implementation / states / adaptations: Selection uses aria-pressed; removal is a separate sibling button. The parent owns selection and removal state.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Related composition: chip, stack.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/clickable-chip.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Link — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/link

Navigate to another destination with familiar anchor behavior.

Reference API members: accessibilityLabel, command, commandFor, download, href, interestFor, lang, target, tone, click, children.

Reference example patterns: Events; Slots; Add a basic link; Embed links in paragraph text; Add links inside a banner; Add links inside a box container; Trigger a file download; Open external links in a new tab; Set the language for a link; Match link tone to surrounding context.

Implementation / states / adaptations: A native anchor handles navigation and downloads. Use Button for commands; no Shopify routing or App Bridge integration.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: button, paragraph.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/link.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Menu — Actions
Source: https://shopify.dev/docs/api/app-home/latest/web-components/actions/menu

Place contextual actions in a keyboard-accessible dropdown.

Reference API members: accessibilityLabel, children.

Reference example patterns: Slots; Add a basic actions menu; Organize items into sections; Add links and disabled items to a menu; Mix sections with root-level actions; Build a settings menu with sections; Trigger a menu from an icon-only button.

Implementation / states / adaptations: Radix provides roving focus, typeahead, disabled items, Escape and focus restoration. Items support groups and links; nested submenus are not exposed.

Accessibility: Radix provides roving focus, typeahead, disabled items, Escape and focus restoration. Items support groups and links; nested submenus are not exposed.

Related composition: Compose with layout and typography primitives..

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/menu.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Badge — Feedback
Source: https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/badge

Communicate a short status with color and a readable label.

Reference API members: color, icon, size, tone, children.

Reference example patterns: Slots; Add status badges with tones; Add icons to status badges; Display badges in a table; Control badge size for emphasis.

Implementation / states / adaptations: Five semantic tones replace Shopify auto/caution/color combinations. Status is always visible text; badge is not a live region.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: chip, table.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/badge.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Banner — Feedback
Source: https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/banner

Bring important feedback and recovery actions into view.

Reference API members: dismissible, heading, hidden, tone, afterhide, dismiss, children, secondary-actions.

Reference example patterns: Events; Slots; Add a dismissible info banner; Create a warning banner with buttons for next steps; Alert merchants to critical issues requiring action; Confirm a completed action with a dismissible banner.

Implementation / states / adaptations: Dismissal is local until remounted; use onDismiss to persist it. Critical banners use alert, other tones use status. React action replaces the secondary-actions slot.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: badge, button.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/banner.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## EmptyState — Feedback
Source: https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/empty-state

Explain an empty view and offer a useful next step.

Reference API members: heading, graphic, primary-action, secondary-actions, subheading.

Reference example patterns: Slots; Explain an empty list and offer the first action; Offer more than one way forward; Show an empty state inside a table.

Implementation / states / adaptations: React action and graphic props replace named slots. It never fabricates content or a successful network action.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: table, banner, icon, image, text, link, button.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/empty-state.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Progress — Feedback
Source: https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/progress

Show how much measurable work has been completed.

Reference API members: accessibilityLabel, max, tone, value.

Reference example patterns: Show progress toward a goal; Show an indeterminate progress bar; Convey status with tone; Pair progress with a label.

Implementation / states / adaptations: Native progress, max defaults to 100, values are clamped. Missing value is indeterminate with a static striped fallback; it does not animate. The indicator uses the brand token rather than per-instance status tones.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: spinner, text.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/progress.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Spinner — Feedback
Source: https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/spinner

Announce ongoing work when progress cannot be measured.

Reference API members: accessibilityLabel, size.

Reference example patterns: Add a loading spinner; Use spinners of different sizes; Show a loading state in a content section; Display an inline loading indicator.

Implementation / states / adaptations: A named status region announces loading. CSS rotation stops under reduced motion, while the status label remains available.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: button.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/spinner.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Checkbox — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/checkbox

Select an independent option or represent partial selection.

Reference API members: accessibilityLabel, checked, defaultChecked, defaultIndeterminate, details, disabled, error, id, indeterminate, label, labelAccessibilityVisibility, name, required, value, blur, change, input.

Reference example patterns: Events; Select an option; Show an indeterminate state; Show a validation error; Show a disabled checkbox; Group multiple checkboxes; Validate in real time.

Implementation / states / adaptations: Supports controlled/uncontrolled checked state and the native indeterminate property. Required and validation are native browser behavior.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: switch.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/checkbox.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## ChoiceList — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/choice-list

Choose one or several options in a visible list.

Reference API members: details, disabled, error, label, labelAccessibilityVisibility, multiple, name, values, change, input, accessibilityLabel, defaultSelected, selected, value, children, secondary-content.

Reference example patterns: Events; Slots; Add a single-select choice list; Pre-select a default option; Enable multiple selections with details; Show a validation error; Disable a choice list.

Implementation / states / adaptations: Uses fieldset/legend and native radio or checkbox inputs. Values are arrays in both modes. Rich secondary option content is not exposed; option labels are strings.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: select.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/choice-list.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## ColorField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/color-field

Enter a hex color directly or choose it visually.

Reference API members: alpha, autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Pick a color; Add a label; Mark as required; Enable alpha transparency; Show a validation error; Add helper text; Show a read-only field; Combine multiple fields in a form; Validate in real time.

Implementation / states / adaptations: Six-digit RGB hex only. Alpha, HSL and wide-gamut formats are deliberately excluded. A native color chooser accompanies the editable text input.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: color-picker.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/color-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## ColorPicker — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/color-picker

Choose an RGB color with the native system picker.

Reference API members: alpha, defaultValue, formResetCallback, name, value, change, input.

Reference example patterns: Events; Pick a color; Enable alpha transparency.

Implementation / states / adaptations: Uses the operating-system color interface and six-digit RGB hex. Appearance varies by browser; alpha and an always-visible spectrum are not implemented.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: color-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/color-picker.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## DateField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/date-field

Enter a calendar date with native format and constraint handling.

Reference API members: allow, allowDays, autocomplete, defaultValue, defaultView, details, disabled, disallow, disallowDays, error, id, label, labelAccessibilityVisibility, name, placeholder, readOnly, required, value, view, blur, change, focus, input, invalid, viewchange.

Reference example patterns: Events; Add a basic date field; Collect a date with a label and placeholder; Pre-populate with an existing date; Restrict selectable days of the week; Allow only specific dates; Show a validation error; Disable or make a date field read-only; Use date fields in a form; Select a date range with two fields; Validate a date field dynamically.

Implementation / states / adaptations: Uses native input type=date, ISO string values, min/max, required and readOnly. Shopify allow/disallow expression syntax and weekday constraints are replaced by DatePicker matchers when needed.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: date-picker.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/date-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## DatePicker — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/date-picker

Select a date or range in a keyboard-navigable calendar.

Reference API members: allow, allowDays, defaultValue, defaultView, disallow, disallowDays, name, type, value, view, visibleMonths, blur, change, focus, input, viewchange.

Reference example patterns: Events; Add a date range picker; Select a single date; Restrict selectable dates to a range; Capture date selections with onChange; Add quick preset date range buttons; Show two months at once.

Implementation / states / adaptations: React DayPicker supports single/range selection, one/two months, localized labels, min/max month navigation and disabled matchers. Date objects replace Shopify string expressions. Multiple independent dates are not part of this API; the source property table also lists single/range only.

Accessibility: React DayPicker supports single/range selection, one/two months, localized labels, min/max month navigation and disabled matchers. Date objects replace Shopify string expressions. Multiple independent dates are not part of this API; the source property table also lists single/range only.

Related composition: date-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/date-picker.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## DropZone — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/drop-zone

Accept files through a native chooser or drag and drop.

Reference API members: accept, accessibilityLabel, disabled, error, files, label, labelAccessibilityVisibility, multiple, name, required, value, change, droprejected, input.

Reference example patterns: Events; Accept file uploads; Allow multiple file uploads; Upload images; Require file upload; Disable uploads during processing; Restrict file types; Show upload errors; Configure accessibility labels; Upload with validation.

Implementation / states / adaptations: Files remain local and are passed to onFilesChange. Type, count and maximum bytes are checked on both chooser and drop paths. No upload service, directory traversal or content scanning. Applications must submit callback files for drag-and-drop; native file FormData covers chooser selections only.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: Compose with layout and typography primitives..

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/drop-zone.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## EmailField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/email-field

Collect an email address with the right input semantics.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Add a basic email field; Show an error with help text; Make an email field read-only; Disable an email field; Set character length constraints.

Implementation / states / adaptations: Native type=email and autocomplete=email replace platform input handling. Application errors are supplied through error; browser constraints validate on form submission.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/email-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## MoneyField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/money-field

Enter a decimal amount with an explicit currency.

Reference API members: autocomplete, currencyCode, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, max, min, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Collect a currency value; Add a label and constraints; Handle validation errors; Combine multiple fields in a form.

Implementation / states / adaptations: Currency symbol and code use Intl.NumberFormat; input remains an ungrouped decimal string for predictable editing. This is not financial arithmetic, exchange conversion or locale-specific currency parsing.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: number-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/money-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## NumberField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/number-field

Collect a numeric value with step and range constraints.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, inputMode, label, labelAccessibilityVisibility, max, min, name, placeholder, prefix, readOnly, required, step, suffix, value, blur, change, focus, input.

Reference example patterns: Events; Add a basic number field; Add a prefix and suffix for currency input; Show a validation error; Disable or make a number field read-only.

Implementation / states / adaptations: Native type=number exposes min/max/step and browser steppers. Values emitted by onValueChange remain strings so empty input is representable.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: money-field, text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/number-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## PasswordField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/password-field

Enter a secret with an accessible visibility toggle.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Collect a password; Set validation rules; Show validation errors; Add helper text; Build a login form; Display a requirement checklist.

Implementation / states / adaptations: A named, pressed-state visibility toggle preserves focus and value. No password strength scoring or authentication service is included.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/password-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## SearchField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/search-field

Collect a search query with a recognizable search affordance.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Add a basic search field; Show a search error; Disable a search field; Set character length limits.

Implementation / states / adaptations: Native type=search with a decorative icon. Filtering is application-owned, as shown in the live example.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/search-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Select — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/select

Choose an option from a native, optionally grouped menu.

Reference API members: details, disabled, error, icon, id, label, labelAccessibilityVisibility, name, placeholder, required, value, change, input, children, defaultSelected, selected.

Reference example patterns: Events; Slots; Slots; Slots; Create a dropdown menu.

Implementation / states / adaptations: Native select/option/optgroup preserve mobile pickers and keyboard behavior. Labels are strings; icon slots are intentionally omitted.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: choice-list.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/select.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Switch — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/switch

Turn an independent setting on or off.

Reference API members: accessibilityLabel, checked, defaultChecked, details, disabled, error, id, label, labelAccessibilityVisibility, name, required, value, blur, change, input.

Reference example patterns: Events; Toggle a setting; Show a disabled switch; Submit multiple settings in a form; Apply multiple settings immediately; Hide the label visually; Show validation errors; Add an accessibility label.

Implementation / states / adaptations: A native checkbox with role=switch provides Space activation, form participation and checked state. Its visible label describes the setting, not the current state.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: checkbox.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/switch.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## TextArea — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/text-area

Write longer content in a resizable multiline field.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, readOnly, required, rows, value, blur, change, focus, input.

Reference example patterns: Events; Add a basic text area; Collect text with a placeholder; Limit input length with a character cap; Show a validation error; Disable or make a text area read-only.

Implementation / states / adaptations: Native textarea with rows, min/maxLength and vertical resizing. Character counting is an application composition, shown in the example.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/text-area.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## TextField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/text-field

Collect a short text value with labels and validation feedback.

Reference API members: autocomplete, defaultValue, details, disabled, error, icon, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, prefix, readOnly, required, suffix, value, accessory, blur, change, focus, input.

Reference example patterns: Slots; Events; Add a basic text field; Add an icon to a text field; Provide specific error messages for merchant context; Add a prefix and suffix; Add an accessory to a text field; Disable or make a text field read-only.

Implementation / states / adaptations: Native input attributes plus label/description/error, prefix/suffix and onValueChange. Shopify accessory and DOM-command slots become React composition.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-area, email-field, url-field, password-field, search-field, button, clickable.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/text-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## URLField — Forms
Source: https://shopify.dev/docs/api/app-home/latest/web-components/forms/url-field

Collect a web address with native URL validation.

Reference API members: autocomplete, defaultValue, details, disabled, error, id, label, labelAccessibilityVisibility, maxLength, minLength, name, placeholder, readOnly, required, value, blur, change, focus, input.

Reference example patterns: Events; Collect a URL; Set validation constraints; Pre-fill a URL; Show a disabled field.

Implementation / states / adaptations: Native type=url handles validation and input keyboard. It does not prepend a scheme or rewrite input silently.

Accessibility: Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

Related composition: text-field.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/url-field.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Box — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/box

Apply consistent spacing and surface treatments to a container.

Reference API members: accessibilityLabel, accessibilityRole, accessibilityVisibility, background, blockSize, border, borderColor, borderRadius, borderStyle, borderWidth, display, inlineSize, maxBlockSize, maxInlineSize, minBlockSize, minInlineSize, overflow, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingInline, paddingInlineEnd, paddingInlineStart, children.

Reference example patterns: Slots; Add a content container; Adapt spacing with responsive padding.

Implementation / states / adaptations: Tokens cover padding, surface, border and radius. Standard style/className provide additional layout control instead of copying Shopify responsive string expressions.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: stack, grid.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/box.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Divider — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/divider

Separate adjacent content with a subtle semantic boundary.

Reference API members: color, direction.

Reference example patterns: Add a horizontal divider; Increase visual emphasis with a strong divider; Create a vertical divider between inline items; Separate form sections with a divider.

Implementation / states / adaptations: Native hr is horizontal by default; vertical mode is intended for flex layouts and has the matching aria-orientation.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: section.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/divider.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Grid — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/grid

Arrange content in responsive columns that fit their container.

Reference API members: accessibilityLabel, accessibilityRole, accessibilityVisibility, alignContent, alignItems, background, blockSize, border, borderColor, borderRadius, borderStyle, borderWidth, columnGap, display, gap, gridTemplateColumns, gridTemplateRows, inlineSize, justifyContent, justifyItems, maxBlockSize, maxInlineSize, minBlockSize, minInlineSize, overflow, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingInline, paddingInlineEnd, paddingInlineStart, placeContent, placeItems, rowGap, children, gridColumn, gridRow.

Reference example patterns: Slots; Slots; Add a grid layout with column spans; Create a two-column layout; Build layouts with column spans; Create a responsive grid with container queries.

Implementation / states / adaptations: Responsive auto-fit columns replace GridItem elements and responsive DSL strings. Children can use CSS gridColumn/gridRow. minColumnWidth prevents squeezed content.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: stack.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/grid.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## OrderedList — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/ordered-list

Present items whose order is meaningful.

Reference API members: children.

Reference example patterns: Slots; Slots; Add a numbered step list; Create nested steps with sub-instructions.

Implementation / states / adaptations: Native ol/li semantics. ListItem is exported for both list components. Native ordered-list attributes such as start and reversed pass through.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: unordered-list.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/ordered-list.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Page — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/page

Compose a page title, actions, body, and optional aside.

Reference API members: heading, inlineSize, aside, breadcrumb-actions, children, primary-action, secondary-actions, supplemental-start.

Reference example patterns: Slots; Organize content with sections; Use small width for forms; Use large width for dashboards; Add breadcrumb navigation; Add page actions; Edit page with all slots; Add supplemental content before the page body.

Implementation / states / adaptations: An outer div avoids injecting a second main landmark inside host applications. Provide the main landmark in your app. Heading is h1; React nodes replace platform slots.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: banner.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/page.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## QueryContainer — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/query-container

Create a named CSS container for responsive compositions.

Reference API members: containerName, children.

Reference example patterns: Slots; Add a responsive container; Target a named container for responsive queries.

Implementation / states / adaptations: Native CSS container-type:inline-size and container-name. Write standard @container CSS in the consuming application; no Shopify query expression runtime.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: Compose with layout and typography primitives..

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/query-container.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Section — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/section

Give related content a heading, description, and action.

Reference API members: accessibilityLabel, heading, padding, subheading, accessory, children, graphic.

Reference example patterns: Slots.

Implementation / states / adaptations: Native section is named by its heading. Default heading level is h2; nested semantic structures can be authored using Box and Heading.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: divider.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/section.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Stack — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/stack

Align items along a horizontal or vertical axis.

Reference API members: accessibilityLabel, accessibilityRole, accessibilityVisibility, alignContent, alignItems, background, blockSize, border, borderColor, borderRadius, borderStyle, borderWidth, columnGap, direction, display, gap, inlineSize, justifyContent, maxBlockSize, maxInlineSize, minBlockSize, minInlineSize, overflow, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingInline, paddingInlineEnd, paddingInlineStart, rowGap, children.

Reference example patterns: Slots; Add a vertical stack; Arrange items horizontally with an inline stack; Control item alignment and distribution; Fine-tune spacing with row and column gaps; Create a responsive stack with container queries.

Implementation / states / adaptations: Flex direction, gap, align, justify and wrapping replace the platform layout DSL. Semantic HTML belongs in children; the wrapper is a neutral div.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: grid.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/stack.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Table — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/table

Compare structured records with sorting, selection, and pagination.

Reference API members: hasNextPage, hasPreviousPage, loading, paginate, variant, children, filters, nextpage, previouspage, format, listSlot, clickDelegate.

Reference example patterns: Slots; Events; Slots; Slots; Slots; Slots; Slots; Add a data table; Configure columns for mobile list layout; Add pagination for large datasets; Show a loading state while fetching data; Add a search filter to a table; Display data in list format.

Implementation / states / adaptations: Data-driven generic columns replace compound web-component slots. Client sorting and controlled selection are built in; pagination is callback-driven. Tables scroll horizontally on small screens instead of converting into Shopify list slots. No virtualization or editable spreadsheet cells.

Accessibility: Data-driven generic columns replace compound web-component slots. Client sorting and controlled selection are built in; pagination is callback-driven. Tables scroll horizontally on small screens instead of converting into Shopify list slots. No virtualization or editable spreadsheet cells.

Related composition: Compose with layout and typography primitives..

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/table.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## UnorderedList — Layout
Source: https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/unordered-list

Present a set of related items without implying order.

Reference API members: children.

Reference example patterns: Slots; Slots; Add a bulleted list; Create nested lists with sub-items.

Implementation / states / adaptations: Native ul/li and standard list semantics; use ListItem or plain li children.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: ordered-list.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/unordered-list.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Avatar — Media
Source: https://shopify.dev/docs/api/app-home/latest/web-components/media-and-visuals/avatar

Represent a person with an image or a readable initials fallback.

Reference API members: alt, initials, size, src, error, load.

Reference example patterns: Events; Display initials; Show a placeholder avatar.

Implementation / states / adaptations: Name supplies accessible text and derived initials. Failed images fall back to initials. No remote avatar service or fabricated profile photographs.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: thumbnail, image.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/avatar.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Icon — Media
Source: https://shopify.dev/docs/api/app-home/latest/web-components/media-and-visuals/icon

Use a consistent stroke-based visual language for actions.

Reference API members: color, interestFor, size, tone, type.

Reference example patterns: Display icons; Apply semantic tones; Reduce the size; Apply subdued color; Add an ID; Connect to related content; Use in buttons; Use in badges.

Implementation / states / adaptations: A curated Lucide name map plus a source prop for any Lucide icon replaces Shopify’s proprietary icon-name catalog. Decorative icons are hidden; meaningful icons require label.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: button, badge, chip.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/icon.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Image — Media
Source: https://shopify.dev/docs/api/app-home/latest/web-components/media-and-visuals/image

Display responsive imagery with meaningful alternative text.

Reference API members: accessibilityRole, alt, aspectRatio, border, borderColor, borderRadius, borderStyle, borderWidth, inlineSize, loading, objectFit, sizes, src, srcSet, error, load.

Reference example patterns: Events; Display a product thumbnail; Set an aspect ratio; Use responsive images; Add border styling; Mark as decorative; Use in a grid layout.

Implementation / states / adaptations: Native img supports srcSet, sizes, loading and error handlers. Applications own image assets and fallback policy; no Shopify CDN transformation.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: thumbnail, avatar, grid.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/image.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Thumbnail — Media
Source: https://shopify.dev/docs/api/app-home/latest/web-components/media-and-visuals/thumbnail

Place a small, consistently sized image beside content.

Reference API members: alt, loading, size, src, error, load.

Reference example patterns: Events; Display a thumbnail; Show an empty state; Adjust the size; Handle load events.

Implementation / states / adaptations: Native image with small/medium/large dimensions. Alternative text is required. Source failures use native behavior unless an onError handler is provided.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: image, avatar.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/thumbnail.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Modal — Overlays
Source: https://shopify.dev/docs/api/app-home/latest/web-components/overlays/modal

Focus a task in a dialog that contains and restores focus.

Reference API members: accessibilityLabel, heading, hideOverlay, padding, showOverlay, size, toggleOverlay, afterhide, aftershow, hide, show, children, primary-action, secondary-actions.

Reference example patterns: Events; Slots; Confirm a merchant action; Show information in a modal; Confirm an action with buttons; Collect input with a form; Choose modal size; Display full-width content; Delete with async handling.

Implementation / states / adaptations: Radix Dialog handles focus, Escape, background inertness and scroll lock. Controlled open/onOpenChange replaces imperative show/hide methods. Title and description are required.

Accessibility: Radix Dialog handles focus, Escape, background inertness and scroll lock. Controlled open/onOpenChange replaces imperative show/hide methods. Title and description are required.

Related composition: Compose with layout and typography primitives..

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/modal.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Popover — Overlays
Source: https://shopify.dev/docs/api/app-home/latest/web-components/overlays/popover

Reveal contextual controls beside their trigger.

Reference API members: blockSize, inlineSize, maxBlockSize, maxInlineSize, minBlockSize, minInlineSize, afterhide, aftershow, aftertoggle, hide, show, toggle, children.

Reference example patterns: Events; Slots; Show a menu of actions; Display notification list; Configure table display options; Show inventory details; Filter with apply and clear.

Implementation / states / adaptations: Radix handles anchoring, collision avoidance, Escape and focus return. It is nonmodal; use Modal for tasks that must block background interaction.

Accessibility: Radix handles anchoring, collision avoidance, Escape and focus return. It is nonmodal; use Modal for tasks that must block background interaction.

Related composition: modal.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/popover.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Chip — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/chip

Show a user-created label with an optional remove action.

Reference API members: accessibilityLabel, color, removable, children, graphic.

Reference example patterns: Slots; Add a basic chip; Set visual weight with color variants; Add an icon to reinforce meaning; Handle long text with truncation.

Implementation / states / adaptations: The onRemove callback is parent-owned. Removal has a separately named button. Colors use the shared semantic tones.

Accessibility: Maintain an understandable accessible name and preserve visible focus for all actions.

Related composition: badge, clickable-chip.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/chip.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Heading — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/heading

Express the document outline independently of visual size.

Reference API members: accessibilityRole, accessibilityVisibility, fontSize, lineClamp, children.

Reference example patterns: Slots; Add a basic heading; Truncate long headings with line clamping; Customize accessibility roles and visibility; Create a heading hierarchy with nested sections; Set the size of a heading.

Implementation / states / adaptations: Explicit level and visual size are independent. No automatic hierarchy inference, accessibilityRole override or line clamping.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: section.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/heading.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Number — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/number

Format numeric values with locale-aware tabular typography.

Reference API members: accessibilityVisibility, color, dir, fontSize, fontWeight, tone.

Reference example patterns: Align figures in a column; Communicate status with tones; Emphasize a total; De-emphasize a secondary figure.

Implementation / states / adaptations: Intl.NumberFormat adds locale/currency/percent formatting beyond tabular styling. Numeric formatting is presentation, not decimal arithmetic.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: text, paragraph, stack.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/number.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Paragraph — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/paragraph

Set readable blocks of prose with inline content.

Reference API members: accessibilityVisibility, color, dir, fontSize, fontWeight, lineClamp, tone, fontVariantNumeric, children.

Reference example patterns: Slots; Add a basic paragraph; Communicate status with tones; Truncate long text with line clamping; Align numbers with tabular formatting; Add screen-reader-only text; De-emphasize secondary text with subdued color; Render right-to-left text; Set the size and weight of a paragraph.

Implementation / states / adaptations: Native p accepts inline React content and semantic tone. Clamping and numeric variants can be expressed in application CSS.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: text.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/paragraph.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Text — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/text

Apply semantic tone, size, and emphasis to inline content.

Reference API members: accessibilityVisibility, color, dir, fontSize, fontWeight, interestFor, tone, type, fontVariantNumeric, children.

Reference example patterns: Slots; Add inline text with emphasis; Communicate status with tones; Display a semantic address; De-emphasize secondary information; Align numbers with tabular formatting; Add screen-reader-only text; Associate text with a tooltip; Render right-to-left text; Set the size and weight of inline text.

Implementation / states / adaptations: Native span with size, weight and semantic tone. Use strong/em/code directly for semantic emphasis rather than visual-only text variants.

Accessibility: Preserve semantic structure and communicate meaning with text rather than color alone.

Related composition: paragraph, heading.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/text.tsx`. Type-derived public API: `apps/docs/lib/api.json`.

## Tooltip — Typography
Source: https://shopify.dev/docs/api/app-home/latest/web-components/typography-and-content/tooltip

Provide a brief explanation on hover or keyboard focus.

Reference API members: children.

Reference example patterns: Slots; Add a basic tooltip; Explain a term with a tooltip on text; Describe an icon-only button with a tooltip; Show a keyboard shortcut in a tooltip.

Implementation / states / adaptations: Radix opens immediately on keyboard focus and after 800ms hover. Tooltip content is plain text, dismisses on Escape, and should never contain required instructions or interactive controls.

Accessibility: Radix opens immediately on keyboard focus and after 800ms hover. Tooltip content is plain text, dismisses on Escape, and should never contain required instructions or interactive controls.

Related composition: chip, heading, number, paragraph, text.

staqui source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/tooltip.tsx`. Type-derived public API: `apps/docs/lib/api.json`.
