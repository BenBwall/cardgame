export const assertNotUndef = <T>(value: T | undefined, msg?: string): T => {
    if (value === undefined) {
        throw new Error(msg ?? 'Value is undefined');
    }
    return value;
};

export const assertNotNull = <T>(value: T | null, msg?: string): T => {
    if (value === null) {
        throw new Error(msg ?? 'Value is null');
    }
    return value;
};

export const assertNotNullish = <T>(
    value: T | null | undefined,
    msg?: string,
): T => assertNotNull(assertNotUndef(value, msg), msg);
