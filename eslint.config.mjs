import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import-x';
import js from '@eslint/js';
import preferArrow from 'eslint-plugin-prefer-arrow';
import { configs as tsConfigs } from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

/**  @type {unknown} */
const u = preferArrow;

/**  @type {import('eslint').Linter.Config} */
const arrowFunctionPlugin = u;

/** @type {import('eslint').Linter.Config[]} */
/* eslint-disable sort-keys */
export default [
    js.configs.recommended,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    eslintPluginPrettier,
    {
        plugins: {
            'prefer-arrow': fixupPluginRules(arrowFunctionPlugin),
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            ecmaVersion: 'latest',
            parser: tsParser,
            sourceType: 'module',

            parserOptions: {
                project: '~/tsconfig.json',
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },

        rules: {
            'array-callback-return': [
                'error',
                {
                    allowImplicit: false,
                    checkForEach: true,
                    allowVoid: false,
                },
            ],
            'no-await-in-loop': 'error',
            'no-constructor-return': 'error',
            'no-duplicate-imports': 'error',
            'no-promise-executor-return': [
                'error',
                {
                    allowVoid: false,
                },
            ],
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'error',
            'no-useless-assignment': 'error',
            // Declared as typescript-eslint rule
            'no-unused-vars': 'off',

            'arrow-body-style': ['error', 'as-needed'],
            'camelcase': 'error',
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                    ignoreInlineComments: true,
                },
            ],
            'consistent-return': 'error',
            'consistent-this': ['error', 'that'],
            'curly': ['error', 'all'],
            'default-case': 'error',
            'default-case-last': 'error',
            'default-param-last': 'error',
            'dot-notation': 'error',
            'eqeqeq': ['error', 'always', { null: 'ignore' }],
            'guard-for-in': 'error',
            'logical-assignment-operators': ['error', 'always'],
            'no-alert': 'warn',
            'no-array-constructor': 'error',
            'no-console': 'warn',
            'no-div-regex': 'error',
            'no-else-return': 'error',
            'no-empty-function': 'error',
            'no-eval': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-extra-label': 'error',
            'no-implied-eval': 'error',
            'no-invalid-this': 'error',
            'no-iterator': 'error',
            'no-lonely-if': 'error',
            'no-magic-numbers': [
                'error',
                {
                    ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    enforceConst: true,
                    detectObjects: true,
                },
            ],
            'no-multi-assign': 'error',
            'no-new-func': 'error',
            'no-object-constructor': 'error',
            'no-octal-escape': 'error',
            'no-proto': 'error',
            'no-restricted-syntax': [
                'warn',
                {
                    message:
                        "Don't use inspect or inspectErr in production please.",
                    selector:
                        'CallExpression[callee.name=/^(inspect|inspectErr)$/]',
                },
            ],
            'no-return-assign': 'error',
            'no-script-url': 'error',
            'no-throw-literal': 'error',
            'no-unused-expressions': 'error',
            'no-useless-call': 'error',
            'no-useless-catch': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-concat': 'error',
            'no-useless-constructor': 'error',
            'no-useless-rename': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'object-shorthand': [
                'error',
                'always',
                {
                    avoidQuotes: true,
                },
            ],
            'operator-assignment': ['error', 'always'],
            'prefer-const': 'error',
            'prefer-exponentiation-operator': 'error',
            'prefer-numeric-literals': 'error',
            'prefer-object-has-own': 'error',
            'prefer-object-spread': 'error',
            'prefer-promise-reject-errors': 'error',
            'prefer-regex-literals': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'radix': 'error',
            'require-await': 'error',
            'require-unicode-regexp': [
                'error',
                {
                    requireFlag: 'v',
                },
            ],
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    allowSeparatedGroups: true,
                },
            ],
            'sort-keys': [
                'error',
                'asc',
                {
                    caseSensitive: true,
                    natural: true,
                    allowLineSeparatedGroups: true,
                },
            ],
            'symbol-description': 'error',
            'yoda': ['error', 'never', { onlyEquality: true }],

            'prefer-arrow/prefer-arrow-functions': [
                'error',
                {
                    disallowPrototype: false,
                    singleReturnOnly: false,
                    classPropertiesAllowed: false,
                    allowStandaloneDeclarations: false,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    reportUsedIgnorePattern: true,
                },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        },
    },
];
