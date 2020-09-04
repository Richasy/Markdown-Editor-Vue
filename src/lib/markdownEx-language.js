let language = {
    defaultToken: '',
    tokenPostfix: '.md',

    // escape codes
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
    escapes: /\\(?:@control)/,

    // escape codes for javascript/CSS strings
    jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,

    // non matched elements
    empty: [
        'area', 'base', 'basefont', 'br', 'col', 'frame',
        'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'
    ],

    tokenizer: {
        root: [

            // markdown tables
            [/^\s*\|/, '@rematch', '@table_header'],

            // headers (with #)
            [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', 'markdown.header', 'markdown.header', 'markdown.header']],

            // headers (with =)
            [/^\s*(=+|\-+)\s*$/, 'markdown.header'],

            // headers (with ***)
            [/^\s*((\*[ ]?)+)\s*$/, 'meta.separator'],

            // quote
            [/^(\s*>+)(.*)/, ['markdown.quote.sign','markdown.quote.detail']],

            // list (starting with * or number)
            [/^\s*([\*\-+:]|\d+\.)\s/, 'markdown.list'],

            // code block (4 spaces indent)
            [/^(\t|[ ]{4})[^ ].*$/, 'markdown.codeblock'],

            // code block (3 tilde)
            [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, { token: 'markdown.codeblock', next: '@codeblock' }],

            // github style code blocks (with backticks and language)
            [/^\s*```\s*((?:\w|[\/\-#])+).*$/, { token: 'markdown.codeblock', next: '@codeblockgh', nextEmbedded: '$1' }],

            // github style code blocks (with backticks but no language)
            [/^\s*```\s*$/, { token: 'markdown.codeblock', next: '@codeblock' }],

            // markdown-it style custom container (with colon and type)
            [/^\s*\:\:\:\s*((?:\w|[\/\-#])+).*$/, { token: 'markdown.customcontainer', next: '@customcontainer' }],

            // markup within lines
            { include: '@linecontent' },
        ],

        table_header: [
            { include: '@table_common' },
            [/[^\|]+/, 'markdown.table.header'], // table header
        ],

        table_body: [
            { include: '@table_common' },
            { include: '@linecontent' },
        ],

        table_common: [
            [/\s*[\-:]+\s*/, { token: 'keyword', switchTo: 'table_body' }], // header-divider
            [/^\s*\|/, 'keyword.table.left'], // opening |
            [/^\s*[^\|]/, '@rematch', '@pop'], // exiting
            [/^\s*$/, '@rematch', '@pop'], // exiting
            [/\|/, {
                cases: {
                    '@eos': 'keyword.table.right', // closing |
                    '@default': 'keyword.table.middle', // inner |
                }
            }],
        ],

        codeblock: [
            [/^\s*~~~\s*$/, { token: 'markdown.codeblock', next: '@pop' }],
            [/^\s*```\s*$/, { token: 'markdown.codeblock', next: '@pop' }],
            [/.*$/, 'variable.source'],
        ],

        customcontainer: [
            [/^\s*\:\:\:\s*$/, { token: 'markdown.customcontainer', next: '@pop' }],
            [/.*$/, '@rematch', '@pop'],
        ],

        // github style code blocks
        codeblockgh: [
            [/```\s*$/, { token: 'markdown.codeblock', next: '@pop', nextEmbedded: '@pop' }],
            [/[^`]+/, 'variable.source'],
        ],

        linecontent: [

            // escapes
            [/&\w+;/, 'string.escape'],
            [/@escapes/, 'escape'],

            // various markup
            [/\*\*\*([^\\*]|@escapes|\*(?!\*))+\*\*\*/, 'markdown.important'],
            [/\b___([^\\_]|@escapes|_(?!_))+___\b/, 'markdown.important'],
            [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'markdown.strong'],
            [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'markdown.strong'],
            [/\b_[^_]+_\b/, 'markdown.emphasis'],
            [/\*([^\\*]|@escapes)+\*/, 'markdown.emphasis'],
            [/`([^\\`]|@escapes)+`/, 'markdown.code'],
            [/\~\~([^\\~]|@escapes|\~(?!\~))+\~\~/, 'markdown.strikethrough'],
            [/\+\+([^\\+]|@escapes|\+(?!\+))+\+\+/, 'markdown.insert'],
            [/\=\=([^\\=]|@escapes|\=(?!\=))+\=\=/, 'markdown.mark'],
            [/\~([^\\~]|@escapes)+\~/, 'markdown.subscript'],
            [/\^([^\\^]|@escapes)+\^/, 'markdown.superscript'],

            // links
            [/\{+[^}]+\}+/, 'markdown.target'],
            [/(!?\[)((?:[^\]\\]|@escapes)*\])(\([^\)]+\))/, ['markdown.target', 'markdown.target', 'markdown.link']],
            [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'markdown.target'],
            [/(\*?\[)((?:[^\]\\]|@escapes)*\]:)(.*)/, ['markdown.abbr', 'markdown.abbr', 'markdown.target']],

            // or html
            { include: 'html' },
        ],

        // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
        // but currently there is a limitation in Monarch that prevents us from doing it: The opening
        // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
        // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
        // we cannot correctly tokenize it in that mode yet.
        html: [
            // html tags
            [/<(\w+)\/>/, 'tag'],
            [/<(\w+)/, {
                cases: {
                    '@empty': { token: 'tag', next: '@tag.$1' },
                    '@default': { token: 'tag', next: '@tag.$1' }
                }
            }],
            [/<\/(\w+)\s*>/, { token: 'tag' }],

            [/<!--/, 'comment', '@comment']
        ],

        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, 'comment', '@pop'],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ],

        // Almost full HTML tag matching, complete with embedded scripts & styles
        tag: [
            [/[ \t\r\n]+/, 'white'],
            [/(type)(\s*=\s*)(")([^"]+)(")/, ['attribute.name.html', 'delimiter.html', 'string.html',
                { token: 'string.html', switchTo: '@tag.$S2.$4' },
                'string.html']],
            [/(type)(\s*=\s*)(')([^']+)(')/, ['attribute.name.html', 'delimiter.html', 'string.html',
                { token: 'string.html', switchTo: '@tag.$S2.$4' },
                'string.html']],
            [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name.html', 'delimiter.html', 'string.html']],
            [/\w+/, 'attribute.name.html'],
            [/\/>/, 'tag', '@pop'],
            [/>/, {
                cases: {
                    '$S2==style': { token: 'tag', switchTo: 'embeddedStyle', nextEmbedded: 'text/css' },
                    '$S2==script': {
                        cases: {
                            '$S3': { token: 'tag', switchTo: 'embeddedScript', nextEmbedded: '$S3' },
                            '@default': { token: 'tag', switchTo: 'embeddedScript', nextEmbedded: 'text/javascript' }
                        }
                    },
                    '@default': { token: 'tag', next: '@pop' }
                }
            }],
        ],

        embeddedStyle: [
            [/[^<]+/, ''],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, '']
        ],

        embeddedScript: [
            [/[^<]+/, ''],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, '']
        ],
    }
};

export default language;