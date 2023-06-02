const STRAPI = 'strapi'
const HEROKU = 'heroku'

const ENV = process.env.ENV || STRAPI

const hostname = {
    strapi : "http://localhost:1337/api",
    heroku : "https://jobify-prod.herokuapp.com/api/v1/toolkit",
}

export const API_HIT           = hostname[ENV]  

export const CONDITIONAL       = ENV==='strapi'?true:false;