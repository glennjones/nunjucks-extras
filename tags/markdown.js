'use strict';
var Nunjucks = require('nunjucks');


// register
module.exports.register = function (env, renderMarkdown) {
    env.addExtension('markdown', new Markdown(env, renderMarkdown));
};



function Markdown(env, renderMarkdown) {
    this.tags = ['markdown'];

    this.parse = function (parser, nodes, lexer) {

        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        if (args.children.length > 0)
            return new nodes.CallExtension(this, 'fileTag', args);

        var body = parser.parseUntilBlocks('endmarkdown');
        var tabStart = new nodes.NodeList(0, 0, [new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, (tok.colno - 1))])]);

        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'blockTag', args, [body, tabStart]);
    };


    this.fileTag = function (environment, file) {
        return new Nunjucks.runtime.SafeString(renderMarkdown(env.render(file, environment.ctx)));
    }


    this.blockTag = function (environment, body, tabStart) {

        var body = body();
        var spacesRegex = /^[\s]+/;
        var tabStart = tabStart();

        if (tabStart > 0) {
            body = body.split(/\r?\n/);
            body = body.map(function (line) {
                var startSpaces = line.match(spacesRegex);
                if (startSpaces && startSpaces[0].length >= tabStart) {
                    return line.slice(tabStart);
                } else if (startSpaces) {
                    return line.slice(startSpaces[0].length);
                } else {
                    return line;
                }
            });
            body = body.join("\n");
        }

        return new Nunjucks.runtime.SafeString(renderMarkdown(body));
    }
}
