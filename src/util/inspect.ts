const inspect = <T>(value: T) => {
    // eslint-disable-next-line no-console
    console.log(structuredClone(value));
    return value;
};

export default inspect;

export const inspectError = <T>(value: T) => {
    // eslint-disable-next-line no-console
    console.error(structuredClone(value));
    return value;
};
