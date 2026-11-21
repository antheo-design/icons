'use client';

import { forwardRef, useInsertionEffect, type CSSProperties, type SVGProps } from 'react';
import { css } from './styles.js';

export type PaintedIconProps = Omit<SVGProps<SVGSVGElement>, 'color' | 'children' | 'ref'> & {
  /** width and height, in px or any CSS length. Default 24. */
  size?: number | string;
  /** the brush ink. Default `currentColor`, so the icon follows the text colour (and dark mode). */
  ink?: string;
  /** the colour plate behind the ink. Default: the icon's own colour. */
  color?: string;
  /** how far the plate sits off the line at rest, in px of the 24 grid. Default 1.9; 0 sits it in register. */
  slip?: number;
  /** re-draw the ink while hovered (the boil). Default true. */
  boil?: boolean;
  /** play the icon's move on hover. Default true. */
  animate?: boolean;
  /** an accessible name. Leave it out for a decorative icon (it is then hidden from screen readers). */
  title?: string;
};

const STYLE_ID = 'antheo-painted-icons';

/** the stylesheet goes into the page once, before the first icon paints */
function useStyles() {
  useInsertionEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }, []);
}

/** @internal Builds one icon component from its finished drawing. */
export function createIcon(displayName: string, move: string, origin: string, spin: number, tint: string, inner: string) {
  const Icon = forwardRef<SVGSVGElement, PaintedIconProps>(function Icon({ size = 24, ink = 'currentColor', color = tint, slip = 1.9, boil = true, animate = true, title, className, style, ...rest }, ref) {
    useStyles();
    const vars = { '--ap-ink': ink, '--ap-color': color, '--ap-slip': `${slip}px`, '--ap-o': origin, '--ap-spin': `${spin}deg` } as CSSProperties;
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        {...rest}
        className={['ap', animate ? `ap-m-${move}` : '', boil ? '' : 'ap-noboil', className].filter(Boolean).join(' ')}
        style={{ ...vars, ...style }}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
