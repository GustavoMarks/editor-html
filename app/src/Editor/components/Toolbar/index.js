import React from 'react';
import { BoldIcon, CenterAlignIcon, ImageIcon, ItalicIcon, JustifyAlignIcon, LeftAlignIcon, LinkIcon, ListIcon, ListOrdenedIcon, RedoIcon, RightAlignIcon, SubtitleIcon, TitleIcon, UnderlineIcon, UndoIcon, UnlinkIcon, YoutubeIcon } from '../Icons';

export default function Toolbar() {
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

  return (
    <div className="toolbar-content">
      <button onClick={() => format('undo')} > <UndoIcon /> </button>
      <button onClick={() => format('redo')}> <RedoIcon /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => titles('h2')}> <TitleIcon /> </button>
      <button onClick={() => titles('h3')}> <SubtitleIcon /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => format('bold')}> <BoldIcon /> </button>
      <button onClick={() => format('italic')}> <ItalicIcon /> </button>
      <button onClick={() => format('underline')}> <UnderlineIcon /> </button>

      <div className="toolbar-divisor" />

      <button onClick={() => format('justifyFull')} > <JustifyAlignIcon /> </button>
      <button onClick={() => format('justifyLeft')}> <LeftAlignIcon /> </button>
      <button onClick={() => format('justifyCenter')}> <CenterAlignIcon /> </button>
      <button onClick={() => format('justifyRight')} > <RightAlignIcon /> </button>
      <button onClick={() => format('insertOrderedList')} > <ListOrdenedIcon /> </button>
      <button onClick={() => format('insertUnorderedList')}> <ListIcon /> </button>

      <div className="toolbar-divisor" />

      <button> <ImageIcon /> </button>
      <button> <YoutubeIcon /> </button>
      <button> <LinkIcon /> </button>
      <button> <UnlinkIcon onClick={() => format('Unlink')} /> </button>

    </div>
  )
} 