import '~/app.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

import { GameStateProvider } from '~/components/GameStateProvider';
import ThemeProvider from '~/components/ThemeProvider';

const App = () => (
    <Router
        root={(props) => (
            <>
                <GameStateProvider>
                    <ThemeProvider>
                        <Suspense>{props.children}</Suspense>
                    </ThemeProvider>
                </GameStateProvider>
            </>
        )}
    >
        <FileRoutes />
    </Router>
);

export default App;
