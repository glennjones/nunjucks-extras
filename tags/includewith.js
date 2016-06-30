'use strict';
var Nunjucks = require('nunjucks');

// register
module.exports.register = function (env) {
    env.addExtension('includeWith', new IncludeWith(env));
};


function IncludeWith(env) {
    this.tags = ['includeWith'];

    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);


        if (args.children.length > 0) {
            return new nodes.CallExtension(this, 'fileTag', args);
        }
    };

    this.fileTag = function (environment, file, args) {
        var cxt = {}
        if (args.with) {
            cxt = args.with;
        }
        return new Nunjucks.runtime.SafeString(env.render(file, cxt));
    }
}