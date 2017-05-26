'use strict';
require('dotenv').config();
const bunyan = require('bunyan');

const log = {

    development: () => {
        return bunyan.createLogger({
            name: 'service-duration-dev',
            level: 'debug'
        });
    },
    production: () => {
        return bunyan.createLogger({
            name: 'service-duration-prod',
            level: 'info'
        });
    },
    test: () => {
        return bunyan.createLogger({
            name: 'service-duration-test',
            level: 'fatal'
        });
    }
};

module.exports = {
    googleDistanceApiKey: process.env.GOOGLE_DISTANCE_API_KEY,
    googleGeoApiKey: process.env.GOOGLE_GEO_API_KEY,

    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']()
    }
}

