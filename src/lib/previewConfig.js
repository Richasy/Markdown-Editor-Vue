import * as MarkdownIt from 'markdown-it';

let previewConfig = {
    getMarkdownItParser() {
        let it = new MarkdownIt({
                html: true,
                linkify: true,
                typographer: true
            }).use(require("markdown-it-container"), "tip")
            .use(require("markdown-it-container"), "warning")
            .use(require("markdown-it-container"), "danger")
            .use(require('@liradb2000/markdown-it-katex'))
            .use(require("markdown-it-underline"))
            .use(require("markdown-it-emoji"))
            .use(require("markdown-it-footnote"))
            .use(require("markdown-it-mark"))
            .use(require("markdown-it-sup"))
            .use(require("markdown-it-sub"))
            .use(require("markdown-it-checkbox"))
            .use(require("markdown-it-abbr"))
            .use(require("markdown-it-toc-and-anchor").default, {
                anchorLink: false
            })
            .use(require("markdown-it-highlightjs"))
            .use(require("markdown-it-plantuml"))
            .use(require("markdown-it-multimd-table"))
            .use(require("markdown-it-meta"));
        let defaultRender =
            it.renderer.rules.link_open ||
            function (tokens, idx, options, env, self) {
                return self.renderToken(tokens, idx, options);
            };
        it.renderer.rules.link_open = function (
            tokens,
            idx,
            options,
            env,
            self
        ) {
            var aIndex = tokens[idx].attrIndex("target");
            if (aIndex < 0) {
                tokens[idx].attrPush(["target", "_blank"]);
            } else {
                tokens[idx].attrs[aIndex][1] = "_blank";
            }
            return defaultRender(tokens, idx, options, env, self);
        };
        window.markdownIt = it;
        return it;
    }
}

export {previewConfig}