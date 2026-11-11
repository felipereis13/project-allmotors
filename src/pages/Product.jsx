import { models } from '../data/products.js';
import { note, power, range, speed } from '../lib/catalog.js';
import { ModelGrid } from '../components/ModelCard.jsx';
import { Care } from '../components/Sections.jsx';

export default function Product({
  model,
  selected,
  onToggle,
  onContact,
  onCompare,
}) {
  const rows = [
    ['Potência nominal', power(model)],
    ['Autonomia máxima', range(model)],
    ['Velocidade máxima', speed(model)],
    ['Bateria', model.battery],
    ['Tempo de recarga', model.charge],
    ['Freios', model.brakes],
    ['Dimensões (C × L × A)', model.size],
  ];
  return (
    <>
      <section className="product-hero">
        <div className="product-visual">
          <div className="breadcrumb">
            <a href="#inicio">Início</a> / <a href="#modelos">Modelos</a> /{' '}
            {model.name}
          </div>
          <img src={`/assets/${model.image}`} alt={`AIMA ${model.name}`} />
        </div>
        <div className="product-copy">
          <div className="eyebrow">
            {model.category.toUpperCase()} · {model.tag}
          </div>
          <h1>{model.name}</h1>
          <p>{model.motto}</p>
          <div className="mini-spec">
            <div>
              <b>
                {range(model)}
                {model.range ? '*' : ''}
              </b>
              <span>Autonomia máxima</span>
            </div>
            <div>
              <b>{power(model)}</b>
              <span>Potência nominal</span>
            </div>
          </div>
          <div className="product-actions">
            <button
              className="btn"
              onClick={() => onContact({ model: model.name })}
            >
              Consultar condições ↗
            </button>
            <button className="outline" onClick={onCompare}>
              Comparar ⇄
            </button>
          </div>
          <button
            className="callback-cta"
            type="button"
            onClick={() => onContact({ mode: 'callback', model: model.name })}
          >
            Quero receber contato sobre este modelo ↗
          </button>
          <p className="disclaimer spaced-note">{note}</p>
        </div>
      </section>
      <section className="section">
        <div className="spec-layout">
          <div className="spec-intro">
            <div className="eyebrow">FEITA PARA O SEU CAMINHO</div>
            <h2>{model.motto}</h2>
            <p>{model.desc}</p>
            {model.note && <p>{model.note}</p>}
            <a
              className="source-link"
              href={`https://aimabrasil.com.br/modelos/${model.id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulte a página do fabricante ↗
            </a>
          </div>
          <div>
            <table className="spec-table">
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="disclaimer spaced-note">
              Informações consultadas em 05/11/2026. Confirme versão,
              equipamentos, garantia e disponibilidade antes da compra.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="section-title">
          <h2>Outros caminhos para explorar.</h2>
          <a className="text-link" href="#modelos">
            Ver todos os modelos ↗
          </a>
        </div>
        <ModelGrid
          models={models.filter((item) => item.id !== model.id).slice(0, 4)}
          selected={selected}
          onToggle={onToggle}
        />
      </section>
      <Care />
    </>
  );
}
