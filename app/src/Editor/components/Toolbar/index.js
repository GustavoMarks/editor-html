import React, { useState, useEffect } from 'react';
import { BoldIcon, CenterAlignIcon, ImageIcon, ItalicIcon, JustifyAlignIcon, LeftAlignIcon, LinkIcon, ListIcon, ListOrdenedIcon, RedoIcon, RightAlignIcon, SubtitleIcon, TitleIcon, UnderlineIcon, UndoIcon, UnlinkIcon, YoutubeIcon } from '../Icons';
import Modal from '../Modal';
import './styles.css';

export default function Toolbar() {
  const [h2, setH2] = useState(false);
  const [h3, setH3] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [ol, setOl] = useState(false);
  const [ul, setUl] = useState(false);
  const [link, setLink] = useState(false);
  const [url, setUrl] = useState('');
  const [range, setRange] = useState('');

  //Função para manipular a fomatação html do campo de edição
  const format = (command) => {
    document.execCommand(command);

    // setando estados dos botões
    switch (command) {
      case 'bold':
        setBold(true);
        break;
      case 'italic':
        setItalic(true);
        break;
      case 'underline':
        setUnderline(true);
        break
      case 'insertOrderedList':
        setOl(true);
        break;
      default:
        setUl(true);
    }
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
      if (element.tagName === 'B' || element.tagName === 'STRONG') tempBold = true;
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

  const linking = (e, type) => {
    e.preventDefault();
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand(type, false, url);
    if(type === 'insertImage') document.execCommand('enableObjectResizing');
  }

  const addYtLink = (e) => {
    e.preventDefault();
    let entry = url;

    if (entry.indexOf("https://www.youtube.com") !== -1) {
      if (entry.indexOf("index=") !== -1 || entry.indexOf("radio=") !== -1) {
        let iframe = document.createElement("iframe");
        iframe.type = "text/html";
        iframe.height = "360";
        iframe.width = "80%";
        iframe.src = "https://www.youtube.com/embed/" + entry;

        range.insertNode(iframe);

      } else if (entry.indexOf("watch?v=") !== -1) {
        let iframe = document.createElement("iframe");
        iframe.type = "text/html";
        iframe.height = "360";
        iframe.width = "80%";

        let id = entry.split("watch?v=")[1];
        iframe.src = "https://www.youtube.com/embed/" + id;

        range.insertNode(iframe);

      } else {
        console.log("Link corrompido...");

      }
    } else {
      console.log("Link inválido...");

    }

  }

  const saveRange = () => {
    if (window.getSelection().getRangeAt(0))
      setRange(window.getSelection().getRangeAt(0))
  }

  useEffect(() => {
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
    <>
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

        <button id='toolbar-img-button' onClick={() => saveRange()}> <ImageIcon /> </button>
        <button id='toolbar-yt-button' onClick={() => saveRange()}> <YoutubeIcon /> </button>
        <button id='toolbar-link-button' onClick={() => saveRange()} > <LinkIcon fill={link ? '#4682B4' : null} /> </button>
        <button onClick={() => format('unlink')}> <UnlinkIcon /> </button>

      </div>

      <Modal triggers={['toolbar-link-button', 'submit-url-link']} >
        <form onSubmit={(e) => linking(e,'CreateLink')}>
          <label> URL: </label>
          <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
          <button id='submit-url-link' type='submit' > adicionar </button>
        </form>
      </Modal>

      <Modal triggers={['toolbar-yt-button', 'submit-yt-link']} >
        <form onSubmit={(e) => addYtLink(e)}>
          <label> URL do Youtube: </label>
          <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
          <button id='submit-yt-link' type='submit' > adicionar </button>
        </form>
      </Modal>

      <Modal triggers={['toolbar-img-button', 'submit-img-link']} >
        <form onSubmit={(e) => linking(e, 'insertImage')}>
          <label> URL de Imagem: </label>
          <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
          <button id='submit-img-link' type='submit' > adicionar </button>
        </form>
      </Modal>

    </>
  )
} 