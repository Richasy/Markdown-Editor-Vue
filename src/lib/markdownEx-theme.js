let theme = {
    base: "vs-dark",
    inherit: true,
    rules: [
        //---------------special colors------------------
        {
            foreground: "569fff",
            token: "markdown.header",
            fontStyle: "bold",
        },
        {
            foreground: "00d2d3",
            token: "markdown.quote",
            fontStyle: "italic",
        },
        {
            foreground: "ff9f43",
            token: "markdown.list",
        },
        {
            foreground: "88d74a",
            token: "markdown.codeblock",
        },
        {
            foreground: "ffc0cb",
            token: "markdown.customcontainer",
        },
        {
            foreground: "f8728e",
            token: "markdown.table.header",
        },

        //---------------Line string colors----------------
        {
            foreground: "66cc33",
            token: "string",
        },
        {
            foreground: "d54e53",
            token: "string.other.link",
        },
        {
            foreground: "d54e53",
            token: "string.regexp",
        },
        {
            foreground: "ffce54",
            fontStyle: "bold",
            token: "markdown.strong",
        },
        {
            foreground: "a0d468",
            fontStyle: "italic",
            token: "markdown.emphasis",
        },
        {
            foreground: "ac92ec",
            token: "markdown.code",
        },
        {
            foreground: "ac92ec",
            token: "markdown.important",
            fontStyle: "bold italic",
        },
        {
            foreground: "48cfad",
            token: "markdown.target",
            fontStyle: "bold",
        },
        {
            foreground: "5E5E5E",
            token: "markdown.strikethrough",
        },
        {
            foreground: "ff9a9e",
            token: "markdown.subscript",
        },
        {
            foreground: "a8c0ff",
            token: "markdown.superscript",
        },
        {
            foreground: "bfaca4",
            token: "markdown.abbr",
            fontStyle: "italic",
        },
        {
            foreground: "4fc1e9",
            token: "markdown.link",
        },
        {
            foreground: "f7b733",
            token: "markdown.insert",
        },
        {
            foreground: "29ffc6",
            token: "markdown.mark",
        },
        //---------------Other colors------------------
        {
            foreground: "969896",
            token: "comment",
        },
        {
            foreground: "eeeeee",
            token: "keyword.operator.class",
        },
        {
            foreground: "eeeeee",
            token: "constant.other",
        },
        {
            foreground: "eeeeee",
            token: "source.php.embedded.line",
        },
        {
            foreground: "d54e53",
            token: "variable",
        },
        {
            foreground: "d54e53",
            token: "support.other.variable",
        },

        {
            foreground: "d54e53",
            token: "entity.name.tag",
        },
        {
            foreground: "d54e53",
            token: "entity.other.attribute-name",
        },
        {
            foreground: "d54e53",
            token: "meta.tag",
        },
        {
            foreground: "d54e53",
            token: "declaration.tag",
        },
        {
            foreground: "e78c45",
            token: "constant.numeric",
        },
        {
            foreground: "e78c45",
            token: "constant.language",
        },
        {
            foreground: "e78c45",
            token: "support.constant",
        },
        {
            foreground: "e78c45",
            token: "constant.character",
        },
        {
            foreground: "e78c45",
            token: "variable.parameter",
        },
        {
            foreground: "e78c45",
            token: "punctuation.section.embedded",
        },
        {
            foreground: "e78c45",
            token: "keyword.other.unit",
        },
        {
            foreground: "e7c547",
            token: "entity.name.class",
        },
        {
            foreground: "e7c547",
            token: "entity.name.type.class",
        },
        {
            foreground: "e7c547",
            token: "support.type",
        },
        {
            foreground: "e7c547",
            token: "support.class",
        },

        {
            foreground: "b9ca4a",
            token: "constant.other.symbol",
        },
        {
            foreground: "b9ca4a",
            token: "entity.other.inherited-class",
        },
        {
            foreground: "b9ca4a",
            token: "markup.heading",
        },
        {
            foreground: "70c0b1",
            token: "keyword.operator",
        },
        {
            foreground: "70c0b1",
            token: "constant.other.color",
        },
        {
            foreground: "7aa6da",
            token: "entity.name.function",
        },
        {
            foreground: "7aa6da",
            token: "meta.function-call",
        },
        {
            foreground: "7aa6da",
            token: "support.function",
        },
        {
            foreground: "7aa6da",
            token: "keyword.other.special-method",
        },
        {
            foreground: "7aa6da",
            token: "meta.block-level",
        },
        {
            foreground: "c397d8",
            token: "keyword",
        },
        {
            foreground: "c397d8",
            token: "storage",
        },
        {
            foreground: "c397d8",
            token: "storage.type",
        },
        {
            foreground: "c397d8",
            token: "entity.name.tag.css",
        },
        {
            foreground: "ced2cf",
            background: "df5f5f",
            token: "invalid",
        },
        {
            foreground: "ced2cf",
            background: "82a3bf",
            token: "meta.separator",
        },
        {
            foreground: "ced2cf",
            background: "b798bf",
            token: "invalid.deprecated",
        },
    ],
    colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.inactiveSelectionBackground": "#3A3D41",
        "editorIndentGuide.background": "#404040",
        "editorIndentGuide.activeBackground": "#707070",
        "editor.selectionHighlightBackground": "#ADD6FF26",
    },
}

export default theme;