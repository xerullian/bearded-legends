module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  rules: {
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        css: 'never',
        js: 'never',
        jsx: 'never',
        yaml: 'never',
        yml: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        jsxBracketSameLine: false,
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    'react/prop-types': 'off',
  },
  Settings: {
    react: {
      version: 'detect',
    },
  },
};
