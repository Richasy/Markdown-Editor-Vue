import * as monaco from 'monaco-editor';

function textEffect(editor, effect) {
    var select = editor.getSelection();
    if (select) {
        let range = new monaco.Range(select.startLineNumber, select.startColumn, select.endLineNumber, select.endColumn);
        let txt = editor.getModel().getValueInRange(select);
        switch (effect) {
            case 'b':
                txt = "**" + txt + "**";
                break;
            case 'i':
                txt = "*" + txt + "*";
                break;
            default:
                break;
        }
        editor.executeEdits('', [{ range: range, text: txt }]);
    }
}

let actions = [
    {
        id: 'markdown-bold',
        label: '**Bold**',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B)
        ],
        contextMenuGroupId: 'text',
        contextMenuOrder: 1,
        run: function (ed) {
            textEffect(ed, 'b');
        }
    },
    {
        id: 'markdown-italic',
        label: '*Italic*',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I)
        ],
        contextMenuGroupId: 'text',
        contextMenuOrder: 1.1,
        run: function (ed) {
            textEffect(ed, 'i');
        }
    }
]

export { textEffect, actions }