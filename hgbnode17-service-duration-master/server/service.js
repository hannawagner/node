'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

module.exports = (config) => {
    const log = config.log();


    service.get('/service/:location', (req, res, next) => {

        request.get(`https://maps.googleapis.com/maps/api/distancematrix/json`)
            .query({ units: `metric` })
            .query({ origins: `Hagenberg,AT` })
            .query({ destinations: req.params.location})
            .query({ key: config.googleDistanceApiKey })
            .end((err, distanceResult) => {

                if (err) {
                    return next(err);
                }

                var distance = distanceResult.body['rows'][0]['elements'];
                var dur = distance[0]['duration']['text'];

                var answer = `${dur}`;

                return res.json({result: answer});

            });
    });
    return service;
};

