module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'prettier'
  ],
  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    'react-native/no-inline-styles': 1,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
