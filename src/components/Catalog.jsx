import { useState } from 'react';
import { models } from '../data/products.js';
import { categories, filterModels, note } from '../lib/catalog.js';
import { ModelGrid } from './ModelCard.jsx';
import { Icon } from './UI.jsx';

const initialFilters = {
  category: 'Todos',
  query: '',
  minRange: 0,
  sort: 'featured',
};

export default function Catalog({
  full = false,
  selected,
  onToggle,
  searchRef,
}) {
  const [filters, setFilters] = useState(initialFilters);
  const update = (values) =>
    setFilters((current) => ({ ...current, ...values }));
  const filtered = filterModels(models, filters);
  const grid = (
    <ModelGrid models={filtered} selected={selected} onToggle={onToggle} />
  );
  return (
    <section
      className={`section${full ? ' catalog-page' : ''}`}
      id={full ? undefined : 'catalog-preview'}
    >
      {!full && (
        <div className="section-title">
          <div>
            <div className="eyebrow">ENCONTRE SEU PRÓXIMO MOVIMENTO</div>
            <h2>Sua próxima AIMA está aqui.</h2>
          </div>
          <a className="text-link" href="#modelos">
            Explore todos os modelos <span>↗</span>
          </a>
        </div>
      )}
      <div className="catalog-tools">
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab${filters.category === category ? ' active' : ''}`}
              aria-pressed={filters.category === category}
              onClick={() =>
                update(
                  category === 'Todos'
                    ? { category, query: '', minRange: 0 }
                    : { category },
                )
              }
            >
              {category}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <Icon type="search" />
          <input
            ref={searchRef}
            id="model-search"
            aria-label="Buscar modelo"
            type="search"
            placeholder="Qual é a sua próxima AIMA?"
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
          />
        </label>
      </div>
      {full ? (
        <div className="catalog-layout">
          <aside className="filter-side">
            <h3>Refine sua escolha</h3>
            <label htmlFor="range-filter">Autonomia mínima</label>
            <select
              id="range-filter"
              aria-label="Autonomia mínima"
              value={filters.minRange}
              onChange={(event) =>
                update({ minRange: Number(event.target.value) })
              }
            >
              <option value="0">Todas as autonomias</option>
              {[50, 70, 80].map((value) => (
                <option key={value} value={value}>
                  A partir de {value} km
                </option>
              ))}
            </select>
            <button
              className="outline"
              onClick={() => setFilters(initialFilters)}
            >
              Limpar filtros ×
            </button>
            <p className="disclaimer">
              Categorias organizam a navegação e não definem o enquadramento
              legal dos veículos.
            </p>
          </aside>
          <div>
            <div className="sort-bar">
              <span role="status" aria-live="polite">
                {filtered.length}{' '}
                {filtered.length === 1
                  ? 'modelo encontrado'
                  : 'modelos encontrados'}
              </span>
              <select
                aria-label="Ordenar modelos"
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value })}
              >
                <option value="featured">Ordenar por: Destaques</option>
                <option value="name">Nome: A–Z</option>
                <option value="range">Maior autonomia</option>
                <option value="power">Maior potência</option>
              </select>
            </div>
            {grid}
          </div>
        </div>
      ) : (
        grid
      )}
      <div className="catalog-bottom">
        <p className="disclaimer">{note}</p>
        <a className="outline" href="#comparar">
          Compare os modelos <span>⇄</span>
        </a>
      </div>
    </section>
  );
}
