module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier' // 整合Prettier，解决ESLint与Prettier的冲突
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // 生产环境禁止console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn' // 生产环境禁止debugger
  }
}