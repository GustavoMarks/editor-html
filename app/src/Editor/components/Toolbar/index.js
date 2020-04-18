import React, { useState, useEffect } from 'react';
import { BoldIcon, CenterAlignIcon, ImageIcon, ItalicIcon, JustifyAlignIcon, LeftAlignIcon, LinkIcon, ListIcon, ListOrdenedIcon, RedoIcon, RightAlignIcon, SubtitleIcon, TitleIcon, UnderlineIcon, UndoIcon, UnlinkIcon, YoutubeIcon } from '../Icons';

export default function Toolbar() {
  const [h2, setH2] = useState(false);
  const [h3, setH3] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [ol, setOl] = useState(false);
  const [ul, setUl] = useState(false);
  const [link, setLink] = useState(false);

  //Função para manipular a fomatação html do campo de edição
  const format = (commmand) => {
    document.execCommand(commmand);
  }

  //Função para atribuir títulos html para trechos de texto no campo de edição
  const titles = (width) => {
    //Salvando intervalo selecionado
    let range = window.getSelection().getRangeAt(0);

    //Buscando nó atual do intervalo
    let node = range.startContainer.parentElement;

    //Se intervalo já possui o título, tornar parágrafo
    if (node.nodeName === width.toUpperCase()) {
      document.execCommand("heading", null, "p");
    }
    //Se intervalo não possui o título, aplicar
    else {
      document.execCommand("heading", null, width);
    }

  }

  // Analisa a posição ou texto selcionado pelo cursor e seta os estados dos estilos aplicados
  const navUpdate = () => {
    const range = window.getSelection().getRangeAt(0); // guardando a área selecionada
    const parentList = []; // guardará uma lista com todos os nós pais da área selecionada

    // variáveis temporárias para auxílio na mudança de estados
    let tempH2 = false;
    let tempH3 = false;
    let tempBold = false;
    let tempItalic = false;
    let tempUnderline = false;
    let tempOl = false;
    let tempUl = false;
    let tempLink = false;

    // buscará os pais do nó selecionado recursivamente e adicionará na lista
    function gettingNodeParents(node) {
      parentList.push(node);
      if (node.parentElement) {
        gettingNodeParents(node.parentElement);

      }

    }

    // preenchendo lista de nós
    gettingNodeParents(range.startContainer.parentElement);

    // percorrendo lista de nós, é preciso ter pelo menos 1 nó para estilo aplicado
    parentList.forEach((element) => {
      if (element.tagName === 'H2') tempH2 = true;
      if (element.tagName === 'H3') tempH3 = true;
      if (element.tagName === 'B' || element.tagName === 'STRONG' ) tempBold = true;
      if (element.tagName === 'I') tempItalic = true;
      if (element.tagName === 'U') tempUnderline = true;
      if (element.tagName === 'OL') tempOl = true;
      if (element.tagName === 'UL') tempUl = true;
      if (element.tagName === 'A') tempLink = true;
    });

    // setando estados
    setH2(tempH2);
    setH3(tempH3);
    setBold(tempBold);
    setItalic(tempItalic);
    setUnderline(tempUnderline);
    setOl(tempOl);
    setUl(tempUl);
    setLink(tempLink);

  }

  useEffect (() => {
    // buscando div editávl do editor pelo DOM
    let editor = document.getElementById('editor');

    // configurando gatilho de update de estilos aplicados
    editor.onclick = navUpdate;
    editor.onkeydown = navUpdate;
    editor.onkeyup = navUpdate;
    editor.onkeypress = navUpdate;
    editor.onchange = navUpdate;
  });

  return (
    <div className="toolbar-content">
      <button onClick={() => format('undo')} > <UndoIcon /> </button>
      <button onClick={() => format('redo')}> <RedoIcon /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => titles('h2')}> <TitleIcon fill={h2 ? '#4682B4' : null} /> </button>
      <button onClick={() => titles('h3')}> <SubtitleIcon fill={h3 ? '#4682B4' : null} /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => format('bold')}> <BoldIcon fill={bold ? '#4682B4' : null} /> </button>
      <button onClick={() => format('italic')}> <ItalicIcon fill={italic ? '#4682B4' : null} /> </button>
      <button onClick={() => format('underline')}> <UnderlineIcon fill={underline ? '#4682B4' : null} /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => format('justifyFull')} > <JustifyAlignIcon /> </button>
      <button onClick={() => format('justifyLeft')}> <LeftAlignIcon /> </button>
      <button onClick={() => format('justifyCenter')}> <CenterAlignIcon /> </button>
      <button onClick={() => format('justifyRight')} > <RightAlignIcon /> </button>
      <button onClick={() => format('insertOrderedList')} > <ListOrdenedIcon fill={ol ? '#4682B4' : null} /> </button>
      <button onClick={() => format('insertUnorderedList')}> <ListIcon fill={ul ? '#4682B4' : null} /> </button>

      <div className="toolbar-divisor" />

      <button> <ImageIcon /> </button>
      <button> <YoutubeIcon /> </button>
      <button> <LinkIcon fill={link ? '#4682B4' : null} /> </button>
      <button> <UnlinkIcon onClick={() => format('Unlink')} /> </button>

    </div>
  )
} 