# Guide

Everything here applies to both packages unless it says otherwise. Examples use `@antheo/painted-icons`; swap in
`@antheo/tufted-icons` for the felt family.

- [Install](#install)
- [Using an icon](#using-an-icon)
- [Colours and dark mode](#colours-and-dark-mode)
- [Hover, and hovering a parent](#hover-and-hovering-a-parent)
- [Next.js and server rendering](#nextjs-and-server-rendering)
- [Importing one icon](#importing-one-icon)
- [Listing every icon](#listing-every-icon)
- [SVG files, CDNs and non-React projects](#svg-files-cdns-and-non-react-projects)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Requirements](#requirements)

## Install

```bash
npm i @antheo/painted-icons
# or
pnpm add @antheo/painted-icons
yarn add @antheo/painted-icons
bun add @antheo/painted-icons
```

React 18 or 19 is the only peer dependency. Nothing else is installed.

## Using an icon

Every icon is a named export in PascalCase. Each one also has a second name with a suffix, for when the short name
clashes with something in your code: `CameraIcon` in the painted package, `CameraTuft` in the tufted one.

```tsx
import { Camera, CameraIcon } from '@antheo/painted-icons'; // the same component
```

Each component renders one `<svg>`. Any SVG attribute you pass (`className`, `style`, `onClick`, `id`, `data-*` and
so on) goes on it, and a `ref` reaches the `<svg>` element.

```tsx
<Camera size={20} className="toolbar-icon" onClick={openCamera} />
```

`size` takes a number (pixels) or any CSS length, such as `"1.5em"` to scale with the text around it.

## Colours and dark mode

**Painted.** `ink` is the brush line and `color` is the plate behind it. The ink defaults to `currentColor`, so it
takes the colour of the text around it: dark on a light page, light on a dark one, with no extra work. Each icon has
its own plate colour; pass `color` to change it.

```tsx
<Heart />                           // ink = text colour, its own pink plate
<Heart ink="#1C1A19" color="#FFD21A" />
<Heart color="transparent" />       // ink only
<Heart slip={0} />                  // the plate in register with the line
```

**Tufted.** Each icon has its own yarn: a tile, an ink and a colour that are picked to work together. Override any of
them with `tile`, `ink` and `color`. The felt reads on both light and dark pages, so most apps keep the defaults.

```tsx
<Globe tile="#151412" ink="#FFF3E4" color="#FF5A1F" />
```

Any CSS colour works, including `var(--brand)`.

## Hover, and hovering a parent

An icon plays its move when the pointer is over it. Often the icon sits in a button or a row, and you want the move
when the whole button is hovered or focused from the keyboard. Add a class to that parent:

```tsx
<button className="ap-trigger">      {/* painted */}
  <Rocket /> Launch
</button>

<a className="at-trigger" href="/map">  {/* tufted */}
  <Globe /> Map
</a>
```

To turn the move off: `animate={false}` (painted) or `play="none"` (tufted). The tufted icons can also loop on their
own with `play="loop"`. The painted ink "boils" (re-draws itself) while hovered; `boil={false}` keeps it still.

## Next.js and server rendering

The icons render on the server like any component, and work in both the App Router and the Pages Router. They hold no
state and use no browser APIs while rendering.

The stylesheet is added to the page by the first icon that renders on the client. Until then (a few milliseconds on a
server-rendered page) the icons are already drawn correctly; only the hover needs it. If you want it in your own CSS
bundle instead, import it once at the root:

```ts
import '@antheo/painted-icons/styles.css';
```

## Importing one icon

The main import is tree-shaken by every modern bundler. If your setup doesn't tree-shake (some test runners, older
tools), import the icon's own file:

```ts
import Rocket from '@antheo/painted-icons/icons/rocket';
```

The file name is the icon's kebab-case name.

## Listing every icon

```ts
import { iconNames, categories } from '@antheo/painted-icons';
// iconNames: ['abacus', 'agent', 'alarm', …], typed as the IconName union
```

For names, categories and search tags in one file (to build an icon picker, say), read `icons.json`:

```ts
import data from '@antheo/painted-icons/icons.json' with { type: 'json' };
data.icons[0]; // { name, component, category, tags, move }
```

Importing every icon at once (`import * as Icons`) works, but it puts all 281 in your bundle. Prefer named imports.

## SVG files, CDNs and non-React projects

Both packages ship every icon as two plain files:

- `svg/<name>.svg`: the still icon, in its own colours
- `animated/<name>.svg`: the icon doing its move on a loop, with nothing else needed, even in an `<img>`

```html
<img src="https://cdn.jsdelivr.net/npm/@antheo/painted-icons/animated/rocket.svg" width="48" height="48" alt="">
```

The same paths work on unpkg, or from `node_modules` in any build tool. Use these files in plain HTML, Vue, Svelte,
slides or design tools.

## Accessibility

- An icon on its own is decorative: it gets `aria-hidden="true"` and screen readers skip it. That's right when the
  icon sits next to a text label.
- Give it a `title` when the icon is the only thing that says what something is (an icon-only button, say). It then
  has `role="img"` and that name.

```tsx
<button aria-label="Search"><Search /></button>   // the button is named, the icon is decorative
<Search title="Search" />                          // the icon names itself
```

- With reduced motion turned on in the system settings, the icons stay still.

## Performance

- A painted icon is about 15 KB before compression and 5 KB gzipped (three hand-drawn frames of brush ink); a tufted
  icon is about 2.5 KB and 1 KB. The shared code is under 2.5 KB gzipped.
- Hover moves are CSS animations on `transform`, which browsers run off the main thread.
- The felt look is an SVG filter. A page with hundreds of tufted icons on screen at once does more drawing work than
  plain icons; for long grids, a few dozen at a time is smooth everywhere.

## Requirements

- React 18 or 19
- Any bundler or framework that understands ES modules (Vite, Next.js, Remix, Astro, webpack 5, esbuild, Parcel,
  Bun). The packages are ES modules only.
- Current versions of Chrome, Edge, Firefox and Safari
