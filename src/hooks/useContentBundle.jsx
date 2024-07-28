import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export default function useContentBundle(...bundles) {
  const lang = navigator.language;

  const bundle = bundles.reduce((result, bundle) => {
    const en = bundle.en ?? {};
    const locale = bundle[navigator.language] ?? {};

    return {
      ...en,
      ...result,
      ...locale,
    };
  }, {});

  const properties = Object.entries(bundle).reduce((result, [key, string]) => {
    result[key] = {
      get: () => (values) => render(string, values),
      configurable: false,
      enumerable: true,
    };

    return result;
  }, {});

  function contentBundle(key, values) {
    return contentBundle[key](values);
  }

  function render(string, props) {
    const values =
      props &&
      Object.entries(props).reduce((results, [key, value]) => {
        if (isComponent(value)) {
          results[key] = renderToString(value);
        } else {
          results[key] = value;
        }
        return results;
      }, {});

    return stringToTemplate(string, values);
  }

  function stringToTemplate(string, values = {}) {
    try {
      const func = new Function(
        ...Object.keys(values),
        `return \`${string}\`;`,
      );
      return func(...Object.values(values));
    } catch (e) {
      return string;
    }
  }

  function isComponent(object) {
    return (
      typeof object === 'function' ||
      (typeof object === 'object' && object !== null && 'type' in object)
    );
  }

  return Object.defineProperties(contentBundle, properties);
}
