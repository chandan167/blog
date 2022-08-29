
export const getCurrentTimestamp = () =>{
    return Date.now();
}


export const getTimestampInSeconds = () =>{
    return Math.floor(Date.now() / 1000)
}

export const addSeconds = (seconds:number, date:Date = new Date()) =>{
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}

export const addMinutes = (minutes:number, date:Date = new Date()) =>{
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

export const addHours = (hours:number, date:Date = new Date()) =>{
    date.setHours(date.getHours() + hours);
    return date;
}

export const addDays = (days:number, date:Date = new Date()) =>{
    date.setDate(date.getDate() + days);
    return date;
}

export const convertDateToTimestamp = (date:Date) =>{
    return date.getTime();
}

export const convertDateToSeconds = (date:Date) =>{
    return Math.floor(date.getTime() / 1000)
}

export const convertTimestampToDate = (timestamp:number) =>{
    return new Date(timestamp)
}