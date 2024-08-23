export const createToPercentage = (minValue: number, maxValue: number) => {
    return (value: number) => {
        const percent = (value - minValue) / (maxValue - minValue);
        return percent * 100;
    };
};

export const createToValue = (minValue: number, maxValue: number) => {
    return (percent: number) => {
        const normalizedPercent = percent / 100;
        return minValue + normalizedPercent * (maxValue - minValue);
    };
};

export const createConversionFunctions = (minValue: number, maxValue: number) => {
    const toPercentage = createToPercentage(minValue, maxValue);
    const toValue = createToValue(minValue, maxValue);
    return [toPercentage, toValue];
};
