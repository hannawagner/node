'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {
    
    if(intentData.intent[0].value !== 'duration') 
        return cb(new Error('Expected Duration intent but got ' + intentData.intent[0].value));

    const location = intentData.location[0].value.replace(/,.?wagner\-bot/i, '');

    const service = registry.get('duration');
    if(!service) return cb(false, 'No service available');

    request.get(`http://${service.ip}:${service.port}/service/${location}`)
    .then((res) => {
        if(!res.body.result) return cb('Error with duration service');
        return cb(null, `${location} is ${res.body.result} away from you!`);
    });

}