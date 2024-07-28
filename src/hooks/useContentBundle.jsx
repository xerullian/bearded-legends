import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import stringToTemplate from '@utils/stringToTemplate';
import isComponent from '@utils/isComponent';

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
      get: () => (values) => renderContent(string, values),
      configurable: false,
      enumerable: true,
    };

    return result;
  }, {});

  function contentBundle(key, values) {
    return contentBundle[key](values);
  }

  function renderContent(string, props) {
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

  return Object.defineProperties(contentBundle, properties);
}
