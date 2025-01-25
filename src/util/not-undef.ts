export const assertNotUndef = <T>(value: T | undefined, msg?: string) => {
    if (value === undefined) {
        throw new Error(msg ?? 'Value is undefined');
    }
    return value;
};

export const assertNotNull = <T>(value: T | null, msg?: string) => {
    if (value === null) {
        throw new Error(msg ?? 'Value is null');
    }
    return value;
};

export const assertNotNullish = <T>(
    value: T | null | undefined,
    msg?: string,
) => assertNotNull(assertNotUndef(value, msg), msg);
