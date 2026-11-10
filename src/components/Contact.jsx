import { models } from '../data/products.js';
import { units } from '../data/units.js';

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export default function Contact({ onContact }) {
  const formContext = (form) => {
    const data = new FormData(form);
    return {
      name: data.get('name'),
      state: data.get('state'),
      model: data.get('model'),
      topic: data.get('interest'),
    };
  };
  return (
    <section className="section contact-section" id="atendimento">
      <div className="contact-grid">
        <div>
          <div className="eyebrow">PERTO DE VOCÊ · ALL MOTORS</div>
          <h2>
            Seu próximo movimento
            <br />
            começa aqui.
          </h2>
          <p>
            Converse com nossa equipe sobre os modelos AIMA, disponibilidade e
            condições de pagamento. Você também pode solicitar um test ride.
          </p>
          <div className="store-list">
            {units.map((unit) => (
              <article className="store-address" key={unit.id}>
                <h3>All Motors {unit.name}</h3>
                <address>{unit.address}</address>
                {unit.reference && <p>{unit.reference}</p>}
                <div className="store-actions">
                  <a
                    className="text-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Como chegar à All Motors ${unit.name}`}
                  >
                    Como chegar ↗
                  </a>
                  <button
                    type="button"
                    className="store-contact"
                    onClick={() => onContact({ unitId: unit.id })}
                  >
                    Falar com {unit.name} ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
          <button
            className="callback-cta"
            type="button"
            onClick={() => onContact({ mode: 'callback' })}
          >
            Quero que entrem em contato comigo ↗
          </button>
          <div className="contact-options">
            <a className="outline" href="#atendimento">
              Falar com a All Motors ↗
            </a>
          </div>
        </div>
        <form
          className="contact-form"
          id="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            onContact(formContext(event.currentTarget));
          }}
        >
          <label>
            Como podemos te chamar?
            <input
              name="name"
              required
              maxLength={80}
              placeholder="Seu nome"
              autoComplete="given-name"
            />
          </label>
          <label>
            Seu estado
            <select name="state" required defaultValue="">
              <option value="">Selecione</option>
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Qual modelo despertou seu interesse?
            <select name="model" defaultValue="">
              <option value="">Quero ajuda para escolher</option>
              {models.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </label>
          <label className="full">
            Atendimento
            <select name="interest" defaultValue="informações">
              <option value="informações">
                Informações e condições de compra
              </option>
              <option value="test ride">Quero solicitar um test ride</option>
              <option value="assistência">
                Preciso de suporte ou assistência
              </option>
            </select>
          </label>
          <button className="btn full" type="submit">
            Conversar com a All Motors<span>↗</span>
          </button>
          <button
            className="callback-cta full"
            type="button"
            onClick={(event) =>
              onContact({
                ...formContext(event.currentTarget.form),
                mode: 'callback',
              })
            }
          >
            Prefiro que entrem em contato comigo ↗
          </button>
          <p className="form-note full">
            No próximo passo, escolha a unidade: Piedade, Pina ou Olinda. Seus
            dados e o modelo serão incluídos na mensagem. Este site não armazena
            seu cadastro.
          </p>
        </form>
      </div>
    </section>
  );
}
