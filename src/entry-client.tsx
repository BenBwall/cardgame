// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';
import { assertNotNull } from './util/not-undef';

mount(() => <StartClient />, assertNotNull(document.getElementById('app')));
