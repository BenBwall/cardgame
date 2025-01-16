import { createResource } from 'solid-js';

import { assertNotUndef } from '~/util/not-undef';

type Wrapper<T> = { value: T };

/// Returns the same value on the server and client.
const createSSRSafe = <T>(func: () => T): T => {
    const [value] = createResource((): Wrapper<T> => ({ value: func() }));
    return assertNotUndef(value()).value;
};

export default createSSRSafe;
