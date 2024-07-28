import { renderToString } from 'react-dom/server';
import stringToTemplate from '@utils/stringToTemplate';
import isComponent from '@utils/isComponent';
import noop from '@utils/noop';
import Logger from '@utils/Logger';

/**
 * Usage)
 *
 *  My.jsx
 *  ------
 *  import appContent from '@App/App.yaml';
 *  import myContent from './My.yaml';
 *
 *  export default function My(props) {
 *    const b = useContentBundle(appContent, myContent);
 *
 *    return (
 *      <b.Greeting name={"World"} />
 *    );
 *  }
 *
 *  App.yaml
 *  --------
 *  en:
 *    Greeting: Hello, ${name}!
 *  es:
 *    Greeting: ¡Hola, ${name}!
 *
 *  My.yaml
 *  -------
 *  en:
 *    Greeting: Hi, ${name}!
 *
 * In above example, My.yaml will generally supersede App.yaml while giving
 * localized content precedence.
 *
 * A user in 'en' locale (default) will see Hi, World!
 * A user in 'es' locale will see ¡Hola, World!
 * A user in 'de' locale will see Hi, World!
 *
 * This is because there is en specific content in My.yaml overriding App.yaml,
 * but for es locale, My.yaml does not have any es specific content to override
 * the one provided by App.yaml.
 */
export default function useContentBundle(...bundles) {
  const logger = new Logger('useContentBundle');
  const [lang] = navigator.language.split('-');

  const defaultBundle = bundles.reduce((result, bundle) => {
    const en = bundle.en;
    return { ...result, ...en };
  }, {});

  const localBundle = bundles.reduce((result, bundle) => {
    const locale = bundle[lang];
    return { ...result, ...locale };
  }, {});

  const bundle = { ...defaultBundle, ...localBundle };

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
