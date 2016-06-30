'use strict';
var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env) {
  env.addExtension('trim', new Trim(env));
};

function Trim(env) {
  this.tags = ['trim'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    var body = parser.parseUntilBlocks('endtrim');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'blockTag', args, [body]);
  };

  this.blockTag = function(environment, body) {

    var body = body();
    body = body.replace(/^\s+|\s+$/g, '');
    return new Nunjucks.runtime.SafeString(body);
  }
}