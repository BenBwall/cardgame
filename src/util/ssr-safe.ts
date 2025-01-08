import { assertNotUndef } from '~/util/not-undef';
import { createResource } from 'solid-js';

type NotUndef<T> = T extends undefined ? never : T;
type NotPromise<T> = T extends Promise<unknown> ? never : NotUndef<T>;

/// Returns the same value on the server and client.
const createSSRSafe = <T>(func: () => NotPromise<T>): NotPromise<T> => {
    const [value] = createResource(func);
    return assertNotUndef(value());
};

export default createSSRSafe;
