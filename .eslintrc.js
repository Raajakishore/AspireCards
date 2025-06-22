module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',        // 👈 use the TS parser
  parserOptions: {
    project: './tsconfig.json',               // 👈 required for type‐aware linting
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'airbnb-typescript',                      // 👈 Airbnb + TS rules
    'airbnb/hooks',                           // optional: stricter Hooks rules
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',  // recommended TS rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
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
      typescript: {},  // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {
    // allow TS file extensions
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    // disable prop-types as we use TS
    'react/prop-types': 'off',
    // you can tweak these:
    'react-native/no-inline-styles': 1,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // Example TS rule override:
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
