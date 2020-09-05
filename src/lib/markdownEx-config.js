let config = {
    comments: {
        blockComment: ['<!--', '-->',]
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '<', close: '>', notIn: ['string'] },
        { open: '`', close: '`', notIn: ['string'] },
        //{ open: '```', close: '\n\n```', notIn: ['string'] },
        { open: '（', close: '）' },
        { open: '【', close: '】' },
        { open: '《', close: '》' },
        { open: '“', close: '”' },
        { open: '‘', close: '’' },
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
    ],
    surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '`', close: '`' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
            end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
        }
    }
}

export default config;