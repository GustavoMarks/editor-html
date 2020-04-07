import React from 'react';
import Toolbar from './components/Toolbar';
import './styles.css';

export default function Editor({ width }) {
  return(
    <div>
      <Toolbar/>

      <div
        id="editor" 
        className="editor-paper"
        style={ width ? { minWidth: width} : { width: 'auto' }}
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