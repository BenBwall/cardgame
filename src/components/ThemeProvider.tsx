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

export const THEMES = {
    Dark: 'dark',
    Light: 'light',
    System: 'system',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const CONCRETE_THEMES = (() => {
    const { System: _, ...CONCRETE_THEMES } = THEMES;
    return CONCRETE_THEMES;
})();

export type ConcreteTheme =
    (typeof CONCRETE_THEMES)[keyof typeof CONCRETE_THEMES];

const getSystemColorMode = () => {
    const systemIsDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;
    return systemIsDark ? CONCRETE_THEMES.Dark : CONCRETE_THEMES.Light;
};

const toConcreteTheme = (theme: Theme): ConcreteTheme => {
    if (theme !== THEMES.System) {
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

export class ThemeMethods {
    #state: Accessor<Theme>;
    #setState: Setter<Theme>;

    constructor(signal: Signal<Theme>) {
        [this.#state, this.#setState] = signal;
    }

    get theme(): Theme {
        return this.#state();
    }

    set theme(value: Parameters<Setter<Theme>>[0]) {
        this.#setState(value);
    }

    get concreteTheme() {
        return toConcreteTheme(this.#state());
    }

    toggle() {
        this.#setState((theme) =>
            theme === THEMES.Light ? THEMES.Dark : THEMES.Light,
        );
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
            methods.concreteTheme,
        );
    });
    return (
        <ThemeContext.Provider value={methods}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
