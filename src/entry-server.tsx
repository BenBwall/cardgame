// @refresh reload
import { HttpHeader } from '@solidjs/start';
import { createHandler, StartServer } from '@solidjs/start/server';

import nonce from '~/util/nonce';

const themeScript = `
    {
        const theme = localStorage.getItem('theme');
        if (theme !== null && theme !== 'system') {
            document.documentElement.setAttribute('data-theme', theme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }
`;

export default createHandler(
    () => (
        <StartServer
            document={({ assets, children, scripts }) => (
                <>
                    <HttpHeader
                        name='Context-Security-Policy'
                        value={`default-src 'none'; script-src 'nonce-${nonce}'; object-str 'none'; base-uri 'none'`}
                    />
                    <html lang='en' class='scheme-light dark:scheme-dark'>
                        <head>
                            <script nonce={nonce} id='theme-script'>
                                {themeScript}
                            </script>
                            <meta charset='utf-8' />
                            <meta
                                name='viewport'
                                content='width=device-width, initial-scale=1'
                            />
                            <link rel='icon' href='/favicon.ico' />
                            {assets}
                        </head>
                        <body>
                            <div id='app'>{children}</div>
                            {scripts}
                        </body>
                    </html>
                </>
            )}
        />
    ),
    {
        nonce,
    },
);
