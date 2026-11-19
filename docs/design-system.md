# Design system

Implemented 2026-10-24, refined for production polish. Tokens and component classes live in `app/globals.css`. Reusable components live in `components/ui`. No component library was added.

## Personality

A light, quiet utility. The workspace is white. The page is cool gray. Indigo is reserved for the primary action and selected states. Status colors are reserved for meaningful success, warning, and error states.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#F8FAFC` | Page background |
| `--paper` | `#FFFFFF` | Surfaces and cards |
| `--canvas` | `#F1F5F9` | Recessed backgrounds, result panels |
| `--ink` | `#0F172A` | Primary text |
| `--muted` | `#64748B` | Secondary text |
| `--faint` | `#94A3B8` | Tertiary text, metadata |
| `--line` | `#E2E8F0` | Borders |
| `--line-strong` | `#CBD5E1` | Hover borders |
| `--accent` | `#4F46E5` | Primary action |
| `--accent-hover` | `#4338CA` | Primary hover |
| `--accent-soft` | `#EEF2FF` | Selected and hover wash |
| `--success` | `#15803D` | Positive status |
| `--warning` | `#B45309` | Caution |
| `--danger` | `#B91C1C` | Errors |
| `--shadow-sm` | `0 1px 2px …` | Subtle elevation |
| `--shadow` | `0 4px 16px …` | Menus and panels |
| `--shadow-lg` | `0 12px 32px …` | Dropdowns and modals |
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| `--duration` | `150ms` | Standard transition duration |

## Typography

The typeface is the device sans, with `Noto Sans`, `Noto Sans Arabic`, `Noto Sans Devanagari`, and `Noto Sans JP` named as fallbacks. Monospace uses `ui-monospace` with SF Mono and Cascadia Code fallbacks. No font file is downloaded.

Page titles are `text-2xl`–`text-3xl`, tightened. Section headings use `text-lg`. Body is 0.9375rem with 1.6 line height. Labels are `text-sm` (0.8125rem). Metadata uses `text-xs`. Numbers in results use `tabular-nums`. Code and technical output use `font-mono`.

## Spacing and geometry

Spacing follows 4px steps. The page is at most 1200px. Reading columns stay near 720px. Tool workspaces use max-w-xl (for single-column tools like password, age, EMI, GST, unit) or full width for two-panel tools (word counter, case converter, JSON, base64). Controls are at least 2.5rem tall (`min-h-10`). Fields are 2.75rem. Surfaces use 0.75rem radius. Fields use 0.5rem radius.

## Component classes

- `.field-control`: Inputs, textareas, and selects with consistent sizing, borders, transitions, and focus rings. Selects have a custom chevron.
- `.panel`: Bordered card with white background and 0.75rem radius.
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-tertiary`: Buttons with hover, active, disabled, and focus-visible states. All have transitions.

## Custom control styling

Range inputs have a styled indigo thumb with white border. Checkboxes and radios use `accent-color`. Tables have consistent padding and subtle row borders. Details/summary elements have a rotating chevron indicator.

## Motion

All interactive elements use `var(--duration)` transitions for background, border, and color changes. `prefers-reduced-motion: reduce` removes all animation and transitions.

## Advertising

`AdSlot` renders nothing. An empty reserved box was rejected because it shifts the page and looks broken. A future provider can use the same component once a script and consent state exist.

## Language

The language menu lists English as the only published locale. The other nine codes are visible as not published. They are not links.
