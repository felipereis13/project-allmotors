const assert = require('node:assert/strict');
const test = require('node:test');
const contact = require('../src/lib/contact-message.js');
const unit = { name: 'Piedade', phone: '5581992837374' };
test('product interest keeps the selected model and unit in the WhatsApp URL', () => {
  const url = new URL(contact.url({ model: 'Q5 Dimoon' }, unit));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/5581992837374');
  assert.match(url.searchParams.get('text'), /unidade de Piedade/);
  assert.match(url.searchParams.get('text'), /AIMA Q5 Dimoon/);
});
test('test ride, support and manual requests have distinct messages', () => {
  assert.match(
    contact.message({ model: 'Liberty', topic: 'test ride' }, 'Pina'),
    /agendar um test ride com a AIMA Liberty/,
  );
  assert.match(
    contact.message({ model: 'Liberty', topic: 'assistência' }, 'Olinda'),
    /suporte e orientações de manutenção/,
  );
  assert.match(
    contact.message({ topic: 'manual' }, 'Olinda'),
    /manual e a ficha técnica/,
  );
  assert.doesNotMatch(
    contact.message({ topic: 'assistência' }, 'Pina'),
    /condições de pagamento/,
  );
});
test('missing and invalid numbers never generate a redirect to another unit', () => {
  for (const name of ['Pina', 'Olinda'])
    assert.equal(contact.url({ model: 'X6' }, { name, phone: null }), null);
  assert.equal(contact.url({}, { name: 'Pina', phone: '123' }), null);
  assert.equal(contact.url({}, null), null);
});
test('form input and accents survive URL encoding without changing URL parameters', () => {
  const name = 'João & Maria + teste';
  const url = new URL(
    contact.url(
      { name, state: 'PE', model: 'Kuyan Lítio', topic: 'test ride' },
      unit,
    ),
  );
  assert.equal([...url.searchParams.keys()].length, 1);
  assert.match(url.searchParams.get('text'), /João & Maria \+ teste/);
  assert.match(url.searchParams.get('text'), /Kuyan Lítio/);
});
test('generic contact after a product request does not carry over its model or purpose', () => {
  contact.message({ model: 'X6', topic: 'test ride' }, 'Piedade');
  const message = contact.message({}, 'Olinda');
  assert.doesNotMatch(message, /X6|test ride|Piedade/);
  assert.match(message, /unidade de Olinda/);
});
test('callback request carries phone and preferred time while preserving product and unit', () => {
  const url = new URL(
    contact.url(
      {
        mode: 'callback',
        name: 'Cliente Teste',
        phone: '(81) 99999-0000',
        preferredTime: 'Tarde',
        model: 'Liberty',
        topic: 'test ride',
      },
      unit,
    ),
  );
  const text = url.searchParams.get('text');
  assert.match(text, /entrasse em contato comigo/);
  assert.match(text, /\(81\) 99999-0000/);
  assert.match(text, /Melhor horário para contato: Tarde/);
  assert.match(text, /test ride com a AIMA Liberty/);
  assert.match(text, /unidade de Piedade/);
});
test('Brazilian callback numbers accept DDD and optional country code, reject incomplete numbers', () => {
  for (const valid of [
    '81999990000',
    '(81) 99999-0000',
    '+55 81 99999-0000',
    '8133334444',
  ])
    assert.equal(contact.validPhone(valid), true, valid);
  for (const invalid of ['', '9999', '999990000', '00000000000', 'abc'])
    assert.equal(contact.validPhone(invalid), false, invalid);
});
test('chat mode excludes callback details and does not reuse previous personal data', () => {
  const text = contact.message(
    { mode: 'chat', phone: '81999990000', preferredTime: 'Tarde' },
    'Piedade',
  );
  assert.doesNotMatch(text, /81999990000|Melhor horário|entrasse em contato/);
});

test('all three configured units share general contact and retain the chosen unit', () => {
  const { units } = require('../src/data/units.js');
  assert.equal(units.length, 3);
  for (const unit of units) {
    assert.equal(unit.phone, '5581992837374');
    const link = new URL(contact.url({ model: 'Liberty' }, unit));
    assert.equal(link.pathname, '/5581992837374');
    assert.ok(
      link.searchParams.get('text').includes('unidade de ' + unit.name),
    );
    assert.ok(link.searchParams.get('text').includes('Liberty'));
  }
  assert.ok(
    units
      .find((u) => u.id === 'olinda')
      .address.includes('Carmelita Muniz de Araújo, 105'),
  );
  assert.ok(
    units.find((u) => u.id === 'pina').address.includes('Antônio de Góes, 549'),
  );
});
