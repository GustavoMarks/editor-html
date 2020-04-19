import React from 'react';
import Editor from './Editor';
import './App.css';

function App() {

  // função para teste do submit do editorr
  function submitTest(outPut){
    console.log(outPut);
  }

  return (
    <div>
      <header>
        <h1>TESTE DE IMPLEMENTAÇÃO</h1>
        <p> Escreva seu texto abaixo, estilize e gere uma string HTML </p>
      </header>
      <Editor onSubmit={submitTest} />
    </div>
    
  );
}

export default App;
