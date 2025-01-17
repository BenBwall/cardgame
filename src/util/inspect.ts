type Printable = {
    toString(): string;
};

const inspect = <T extends Printable>(value: T, name?: string) => {
    // eslint-disable-next-line no-console
    console.log(
        '%s',
        `${name ?? 'value'} = ${structuredClone(value).toString()}`,
    );
    return value;
};

export default inspect;

export const inspectError = <T extends Printable>(value: T, name?: string) => {
    // eslint-disable-next-line no-console
    console.error(
        '%s',
        `${name ?? 'value'} = ${structuredClone(value).toString()}`,
    );
    return value;
};
