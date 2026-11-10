# All Motors — React

Catálogo responsivo de modelos AIMA, migrado para React com Vite. Mantém a identidade visual, os 14 modelos, os filtros, a comparação e o atendimento por unidade via WhatsApp.

## Executar

Requer Node.js 22.20 ou superior e npm.

```sh
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente http://localhost:5173.

No PowerShell, se a política de execução bloquear `npm.ps1`, utilize `npm.cmd` no lugar de `npm`.

## Build e validação

```sh
npm test
npm run build
npm run preview
```

O build gera a pasta `dist/`, pronta para hospedagem estática. O preview serve esse build localmente. A navegação utiliza hashes (`#modelos`, `#modelo/aima-liberty`, `#comparar`), sem exigir configuração de rotas no servidor.

Os 17 testes cobrem composição das mensagens, telefones, filtros, ordenação, comparação, navegação, foco dos controles do carrossel e solicitação de retorno com consentimento. Os testes de interface usam React Testing Library e jsdom; não substituem a conferência visual em um navegador real.

Para formatar o código:

```sh
npm run format
```

## Estrutura

```text
public/assets/       Imagens e logotipos originais
src/
  main.jsx           Inicialização do React
  App.jsx            Navegação, seleção de modelos e estado dos diálogos
  style.css          Sistema visual original e estilos responsivos
  components/        Cabeçalho, rodapé, catálogo, cards, carrossel e atendimento
  pages/             Detalhes de produto e informações/fontes
  data/
    products.js      Dados dos 14 modelos
    units.js         Endereços e contatos das unidades
  lib/
    catalog.js       Filtros e apresentação de especificações
    contact-message.js  Validação e composição das mensagens do WhatsApp
 tests/              Testes de mensagens e de interação da interface
```

A interface é renderizada em JSX, com estado e eventos React. Os antigos scripts globais e a montagem de páginas com `innerHTML` foram substituídos por componentes. Dados, regras de mensagem e apresentação ficam separados.

## Catálogo e comparação

A categoria Todos mostra os 14 modelos e limpa pesquisa e autonomia mínima. O catálogo completo permite filtrar por autonomia e ordenar por nome, autonomia ou potência. A comparação aceita até três modelos; a seleção permanece durante a navegação e pode ser limpa na barra inferior.

O carrossel tem navegação manual, mantém os controles montados durante a troca e respeita `prefers-reduced-motion`.

## Atendimento e retorno

Os botões de contato abrem um diálogo para escolher Piedade, Pina ou Olinda. O visitante pode conversar agora ou solicitar retorno, informando nome, WhatsApp e melhor horário e marcando a opção de receber contato.

A solicitação é preparada para envio pelo próprio visitante no WhatsApp da unidade. O site não salva leads em banco, não envia mensagens automaticamente e não promete horário de retorno. Os dados ficam somente na página, sem persistência no navegador. Para receber pedidos automaticamente sem WhatsApp, é necessário integrar um backend ou CRM.

## Configurar unidades e produtos

Edite `src/data/units.js` para alterar endereços e números de atendimento. Os números devem usar DDI 55 + DDD + número. As três unidades utilizam o atendimento geral informado pelo cliente; a mensagem identifica a unidade selecionada.

- Piedade: Rua Coronel Francisco Galvão, 630, Piedade, Jaboatão dos Guararapes - PE.
- Pina: Avenida Antônio de Góes, 549, Pina, Recife - PE.
- Olinda: Rua Carmelita Muniz de Araújo, 105, Casa Caiada, Olinda - PE, em frente ao Shopping Patteo Olinda.

Contatos e endereços de Pina e Olinda confirmados pelo cliente em 07/11/2026.

Edite `src/data/products.js` para atualizar o catálogo. Coloque novas imagens em `public/assets/` e informe o nome do arquivo no campo `image`.

## Acessibilidade

Link para pular ao conteúdo, navegação por teclado, foco visível, diálogo nativo com restauração de foco, labels, estados de seleção e validação, consentimento para retorno e respeito à preferência por movimento reduzido. Não representa certificação de conformidade WCAG.

## Imagens e informações

Modelos e imagens: AIMA Brasil. Identidade visual e contato: All Motors Brasil. Dados consultados em 05/11/2026 e preservados na migração. Divergências nas especificações estão indicadas como sob consulta. Fontes Google exigem conexão; há fontes do sistema como alternativa. Não há preços, garantias ou condições de compra inventados.
