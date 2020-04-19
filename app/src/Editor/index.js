import React from 'react';
import Toolbar from './components/Toolbar';
import './styles.css';

export default function Editor({ style, onSubmit }) {

  // tratando submit do editor
  function handleSubmit(){
    const editor = document.getElementById('editor');

    if(onSubmit){
      return onSubmit(editor.innerHTML);
    }

    return console.log(undefined);
  }

  return (
    <div>
      <Toolbar />

      <div
        id="editor"
        className="editor-paper"
        style={style}
        contentEditable="true"
        designmode="on"
        spellCheck="true" />

      <div className="controls-content">
        <button id="salve" className="editor-button" onClick={handleSubmit} >PUBLICAR</button>
        <button className="editor-button">CANCELAR</button>
      </div>

    </div>
  )
} 