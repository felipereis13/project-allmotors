import { power, range } from '../lib/catalog.js';

export default function ModelCard({ model, selected, onToggle }) {
  return (
    <article className="model-card">
      <a
        className="model-photo"
        href={`#modelo/${model.id}`}
        aria-label={`Conhecer ${model.name}`}
      >
        <span className="badge">{model.tag}</span>
        <img
          src={`/assets/${model.image}`}
          alt={`AIMA ${model.name}`}
          loading="lazy"
        />
      </a>
      <div className="model-info">
        <div className="category">{model.category} · Elétrica</div>
        <h3>
          <a href={`#modelo/${model.id}`}>{model.name}</a>
        </h3>
        <p>{model.motto}</p>
        <div className="mini-spec">
          <div>
            <b>
              {range(model)}
              {model.range ? '*' : ''}
            </b>
            <span>Autonomia</span>
          </div>
          <div>
            <b>{power(model)}</b>
            <span>Potência nominal</span>
          </div>
        </div>
        <div className="card-bottom">
          <a href={`#modelo/${model.id}`}>Conheça o modelo ↗</a>
          <label>
            <input
              type="checkbox"
              aria-label={`Comparar ${model.name}`}
              checked={selected.includes(model.id)}
              onChange={(event) => onToggle(model.id, event.target.checked)}
            />{' '}
            Comparar
          </label>
        </div>
      </div>
    </article>
  );
}

export function ModelGrid({ models, ...props }) {
  return (
    <div className="grid" id="model-grid">
      {models.length ? (
        models.map((model) => (
          <ModelCard key={model.id} model={model} {...props} />
        ))
      ) : (
        <div className="empty">
          Nenhum modelo encontrado. Tente outra busca ou limpe os filtros.
        </div>
      )}
    </div>
  );
}
