export const assertNotUndef = <T>(value: T | undefined): T => {
    if (value === undefined) {
        throw new Error('Value is undefined');
    }
    return value;
};

export const assertNotNull = <T>(value: T | null): T => {
    if (value === null) {
        throw new Error('Value is null');
    }
    return value;
};

export const assertNotNullish = <T>(value: T | null | undefined): T =>
    assertNotNull(assertNotUndef(value));
