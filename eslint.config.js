import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  vue: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  ignores: ['public/**'],
}, {
  rules: {
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
  },
});
