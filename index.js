'use strict';
const Filters = require('./filters/index.js');
const TagMarkdown = require('./tags/markdown.js');
const TagIncludeWith = require('./tags/includeWith.js');
const TagTrim = require('./tags/trim.js');
const TagSwitch = require('./tags/switch.js');
const TagVersionedPath = require('./tags/versionedpath.js');
const TagWith = require('./tags/with.js');
const Tagi18n = require('./tags/i18n.js');
//const TagTranslate = require('./tags/translate.js');
const Marked = require('marked');




module.exports.append = function ( Nunjucks, env, data){
    append( Nunjucks, env, data );
}


function append( Nunjucks, env, data ){

    // add filters
    Filters.register(env);

   //get data for tags
    let proxyPathing  = [];
    if(data && data.siteConfig && data.siteConfig.proxyPathing){
        proxyPathing = data.siteConfig.proxyPathing;
    }


    // add tags
    TagMarkdown.register(env, Marked);
    TagTrim.register(env);
    TagSwitch.register(env);
    TagVersionedPath.register(env, {proxyPathing: proxyPathing} );
    TagWith.register(env);
    Tagi18n.register(env, {});
    //TagTranslate.register(env);

    Nunjucks.nodes.Include = Nunjucks.nodes.Node.extend('Include', { fields: ['template', 'ignoreMissing', 'with'] });
    TagIncludeWith.register(env);


}