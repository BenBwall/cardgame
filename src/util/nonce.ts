import * as crypto from 'crypto';

import { PageEvent } from '@solidjs/start/server';
import { RequestEvent } from 'solid-js/web';

export const generateNonce = () => crypto.randomBytes(16).toString('hex');

export const getNonce = (event: PageEvent | RequestEvent | { nonce: string }) =>
    (event as unknown as { nonce: string }).nonce;
