"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimestampToDate = exports.convertDateToSeconds = exports.convertDateToTimestamp = exports.addDays = exports.addHours = exports.addMinutes = exports.addSeconds = exports.getTimestampInSeconds = exports.getCurrentTimestamp = void 0;
const getCurrentTimestamp = () => {
    return Date.now();
};
exports.getCurrentTimestamp = getCurrentTimestamp;
const getTimestampInSeconds = () => {
    return Math.floor(Date.now() / 1000);
};
exports.getTimestampInSeconds = getTimestampInSeconds;
const addSeconds = (seconds, date = new Date()) => {
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};
exports.addSeconds = addSeconds;
const addMinutes = (minutes, date = new Date()) => {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};
exports.addMinutes = addMinutes;
const addHours = (hours, date = new Date()) => {
    date.setHours(date.getHours() + hours);
    return date;
};
exports.addHours = addHours;
const addDays = (days, date = new Date()) => {
    date.setDate(date.getDate() + days);
    return date;
};
exports.addDays = addDays;
const convertDateToTimestamp = (date) => {
    return date.getTime();
};
exports.convertDateToTimestamp = convertDateToTimestamp;
const convertDateToSeconds = (date) => {
    return Math.floor(date.getTime() / 1000);
};
exports.convertDateToSeconds = convertDateToSeconds;
const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp);
};
exports.convertTimestampToDate = convertTimestampToDate;
//# sourceMappingURL=date-time.js.map