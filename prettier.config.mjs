// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
export default {
    trailingComma: 'es5',
    bracketSpacing: true,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    arrowParens: 'always',
    overrides: [
        {
            files: 'Routes.*',
            options: {
                printWidth: 999,
            },
        },
    ],
};
