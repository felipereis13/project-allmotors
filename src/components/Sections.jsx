import { Icon } from './UI.jsx';

export function Care() {
  return (
    <>
      <section className="section" id="cuidados">
        <div className="care-grid">
          <div className="care-intro">
            <div className="eyebrow">CUIDADO QUE CONTINUA</div>
            <h2>
              Sua AIMA bem cuidada.
              <br />
              Você sempre em movimento.
            </h2>
            <p>
              Informação e atendimento para aproveitar cada trajeto com mais
              tranquilidade.
            </p>
            <a
              className="text-link"
              data-contact="assistência"
              href="#atendimento"
            >
              Fale com a All Motors
              <span>↗</span>
            </a>
          </div>
          <div className="care-list">
            <details>
              <summary>Revisões e manutenção</summary>
              <p>
                Solicite ao atendimento o plano de manutenção correspondente ao
                seu modelo. Siga os intervalos e orientações do manual e procure
                assistência para os serviços.
              </p>
            </details>
            <details>
              <summary>Bateria e recarga</summary>
              <p>
                Use o carregador indicado para o modelo e siga o manual. O tempo
                de recarga e a autonomia variam entre versões; consulte os dados
                da sua AIMA antes do uso.
              </p>
            </details>
            <details>
              <summary>Manuais e ficha técnica</summary>
              <p>
                Consulte a página do modelo ou solicite ao suporte o manual e a
                ficha técnica atualizados.
                <a
                  className="source-link"
                  data-contact="manual"
                  href="#atendimento"
                >
                  Solicitar à All Motors ↗
                </a>
              </p>
            </details>
            <details>
              <summary>Garantia e assistência</summary>
              <p>
                Condições de garantia e rede de assistência devem ser
                confirmadas com o fabricante ou revendedor. Tenha em mãos o
                modelo e os documentos da compra.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

export function Technology() {
  return (
    <>
      <section className="section tech-section" id="tecnologia">
        <div className="section-title">
          <div>
            <div className="eyebrow">TECNOLOGIA QUE SIMPLIFICA</div>
            <h2>
              Elétrica por natureza.
              <br />
              Inteligente em cada detalhe.
            </h2>
          </div>
          <p></p>
        </div>
        <div className="tech-grid">
          <article className="tech-card">
            <img
              src="public\assets\motor_atualizado.jpg"
              alt="Motor elétrico AIMA"
              loading="lazy"
            />
            <div className="number">01 / DESEMPENHO</div>
            <h3>A energia do seu movimento.</h3>
            <p>
              Conheça os motores e as potências disponíveis nas fichas de cada
              modelo. Escolha o conjunto que acompanha sua rotina.
            </p>
          </article>
          <article className="tech-card">
            <img
              src="public\assets\bateria_atualizado.jpg"
              alt="Tecnologia de bateria AIMA"
              loading="lazy"
            />
            <div className="number">02 / AUTONOMIA</div>
            <h3>Novos caminhos, a cada carga.</h3>
            <p>
              A linha AIMA oferece diferentes tecnologias e capacidades de
              bateria. Compare autonomia e tempo de recarga antes de escolher.
            </p>
          </article>
          <article className="tech-card">
            <img
              src="public\assets\desgin_atualizado.jpg"
              alt="Detalhe do design AIMA"
              loading="lazy"
            />
            <div className="number">03 / DESIGN</div>
            <h3>Tecnologia que você sente.</h3>
            <p>
              Do estilo retrô às linhas esportivas, encontre o design e os
              recursos de conforto que combinam com você.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export function Benefits() {
  return (
    <section className="benefits" aria-label="Vantagens da mobilidade elétrica">
      <div className="benefit">
        <Icon type="bolt" />
        <div>
          <b>Uma nova energia para sua rotina</b>
          <p>Mobilidade elétrica para os seus caminhos.</p>
        </div>
      </div>
      <div className="benefit">
        <Icon type="battery" />
        <div>
          <b>Recarregue as possibilidades</b>
          <p>Escolha a autonomia que acompanha você.</p>
        </div>
      </div>
      <div className="benefit">
        <Icon type="leaf" />
        <div>
          <b>Mais leve para a cidade</b>
          <p>Sem emissão de gases pelo escapamento.</p>
        </div>
      </div>
    </section>
  );
}

export function Editorial() {
  return (
    <section className="editorial">
      <div className="editorial-image">
        <img
          src="/assets/imagem-3.webp"
          alt="Pessoas com scooters AIMA em um passeio pela cidade"
          loading="lazy"
        />
      </div>
      <div className="editorial-copy">
        <div className="eyebrow">MENOS ROTINA. MAIS VIDA.</div>
        <h2>
          A cidade é a mesma.
          <br />
          O seu jeito de
          <br />
          viver muda.
        </h2>
        <p>
          Do primeiro compromisso ao último passeio. Redescubra as pequenas
          distâncias e faça do caminho uma parte boa do seu dia.
        </p>
        <a className="btn" href="#modelos">
          Encontre a sua AIMA
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}

export function News() {
  return (
    <section className="news-band" id="novidades">
      <div>
        <div className="eyebrow">UNIVERSO ALL MOTORS</div>
        <h2>O movimento não para por aqui.</h2>
        <p>
          Conheça a All Motors e acompanhe as novidades da mobilidade elétrica.
        </p>
      </div>
      <a
        className="outline"
        href="https://www.instagram.com/allmotors.brasil/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Acompanhe a All Motors ↗
      </a>
    </section>
  );
}
