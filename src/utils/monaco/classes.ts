import theme from 'tailwindcss/defaultTheme';
import camelToKebab from '../camel-to-kebab';

interface Theme {
  [key: string]: string | Theme | any[] | undefined;
}

type LazyTheme = (key: string) => Theme;
type ThemeResolver = (
  (
    base: (key: string, defaultValue?: string | Theme) => Theme[keyof Theme] | LazyTheme,
    util: typeof configUtils,
  ) => Theme | LazyTheme
);

function crawl(
  config: Theme,
  [index, ...keys]: string[],
  defaultValue?: Theme[keyof Theme],
): Theme[keyof Theme] {
  const result = config[index];

  if (keys.length) {
    if (typeof result === 'object' && !Array.isArray(result)) {
      return crawl(result, keys, defaultValue);
    }
    return defaultValue;
  }

  return result ?? defaultValue;
}

function getValue(
  config: Theme,
  key: string,
  defaultValue?: Theme[keyof Theme],
): Theme[keyof Theme] {
  return crawl(config, key.split('.'), defaultValue);
}

function createClass(prefix: string, config?: Theme): string[] {
  if (!config) {
    return [];
  }
  const entries = Object.entries(config);
  return entries.reduce((acc, [name, item]) => {
    if (typeof item === 'string' || Array.isArray(item)) {
      if (name === 'DEFAULT') {
        return [
          ...acc,
          prefix,
        ];
      }
      if (name.startsWith('-')) {
        return [
          ...acc,
          `-${prefix}-${name.replace('-', '')}`,
        ];
      }
      return [
        ...acc,
        `${prefix}-${name}`,
      ];
    }
    return [
      ...acc,
      ...createClass(`${prefix}-${camelToKebab(name)}`, item),
    ];
  }, [] as string[]);
}

const configUtils = {
  negative(item: Record<string, string>) {
    const record: Record<string, string> = {};
    Object.keys(item).forEach((key) => {
      record[`-${key}`] = item[key];
    });
    return record;
  },

  breakpoints(item: Record<string, string>) {
    const record: Record<string, string> = {};
    Object.keys(item).forEach((key) => {
      record[`screen-${key}`] = item[key];
    });
    return record;
  },
};

function isConfigLazy(config: any): config is ThemeResolver {
  return typeof config === 'function';
}

function createLazyClass(prefix: string, config?: any): string[] {
  if (isConfigLazy(config) && config) {
    const result = config(
      (key, defaultValue) => getValue(theme as Theme, key, defaultValue),
      configUtils,
    );
    if (typeof result === 'function') {
      return createLazyClass(prefix, result);
    }
    return createClass(prefix, result);
  }
  return [];
}

export const VARIANTS = [
  // Screen variants
  ...(
    theme.screens
      ? Object.keys(theme.screens).map((item) => `${item}:`)
      : []
  ),
  'dark:',
  'group',
  'hover:',
  'focus:',
  'active:',
  'group-hover:',
  'group-focus:',
  'focus-within:',
  'focus-visible:',
  'motion-safe:',
  'motion-reduce:',
  'disabled:',
  'visited:',
  'checked:',
  'first:',
  'last:',
  'even:',
  'odd:',
];

const INTERNAL = [
  // Accessibility
  'sr-only',
  'not-sr-only',
  // Align Content
  'content-center',
  'content-start',
  'content-end',
  'content-between',
  'content-around',
  'content-evenly',
  // Align Items
  'items-start',
  'items-end',
  'items-center',
  'items-baseline',
  'items-stretch',
  // Align Self
  'self-auto',
  'self-start',
  'self-end',
  'self-center',
  'self-stretch',
  // Appearance
  'appearance-none',
  // Background Attachment
  'bg-fixed',
  'bg-local',
  'bg-scroll',
  // Background Blend Mode
  'bg-blend-normal',
  'bg-blend-multiply',
  'bg-blend-screen',
  'bg-blend-overlay',
  'bg-blend-darken',
  'bg-blend-lighten',
  'bg-blend-color-dodge',
  'bg-blend-color-burn',
  'bg-blend-hard-light',
  'bg-blend-soft-light',
  'bg-blend-difference',
  'bg-blend-exclusion',
  'bg-blend-hue',
  'bg-blend-saturation',
  'bg-blend-color',
  'bg-blend-luminosity',
  // Background Clip
  'bg-clip-border',
  'bg-clip-padding',
  'bg-clip-content',
  'bg-clip-text',
  // Background Repeat
  'bg-repeat',
  'bg-no-repeat',
  'bg-repeat-x',
  'bg-repeat-y',
  'bg-repeat-round',
  'bg-repeat-space',
  // Border Collapse
  'border-collapse',
  'border-separate',
  // Border Style
  'border-solid',
  'border-dashed',
  'border-dotted',
  'border-double',
  'border-none',
  // Box Decoration Break
  'decoration-slice',
  'decoration-clone',
  // Box Sizing
  'box-border',
  'box-content',
  // Clear
  'clear-left',
  'clear-right',
  'clear-both',
  'clear-none',
  // Container
  'container',
  // Display
  'block',
  'inline-block',
  'inline',
  'flex',
  'inline-flex',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'flow-root',
  'grid',
  'inline-grid',
  'contents',
  'list-item',
  'hidden',
  // Divide Style
  'divide-solid',
  'divide-dashed',
  'divide-dotted',
  'divide-double',
  'divide-none',
  // Filter
  'filter',
  'filter-none',
  // Flex Direction
  'flex-row',
  'flex-col',
  'flex-row-reverse',
  'flex-col-reverse',
  // Floats
  'float-right',
  'float-left',
  'float-none',
  // Font Smoothing
  'antialiased',
  'subpixel-antialiased',
  // Font Style
  'italic',
  'not-italic',
  // Font Variant Numeric
  'normal-nums',
  'ordinal',
  'slashed-zero',
  'lining-nums',
  'oldstyle-nums',
  'proportional-nums',
  'tabular-nums',
  'diagonal-fractions',
  'stacked-fractions',
  // Grid Auto Flow
  'grid-flow-row',
  'grid-flow-col',
  'grid-flow-row-dense',
  'grid-flow-col-dense',
  // Isolation
  'isolate',
  'isolation-auto',
  // Justify Content
  'justify-start',
  'justify-end',
  'justify-center',
  'justify-between',
  'justify-around',
  'justify-evenly',
  // Justify Items
  'justify-items-start',
  'justify-items-end',
  'justify-items-center',
  'justify-items-stretch',
  // Justify Self
  'justify-self-auto',
  'justify-self-start',
  'justify-self-end',
  'justify-self-center',
  'justify-self-stretch',
  // List Style Position
  'list-inside',
  'list-outside',
  // Mix Blend Mode
  'mix-blend-normal',
  'mix-blend-multiply',
  'mix-blend-screen',
  'mix-blend-overlay',
  'mix-blend-darken',
  'mix-blend-lighten',
  'mix-blend-color-dodge',
  'mix-blend-color-burn',
  'mix-blend-hard-light',
  'mix-blend-soft-light',
  'mix-blend-difference',
  'mix-blend-exclusion',
  'mix-blend-hue',
  'mix-blend-saturation',
  'mix-blend-color',
  'mix-blend-luminosity',
  // Object Fit
  'object-contain',
  'object-cover',
  'object-fill',
  'object-none',
  'object-scale-down',
  // Overflow
  'overflow-auto',
  'overflow-hidden',
  'overflow-visible',
  'overflow-scroll',
  'overflow-x-auto',
  'overflow-x-hidden',
  'overflow-x-visible',
  'overflow-x-scroll',
  'overflow-y-auto',
  'overflow-y-hidden',
  'overflow-y-visible',
  'overflow-y-scroll',
  // Overscroll
  'overscroll-auto',
  'overscroll-contain',
  'overscroll-none',
  'overscroll-x-auto',
  'overscroll-x-contain',
  'overscroll-x-none',
  'overscroll-y-auto',
  'overscroll-y-contain',
  'overscroll-y-none',
  // Place Content
  'place-content-start',
  'place-content-end',
  'place-content-center',
  'place-content-stretch',
  'place-content-between',
  'place-content-around',
  'place-content-evenly',
  // Place Items
  'place-items-start',
  'place-items-end',
  'place-items-center',
  'place-items-stretch',
  // Place Self
  'place-self-auto',
  'place-self-start',
  'place-self-end',
  'place-self-center',
  'place-self-stretch',
  // Pointer Events
  'pointer-events-none',
  'pointer-events-auto',
  // Position
  'static',
  'fixed',
  'absolute',
  'relative',
  'sticky',
  // Resize
  'resize-none',
  'resize-x',
  'resize-y',
  'resize',
  // Space
  'space-x-reversed',
  'space-y-reversed',
  // Table Layout
  'table-layout',
  'table-fixed',
  // Text Align
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  // Text Decoration
  'underline',
  'line-through',
  'no-underline',
  // Text Overflow
  'truncate',
  'overflow-ellipsis',
  'overflow-clip',
  // Text Transform
  'uppercase',
  'lowercase',
  'capitalize',
  'normal-case',
  // Transform
  'transform',
  'transform-gpu',
  'transform-none',
  // User Select
  'select-none',
  'select-text',
  'select-all',
  'select-auto',
  // Vertical Align
  'align-baseline',
  'align-top',
  'align-middle',
  'align-bottom',
  'align-text-top',
  'align-text-bottom',
  // Visibility
  'visible',
  'invisible',
  // Whitespace
  'whitespace-normal',
  'whitespace-nowrap',
  'whitespace-pre',
  'whitespace-pre-line',
  'whitespace-pre-wrap',
  // Word Break
  'break-normal',
  'break-words',
  'break-all',
];

const CLASSES = [
  ...VARIANTS,
  ...INTERNAL,
  ...createClass('animate', theme.animation),
  ...createLazyClass('bg', theme.backgroundColor),
  ...createClass('bg', theme.backgroundImage),
  ...createLazyClass('bg-opacity', theme.backgroundOpacity),
  ...createClass('bg', theme.backgroundPosition),
  ...createClass('bg', theme.backgroundSize),
  ...createLazyClass('border', theme.borderColor),
  ...createClass('border-opacity', theme.borderOpacity),
  ...createClass('rounded', theme.borderRadius),
  ...createClass('rounded-t', theme.borderRadius),
  ...createClass('rounded-r', theme.borderRadius),
  ...createClass('rounded-l', theme.borderRadius),
  ...createClass('rounded-b', theme.borderRadius),
  ...createClass('rounded-tr', theme.borderRadius),
  ...createClass('rounded-tl', theme.borderRadius),
  ...createClass('rounded-br', theme.borderRadius),
  ...createClass('rounded-bl', theme.borderRadius),
  ...createClass('border', theme.borderWidth),
  ...createClass('border-t', theme.borderWidth),
  ...createClass('border-r', theme.borderWidth),
  ...createClass('border-b', theme.borderWidth),
  ...createClass('border-l', theme.borderWidth),
  ...createClass('shadow', theme.boxShadow),
  ...createClass('cursor', theme.cursor),
  ...createLazyClass('divide', theme.divideColor),
  ...createLazyClass('divide-opacity', theme.divideOpacity),
  ...createLazyClass('divide', theme.divideWidth),
  ...createClass('fill', theme.fill),
  ...createClass('flex', theme.flex),
  ...createClass('flex-grow', theme.flexGrow),
  ...createClass('flex-shrink', theme.flexShrink),
  ...createClass('font', theme.fontFamily),
  ...createClass('text', theme.fontSize),
  ...createClass('font', theme.fontWeight),
  ...createLazyClass('gap', theme.gap),
  ...createLazyClass('from', theme.gradientColorStops),
  ...createLazyClass('via', theme.gradientColorStops),
  ...createLazyClass('to', theme.gradientColorStops),
  ...createClass('auto-cols', theme.gridAutoColumns),
  ...createClass('auto-rows', theme.gridAutoRows),
  ...createClass('col', theme.gridColumn),
  ...createClass('col-start', theme.gridColumnStart),
  ...createClass('col-end', theme.gridColumnEnd),
  ...createClass('row', theme.gridRow),
  ...createClass('row-start', theme.gridRowStart),
  ...createClass('row-end', theme.gridRowEnd),
  ...createClass('grid-cols', theme.gridTemplateColumns),
  ...createClass('grid-rows', theme.gridTemplateRows),
  ...createLazyClass('h', theme.height),
  ...createLazyClass('inset', theme.inset),
  ...createLazyClass('top', theme.inset),
  ...createLazyClass('bottom', theme.inset),
  ...createLazyClass('left', theme.inset),
  ...createLazyClass('right', theme.inset),
  ...createLazyClass('inset-x', theme.inset),
  ...createLazyClass('inset-y', theme.inset),
  ...createClass('tracking', theme.letterSpacing),
  ...createClass('leading', theme.lineHeight),
  ...createClass('list', theme.listStyleType),
  ...createLazyClass('m', theme.margin),
  ...createLazyClass('mt', theme.margin),
  ...createLazyClass('ml', theme.margin),
  ...createLazyClass('mr', theme.margin),
  ...createLazyClass('mb', theme.margin),
  ...createLazyClass('mx', theme.margin),
  ...createLazyClass('my', theme.margin),
  ...createLazyClass('max-h', theme.maxHeight),
  ...createLazyClass('max-w', theme.maxWidth),
  ...createClass('min-h', theme.minHeight),
  ...createClass('min-w', theme.minWidth),
  ...createClass('object', theme.objectPosition),
  ...createClass('opacity', theme.opacity),
  ...createClass('order', theme.order),
  ...createClass('outline', theme.outline),
  ...createLazyClass('p', theme.padding),
  ...createLazyClass('pt', theme.padding),
  ...createLazyClass('pl', theme.padding),
  ...createLazyClass('pr', theme.padding),
  ...createLazyClass('pb', theme.padding),
  ...createLazyClass('px', theme.padding),
  ...createLazyClass('py', theme.padding),
  ...createLazyClass('placeholder', theme.placeholderColor),
  ...createLazyClass('placeholder-opacity', theme.placeholderOpacity),
  ...createLazyClass('ring', theme.ringColor),
  ...createClass('ring-offset', theme.ringOffsetColor),
  ...createClass('ring-offset', theme.ringOffsetWidth),
  ...createClass('ring-opacity', theme.ringOpacity),
  ...createClass('ring', theme.ringWidth),
  ...createClass('rotate', theme.rotate),
  ...createClass('scale', theme.scale),
  ...createClass('skew', theme.skew),
  ...createLazyClass('space-x', theme.space),
  ...createLazyClass('space-y', theme.space),
  ...createClass('stroke', theme.stroke),
  ...createClass('stroke', theme.strokeWidth),
  ...createLazyClass('text', theme.textColor),
  ...createLazyClass('text-opacity', theme.textOpacity),
  ...createClass('origin', theme.transformOrigin),
  ...createClass('delay', theme.transitionDelay),
  ...createClass('duration', theme.transitionDuration),
  ...createClass('transition', theme.transitionProperty),
  ...createClass('ease', theme.transitionTimingFunction),
  ...createLazyClass('translate', theme.translate),
  ...createLazyClass('w', theme.width),
  ...createClass('z', theme.zIndex),
];

export function validClass(string: string): boolean {
  // Check if string starts with a variant
  const variant = VARIANTS.find((item) => string.startsWith(item));

  if (variant) {
    return validClass(string.replace(variant, ''));
  }

  return CLASSES.includes(string);
}

export default CLASSES;
