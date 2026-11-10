import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

describe('catálogo e navegação', () => {
  it('mostra os 14 modelos, filtra e limpa a busca ao selecionar Todos', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(
      screen
        .getAllByRole('article')
        .filter((node) => node.classList.contains('model-card')),
    ).toHaveLength(14);
    await user.type(
      screen.getByRole('searchbox', { name: 'Buscar modelo' }),
      'Liberty',
    );
    expect(
      screen.getAllByRole('checkbox', { name: /^Comparar / }),
    ).toHaveLength(1);
    await user.click(
      screen.getByRole('button', { name: 'Todos', exact: true }),
    );
    expect(screen.getByRole('searchbox').value).toBe('');
    expect(
      screen.getAllByRole('checkbox', { name: /^Comparar / }),
    ).toHaveLength(14);
    await user.click(
      screen.getByRole('button', { name: 'Triciclos', exact: true }),
    );
    expect(
      screen.getAllByRole('checkbox', { name: /^Comparar / }),
    ).toHaveLength(2);
  });

  it('combina autonomia, ordenação e estado vazio no catálogo', async () => {
    window.history.replaceState(null, '', '/#modelos');
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Autonomia mínima' }),
      '80',
    );
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Ordenar modelos' }),
      'range',
    );
    const cards = screen
      .getAllByRole('article')
      .filter((node) => node.classList.contains('model-card'));
    expect(within(cards[0]).getByRole('heading').textContent).toBe(
      'Santa Monica',
    );
    await user.type(screen.getByRole('searchbox'), 'inexistente');
    expect(screen.getByText(/Nenhum modelo encontrado/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Limpar filtros ×' }));
    expect(
      screen.getAllByRole('checkbox', { name: /^Comparar / }),
    ).toHaveLength(14);
  });

  it('mantém o foco nos controles ao trocar o destaque', async () => {
    const user = userEvent.setup();
    render(<App />);
    const next = screen.getByRole('button', { name: 'Próximo destaque' });
    await user.click(next);
    expect(
      screen.getByRole('link', { name: /Conheça a Liberty/ }),
    ).toBeTruthy();
    expect(document.activeElement).toBe(next);
    expect(screen.getByText('Destaque 2 de 3: AIMA Liberty')).toBeTruthy();
  });

  it('limita a comparação a três modelos e sincroniza a limpeza', async () => {
    const user = userEvent.setup();
    render(<App />);
    const checks = screen.getAllByRole('checkbox', { name: /^Comparar / });
    for (const checkbox of checks.slice(0, 4)) await user.click(checkbox);
    expect(checks[3].checked).toBe(false);
    expect(screen.getByText('Compare até três modelos por vez.')).toBeTruthy();
    await user.click(
      screen.getByRole('button', { name: 'Comparar modelos ⇄' }),
    );
    expect(
      within(screen.getByRole('dialog')).getAllByRole('columnheader'),
    ).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'Fechar comparação' }));
    await user.click(screen.getByRole('button', { name: 'Limpar comparação' }));
    expect(checks.every((checkbox) => !checkbox.checked)).toBe(true);
  });

  it('navega do menu e direciona a busca para o campo do catálogo', async () => {
    const user = userEvent.setup();
    render(<App />);
    const menu = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(menu);
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{Escape}');
    expect(menu.getAttribute('aria-expanded')).toBe('false');
    await user.click(screen.getByRole('button', { name: 'Buscar modelos' }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
        'Encontre a sua AIMA.',
      ),
    );
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByRole('searchbox')),
    );
  });

  it('remove modelos duplicados da comparação da página', async () => {
    window.history.replaceState(null, '', '/#comparar');
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Modelo 2' }),
      'q5-dimoon',
    );
    expect(screen.queryByRole('table')).toBeNull();
    expect(
      screen.getByText('Selecione pelo menos dois modelos para comparar.'),
    ).toBeTruthy();
  });
});

describe('atendimento', () => {
  it('só libera retorno com unidade, telefone válido e consentimento, preservando o modelo', async () => {
    window.history.replaceState(null, '', '/#modelo/aima-liberty');
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', {
      name: 'Quero receber contato sobre este modelo ↗',
    });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    const send = within(dialog).getByRole('link', {
      name: 'Enviar solicitação de contato ↗',
    });
    expect(send.hasAttribute('href')).toBe(false);
    await user.click(within(dialog).getByRole('radio', { name: /^Olinda/ }));
    await user.type(
      within(dialog).getByRole('textbox', { name: /Seu nome/ }),
      'João & Maria',
    );
    const phone = within(dialog).getByRole('textbox', { name: /Seu WhatsApp/ });
    await user.type(phone, '123');
    expect(phone.getAttribute('aria-invalid')).toBe('true');
    await user.clear(phone);
    await user.type(phone, '(81) 99999-0000');
    await user.selectOptions(within(dialog).getByRole('combobox'), 'Tarde');
    expect(send.hasAttribute('href')).toBe(false);
    await user.click(within(dialog).getByRole('checkbox'));
    const text = new URL(send.href).searchParams.get('text');
    for (const value of [
      'Olinda',
      'Liberty',
      'João & Maria',
      '(81) 99999-0000',
      'Tarde',
    ])
      expect(text).toContain(value);
    await user.click(within(dialog).getByRole('button', { name: 'Voltar' }));
    expect(document.activeElement).toBe(trigger);
    await user.click(
      screen.getByRole('button', { name: 'Consultar condições ↗' }),
    );
    expect(screen.queryByRole('textbox', { name: /Seu WhatsApp/ })).toBeNull();
    expect(
      document.querySelector('#unit-message-preview').textContent,
    ).not.toContain('João');
  });

  it('leva nome, estado, modelo e assunto do formulário para o WhatsApp da unidade', async () => {
    const user = userEvent.setup();
    render(<App />);
    const form = document.querySelector('#contact-form');
    await user.type(within(form).getByRole('textbox'), 'Ana');
    await user.selectOptions(
      within(form).getByRole('combobox', { name: 'Seu estado' }),
      'PE',
    );
    await user.selectOptions(
      within(form).getByRole('combobox', { name: /Qual modelo/ }),
      'Liberty',
    );
    await user.selectOptions(
      within(form).getByRole('combobox', { name: 'Atendimento', exact: true }),
      'test ride',
    );
    await user.click(
      within(form).getByRole('button', { name: /Conversar com a All Motors/ }),
    );
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('radio', { name: /^Pina/ }));
    const text = new URL(
      within(dialog).getByRole('link', { name: 'Continuar para o WhatsApp ↗' })
        .href,
    ).searchParams.get('text');
    for (const value of ['Ana', 'PE', 'Pina', 'test ride com a AIMA Liberty'])
      expect(text).toContain(value);
  });
});
