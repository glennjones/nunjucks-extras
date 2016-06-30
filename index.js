'use strict';
const Filters = require('./filters/index.js');
const TagMarkdown = require('./tags/markdown.js');
const TagIncludeWith = require('./tags/includeWith.js');
const TagTrim = require('./tags/trim.js');
const Marked = require('marked');

/*
module.exports.getHAPIEngineOptions = function (Nunjucks, path, engineOptions) {

    let env = Nunjucks.configure(path, engineOptions);
    append( Nunjucks, env );

    return {
        compile: function (src, options) {
            const template = Nunjucks.compile(src, options.environment);
            return function (context) {
                return template.render(context);
            };
        },

        prepare: function (options, next) {
            options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false, noCache: false });
            return next();
        }
    }
};
*/



module.exports.append = function ( Nunjucks, env ){
    append( Nunjucks, env );
}


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