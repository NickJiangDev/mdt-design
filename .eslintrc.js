module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'array-callback-return': 'warn',
    'no-redeclare': 'error',
    camelcase: 'error', // 'no-shadow': ['warn', { builtinGlobals: true, hoist: 'functions', allow: [] }],
  },
  globals: {
    self: true,
  },
  overrides: [
    {
      files: ['**/*.test.tsx'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      extends: ['plugin:testing-library/react'],
      plugins: ['jest'],
    },
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'storybook/await-interactions': 'warn',
        'storybook/context-in-play-function': 'warn',
        'storybook/csf-component': 'warn',
        'storybook/default-exports': 'warn',
        'storybook/hierarchy-separator': 'warn',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/no-stories-of': 'warn',
        'storybook/no-title-property-in-meta': 'off',
        'storybook/prefer-pascal-case': 'warn',
        'storybook/story-exports': 'warn',
        'storybook/use-storybook-expect': 'warn',
        'storybook/use-storybook-testing-library': 'warn',
      },
    },
  ],
};
