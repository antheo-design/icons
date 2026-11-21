// npm test: imports both built packages the way an app would, renders icons on the server and checks the output.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as painted from '@antheo/painted-icons';
import * as tufted from '@antheo/tufted-icons';
import Rocket from '@antheo/painted-icons/icons/rocket';

const meta = (pkg) => JSON.parse(fs.readFileSync(new URL(`../packages/${pkg}/icons.json`, import.meta.url)));

for (const [label, mod, suffix, pkg] of [
  ['painted', painted, 'Icon', 'painted-icons'],
  ['tufted', tufted, 'Tuft', 'tufted-icons'],
]) {
  const { icons, count } = meta(pkg);
  assert.equal(mod.iconNames.length, count, `${label}: iconNames matches icons.json`);
  for (const i of icons) {
    assert.equal(typeof mod[i.component], 'object', `${label}: ${i.component} is exported`);
    assert.equal(mod[i.component], mod[i.component + suffix], `${label}: ${i.component}${suffix} is the same icon`);
    assert.ok(fs.existsSync(new URL(`../packages/${pkg}/svg/${i.name}.svg`, import.meta.url)), `${label}: svg/${i.name}.svg`);
    assert.ok(fs.existsSync(new URL(`../packages/${pkg}/animated/${i.name}.svg`, import.meta.url)), `${label}: animated/${i.name}.svg`);
  }
  assert.equal(typeof mod.css, 'string');
  console.log(`${label}: ${count} icons exported, files present`);
}

// painted: props reach the markup
const p = renderToStaticMarkup(h(painted.Camera, { size: 32, ink: '#123456', color: 'tomato', title: 'Camera', className: 'x' }));
assert.match(p, /width="32"/);
assert.match(p, /--ap-ink:#123456/);
assert.match(p, /--ap-color:tomato/);
assert.match(p, /role="img"/);
assert.match(p, /aria-label="Camera"/);
assert.match(p, /class="ap ap-m-\w+ x"/);
assert.doesNotMatch(renderToStaticMarkup(h(painted.Camera)), /role="img"/, 'decorative by default');
assert.match(renderToStaticMarkup(h(painted.Camera)), /aria-hidden="true"/);
assert.match(renderToStaticMarkup(h(painted.Camera)), /--ap-ink:currentColor/, 'ink follows the text colour by default');
assert.match(renderToStaticMarkup(h(Rocket)), /class="ap /, 'deep import works');

// tufted: filter ids are unique per icon, colours are props, play modes
const two = renderToStaticMarkup(h('div', null, h(tufted.Globe), h(tufted.Globe, { play: 'loop', tile: '#000' })));
assert.doesNotMatch(two, /@ID@/, 'no id placeholder left');
const ids = [...two.matchAll(/filter id="([^"]+)-p"/g)].map((m) => m[1]);
assert.equal(ids.length, 2);
assert.notEqual(ids[0], ids[1], 'each icon has its own felt filter');
assert.match(two, /data-loop=""/);
assert.match(two, /--at-tile:#000/);
assert.doesNotMatch(renderToStaticMarkup(h(tufted.Globe, { play: 'none' })), /data-move/);

console.log('all checks passed');
