var Nunjucks = require('nunjucks');

// register
module.exports.register = function (env) {
    env.addExtension('with', new With(env));
};


function With(env) {
    this.tags = ['with'];

    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endwith');

        parser.advanceAfterBlockEnd();

        if (args.children.length > 0) {
            return new nodes.CallExtension(this, 'withTag', args, [body]);
        }
    };

    this.withTag = function (environment) {

        var body = '';
        var ctxName = 'context';
        var ctx = {};

        if (arguments[2].as && arguments[3]) {
            ctxName = arguments[2].as;
            environment.ctx[ctxName] = arguments[1];
            body = arguments[3]();
            delete environment.ctx[ctxName];
        }

        return new Nunjucks.runtime.SafeString(body);
    }
}