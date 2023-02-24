import { cssVariables, tokens, TOKEN_NOT_FOUND } from './variables';

export function makeCssRoot() {
  let rootCss = {};

  Object.keys(tokens).forEach(function(key) {
    rootCss[tokens[key]] = `${cssVariables[key]}`;
  });

  return rootCss;
};

export function getToken(path, fallback) {
  let token = tokens[path];

  if (! token) {
    token = TOKEN_NOT_FOUND;
  }

  return fallback ? `var(${path}, ${fallback})` : `var(${token})`;
};

export const setCssVariables = (selector, vars) => Object.entries(vars).forEach(v => selector.style.setProperty(v[0], v[1]));

export const mergeClass = (classes) => {
  if (! typeof classes === 'Array') {
    return '';
  }

  var newClasses = classes.filter(val => {
    return `${val}` !== '' && val !== null;
  });

  return newClasses.join(' ');
}
