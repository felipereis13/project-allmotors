import { useCallback, useEffect, useRef, useState } from 'react';
import { models } from './data/products.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Catalog from './components/Catalog.jsx';
import Contact from './components/Contact.jsx';
import ContactDialog from './components/ContactDialog.jsx';
import { CompareDock, ComparePage } from './components/Comparison.jsx';
import {
  Benefits,
  Care,
  Editorial,
  News,
  Technology,
} from './components/Sections.jsx';
import Product from './pages/Product.jsx';
import Sources from './pages/Sources.jsx';

function readRoute() {
  try {
    return decodeURIComponent(window.location.hash.slice(1)) || 'inicio';
  } catch {
    return 'inicio';
  }
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [selected, setSelected] = useState([]);
  const [contact, setContact] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const searchRef = useRef(null);
  const pendingSearch = useRef(false);
  const hasNavigated = useRef(false);
  const model = route.startsWith('modelo/')
    ? models.find((item) => item.id === route.slice(7))
    : null;
  const isHome =
    !route.startsWith('modelo/') &&
    !['modelos', 'comparar', 'fontes'].includes(route);

  useEffect(() => {
    const onHashChange = () => {
      hasNavigated.current = true;
      setRoute(readRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (route.startsWith('modelo/') && !model) {
      window.location.hash = 'modelos';
      return;
    }
    document.title = model
      ? `${model.name} | All Motors`
      : 'All Motors | Energia que move vidas';
    const frame = requestAnimationFrame(() => {
      const section =
        isHome && route !== 'inicio' ? document.getElementById(route) : null;
      if (section) section.scrollIntoView();
      else window.scrollTo(0, 0);
      if (pendingSearch.current && searchRef.current) {
        searchRef.current.focus();
        pendingSearch.current = false;
      } else if (hasNavigated.current) {
        const heading =
          section?.querySelector('h1, h2') ||
          mainRef.current?.querySelector('h1, h2');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route, model, isHome]);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3500);
  }, []);

  const toggle = (id, checked) => {
    if (checked && selected.length === 3 && !selected.includes(id)) {
      notify('Compare até três modelos por vez.');
      return;
    }
    setSelected((current) =>
      checked
        ? [...new Set([...current, id])]
        : current.filter((item) => item !== id),
    );
  };
  const openContact = (context = {}) =>
    setContact({ model: model?.name || '', ...context });
  const handleContactLink = (event) => {
    const trigger = event.target.closest('a, button[data-contact]');
    if (!trigger || trigger.closest('dialog')) return;
    const href = trigger.getAttribute('href') || '';
    if (!trigger.dataset.contact && href !== '#atendimento') return;
    event.preventDefault();
    const explicit = trigger.dataset.contact;
    const text = trigger.textContent.toLowerCase();
    const topic =
      explicit && explicit !== 'callback'
        ? explicit
        : text.includes('test ride')
          ? 'test ride'
          : text.includes('solicitar')
            ? 'manual'
            : text.includes('fale com')
              ? 'assistência'
              : 'informações';
    openContact({ topic, mode: explicit === 'callback' ? 'callback' : 'chat' });
  };
  const catalogProps = { selected, onToggle: toggle, searchRef };

  return (
    <div onClick={handleContactLink}>
      <a
        className="skip-link"
        href="#app"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView();
        }}
      >
        Pular para o conteúdo
      </a>
      <Header
        route={route}
        onSearch={() => {
          if (route === 'modelos') searchRef.current?.focus();
          else {
            pendingSearch.current = true;
            window.location.hash = 'modelos';
          }
        }}
      />
      <main id="app" tabIndex={-1} ref={mainRef}>
        {isHome && (
          <div key={`home-${route}`}>
            <Hero />
            <Benefits />
            <Catalog {...catalogProps} />
            <Editorial />
            <Technology />
            <Care />
            <News />
          </div>
        )}
        {route === 'modelos' && (
          <>
            <section className="page-head">
              <div className="breadcrumb">
                <a href="#inicio">Início</a> / Modelos
              </div>
              <div className="eyebrow">SEU CAMINHO, SUA ESCOLHA</div>
              <h1>Encontre a sua AIMA.</h1>
            </section>
            <Catalog key="full-catalog" full {...catalogProps} />
          </>
        )}
        {model && (
          <Product
            model={model}
            {...catalogProps}
            onContact={openContact}
            onCompare={() => {
              toggle(model.id, true);
              if (new Set([...selected, model.id]).size < 2) {
                window.location.hash = 'modelos';
                notify('Escolha outro modelo para comparar.');
              }
            }}
          />
        )}
        {route === 'comparar' && <ComparePage selected={selected} />}
        {route === 'fontes' && <Sources />}
        {route !== 'fontes' && (
          <Contact key={`contact-${route}`} onContact={openContact} />
        )}
      </main>
      <Footer />
      <CompareDock
        selected={selected}
        onClear={() => setSelected([])}
        notify={notify}
      />
      {contact && (
        <ContactDialog context={contact} onClose={() => setContact(null)} />
      )}
      <div
        id="toast"
        role="status"
        aria-live="polite"
        style={{ display: toast ? 'block' : 'none' }}
      >
        {toast}
      </div>
    </div>
  );
}
