// @refresh reload
import { HttpHeader } from '@solidjs/start';
import { createHandler, StartServer } from '@solidjs/start/server';

import ThemeScript from '~/components/ThemeScript';
import { generateNonce, getNonce } from '~/util/nonce';

export default createHandler(
    (event) => {
        const nonce = getNonce(event);
        return (
            <StartServer
                document={({ assets, children, scripts }) => (
                    <>
                        <html
                            lang='en'
                            class='bg-white scheme-light dark:bg-black dark:scheme-dark'
                        >
                            <HttpHeader
                                name='Context-Security-Policy'
                                value={[
                                    "default-src 'none'",
                                    `script-src 'nonce-${nonce}'`,
                                    "base-uri 'none'",
                                    "form-action 'none'",
                                    "frame-ancestors: 'none'",
                                ].join(';')}
                            />
                            <head>
                                <ThemeScript nonce={nonce} />
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
        );
    },
    () => ({
        nonce: generateNonce(),
    }),
);
