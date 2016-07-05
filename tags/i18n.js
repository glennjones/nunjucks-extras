
var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env, options) {
  env.addExtension('i18n', new I18n(env, options));
};

function I18n(env, options) {
  this.tags = ['i18n'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    var body = parser.parseUntilBlocks('endi18n');

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'i18nTag', args, [body]);
  };

  this.i18nTag = function(environment, body) {

    return new Nunjucks.runtime.SafeString( body() );
  }
}

