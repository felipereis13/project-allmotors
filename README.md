# Catálogo Digital de Mobilidade Elétrica

Aplicação web desenvolvida com React e Vite para apresentar produtos, facilitar a comparação de especificações e conectar visitantes ao atendimento comercial.

Projeto desenvolvido para uma empresa real e apresentado neste repositório como parte de um portfólio de desenvolvimento front-end. Esta documentação se concentra na solução técnica, sem divulgar dados de identificação, contatos, endereços ou informações operacionais do cliente.

## Sobre o projeto

A aplicação reúne uma apresentação institucional e um catálogo interativo em uma interface responsiva. A experiência permite explorar modelos, consultar características técnicas e comparar opções antes de iniciar uma conversa com o atendimento.

O desenvolvimento utiliza componentes React, gerenciamento de estado com hooks e separação entre dados, regras de negócio e apresentação.

## Funcionalidades

- Catálogo com busca por nome, filtros por categoria e autonomia mínima.
- Ordenação por nome, autonomia ou potência.
- Páginas de produto com imagens e especificações técnicas.
- Comparação de até três modelos, com seleção mantida durante a navegação.
- Fluxo de contato via WhatsApp e preparação de solicitações de retorno com consentimento.
- Carrossel com controles manuais e interface adaptada a diferentes tamanhos de tela.
- Navegação por teclado, foco visível e suporte à preferência por movimento reduzido.

## Tecnologias

| Tecnologia               | Aplicação                                        |
| ------------------------ | ------------------------------------------------ |
| React                    | Componentização, estado e interação da interface |
| JavaScript               | Regras de catálogo, navegação e validação        |
| CSS                      | Estilização e layout responsivo                  |
| Vite                     | Servidor de desenvolvimento e build de produção  |
| Vitest e Testing Library | Testes de componentes e interações               |
| Node.js Test Runner      | Testes das regras de composição de mensagens     |
| Prettier                 | Padronização da formatação                       |

## Executar localmente

Requisitos: **Node.js 22.20.0 ou superior** e **npm**.

Na pasta do projeto, instale as dependências e inicie o servidor:

```sh
npm ci
npm run dev
```

Acesse o endereço informado no terminal pelo Vite.

No Windows, caso o PowerShell bloqueie a execução de `npm.ps1`, utilize `npm.cmd` nos comandos.

## Comandos disponíveis

| Comando           | Descrição                               |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Inicia o ambiente de desenvolvimento    |
| `npm test`        | Executa os testes de lógica e interface |
| `npm run build`   | Gera a versão de produção em `dist/`    |
| `npm run preview` | Permite conferir o build localmente     |
| `npm run format`  | Formata o código e a documentação       |

## Organização do código

```text
public/assets/      Recursos visuais
src/
  components/       Componentes de interface
  data/             Dados utilizados pela aplicação
  lib/              Funções de catálogo e validação de mensagens
  pages/            Páginas de detalhes e informações
  App.jsx           Composição da aplicação e navegação
  main.jsx          Inicialização do React
  style.css         Estilos globais e responsivos
tests/              Testes de lógica e interação
```

## Decisões técnicas

- **Componentização:** organização da interface em componentes para facilitar manutenção e evolução.
- **Separação de responsabilidades:** dados e funções de domínio ficam separados da camada de apresentação.
- **Navegação por hash:** acesso às páginas e seções sem exigir regras de reescrita de rotas na hospedagem estática.
- **Estado em React:** controle da seleção de produtos, dos diálogos e das interações com hooks.
- **Acessibilidade:** uso de elementos semânticos, rótulos de formulário e gerenciamento de foco nos fluxos de navegação e diálogo.

## Validação

A suíte de testes abrange filtros, ordenação, comparação de produtos, navegação, controles do carrossel e validação das mensagens de contato. Os testes de interface utilizam jsdom; a avaliação visual e responsiva deve ser realizada também em navegador.

```sh
npm test
npm run build
```

## Escopo e uso

A aplicação é um front-end com dados locais. O fluxo de contato prepara mensagens para envio pelo visitante no WhatsApp, sem armazenamento de leads em banco de dados ou envio automático.

A publicação no portfólio tem finalidade de demonstração técnica. Marcas, imagens e conteúdos comerciais presentes na aplicação pertencem aos seus respectivos titulares; sua disponibilização neste repositório não implica autorização de uso ou redistribuição desses materiais.
