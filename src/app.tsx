import '~/app.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

import GameStateProvider from '~/components/GameStateProvider';

const App = () => (
    <GameStateProvider>
        <Router
            root={(props) => (
                <>
                    <Suspense>{props.children}</Suspense>
                </>
            )}
        >
            <FileRoutes />
        </Router>
    </GameStateProvider>
);

export default App;
