import { models } from '../data/products.js';

export default function Sources() {
  return (
    <section className="section sources">
      <div className="eyebrow">TRANSPARÊNCIA</div>
      <h2>Informações e fontes</h2>
      <p>
        Este é um conceito independente de site, criado a pedido do usuário. Não
        substitui o site oficial da All Motors ou do fabricante AIMA. As imagens
        e informações de produto foram consultadas no site da AIMA em 5 de
        novembro de 2026. A identidade visual e o contato da loja foram obtidos
        em allmotorsbrasil.com.br.
      </p>
      <p>
        Os botões de atendimento direcionam ao WhatsApp publicado pela All
        Motors. Não há checkout, cadastro de clientes nem processamento de
        pagamentos neste site.
      </p>
      <p>
        As categorias servem para organizar a navegação e não determinam o
        enquadramento legal de um veículo. Consulte o fabricante sobre
        documentação, requisitos de circulação e condições de garantia.
      </p>
      <ul>
        {models.map((model) => (
          <li key={model.id}>
            <a
              className="source-link"
              href={`https://aimabrasil.com.br/modelos/${model.id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              AIMA {model.name} ↗
            </a>
            {model.note && <p className="source-note">{model.note}</p>}
          </li>
        ))}
      </ul>
      <p>
        <a className="source-link" href="#atendimento">
          Atendimento All Motors ↗
        </a>
      </p>
    </section>
  );
}
