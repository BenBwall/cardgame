import '~/app.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

const App = () => (
    <Router
        root={(props) => (
            <>
                <Suspense>{props.children}</Suspense>
            </>
        )}
    >
        <FileRoutes />
    </Router>
);

export default App;
