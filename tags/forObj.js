
var Nunjucks = require('nunjucks');

// register
module.exports.register = function (env) {
    env.addExtension('forObj', new ForObj(env));
};


function ForObj(env) {
    this.tags = ['forObj'];

    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var ctxName = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endforObj');

        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'forObjTag', ctxName, [body]);

    };

    this.forObjTag = function (environment) {


        var ctxName = 'context';
        var ctx = arguments[2].in
        var out = [];

        if (arguments[2].in && arguments[3]) {
            ctxName = arguments[1];

            for(item in ctx){
                if(!ctx[item].key){
                    ctx[item].key = item;
                }
                environment.ctx[ctxName] = ctx[item];
                out.push( arguments[3]() )
                delete environment.ctx[ctxName];
            }
        }

        return new Nunjucks.runtime.SafeString( out.join('') );
    }
}