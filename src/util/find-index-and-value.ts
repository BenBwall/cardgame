const findIndexAndValue = <T>(
    arr: T[],
    predicate: (value: T, index: number, array: T[]) => boolean,
) => {
    const index = arr.findIndex(predicate);
    if (index === -1) {
        return undefined;
    }
    return [arr[index], index] as const;
};

export default findIndexAndValue;
