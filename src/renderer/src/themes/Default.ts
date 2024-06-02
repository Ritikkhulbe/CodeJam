import * as monaco from 'monaco-editor'
// import theme from 'monaco-themes/themes/Dracula.json'

type IStandaloneThemeData = monaco.editor.IStandaloneThemeData

export const DefaultTheme: IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // { token: 'keyword', foreground: '#FF8484' },
    // { token: 'string', foreground: '#C5F467' },
    // { token: 'number', foreground: '#5CB2FF' },
    // { token: 'type', foreground: '#FF8484' },
    // { token: 'class-name', foreground: '#5CB2FF' },
    // { token: 'function', foreground: '#CF8DFB' },
    // { token: 'variable', foreground: '#FF8484' },
    // { token: 'variable.predefined', foreground: '#FFCC5C' },
    // { token: 'constant', foreground: '#FFCC5C' },
    // { token: 'comment', foreground: '#313F55' },
    // { token: 'operator', foreground: '#5CB2FF' },
    // { token: 'delimiter', foreground: '#A4B1CD' },
    // { token: 'delimiter.html', foreground: '#A4B1CD' },
    // { token: 'tag', foreground: '#FF8484' },
    // { token: 'attribute.name', foreground: '#CF8DFB' },
    // { token: 'attribute.value', foreground: '#C5F467' },
    // { token: 'attribute.value.number', foreground: '#FFCC5C' },
    // { token: 'attribute.value.unit', foreground: '#FFCC5C' },
    // { token: 'attribute.value.html', foreground: '#FFCC5C' },
    // { token: 'string.html', foreground: '#C5F467' },
    // { token: 'string.sql', foreground: '#C5F467' },
    // { token: 'string.yaml', foreground: '#C5F467' },
    // { token: 'keyword.flow', foreground: '#CF8DFB' },
    // { token: 'keyword.json', foreground: '#CF8DFB' },
    // { token: 'keyword.flow.scss', foreground: '#CF8DFB' },
    // { token: 'operator.scss', foreground: '#5CB2FF' },
    // { token: 'operator.sql', foreground: '#A4B1CD' },
    // { token: 'operator.swift', foreground: '#ee9d28' },
    // { token: 'predefined.sql', foreground: '#FFCC5C' }
  ],
  colors: {
    // 'editor.foreground': '#A4B1CD',
    'editor.background': '#0a0a0a'
    // 'editor.selectionBackground': '#3e4451',
    // 'editor.lineHighlightBackground': '#2c313a',
    // 'editorCursor.foreground': '#528bff',
    // 'editorWhitespace.foreground': '#3b4048'
  }
}
