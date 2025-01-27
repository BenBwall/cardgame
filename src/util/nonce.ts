import { PageEvent } from '@solidjs/start/server';
import { RequestEvent } from 'solid-js/web';

export const generateNonce = () => crypto.randomUUID();

export const getNonce = (event: PageEvent | RequestEvent | { nonce: string }) =>
    (event as unknown as { nonce: string }).nonce;
