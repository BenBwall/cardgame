import {
    Accessor,
    createContext,
    createEffect,
    createSignal,
    JSX,
    Setter,
    Signal,
    useContext,
} from 'solid-js';
import { isServer } from 'solid-js/web';

import { assertNotNull, assertNotUndef } from '~/util/not-undef';

const THEMES = {
    Dark: 'dark',
    Light: 'light',
    System: 'system',
} as const;

type Theme = (typeof THEMES)[keyof typeof THEMES];

type ConcreteTheme = Exclude<Theme, 'system'>;

const getSystemColorMode = () => {
    const systemIsDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;
    return systemIsDark ? 'dark' : 'light';
};

const toConcreteTheme = (theme: Theme): ConcreteTheme => {
    if (theme !== 'system') {
        return theme;
    }
    return getSystemColorMode();
};

const initServerTheme = () => THEMES.System;

const initClientTheme = () =>
    assertNotNull(
        document.documentElement.getAttribute('data-theme'),
        'Theme initializing script did not run, and thus data-theme has not been set.',
    ) as Theme;

export const initTheme = () =>
    isServer ? initServerTheme() : initClientTheme();

class ThemeMethods {
    #state: Accessor<Theme>;
    #setState: Setter<Theme>;

    constructor(signal: Signal<Theme>) {
        [this.#state, this.#setState] = signal;
    }

    get theme() {
        return this.#state();
    }

    set theme(value) {
        this.#setState(value);
    }

    update(updater: (oldValue: Theme) => Theme) {
        this.#setState(updater);
    }

    toggle() {
        this.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    }
}

const ThemeContext = createContext<ThemeMethods>(undefined, {
    name: 'Theme Context',
});

export const useTheme = () =>
    assertNotUndef(
        useContext(ThemeContext),
        'useTheme must be used within a ThemeProvider',
    );

export type ThemeProviderProps = {
    children: JSX.Element;
};

const ThemeProvider = (props: ThemeProviderProps) => {
    const signal = createSignal<Theme>(initTheme(), {
        name: 'Theme State',
    });
    const methods = new ThemeMethods(signal);
    createEffect(() => {
        localStorage.setItem('theme', methods.theme);
        document.documentElement.setAttribute(
            'data-theme',
            toConcreteTheme(methods.theme),
        );
    });
    return (
        <ThemeContext.Provider value={methods}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
