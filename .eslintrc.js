module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    env: {
        "es6": true,
        "node": true,
        "browser": true
    },
    plugins: ['@typescript-eslint'],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        'no-console': 'off'
    }
};