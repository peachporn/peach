/**
 * @type {import('eslint').Linter.Config}
 */
const eslintOptions = {
  extends: ['../../.eslintrc.js'],
  rules: {
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
  },
};

module.exports = eslintOptions;
