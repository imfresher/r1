export const CSS_PREFIX = 'r1';
export const TOKEN_NOT_FOUND = `--${CSS_PREFIX}-token-not-found`;
export const BASE_UNIT = 'rem';
export const BASE_SIZE = 0.9;
export const H1_SIZE = BASE_SIZE * 2;
export const H2_SIZE = BASE_SIZE * 1.8;
export const H3_SIZE = BASE_SIZE * 1.55;
export const H4_SIZE = BASE_SIZE * 1.3;
export const H5_SIZE = BASE_SIZE * 1.15;
export const WHITE = '#fff';
export const BLACK = '#000';
export const BLUE = '#5eb0f1';
export const GREEN = '#8bc34a';
export const CYAN = '#5eb0f1';
export const YELLOW = '#ffb240';
export const RED = '#f76a5f';

export const cssVariables = {
  'body.font.family':         'Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif',
  'bodyfont.weight':         300,
  'body.line.height':         1,
  'body.font.size':           `${BASE_SIZE}${BASE_UNIT}`,
  'h1.font.size':             `${H1_SIZE}${BASE_UNIT}`,
  'h2.font.size':             `${H2_SIZE}${BASE_UNIT}`,
  'h3.font.size':             `${H3_SIZE}${BASE_UNIT}`,
  'h4.font.size':             `${H4_SIZE}${BASE_UNIT}`,
  'h5.font.size':             `${H5_SIZE}${BASE_UNIT}`,
  'h6.font.size':             `${BASE_SIZE}${BASE_UNIT}`,

  'body.color':               '#1e293b',
  'body.background.color':    '#fafbfc',
  'color.primary':            '#5eb0f1',
  'color.secondary':          '#e5e5e5',
  'color.tertiary':           '#93d7f8',
  'color.success':            `${GREEN}`,
  'color.info':               `${CYAN}`,
  'color.warning':            `${YELLOW}`,
  'color.danger':             `${RED}`,
  'color.light':              '#ecf2f8',
  'color.white':              `${WHITE}`,
  'color.black':              `${BLACK}`,

  'color.gray.100':           '#f5f6f7',
  'color.gray.200':           '#fafbfc',
  'color.gray.300':           '#b6b6b6',
  'color.gray.400':           '#d9dbde',
  'color.gray.500':           '#c3c3c3',
  'color.gray.600':           '#c5ced4',
};

export function makeTokens(variables) {
  let result = {};

  Object.keys(variables).forEach(function(key) {
    result[key] = `--${CSS_PREFIX}-${key.replace(/\./g, '-')}`;
  });

  return result;
};

export const tokens = makeTokens(cssVariables);
