'use client';

import { forwardRef, useId, useInsertionEffect, useMemo, type CSSProperties, type SVGProps } from 'react';
import { css } from './styles.js';

export type TuftedIconProps = Omit<SVGProps<SVGSVGElement>, 'color' | 'children' | 'ref'> & {
  /** width and height, in px or any CSS length. Default 28. */
  size?: number | string;
  /** the felt tile. Default: the icon's own yarn. */
  tile?: string;
  /** the ink strips. Default: the icon's own yarn. */
  ink?: string;
  /** the colour piece under the strips. Default: the icon's own yarn. */
  color?: string;
  /** `hover` plays the move when hovered (or when a parent with the `at-trigger` class is); `loop` plays it forever;
   * `none` keeps it still. Default `hover`. */
  play?: 'hover' | 'loop' | 'none';
  /** an accessible name. Leave it out for a decorative icon (it is then hidden from screen readers). */
  title?: string;
};

const STYLE_ID = 'antheo-tufted-icons';

function useStyles() {
  useInsertionEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }, []);
}

/** @internal Builds one icon component from its finished felt pieces. */
export function createIcon(displayName: string, move: string, origin: string, spin: number, yarn: [string, string, string], inner: string) {
  const Icon = forwardRef<SVGSVGElement, TuftedIconProps>(function Icon({ size = 28, tile = yarn[0], ink = yarn[1], color = yarn[2], play = 'hover', title, className, style, ...rest }, ref) {
    useStyles();
    // every icon on the page gets its own felt filter ids
    const id = `at${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
    const html = useMemo(() => inner.replace(/@ID@/g, id), [id]);
    const vars = { '--at-tile': tile, '--at-ink': ink, '--at-color': color, '--at-o': origin, '--at-spin': `${spin}deg` } as CSSProperties;
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 28 28"
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        {...rest}
        className={['at', className].filter(Boolean).join(' ')}
        data-move={play === 'none' ? undefined : move}
        data-loop={play === 'loop' ? '' : undefined}
        style={{ ...vars, ...style }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
