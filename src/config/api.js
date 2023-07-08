const STRAPI = 'strapi';

const ENV = process.env.ENV || STRAPI;

const hostname = {
    strapi : "http://localhost:1337/api",
}

export const API_HIT           = hostname[ENV]  

// export const CONDITIONAL       = ENV==='strapi'?true:false;