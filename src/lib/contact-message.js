export function normalize(context = {}) {
  return {
    model: String(context.model || '').trim(),
    topic: String(context.topic || 'informações'),
    name: String(context.name || '').trim(),
    state: String(context.state || '').trim(),
    mode: context.mode === 'callback' ? 'callback' : 'chat',
    phone: String(context.phone || '').trim(),
    preferredTime: String(context.preferredTime || '').trim(),
  };
}

export function validPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return /^(?:55)?[1-9]\d{9,10}$/.test(digits);
}

export function message(context, unitName) {
  const c = normalize(context);
  const lines = [
    `Olá, All Motors! Gostaria de atendimento na unidade de ${unitName}.`,
  ];

  if (c.name) {
    lines.push(`Meu nome é ${c.name}${c.state ? ', sou de ' + c.state : ''}.`);
  }
  if (c.mode === 'callback') {
    lines.push(
      `Gostaria que a equipe entrasse em contato comigo pelo WhatsApp: ${c.phone}.`,
    );
    if (c.preferredTime)
      lines.push(`Melhor horário para contato: ${c.preferredTime}.`);
  }
  if (c.topic === 'test ride') {
    lines.push(
      c.model
        ? `Gostaria de agendar um test ride com a AIMA ${c.model}.`
        : 'Gostaria de agendar um test ride e conhecer os modelos AIMA.',
    );
  } else if (c.topic === 'assistência') {
    lines.push(
      c.model
        ? `Preciso de suporte e orientações de manutenção para a minha AIMA ${c.model}.`
        : 'Preciso de suporte e orientações sobre revisões e manutenção da minha AIMA.',
    );
  } else if (c.topic === 'manual') {
    lines.push(
      c.model
        ? `Gostaria de solicitar o manual e a ficha técnica da AIMA ${c.model}.`
        : 'Gostaria de solicitar o manual e a ficha técnica do meu modelo AIMA.',
    );
  } else if (c.model) {
    lines.push(
      `Tenho interesse na AIMA ${c.model}. Gostaria de confirmar a disponibilidade, a ficha técnica e as condições de pagamento.`,
    );
  } else {
    lines.push(
      'Gostaria de conhecer os modelos AIMA, a disponibilidade e as condições de pagamento.',
    );
  }
  return lines.join('\n\n');
}

export function url(context, unit) {
  if (!unit || !/^55\d{10,11}$/.test(String(unit.phone || ''))) return null;
  return `https://wa.me/${unit.phone}?text=${encodeURIComponent(message(context, unit.name))}`;
}
