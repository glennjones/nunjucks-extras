var Nunjucks = require('nunjucks');

// register
module.exports.register = function(env) {
  env.addExtension('switch', new Select(env));
};

function Select(env) {
    this.tags = ['switch'];


    this.parse = function(parser, nodes, lexer) {


        // get properties from case statments obj
        function getValueArray( obj ){
            if(obj && obj.children){
                return obj.children.map(function(item){
                    return item.value
                })
            }else{
                return [];
            }
        }


        // get raw text from case statments obj
        function getText( obj ){
            if(obj && obj.children){
                return obj.children[0].children[0].value
            }else{
                return '';
            }
        }


        var tok = parser.nextToken();
        var switchTest = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        parser.parseUntilBlocks('case', 'default', 'endswitch');

        var bodyArray = [];
        var dataArray = [];
        var tokenParse = true;

        tok = parser.nextToken();
        while (tokenParse) {
            if(tok.value == 'case') {
                var tests = getValueArray( parser.parseSignature(null, true) );
                parser.skip(lexer.TOKEN_BLOCK_END);
                bodyArray.push( parser.parseUntilBlocks('case', 'default', 'endswitch') );

                dataArray.push( {
                    'symbol': 'case',
                    'tests': tests
                });
            }
            if(tok.value == 'default') {
                parser.skip(lexer.TOKEN_BLOCK_END);
                bodyArray.push( parser.parseUntilBlocks('case', 'default', 'endswitch') );

                dataArray.push( {
                    'symbol': 'default',
                    'tests': []
                });
            }
            if(tok.value == 'endswitch') {
                parser.advanceAfterBlockEnd('endswitch');
                break;
            }
            tok = parser.nextToken();
        }


        // create fake node structure to pass data cross the 'CallExtension' interface
        var data = new nodes.NodeList(0, 0, [new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, ( JSON.stringify(dataArray) ))])]);
        bodyArray.push( data );

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'moveToken', switchTest, bodyArray  );


    }



    this.moveToken = function(context, switchTest ) {

        var out = '';
        var renderedText = [];
        // the argument from 2 - lenght-1 are the template body for each case/default
        for (var i = 2; i < arguments.length - 1; ++i) {
            // fire body function to get final text output
			renderedText.push( arguments[i]() );
		}

        // last argument is a JSON string with case data
        var cases = JSON.parse(  arguments[arguments.length-1]() );
        for (var i = 0; i < cases.length ; ++i) {
            if(cases[i].symbol === 'case'){
                if(cases[i].tests.indexOf(switchTest) > -1){
                    out = renderedText[i];
                    break;
                }
            }else{
                // if we have a defualt and there is no value use its rendered text
                if(out === ''){
                    out = renderedText[i];
                }
            }
		}

        return new Nunjucks.runtime.SafeString( out );
    }


}


