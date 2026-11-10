export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <a className="brand" href="#inicio">
          <img src="/assets/allmotors-logo.png" alt="Logo All Motors" />
          <span className="brand-name">
            <strong>ALL MOTORS</strong>
            <small>ENERGIA QUE MOVE VIDAS</small>
          </span>
        </a>
        <p>
          Novos caminhos.
          <br />
          Novas possibilidades.
        </p>
        <a className="outline light" href="#modelos">
          Encontre seu próximo movimento ↗
        </a>
      </div>
      <div className="foot-links">
        <div>
          <b>Explore</b>
          <a href="#modelos">Todos os modelos</a>
          <a href="#comparar">Comparar modelos</a>
          <a href="#tecnologia">Tecnologia AIMA</a>
        </div>
        <div>
          <b>Estamos por perto</b>
          <a href="#atendimento">Atendimento</a>
          <a
            href="https://maps.google.com/?q=Rua+Coronel+Francisco+Galv%C3%A3o,+630,+Piedade,+Jaboat%C3%A3o+dos+Guararapes-PE"
            target="_blank"
            rel="noopener"
          >
            Visite a All Motors ↗
          </a>
          <a href="#atendimento">Agende um test ride ↗</a>
          <a href="#atendimento" data-contact="callback">
            Quero receber contato ↗
          </a>
        </div>
        <div>
          <b>Cuide da sua AIMA</b>
          <a href="#cuidados">Serviços e cuidados</a>
          <a href="#cuidados">Dúvidas e orientações ↗</a>
          <a className="footer-contact-button" href="#atendimento">
            Falar com a equipe ↗
          </a>
        </div>
        <div className="foot-note">
          All Motors · Piedade, Pina e Olinda.
          <br />
          <br />
          Imagens e especificações: AIMA Brasil. Autonomia e desempenho variam
          conforme condições de uso.
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 · Conceito de site All Motors Brasil</span>
        <a href="#fontes">Informações e fontes</a>
        <span>Feito para seguir em frente. ↗</span>
      </div>
    </footer>
  );
}
