declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Array<T> {
        findIndexAndValue(
            this: T[],
            predicate: (value: T, index: number, array: T[]) => boolean,
        ): [T, number] | undefined;
    }
}

Object.defineProperty(Array.prototype, 'findIndexAndValue', {
    value<T>(
        this: T[],
        predicate: (value: T, index: number, array: T[]) => boolean,
    ): [T, number] | undefined {
        const index = this.findIndex(predicate);
        if (index === -1) {
            return undefined;
        }
        return [this[index], index];
    },
});

export default undefined;
