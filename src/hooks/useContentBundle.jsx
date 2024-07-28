import { renderToString } from 'react-dom/server';
import stringToTemplate from '@utils/stringToTemplate';
import isComponent from '@utils/isComponent';
import noop from '@utils/noop';
import Logger from '@utils/Logger';

export default function useContentBundle(...bundles) {
  const logger = new Logger('useContentBundle');
  const lang = navigator.language;

  const bundle = bundles.reduce((result, bundle) => {
    const en = bundle.en ?? {};
    const locale = bundle[lang] ?? {};

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

  const contentBundle = Object.defineProperties({}, properties);

  return new Proxy(contentBundle, {
    get: function (target, prop) {
      if (prop in target) {
        return target[prop];
      }

      logger.trace(`${prop} not found. Computed bundle`, bundle);

      return noop;
    },
  });
}
