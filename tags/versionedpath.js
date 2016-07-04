var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env) {
  env.addExtension('versionedpath', new Trim(env));
};

function Trim(env) {
  this.tags = ['versionedpath'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    var body = parser.parseUntilBlocks('endversionedpath');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'blockTag', args, [body]);
  };

  this.blockTag = function(environment, body) {

    var body = body();
    body = body.replace('~', '') + ';v=000000000000000000'  //TODO needs relacing
    return new Nunjucks.runtime.SafeString(body);
  }
}