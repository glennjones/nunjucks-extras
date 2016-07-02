'use strict';
const Filters = require('./filters/index.js');
const TagMarkdown = require('./tags/markdown.js');
const TagIncludeWith = require('./tags/includeWith.js');
const TagTrim = require('./tags/trim.js');
const TagSwitch = require('./tags/switch.js');
const TagTranslate = require('./tags/translate.js');
const Marked = require('marked');




module.exports.append = function ( Nunjucks, env ){
    append( Nunjucks, env );
}


function append( Nunjucks, env ){

    // add filters
    Filters.register(env);

    // add tags
    TagMarkdown.register(env, Marked);
    TagTrim.register(env);
    TagSwitch.register(env);
    TagTranslate.register(env);

    Nunjucks.nodes.Include = Nunjucks.nodes.Node.extend('Include', { fields: ['template', 'ignoreMissing', 'with'] });
    TagIncludeWith.register(env);


}