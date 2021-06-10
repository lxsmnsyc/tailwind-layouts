/* eslint-disable no-param-reassign */
import csstree, { CssNode, List } from 'css-tree';

const INDENT = '\t';

function wrap(list: List<CssNode> | CssNode[] | null): CssNode[] {
  if (list) {
    return Array.isArray(list) ? list : list.toArray();
  }
  return [];
}

function stringify(node: CssNode, level = 0): string {
  switch (node.type) {
    case 'AnPlusB': {
      const a = node.a ? `${node.a}n` : '';
      if (node.b) {
        const b = node.b.startsWith('-')
          ? `- ${node.b.replace('-', '')}`
          : `+ ${node.b}`;
        return `${a}${b}`;
      }
      return a;
    }
    case 'Atrule': {
      const block = node.block
        ? ` ${stringify(node.block, level)}`
        : ';';
      const prelude = node.prelude
        ? ` ${stringify(node.prelude, level)}`
        : '';
      return `@${node.name}${prelude}${block}`;
    }
    case 'AtrulePrelude':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join('');
    case 'AttributeSelector': {
      const name = stringify(node.name, level);
      const matcher = node.matcher ?? '';
      const value = node.value
        ? stringify(node.value, level)
        : '';
      const flags = node.flags
        ? ` ${node.flags}`
        : '';
      return `[${name}${matcher}${value}${flags}]`;
    }
    case 'Block': {
      const children = wrap(node.children)
        .map((child) => stringify(child, level + 1))
        .join('\n')
        .split('\n')
        .map((child) => `${INDENT}${child}`)
        .join('\n');
      return `{\n${children}\n}`;
    }
    case 'Brackets': {
      const children = wrap(node.children)
        .map((child) => stringify(child, level))
        .join(' ');
      return `[${children}]`;
    }
    case 'CDC':
    case 'CDO':
      return '';
    case 'ClassSelector':
      return `.${node.name}`;
    case 'Combinator':
      return ` ${node.name} `;
    case 'Comment':
      return `/* ${node.value} */`;
    case 'Declaration': {
      const important = node.important ? ' !important' : '';
      const value = stringify(node.value, level);
      return `${node.property}: ${value}${important};`;
    }
    case 'DeclarationList':
      // TODO
      return '';
    case 'Dimension':
      return `${node.value}${node.unit}`;
    case 'Function': {
      const children = wrap(node.children)
        .map((child) => stringify(child, level))
        .join('')
        .split(',')
        .join(', ');
      return `${node.name}(${children})`;
    }
    case 'Hash':
      return `#${node.value}`;
    case 'IdSelector':
      return `#${node.name}`;
    case 'Identifier':
      return node.name;
    case 'MediaFeature': {
      const value = node.value
        ? `: ${stringify(node.value, level)}`
        : '';
      return `(${node.name}${value})`;
    }
    case 'MediaQuery':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join(' ');
    case 'MediaQueryList':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join(', ');
    case 'Nth': {
      const nth = stringify(node.nth, level);
      const selector = node.selector
        ? ` of ${stringify(node.selector, level)}`
        : '';
      return `${nth}${selector}`;
    }
    case 'Number':
      return node.value;
    case 'Operator':
      return node.value;
    case 'Parentheses': {
      const children = wrap(node.children)
        .map((child) => stringify(child, level))
        .join('');
      return `(${children})`;
    }
    case 'Percentage':
      return `${node.value}%`;
    case 'PseudoClassSelector': {
      const children = node.children
        ? `(${wrap(node.children)
          .map((child) => stringify(child, level))
          .join(' ')})`
        : '';
      return `:${node.name}${children}`;
    }
    case 'PseudoElementSelector': {
      const children = node.children
        ? `(${wrap(node.children)
          .map((child) => stringify(child, level))
          .join(' ')})`
        : '';
      return `::${node.name}${children}`;
    }
    case 'Ratio':
      return `${node.left} / ${node.right}`;
    case 'Raw':
      return node.value;
    case 'Rule': {
      const prelude = stringify(node.prelude, level);
      const block = stringify(node.block, level + 1);
      return `${prelude} ${block}`;
    }
    case 'Selector':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join('');
    case 'SelectorList':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join(',\n');
    case 'String':
      return node.value;
    case 'StyleSheet': {
      const children = wrap(node.children)
        .map((child) => stringify(child, level))
        .join('\n');
      return children;
    }
    case 'TypeSelector':
      return node.name;
    case 'UnicodeRange':
      return node.value;
    case 'Url':
      return `url(${stringify(node.value, level)})`;
    case 'Value':
      return wrap(node.children)
        .map((child) => stringify(child, level))
        .join('');
    case 'WhiteSpace':
      return node.value;
    default:
      return '';
  }
}

export default function cssbeautify(
  text: string,
): string {
  const ast = csstree.parse(text);

  return stringify(ast);
}
