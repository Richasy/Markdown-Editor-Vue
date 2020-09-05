import * as monaco from 'monaco-editor';
import { notifyPack } from '../models/notifyPack';

function textEffect(editor, effect) {
    var select = editor.getSelection();
    if (select) {
        let range = new monaco.Range(select.startLineNumber, select.startColumn, select.endLineNumber, select.endColumn);
        let txt = editor.getModel().getValueInRange(select);
        let position=editor.getPosition();
        let endColumn=select.endColumn<select.startColumn?select.startColumn:select.endColumn;
        let startColumn=select.startColumn<select.endColumn?select.startColumn:select.endColumn;
        switch (effect) {
            case 'b':
                txt = "**" + txt + "**";
                position.column=endColumn+4;
                break;
            case 'i':
                txt = "*" + txt + "*";
                position.column=endColumn+2;
                break;
            case 'u':
                txt = "_" + txt + "_";
                position.column=endColumn+2;
                break;
            case 'r':
                txt = "~~" + txt + "~~";
                position.column=endColumn+4;
                break;
            case 'sup':
                txt = "^" + txt + "^";
                position.column=endColumn+2;
                break;
            case 'sub':
                txt = "~" + txt + "~";
                position.column=endColumn+2;
                break;
            case 'd':
                txt = "`" + txt + "`";
                position.column=endColumn+2;
                break;
            case 'p':
                if(startColumn!=0){
                    txt = "\n```\n" + txt + "\n```\n";
                }
                else{
                    txt = "```\n" + txt + "```\n";
                }
                position.lineNumber=select.endLineNumber+2;
                break;
            case "q":
                let quote_sp = txt.split("\n");
                let temp_quote = [];
                for (let quote of quote_sp) {
                    if (quote.trim()) {
                        temp_quote.push("> " + quote);
                    } else temp_quote.push("");
                }
                txt = temp_quote.join("\n");
                position.lineNumber=select.endLineNumber+1;
                break;
            case "num1":
                txt = `# ${txt}`;
                position.column=endColumn+2;
                break;
            case "num2":
                txt = `## ${txt}`;
                position.column=endColumn+3;
                break;
            case "num3":
                txt = `### ${txt}`;
                position.column=endColumn+4;
                break;
            case "num4":
                txt = `#### ${txt}`;
                position.column=endColumn+5;
                break;
            case "num5":
                txt = `##### ${txt}`;
                position.column=endColumn+6;
                break;
            case "num6":
                txt = `###### ${txt}`;
                position.column=endColumn+7;
                break;
            default:
                break;
        }
        editor.executeEdits('', [{ range: range, text: txt }]);
        editor.setPosition(position);
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
        attachKeys:['Ctrl','B'],
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
        attachKeys:['Ctrl','I'],
        run: function (ed) {
            textEffect(ed, 'u');
        }
    },
    {
        id: 'markdown-underline',
        label: '_Underline_',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd| monaco.KeyCode.KEY_U)
        ],
        contextMenuGroupId: 'text',
        attachKeys:['Ctrl','U'],
        contextMenuOrder: 1.2,
        run: function (ed) {
            textEffect(ed, 'i');
        }
    },
    {
        id: 'markdown-strikethrough',
        label: '~~Strikethrough~~',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R)
        ],
        contextMenuGroupId: 'text',
        attachKeys:['Ctrl','R'],
        contextMenuOrder: 1.3,
        run: function (ed) {
            textEffect(ed, 'r');
        }
    },
    {
        id: 'markdown-supscript',
        label: '^Supscript^',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_U)
        ],
        contextMenuGroupId: 'text',
        attachKeys:['Ctrl','Shift','U'],
        contextMenuOrder: 1.4,
        run: function (ed) {
            textEffect(ed, 'sup');
        }
    },
    {
        id: 'markdown-subscript',
        label: '~Subscript~',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_D)
        ],
        contextMenuGroupId: 'text',
        attachKeys:['Ctrl','Shift','D'],
        contextMenuOrder: 1.5,
        run: function (ed) {
            textEffect(ed, 'sub');
        }
    },
    {
        id: 'markdown-codeline',
        label: '`Code`',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D)
        ],
        contextMenuGroupId: 'text',
        attachKeys:['Ctrl','D'],
        contextMenuOrder: 1.6,
        run: function (ed) {
            textEffect(ed, 'd');
        }
    },
    {
        id: 'markdown-pre',
        label: '```Code Block```',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_P)
        ],
        contextMenuGroupId: 'block',
        attachKeys:['Ctrl','P'],
        contextMenuOrder: 1.7,
        run: function (ed) {
            textEffect(ed, 'p');
        }
    },
    {
        id: 'markdown-quote',
        label: '> Quote',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Q)
        ],
        contextMenuGroupId: 'quote',
        attachKeys:['Ctrl','Q'],
        contextMenuOrder: 1.8,
        run: function (ed) {
            textEffect(ed, 'q');
        }
    },
    {
        id: 'markdown-header1',
        label: '# Header1',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_1)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','1'],
        contextMenuOrder: 1.9,
        run: function (ed) {
            textEffect(ed, 'num1');
        }
    },
    {
        id: 'markdown-header2',
        label: '## Header2',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_2)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','2'],
        contextMenuOrder: 2,
        run: function (ed) {
            textEffect(ed, 'num2');
        }
    },
    {
        id: 'markdown-header3',
        label: '### Header3',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_3)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','3'],
        contextMenuOrder: 2.1,
        run: function (ed) {
            textEffect(ed, 'num3');
        }
    },
    {
        id: 'markdown-header4',
        label: '#### Header4',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_4)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','4'],
        contextMenuOrder: 2.2,
        run: function (ed) {
            textEffect(ed, 'num4');
        }
    },
    {
        id: 'markdown-header5',
        label: '##### Header5',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_5)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','5'],
        contextMenuOrder: 2.3,
        run: function (ed) {
            textEffect(ed, 'num5');
        }
    },
    {
        id: 'markdown-header6',
        label: '###### Header6',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_6)
        ],
        contextMenuGroupId: 'header',
        attachKeys:['Ctrl','6'],
        contextMenuOrder: 2.4,
        run: function (ed) {
            textEffect(ed, 'num6');
        }
    },
    {
        id: 'editor-save',
        label: 'Save',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S)
        ],
        contextMenuGroupId: 'operation',
        attachKeys:['Ctrl','S'],
        contextMenuOrder: 3,
        run: function (ed) {
            //let text=ed.getModel().getValue();
            console.log(text);
            //window.external.notify(notifyPack.createPackJson('save',''));
        }
    },
    {
        id: 'editor-copy',
        label: 'Copy',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C)
        ],
        contextMenuGroupId: 'operation',
        attachKeys:['Ctrl','C'],
        contextMenuOrder: 3.1,
        run: function (ed) {
            ed.focus();
            document.execCommand('copy');
        }
    },
    {
        id: 'editor-cut',
        label: 'Cut',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_X)
        ],
        contextMenuGroupId: 'operation',
        attachKeys:['Ctrl','X'],
        contextMenuOrder: 3.2,
        run: function (ed) {
            ed.focus();
            document.execCommand('cut');
        }
    },
    {
        id: 'editor-paste',
        label: 'Paste',
        keybindings: [
            monaco.KeyMod.CtrlCmd,
            monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V)
        ],
        contextMenuGroupId: 'operation',
        attachKeys:['Ctrl','V'],
        contextMenuOrder: 3.2,
        run: function (ed) {
            ed.focus();
            document.execCommand('paste');
        }
    }
]

export { textEffect, actions }