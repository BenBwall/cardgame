import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { flatConfigs } from 'eslint-plugin-import-x';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import preferArrow from 'eslint-plugin-prefer-arrow';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeys from 'eslint-plugin-sort-keys-plus';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

/**  @type {unknown} */
const u = preferArrow;
/**  @type {unknown} */
const y = sortKeys;

/**  @type {import('eslint').Linter.Config} */
const arrowFunctionPlugin = u;

/**  @type {import('eslint').Linter.Config} */
const sortKeysPlugin = y;

/** @type {import('eslint').Linter.Config[]} */

export default [
    js.configs.recommended,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    flatConfigs.recommended,
    flatConfigs.typescript,
    eslintPluginPrettier,
    {
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
        plugins: {
            'no-relative-import-paths': noRelativeImportPaths,
            'prefer-arrow': fixupPluginRules(arrowFunctionPlugin),
            'simple-import-sort': simpleImportSort,
            'sort-keys-plus': fixupPluginRules(sortKeysPlugin),
        },

        settings: {
            'import/resolver': {
                node: true,
                typescript: true,
            },
        },

        rules: {
            'array-callback-return': [
                'error',
                {
                    allowImplicit: false,
                    allowVoid: false,
                    checkForEach: true,
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
            // Declared as typescript-eslint rule
            'no-unused-vars': 'off',

            'no-useless-assignment': 'error',

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
            'default-case': 'off',
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
            'no-extend-native': 'off',
            'no-extra-bind': 'error',
            'no-extra-label': 'error',
            'no-implied-eval': 'error',
            'no-invalid-this': 'error',
            'no-iterator': 'error',
            'no-lonely-if': 'error',
            'no-magic-numbers': [
                'error',
                {
                    detectObjects: true,
                    enforceConst: true,
                    ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            ],
            'no-multi-assign': 'error',
            'no-new-func': 'error',
            'no-object-constructor': 'error',
            'no-octal-escape': 'error',
            'no-proto': 'error',
            'no-restricted-imports': 'off',
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
            'sort-imports': 'off',
            'sort-keys': 'off',
            'symbol-description': 'error',
            'yoda': ['error', 'never', { onlyEquality: true }],

            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    reportUsedIgnorePattern: true,
                    vars: 'all',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/switch-exhaustiveness-check': 'error',

            'prefer-arrow/prefer-arrow-functions': [
                'error',
                {
                    allowStandaloneDeclarations: false,
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    singleReturnOnly: false,
                },
            ],

            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',

            'sort-keys-plus/sort-keys': [
                'error',
                'asc',
                {
                    allowLineSeparatedGroups: true,
                    caseSensitive: true,
                    natural: true,
                    shorthand: 'first',
                },
            ],

            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                {
                    prefix: '~',
                    rootDir: 'src',
                },
            ],
        },
    },
];
