from pathlib import Path
import json,re
root=Path('.');base='https://shopify.dev/docs/api/app-home/latest/web-components/'
purposes={
'button':'Trigger an action with clear hierarchy and immediate feedback.',
'button-group':'Keep related actions aligned and meaningfully grouped.',
'clickable':'Build a custom interaction on a semantic button foundation.',
'clickable-chip':'Select and remove compact filters without losing context.',
'link':'Navigate to another destination with familiar anchor behavior.',
'menu':'Place contextual actions in a keyboard-accessible dropdown.',
'badge':'Communicate a short status with color and a readable label.',
'banner':'Bring important feedback and recovery actions into view.',
'empty-state':'Explain an empty view and offer a useful next step.',
'progress':'Show how much measurable work has been completed.',
'spinner':'Announce ongoing work when progress cannot be measured.',
'checkbox':'Select an independent option or represent partial selection.',
'choice-list':'Choose one or several options in a visible list.',
'color-field':'Enter a hex color directly or choose it visually.',
'color-picker':'Choose an RGB color with the native system picker.',
'date-field':'Enter a calendar date with native format and constraint handling.',
'date-picker':'Select a date or range in a keyboard-navigable calendar.',
'drop-zone':'Accept files through a native chooser or drag and drop.',
'email-field':'Collect an email address with the right input semantics.',
'money-field':'Enter a decimal amount with an explicit currency.',
'number-field':'Collect a numeric value with step and range constraints.',
'password-field':'Enter a secret with an accessible visibility toggle.',
'search-field':'Collect a search query with a recognizable search affordance.',
'select':'Choose an option from a native, optionally grouped menu.',
'switch':'Turn an independent setting on or off.',
'text-area':'Write longer content in a resizable multiline field.',
'text-field':'Collect a short text value with labels and validation feedback.',
'url-field':'Collect a web address with native URL validation.',
'box':'Apply consistent spacing and surface treatments to a container.',
'divider':'Separate adjacent content with a subtle semantic boundary.',
'grid':'Arrange content in responsive columns that fit their container.',
'ordered-list':'Present items whose order is meaningful.',
'page':'Compose a page title, actions, body, and optional aside.',
'query-container':'Create a named CSS container for responsive compositions.',
'section':'Give related content a heading, description, and action.',
'stack':'Align items along a horizontal or vertical axis.',
'table':'Compare structured records with sorting, selection, and pagination.',
'unordered-list':'Present a set of related items without implying order.',
'avatar':'Represent a person with an image or a readable initials fallback.',
'icon':'Use a consistent stroke-based visual language for actions.',
'image':'Display responsive imagery with meaningful alternative text.',
'thumbnail':'Place a small, consistently sized image beside content.',
'modal':'Focus a task in a dialog that contains and restores focus.',
'popover':'Reveal contextual controls beside their trigger.',
'chip':'Show a user-created label with an optional remove action.',
'heading':'Express the document outline independently of visual size.',
'number':'Format numeric values with locale-aware tabular typography.',
'paragraph':'Set readable blocks of prose with inline content.',
'text':'Apply semantic tone, size, and emphasis to inline content.',
'tooltip':'Provide a brief explanation on hover or keyboard focus.'}
notes={
'button':'Navigation is handled by Link rather than a polymorphic href button. DOM commandFor and interestFor become React callbacks and composed overlays. Three variants, critical tone, three sizes, loading, disabled and fullWidth are supported.',
'button-group':'Named React children replace primary-action and secondary-actions slots. All actions retain independent tab stops.',
'clickable':'Always a native button. Use Link for navigation. Styling is through className/style instead of the full Shopify responsive-property DSL.',
'clickable-chip':'Selection uses aria-pressed; removal is a separate sibling button. The parent owns selection and removal state.',
'link':'A native anchor handles navigation and downloads. Use Button for commands; no Shopify routing or App Bridge integration.',
'menu':'Radix provides roving focus, typeahead, disabled items, Escape and focus restoration. Items support groups and links; nested submenus are not exposed.',
'badge':'Five semantic tones replace Shopify auto/caution/color combinations. Status is always visible text; badge is not a live region.',
'banner':'Dismissal is local until remounted; use onDismiss to persist it. Critical banners use alert, other tones use status. React action replaces the secondary-actions slot.',
'empty-state':'React action and graphic props replace named slots. It never fabricates content or a successful network action.',
'progress':'Native progress, max defaults to 100, values are clamped. Missing value is indeterminate with a static striped fallback; it does not animate. The indicator uses the brand token rather than per-instance status tones.',
'spinner':'A named status region announces loading. CSS rotation stops under reduced motion, while the status label remains available.',
'checkbox':'Supports controlled/uncontrolled checked state and the native indeterminate property. Required and validation are native browser behavior.',
'choice-list':'Uses fieldset/legend and native radio or checkbox inputs. Values are arrays in both modes. Rich secondary option content is not exposed; option labels are strings.',
'color-field':'Six-digit RGB hex only. Alpha, HSL and wide-gamut formats are deliberately excluded. A native color chooser accompanies the editable text input.',
'color-picker':'Uses the operating-system color interface and six-digit RGB hex. Appearance varies by browser; alpha and an always-visible spectrum are not implemented.',
'date-field':'Uses native input type=date, ISO string values, min/max, required and readOnly. Shopify allow/disallow expression syntax and weekday constraints are replaced by DatePicker matchers when needed.',
'date-picker':'React DayPicker supports single/range selection, one/two months, localized labels, min/max month navigation and disabled matchers. Date objects replace Shopify string expressions. Multiple independent dates are not part of this API; the source property table also lists single/range only.',
'drop-zone':'Files remain local and are passed to onFilesChange. Type, count and maximum bytes are checked on both chooser and drop paths. No upload service, directory traversal or content scanning. Applications must submit callback files for drag-and-drop; native file FormData covers chooser selections only.',
'email-field':'Native type=email and autocomplete=email replace platform input handling. Application errors are supplied through error; browser constraints validate on form submission.',
'money-field':'Currency symbol and code use Intl.NumberFormat; input remains an ungrouped decimal string for predictable editing. This is not financial arithmetic, exchange conversion or locale-specific currency parsing.',
'number-field':'Native type=number exposes min/max/step and browser steppers. Values emitted by onValueChange remain strings so empty input is representable.',
'password-field':'A named, pressed-state visibility toggle preserves focus and value. No password strength scoring or authentication service is included.',
'search-field':'Native type=search with a decorative icon. Filtering is application-owned, as shown in the live example.',
'select':'Native select/option/optgroup preserve mobile pickers and keyboard behavior. Labels are strings; icon slots are intentionally omitted.',
'switch':'A native checkbox with role=switch provides Space activation, form participation and checked state. Its visible label describes the setting, not the current state.',
'text-area':'Native textarea with rows, min/maxLength and vertical resizing. Character counting is an application composition, shown in the example.',
'text-field':'Native input attributes plus label/description/error, prefix/suffix and onValueChange. Shopify accessory and DOM-command slots become React composition.',
'url-field':'Native type=url handles validation and input keyboard. It does not prepend a scheme or rewrite input silently.',
'box':'Tokens cover padding, surface, border and radius. Standard style/className provide additional layout control instead of copying Shopify responsive string expressions.',
'divider':'Native hr is horizontal by default; vertical mode is intended for flex layouts and has the matching aria-orientation.',
'grid':'Responsive auto-fit columns replace GridItem elements and responsive DSL strings. Children can use CSS gridColumn/gridRow. minColumnWidth prevents squeezed content.',
'ordered-list':'Native ol/li semantics. ListItem is exported for both list components. Native ordered-list attributes such as start and reversed pass through.',
'page':'An outer div avoids injecting a second main landmark inside host applications. Provide the main landmark in your app. Heading is h1; React nodes replace platform slots.',
'query-container':'Native CSS container-type:inline-size and container-name. Write standard @container CSS in the consuming application; no Shopify query expression runtime.',
'section':'Native section is named by its heading. Default heading level is h2; nested semantic structures can be authored using Box and Heading.',
'stack':'Flex direction, gap, align, justify and wrapping replace the platform layout DSL. Semantic HTML belongs in children; the wrapper is a neutral div.',
'table':'Data-driven generic columns replace compound web-component slots. Client sorting and controlled selection are built in; pagination is callback-driven. Tables scroll horizontally on small screens instead of converting into Shopify list slots. No virtualization or editable spreadsheet cells.',
'unordered-list':'Native ul/li and standard list semantics; use ListItem or plain li children.',
'avatar':'Name supplies accessible text and derived initials. Failed images fall back to initials. No remote avatar service or fabricated profile photographs.',
'icon':'A curated Lucide name map plus a source prop for any Lucide icon replaces Shopify’s proprietary icon-name catalog. Decorative icons are hidden; meaningful icons require label.',
'image':'Native img supports srcSet, sizes, loading and error handlers. Applications own image assets and fallback policy; no Shopify CDN transformation.',
'thumbnail':'Native image with small/medium/large dimensions. Alternative text is required. Source failures use native behavior unless an onError handler is provided.',
'modal':'Radix Dialog handles focus, Escape, background inertness and scroll lock. Controlled open/onOpenChange replaces imperative show/hide methods. Title and description are required.',
'popover':'Radix handles anchoring, collision avoidance, Escape and focus return. It is nonmodal; use Modal for tasks that must block background interaction.',
'chip':'The onRemove callback is parent-owned. Removal has a separately named button. Colors use the shared semantic tones.',
'heading':'Explicit level and visual size are independent. No automatic hierarchy inference, accessibilityRole override or line clamping.',
'number':'Intl.NumberFormat adds locale/currency/percent formatting beyond tabular styling. Numeric formatting is presentation, not decimal arithmetic.',
'paragraph':'Native p accepts inline React content and semantic tone. Clamping and numeric variants can be expressed in application CSS.',
'text':'Native span with size, weight and semantic tone. Use strong/em/code directly for semantic emphasis rather than visual-only text variants.',
'tooltip':'Radix opens immediately on keyboard focus and after 800ms hover. Tooltip content is plain text, dismisses on Escape, and should never contain required instructions or interactive controls.'}
interactive={'button','button-group','clickable','clickable-chip','menu','checkbox','choice-list','color-field','color-picker','date-field','date-picker','drop-zone','email-field','money-field','number-field','password-field','search-field','select','switch','text-area','text-field','url-field','modal','popover','chip','tooltip','table'}
catNames={'actions':'Actions','feedback-and-status-indicators':'Feedback','forms':'Forms','layout-and-structure':'Layout','media-and-visuals':'Media','overlays':'Overlays','typography-and-content':'Typography'}
items=[]
for url in json.loads((root/'research/urls.json').read_text()):
 slug=url.split('/')[-1];category=url.split('/')[-2];s=(root/'research/sources'/f'{slug}.md').read_text();name=''.join(x.capitalize() for x in slug.split('-'));name={'UrlField':'URLField'}.get(name,name)
 props=list(dict.fromkeys(re.findall(r'\*\*\[Anchor to ([^\]]+)\].*?\*\*',s)))
 examples=re.findall(r'^### \[Anchor to ([^\]]+)\]',s,re.M)
 related=list(dict.fromkeys(x.split('/')[-1] for x in re.findall(r'https://shopify.dev/docs/api/app-home/latest/web-components/[a-z-]+/[a-z-]+',s) if x != url))
 a11y=('Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.' if category=='forms' else 'Maintain an understandable accessible name and preserve visible focus for all actions.' if slug in interactive else 'Preserve semantic structure and communicate meaning with text rather than color alone.')
 if slug in ['modal','popover','menu','tooltip','date-picker','table']:a11y=notes[slug]
 items.append(dict(slug=slug,name=name,title=slug.replace('-',' ').capitalize(),category=catNames[category],source=url,researchDate='2026-11-01',description=purposes[slug],adaptation=notes[slug],accessibility=a11y,sourceProperties=props,sourceExamples=examples,related=related,interactive=slug in interactive))
(root/'apps/docs/lib/catalog.json').write_text(json.dumps(items,indent=2)+'\n')
lines=['# Research inventory: StaqUI and reference component catalog','', 'Researched with BrowserOS Neo on 2026-11-01 (Asia/Manila). The versioning reference explicitly identifies reference component catalog. This inventory maps conceptual coverage; StaqUI is not a drop-in replacement or affiliated Shopify product.','', '[Catalog](https://shopify.dev/docs/api/app-home/latest/web-components) · [Versioning](https://shopify.dev/docs/api/app-home/latest/web-components/versioning)','', 'Shared independent equivalents: React callbacks replace DOM commands; React nodes replace slots; standard CSS replaces the responsive property DSL; native anchors replace Shopify navigation; Radix handles overlays; React DayPicker handles calendars; Lucide supplies icons. All examples use local state, with no Shopify services.','']
for c in items:
 lines += [f'## {c["name"]} — {c["category"]}',f'Source: {c["source"]}', '',c['description'],'','Reference API members: '+', '.join(c['sourceProperties'])+'.','','Reference example patterns: '+('; '.join(c['sourceExamples']) or 'No example headings captured; review the source reference.')+'.','','Implementation / states / adaptations: '+c['adaptation'],'','Accessibility: '+c['accessibility'],'','Related composition: '+(', '.join(c['related']) or 'Compose with layout and typography primitives.')+'.','','StaqUI source: `packages/ui/src`. Runnable documentation example: `packages/ui/examples/'+c['slug']+'.tsx`. Type-derived public API: `apps/docs/lib/api.json`.','']
(root/'research/INVENTORY.md').write_text('\n'.join(lines))
print(f'Catalog and inventory: {len(items)} entries')
