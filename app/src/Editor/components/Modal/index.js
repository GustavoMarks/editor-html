import React, { useState, useEffect } from 'react';
import './styles.css';

export default function Modal({ children, initState, triggers }) {
  // estado controla se modal será visível ou não
  const [actived, setActived] = useState(initState);

  // setando tringgers para fechar/abrir modal
  useEffect(()=>{
    // tecla esc fecha modal
    window.addEventListener('keydown', (e)=> {
      if(e.key === 'Escape' || e.key === 'Esc' || e.code === 27) setActived(false);
    });

    // lista de id de gatilhos é passada por props
    if(triggers){
      triggers.forEach(id => {
        const item = document.getElementById(id);
        if(item) item.onclick = () => setActived(!actived);
      });
    }
  });

  return (
    <div className='modal-glass' style={actived ? { display: 'flex' } : { display: 'none' }} >
      <span className='modal-closer' onClick={() => setActived(false)} > x </span>
      <section>
        {children}
      </section>
    </div>
  )
}