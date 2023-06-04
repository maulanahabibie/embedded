import { formatDate } from "../utils";

export const roleCms = (role) => {
    var result={show: false, crud: false};
    if(['ADMIN'].includes(role)){
        result.show = true;
        result.crud = true;
    }else if(['ALL USER'].includes(role)){
        result.show = true;
        result.crud = false;
    }else if(['USER'].includes(role)){
        result.show = false;
        result.crud = false;
    }
    return result;
}

export const generateIds = (type="") => {
    var result;
    const random1 = Math.floor(Math.random() * 10)
    const random2 = Math.floor(Math.random() * 100)
    const time = `${formatDate(new Date(), 'time')}${random1}`
    if(['USER'].includes(type)) result=`USER${time}${random2}`
    else if(['EMBEDDED'].includes(type)) result=`EMBE${time}${random2}`
    else if(['DEPARTEMENT'].includes(type)) result=`DEPA${time}${random2}`
    else result=`DONT${time}${random2}`
    return result;
}