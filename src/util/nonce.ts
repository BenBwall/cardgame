import { PageEvent } from '@solidjs/start/server';
import * as crypto from 'crypto';
import { RequestEvent } from 'solid-js/web';

const NONCE_SIZE = 16;

export const generateNonce = () =>
    crypto.randomBytes(NONCE_SIZE).toString('hex');

export const getNonce = (event: PageEvent | RequestEvent | { nonce: string }) =>
    (event as unknown as { nonce: string }).nonce;
