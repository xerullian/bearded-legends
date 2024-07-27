module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
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
