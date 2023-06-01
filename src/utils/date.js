import moment from "moment";

export const formatDate = (d, format, options = { add: { type: "", value: 0 }, lang: '' }) => {
    if(!d) return null;
  
    //language for month name
    if (options.lang) moment.locale(options.lang); 
  
    let result = null;
    let formatInput = "";
  
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{1,4}$/.test(d)){
      formatInput = "DD-MM-YYYY HH:mm:ss.ms";
    }else if(/^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(d)){
      formatInput = "DD-MM-YYYY HH:mm:ss";
    }else if(/^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}$/.test(d)){
      formatInput = "DD-MM-YYYY HH:mm";
    }else if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(d)){
      formatInput = "DD-MM-YYYY";
    }else if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(d)){
      formatInput = "dd-mm-yyyy";
    }
  
    else if(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{1,4}$/.test(d)){
      formatInput = "DD/MM/YYYY HH:mm:ss.ms";
    }else if(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(d)){
      formatInput = "DD/MM/YYYY HH:mm:ss";
    }else if(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}$/.test(d)){
      formatInput = "DD/MM/YYYY HH:mm";
    }else if(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(d)){
      formatInput = "DD/MM/YYYY";
    }
  
    else if(/^[0-9]{4}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/.test(d)){
      formatInput = "YYYYMMDDHHmmss";
    }else if(/^[0-9]{4}[0-9]{2}[0-9]{2}$/.test(d)){
      formatInput = "YYYYMMDD";
    }
  
    if(formatInput){
      result = moment(d, formatInput);
      if(!result._isValid){
        return null;
      }
    }else if(moment(d)._isValid){
      result = moment(d);
    }else{
      return null;
    }
  
    //add to date
    if(result && options.add.value){
      let opt = ['days', 'hours'];
      let fixed = opt.includes(options.add.type) ? options.add.type : 'days';
      result.add(options.add.value, fixed);
    }
  
    if(format === "time"){
      result = result.valueOf();
    }else{
      if(format){
        result = result.format(format);
      }else{
        result = new Date(result.format('YYYY-MM-DD HH:mm:ss'));
      }
    }
  
    return result;
  }