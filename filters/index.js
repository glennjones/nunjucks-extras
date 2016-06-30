'use strict';
const Moment = require('moment');


module.exports.register = function (env) {

    env.addFilter('date', function(date, format) {
        if(!format){
            format = 'Do MMMM YYYY, h:mm:ss a'
        }
        return Moment(date).format(format)
    });

};

