import './app.scss';
import { FileRoutes } from '@solidjs/start/router';
import Nav from '~/components/Nav';
import { Router } from '@solidjs/router';
import { Suspense } from 'solid-js';

const App = () => (
    <Router
        root={(props) => (
            <>
                <Nav />
                <Suspense>{props.children}</Suspense>
            </>
        )}
    >
        <FileRoutes />
    </Router>
);

export default App;
