'use strict';
const Moment = require('moment');


module.exports.register = function (env) {


    env.addFilter('date', function(date, format) {
        if(!format){
            format = 'Do MMMM YYYY, h:mm:ss a'
        }
        return Moment(date).format(format)
    });


    env.addFilter('cut', function(str, replaceStr) {
        if(str && replaceStr){
            var re = new RegExp(replaceStr, 'g');
            return str.replace(re, '');
        }
        return '';
    });


    env.addFilter('scale', function(url, sizeStr) {
        if(url && sizeStr){
            if(url.indexOf('/') > -1){
                if(url.indexOf('/') === url.length){
                    return parts.join('/') + sizeStr;
                }else{
                    var parts = url.split('/');
                    parts.splice(parts.length-1, 0, sizeStr);
                }

            }
            return parts.join('/')
        }
        return '';
    });


    env.addFilter('singlespace', function(str) {
        if(str){
            return str.replace(/\s\s+/g, ' ');
        }
        return '';
    });


    // TODO - turn into a true translate
    env.addFilter('translate', function(str) {
        return str.replace(/\[t\]|\[\/t\]/g, '');
    });

 




};

