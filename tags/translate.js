
var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env) {
  env.addExtension('translate', new Translate(env));
};

function Translate(env) {
  this.tags = ['translate'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    var body = parser.parseUntilBlocks('endtranslate');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'blockTag', args, [body]);
  };

  this.blockTag = function(environment, body) {

    var body = body();
    body = body.replace(/\[t\]|\[\/t\]/g, '');
    return new Nunjucks.runtime.SafeString(body);
  }
}
