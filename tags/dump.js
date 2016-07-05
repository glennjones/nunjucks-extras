
var Nunjucks = require('nunjucks');

// register
module.exports.register = function (env) {
    env.addExtension('dump', new Dump(env));
};


function Dump(env) {
    this.tags = ['dump'];

    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('enddump');

        parser.advanceAfterBlockEnd();
        return new nodes.CallExtension(this, 'dumpTag', args, [body]);

    };

    this.dumpTag = function (environment) {

        var str = JSON.stringify(environment.ctx);
        return new Nunjucks.runtime.SafeString(str);
    }
}