import nonce from '~/util/nonce';

const ThemeScript = () => {
    const script = `
    (() => {
        const theme = localStorage.getItem('theme');
        if (theme != null) {
            document.documentElement.setAttribute('data-theme', theme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    })();
    `;
    return <script id='theme-script' innerHTML={script} nonce={nonce}></script>;
};

export default ThemeScript;
