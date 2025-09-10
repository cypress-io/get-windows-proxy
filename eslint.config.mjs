import globals from 'globals'
import pluginsJs from '@eslint/js'
import mochaPlugin from 'eslint-plugin-mocha'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginJsonc from 'eslint-plugin-jsonc'

export default [
  pluginsJs.configs.recommended,
  mochaPlugin.configs.recommended,
  stylistic.configs.recommended,
  ...eslintPluginJsonc.configs['flat/recommended-with-json'],
  {
    rules: {
      'no-unused-vars': 'off',
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'mocha/no-mocha-arrows': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
