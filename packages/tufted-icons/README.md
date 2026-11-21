# @antheo/tufted-icons

281 felt icons for React. Each icon is cut from felt and laid on a felt tile: fuzzy fibre edges, a soft fibre
texture and a shadow under every piece. On hover the felt lifts and does its own move.

![Tufted icons](https://raw.githubusercontent.com/antheo-design/icons/main/assets/tufted.png)

```bash
npm i @antheo/tufted-icons
```

```tsx
import { Globe, Rocket, Heart } from '@antheo/tufted-icons';

<Globe />
<Rocket size={48} play="loop" />
<Heart tile="#151412" ink="#FFF3E4" color="#E5103C" />
```

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `size` | `number \| string` | `28` | Width and height, in px or any CSS length |
| `tile` | `string` | the icon's own | The felt tile |
| `ink` | `string` | the icon's own | The strips on top |
| `color` | `string` | the icon's own | The colour piece under the strips |
| `play` | `'hover' \| 'loop' \| 'none'` | `'hover'` | Play the move on hover, forever, or never |
| `title` | `string` | | An accessible name. Without it the icon is decorative and hidden from screen readers |

Every other SVG attribute (`className`, `style`, `onClick`, `data-*`…) is passed to the `<svg>`, and `ref` reaches it.

Each icon has its own yarn (tile, ink and colour picked to work together), and the felt reads on light and dark
pages alike.

## Names

Every icon has two exports: the plain name and one ending in `Tuft`, for when the plain one clashes with your code.

```ts
import { Globe, GlobeTuft } from '@antheo/tufted-icons'; // same component
```

All 281, with pictures: [ICONS.md](ICONS.md). In code: `iconNames`, `categories` and `icons.json` (names, categories,
search tags, moves and the yarns).

The names match `@antheo/painted-icons` exactly, so you can switch families by changing the import.

## Hover from a parent

Give a button, link or row the class `at-trigger` and the icon inside plays when the whole thing is hovered or
focused from the keyboard.

## Files

- `svg/<name>.svg`: the still icon
- `animated/<name>.svg`: the icon looping its move, on its own, even in an `<img>`
- `styles.css`: the icons' stylesheet, if you'd rather bundle it yourself (it's added automatically otherwise)

```html
<img src="https://cdn.jsdelivr.net/npm/@antheo/tufted-icons/animated/globe.svg" width="56" height="56" alt="">
```

## A note on many icons

The felt is an SVG filter. Dozens of tufted icons on screen at once are smooth everywhere; for grids of hundreds,
show them in pages or as they scroll into view.

## More

The [guide](https://github.com/antheo-design/icons/blob/main/docs/guide.md) covers Next.js, deep imports,
accessibility and performance. The painted version of the same icons is
[`@antheo/painted-icons`](https://www.npmjs.com/package/@antheo/painted-icons).

## License

Free in your own projects, personal and commercial. Not for resale or redistribution as icons, not for other icon sets
or generators, not for AI training. See [LICENSE](LICENSE).
