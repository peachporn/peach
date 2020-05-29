/**
 * @type {import('eslint').Linter.Config}
 */
const eslintOptions = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    // Next lines are configuring prettier to remove eslint vs prettier collisions
    // and enable fixing prettier with eslint command
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['prefer-arrow', '@typescript-eslint'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',

    // Typecsript rules
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],

    // Remove rules requiring type information to improve eslint execution speed
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,

    // Configure plugins
    'prettier/prettier': 'warn',
    'import/order': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};

module.exports = eslintOptions;
