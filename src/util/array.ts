export type FixedSizeArray<T, N extends number> = T[] & { length: N };
export const shuffle = <T, N extends number = 0>(
    array: FixedSizeArray<T, N>,
): FixedSizeArray<T, N> => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
