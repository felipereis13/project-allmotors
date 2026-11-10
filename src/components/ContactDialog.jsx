import { useState } from 'react';
import { units } from '../data/units.js';
import { message, normalize, url, validPhone } from '../lib/contact-message.js';
import { Dialog } from './UI.jsx';

export default function ContactDialog({ context, onClose }) {
  const [fields, setFields] = useState(() => ({
    ...normalize(context),
    unitId: context.unitId || '',
    consent: false,
  }));
  const update = (values) =>
    setFields((current) => ({ ...current, ...values }));
  const callback = fields.mode === 'callback';
  const current = normalize({
    ...context,
    mode: fields.mode,
    name: callback ? fields.name : context.name,
    phone: callback ? fields.phone : '',
    preferredTime: callback ? fields.preferredTime : '',
  });
  const unit = units.find((item) => item.id === fields.unitId);
  const phoneValid = validPhone(fields.phone);
  const ready =
    !callback || (fields.name.trim() && phoneValid && fields.consent);
  const link = unit ? url(current, unit) : null;
  const enabled = Boolean(ready && link);
  const topic =
    {
      'test ride': 'Solicitação de test ride',
      assistência: 'Suporte e manutenção',
      manual: 'Manuais e ficha técnica',
    }[current.topic] || 'Informações e condições de compra';
  const status = !unit
    ? 'Escolha Piedade, Pina ou Olinda para continuar.'
    : !link
      ? `O contato por WhatsApp da unidade de ${unit.name} ainda não está disponível neste site.`
      : !ready
        ? 'Preencha seu nome e WhatsApp com DDD e marque a opção de receber contato.'
        : callback
          ? 'Envie a mensagem no WhatsApp para solicitar o retorno. O horário depende da disponibilidade da equipe.'
          : 'A mensagem será preenchida no WhatsApp. Você revisa e envia para a unidade.';
  return (
    <Dialog
      id="unit-dialog"
      titleId="unit-title"
      descriptionId="unit-context"
      initialFocusSelector={'input[name="unit"]:checked, input[name="unit"]'}
      onClose={onClose}
    >
      <div className="eyebrow">ATENDIMENTO ALL MOTORS</div>
      <h2 id="unit-title">Vamos conversar?</h2>
      <p className="unit-intro" id="unit-context">
        {topic}
        {current.model ? ` · AIMA ${current.model}` : ''}. Escolha a unidade e a
        melhor forma de conversar.
      </p>
      <form
        id="unit-choice-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (enabled) window.open(link, '_blank', 'noopener,noreferrer');
        }}
      >
        <fieldset>
          <legend>Como prefere ser atendido?</legend>
          <div className="contact-mode">
            <label>
              <input
                type="radio"
                name="mode"
                value="chat"
                checked={!callback}
                onChange={() => update({ mode: 'chat' })}
              />
              <span>
                <strong>Conversar agora</strong>
                <small>Abrir o WhatsApp da unidade.</small>
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="callback"
                checked={callback}
                onChange={() => update({ mode: 'callback' })}
              />
              <span>
                <strong>Quero receber contato</strong>
                <small>Informar telefone e melhor horário.</small>
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Unidade:</legend>
          <div className="unit-options">
            {units.map((unit) => (
              <label key={unit.id} className="unit-option">
                <input
                  type="radio"
                  name="unit"
                  value={unit.id}
                  required
                  checked={fields.unitId === unit.id}
                  onChange={() => update({ unitId: unit.id })}
                />
                <span>
                  <strong>{unit.name}</strong>
                  <small>{unit.address || unit.location}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {callback && (
          <div className="callback-fields">
            <label>
              Seu nome <span className="visually-hidden">obrigatório</span>
              <input
                name="callbackName"
                autoComplete="given-name"
                maxLength={80}
                required
                placeholder="Como podemos chamar você?"
                value={fields.name}
                onChange={(event) => update({ name: event.target.value })}
              />
            </label>
            <label>
              Seu WhatsApp <span className="visually-hidden">obrigatório</span>
              <input
                name="callbackPhone"
                autoComplete="tel"
                type="tel"
                inputMode="tel"
                maxLength={22}
                required
                placeholder="(81) 99999-9999"
                aria-describedby="callback-phone-hint"
                aria-invalid={fields.phone.length > 0 && !phoneValid}
                value={fields.phone}
                onChange={(event) => update({ phone: event.target.value })}
              />
              <span className="field-hint" id="callback-phone-hint">
                Informe o DDD e o número.
              </span>
            </label>
            <label className="wide">
              Melhor horário para contato
              <select
                name="preferredTime"
                value={fields.preferredTime}
                onChange={(event) =>
                  update({ preferredTime: event.target.value })
                }
              >
                <option value="">Sem preferência</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </label>
            <label className="consent-label wide">
              <input
                type="checkbox"
                name="callbackConsent"
                required
                checked={fields.consent}
                onChange={(event) => update({ consent: event.target.checked })}
              />
              <span>
                Quero receber contato da All Motors sobre esta solicitação. Meus
                dados serão incluídos na mensagem que enviarei à unidade.
              </span>
            </label>
          </div>
        )}
        <div className="unit-message-box">
          <span>Sua mensagem no WhatsApp</span>
          <p id="unit-message-preview">
            {unit
              ? message(current, unit.name)
              : 'Selecione uma unidade para visualizar a mensagem.'}
          </p>
        </div>
        <p
          id="unit-status"
          className={`unit-status${unit && !link ? ' pending' : ''}`}
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <div className="unit-footer">
          <button
            className="outline"
            type="button"
            id="unit-cancel"
            onClick={onClose}
          >
            Voltar
          </button>
          <a
            className="btn"
            id="unit-continue"
            role="link"
            href={enabled ? link : undefined}
            aria-disabled={enabled ? undefined : true}
            tabIndex={enabled ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (!enabled) event.preventDefault();
            }}
          >
            {callback
              ? 'Enviar solicitação de contato ↗'
              : 'Continuar para o WhatsApp ↗'}
          </a>
        </div>
      </form>
    </Dialog>
  );
}
