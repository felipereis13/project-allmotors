import { useState } from 'react';
import { models } from '../data/products.js';
import { note, specificationRows } from '../lib/catalog.js';
import { Dialog } from './UI.jsx';

export function ComparisonTable({ chosen, onNavigate }) {
  if (chosen.length < 2)
    return <p>Selecione pelo menos dois modelos para comparar.</p>;
  return (
    <>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                Encontre seu
                <br />
                próximo movimento.
              </th>
              {chosen.map((model) => (
                <th key={model.id} scope="col">
                  <img src={`/assets/${model.image}`} alt={model.name} />
                  <br />
                  {model.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specificationRows.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                {chosen.map((model) => (
                  <td key={model.id}>{value(model)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Próximo passo</td>
              {chosen.map((model) => (
                <td key={model.id}>
                  <a
                    className="source-link"
                    href={`#modelo/${model.id}`}
                    onClick={onNavigate}
                  >
                    Conhecer modelo ↗
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="disclaimer spaced-note">{note}</p>
      {chosen
        .filter((model) => model.note)
        .map((model) => (
          <p key={model.id} className="disclaimer">
            {model.name}: {model.note}
          </p>
        ))}
    </>
  );
}

export function ComparePage({ selected }) {
  const [picks, setPicks] = useState(() => [
    selected[0] || models[0].id,
    selected[1] || models[1].id,
    selected[2] || '',
  ]);
  const chosen = [...new Set(picks.filter(Boolean))].map((id) =>
    models.find((model) => model.id === id),
  );
  return (
    <>
      <section className="page-head">
        <div className="breadcrumb">
          <a href="#inicio">Início</a> / Comparar
        </div>
        <h1>Qual AIMA combina com você?</h1>
      </section>
      <section className="section">
        <p>Escolha até três modelos e compare as principais características.</p>
        <div className="page-compare-pick">
          {picks.map((pick, index) => (
            <select
              key={index}
              aria-label={`Modelo ${index + 1}`}
              value={pick}
              onChange={(event) =>
                setPicks((current) =>
                  current.map((value, position) =>
                    position === index ? event.target.value : value,
                  ),
                )
              }
            >
              <option value="">
                {index === 2
                  ? 'Terceiro modelo (opcional)'
                  : 'Selecione um modelo'}
              </option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          ))}
        </div>
        <ComparisonTable chosen={chosen} />
      </section>
    </>
  );
}

export function CompareDock({ selected, onClear, notify }) {
  const [open, setOpen] = useState(false);
  const chosen = selected.map((id) => models.find((model) => model.id === id));
  return (
    <>
      {selected.length > 0 && (
        <div id="compare-dock">
          <span>{selected.length} de 3 modelos selecionados</span>
          <button
            onClick={() =>
              selected.length < 2
                ? notify('Selecione pelo menos dois modelos para comparar.')
                : setOpen(true)
            }
          >
            Comparar modelos ⇄
          </button>
          <button
            id="clear-compare"
            aria-label="Limpar comparação"
            onClick={onClear}
          >
            ×
          </button>
        </div>
      )}
      {open && (
        <Dialog
          id="compare-dialog"
          titleId="compare-title"
          onClose={() => setOpen(false)}
        >
          <div className="eyebrow">LADO A LADO</div>
          <h2 id="compare-title">Compare seu próximo movimento.</h2>
          <ComparisonTable chosen={chosen} onNavigate={() => setOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
