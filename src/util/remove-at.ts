declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Array<T> {
        /**
         * Removes the element at the specified index from the array, and returns it. Returns `undefined` if the index is out of bounds.
         */
        removeAt(index: number): T | undefined;
    }
}

Object.defineProperty(Array.prototype, 'removeAt', {
    value<T>(this: T[], index: number): T | undefined {
        return this.splice(index, 1)[0];
    },
});

export default undefined;
