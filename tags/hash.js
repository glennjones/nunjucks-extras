var MD5 = require('md5');
var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env) {
  env.addExtension('hash', new Hash(env));
};

function Hash(env) {
  this.tags = ['hash'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    var body = parser.parseUntilBlocks('endhash');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'hashTag', args, [body]);
  };

  this.hashTag = function(environment, body) {

    return new Nunjucks.runtime.SafeString( MD5(body()) );
  }
}