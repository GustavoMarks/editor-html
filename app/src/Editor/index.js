import React from 'react';
import Toolbar from './components/Toolbar';
import './styles.css';

export default function Editor({ style }) {
  return(
    <div>
      <Toolbar/>

      <div
        id="editor" 
        className="editor-paper"
        style={ style }
        contentEditable="true"
        designmode="on"
        spellCheck="true"/>     
      
      <div className="controls-content">
        <button id="salve" className="editor-button" >PUBLICAR</button>
        <button className="editor-button">CANCELAR</button>
      </div>

    </div>
  )
} 