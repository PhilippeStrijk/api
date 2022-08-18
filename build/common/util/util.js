"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeBetweenDates = void 0;
const getTimeBetweenDates = (dateOne, dateTwo) => {
    return (dateTwo.getTime() - dateOne.getTime()) / 1000;
};
exports.getTimeBetweenDates = getTimeBetweenDates;
