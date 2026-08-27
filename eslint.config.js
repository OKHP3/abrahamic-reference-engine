import eslint from '@eslint/js'
import babelParser from '@babel/eslint-parser'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/origin/**'],
  },
  eslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
    },
    rules: {
      // TypeScript performs these checks more accurately than ESLint's
      // JavaScript rules when types and JSX imports are involved.
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]