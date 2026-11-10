import { useEffect, useRef, useState } from 'react';
import { Brand, Icon } from './UI.jsx';

export default function Header({ route, onSearch }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [route]);
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <>
      <div className="topline">
        ALL MOTORS · Energia que move vidas.{' '}
        <a href="#modelos">
          Explore os modelos <span>↗</span>
        </a>
      </div>
      <header>
        <Brand />
        <nav
          id="main-navigation"
          className={open ? 'open' : ''}
          aria-label="Navegação principal"
          onClick={() => setOpen(false)}
        >
          <a href="#modelos">
            Modelos <span>⌄</span>
          </a>
          <a href="#tecnologia">Tecnologia</a>
          <a href="#cuidados">Serviços e cuidados</a>
          <a href="#novidades">Universo All Motors</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            id="search-toggle"
            aria-label="Buscar modelos"
            onClick={onSearch}
          >
            <Icon type="search" />
          </button>
          <a className="small-cta" href="#atendimento">
            Encontre sua AIMA <span>↗</span>
          </a>
          <button
            ref={menuRef}
            id="menu-toggle"
            className="icon-button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="main-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </header>
    </>
  );
}
