import React from 'react';
import { BoldIcon, CenterAlignIcon, ImageIcon, ItalicIcon, JustifyAlignIcon, LeftAlignIcon, LinkIcon, ListIcon, ListOrdenedIcon, RedoIcon, RightAlignIcon, SubtitleIcon, TitleIcon, UnderlineIcon, UndoIcon, UnlinkIcon, YoutubeIcon } from '../Icons';

export default function Toolbar() {
  return (
    <div className="toolbar-content">
      <button> <UndoIcon /> </button>
      <button> <RedoIcon /> </button>

      <div className="toolbar-divisor" />

      <button> <TitleIcon /> </button>
      <button> <SubtitleIcon /> </button>

      <div className="toolbar-divisor" />

      <button> <BoldIcon /> </button>
      <button> <ItalicIcon /> </button>
      <button> <UnderlineIcon /> </button>

      <div className="toolbar-divisor" />

      <button> <JustifyAlignIcon /> </button>
      <button> <LeftAlignIcon /> </button>
      <button> <CenterAlignIcon /> </button>
      <button> <RightAlignIcon /> </button>
      <button> <ListOrdenedIcon /> </button>
      <button> <ListIcon /> </button>
      <button> <RightAlignIcon /> </button>

      <div className="toolbar-divisor" />

      <button> <ImageIcon /> </button>
      <button> <YoutubeIcon /> </button>
      <button> <LinkIcon /> </button>
      <button> <UnlinkIcon /> </button>

    </div>
  )
} 