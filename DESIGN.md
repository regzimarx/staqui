# StaqUI design system

StaqUI is an independent React design system for product teams building compact workspaces. It references the breadth and restraint of reference component catalog but does not use Shopify assets, runtime, tokens, or services.

## Identity
A precise component workbench: broad typography introduces the system, followed by working interface compositions. A geometric stacked mark reflects the name; it is original SVG geometry. Blue is reserved for selected states and primary actions; neutral surfaces carry the interface. The documentation uses a persistent index, a working examples canvas, and an inset code surface. All product names and records are explicitly sample content.

## Tokens and ergonomics
- Semantic OKLCH tokens cover canvas, surface, subtle, hover, selected, ink, muted, boundary, control boundary, focus, disabled, and five status tones. Dark mode defines a separate palette. Theme-aware portals preserve context outside the provider DOM subtree.
- A 4px spacing grid, 8/12/20px corner scale, one control height per density, and shared icon treatment produce aligned controls. Comfortable controls are 40px; compact controls are 32px. A floating density control at the bottom of the viewport switches between both densities, persists the choice, and applies it to every component including portalled overlays. Interactive targets remain at least 24px.
- Text stays legible in neutral and status contexts. A 2px focus outline appears immediately. Borders do not change width on interaction. Status labels accompany colors. Native form semantics preserve autofill and browser validation.
- Loading disables repeated actions. Disabled controls use native state plus cursor, fill, and foreground changes. Errors have both text and programmatic input associations.
- Motion is limited to short opacity/transform changes and the loading spinner. Reduced motion removes animation without hiding state.
- Fixel Display is the default face. Its upright and italic WOFF2 weights and OFL license ship with the library; the stylesheet loads it locally with font-display: swap. The font token remains overridable.

## Public API
Native attributes pass through wherever the component represents one HTML element. Form components add label, description, error and onValueChange. Selection controls use onCheckedChange or onValueChange. Overlays accept React triggers and controlled open/onOpenChange rather than string-based DOM commands. Semantic variants are constrained by TypeScript. CSS custom properties allow local overrides without a styling runtime.

## Deliberate adaptations
This is conceptual coverage, not a drop-in reference component catalog API clone. See research/INVENTORY.md for every source component, research API, composition notes and component-specific limitations. In particular, native color controls are RGB hex, date fields use native browser UI, DatePicker uses Date objects and matcher constraints, and Icon accepts Lucide components rather than Shopify's icon-name catalog. No app bridge, resource picker, Shopify navigation, service integration, or backend is included.

## Landing page
The homepage is a full-width product page without the documentation sidebar, composed as a specimen sheet: hairline rules, monospaced index labels, and numbered chapters. It opens with a live settings specimen mounted on a graph-paper plate, followed by a chapter index, an asymmetric board of four live component specimens, three numbered standards, the tabbed application workbench on a framed bench, a token sheet beside a copyable CSS override, and a closing installation call to action. The page is built from the library's own primitives (Heading, Paragraph, Text, Stack, list and form components) rather than bespoke markup, so its type scale, tones, and spacing come from the same system it documents. Calls to action are `Button` components rendered onto next/link elements through `asChild`, so they are ordinary links that keep the library's primary and secondary variants instead of a page-specific button class. Every surface, rule, swatch, and grid line is a theme token, so the page follows the light and dark themes rather than a fixed palette. Documentation retains its persistent component navigation.

## Product identity

StaqUI is a product of Staqforce Studio. Its UI monogram derives from the Studio mark’s rounded interlocking ribbons and diagonal cuts. The primary mark uses Studio blue (#1534B1), paired with the Fixel Display wordmark. A light periwinkle silhouette provides contrast in dark themes. The transparent master is `apps/docs/public/brand/staqui-mark.png`.
