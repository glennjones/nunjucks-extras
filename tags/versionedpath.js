var Nunjucks = require('nunjucks');

var settings = {};

// register
module.exports.register = function (env, options) {
    env.addExtension('versionedpath', new VersionedPath(env, options));
};

function VersionedPath(env, options) {
    this.tags = ['versionedpath'];
    this.settings = options;

    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endversionedpath');

        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'blockVersionPath', args, [body]);
    };

    this.blockVersionPath = function (environment) {

      var foundPath;
      var sourceName;

      if (arguments.length === 3) {
        sourceName = arguments[1];
        foundPath = arguments[2]();
      }else{
        foundPath = arguments[1]();
      }

      function getUrl( options ){
          var url = options.protocol + '://' + options.host;
          url += (options.port)? ':' + options.port : '';
          return url;
      }

        var baseUrl = '';
        if(sourceName){
            this.settings.proxyPathing.forEach( function(item){
                if(item.name === sourceName){
                    baseUrl = getUrl(item);
                }
            })
        }

        foundPath = foundPath.replace('~', '');

        // append baseUrl if needed
        if(foundPath.indexOf('http') !== 0 && baseUrl !== ''){
          foundPath = baseUrl + foundPath;
        }

        // TODO lookinto way of keeping version element
        if(foundPath.indexOf(';v=') > -1){
          foundPath = foundPath.split(';v=')[0];
        }


        return new Nunjucks.runtime.SafeString( foundPath );
    }
}