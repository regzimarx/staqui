# staqui design system

staqui is a React design system by Staqforce Studio for product teams building compact workspaces. Its identity pairs Geist typography and cobalt actions with precise spacing, native semantics, and purposeful density.

## Identity
A precise component workbench: broad typography introduces the system, followed by working interface compositions. A geometric stacked mark reflects the name; it is original SVG geometry. Blue is reserved for selected states and primary actions; neutral surfaces carry the interface. The documentation uses a persistent index, a working examples canvas, and an inset code surface. All product names and records are explicitly sample content.

## Tokens and ergonomics
- Semantic OKLCH tokens cover canvas, surface, subtle, hover, selected, ink, muted, boundary, control boundary, focus, disabled, and five status tones. Dark mode defines a separate palette. Theme-aware portals preserve context outside the provider DOM subtree.
- A 4px spacing grid, 8/12/20px corner scale, one control height per density, and shared icon treatment produce aligned controls. Comfortable controls are 40px; compact controls are 32px. A floating density control at the bottom of the viewport switches between both densities, persists the choice, and applies it to every component including portalled overlays. Interactive targets remain at least 24px.
- Text stays legible in neutral and status contexts. A 2px focus outline appears immediately. Borders do not change width on interaction. Status labels accompany colors. Native form semantics preserve autofill and browser validation.
- Loading disables repeated actions. Disabled controls use native state plus cursor, fill, and foreground changes. Errors have both text and programmatic input associations.
- Motion is limited to short opacity/transform changes and the loading spinner. Reduced motion removes animation without hiding state.
- Geist is the default face. The font token remains overridable, and consumers can provide their preferred Geist loading strategy.

## Public API
Native attributes pass through wherever the component represents one HTML element. Form components add label, description, error and onValueChange. Selection controls use onCheckedChange or onValueChange. Overlays accept React triggers and controlled open/onOpenChange rather than string-based DOM commands. Semantic variants are constrained by TypeScript. CSS custom properties allow local overrides without a styling runtime.

## Implementation boundaries
The component inventory documents every public component and its supported behavior. Native color controls use RGB hex; date fields use native browser UI; DatePicker uses Date objects and matcher constraints. Icons use Lucide. Applications own routing, uploads, service integrations, and backend behavior.

## Website
The landing page combines a paper canvas, cobalt actions, periwinkle graph paper, and lime accents. A live workspace preview leads into component specimens, a dark green principles panel, working compositions, a theme example, and a cobalt closing panel. The stacked motif expresses the relationship between small pieces and a complete product.

Documentation opens at `/docs` with a field guide and six guide cards. Desktop navigation keeps the component index visible; guide pages add an outline at wide widths. Component pages share category numbering, interactive previews, exact example source, and type-generated APIs. Mobile navigation, persistent theme and density controls, and keyboard search work throughout the site.

## Product identity

staqui is a product of Staqforce Studio. Its UI monogram derives from the Studio mark’s rounded interlocking ribbons and diagonal cuts. The primary mark uses Studio blue (#1534B1), paired with the Geist wordmark. A light periwinkle silhouette provides contrast in dark themes. The transparent master is `apps/docs/public/brand/staqui-mark.png`.
