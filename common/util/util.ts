export const getTimeBetweenDates = (dateOne: Date, dateTwo: Date) => {
    return (dateTwo.getTime() - dateOne.getTime()) / 1000;
};