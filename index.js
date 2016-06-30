'use strict';
const Filters = require('./filters/index.js');
const TagMarkdown = require('./tags/markdown.js');
const TagIncludeWith = require('./tags/includeWith.js');
const TagTrim = require('./tags/trim.js');
const Marked = require('marked');


module.exports.getHAPIEngineOptions = function (Nunjucks, path, options) {

    let env = Nunjucks.configure(options.path, { watch: false, noCache: false });
    append( Nunjucks, env );

};


function append( Nunjucks, env ){

    // add all filters
    Filters.register(env);

    // add markdown tag
    TagMarkdown.register(env, Marked);

    // add includeWith tag
    Nunjucks.nodes.Include = Nunjucks.nodes.Node.extend('Include', { fields: ['template', 'ignoreMissing', 'with'] });
    TagIncludeWith.register(env);

    // add trim tag
    TagTrim.register(env);
}