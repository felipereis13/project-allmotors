export const categories = [
  'Todos',
  'Scooters',
  'Bicicletas',
  'Performance',
  'Triciclos',
];
export const note =
  '* Autonomia máxima informada pela AIMA. Os resultados variam conforme carga, relevo, velocidade, condições de uso e versão. Preços e disponibilidade sob consulta.';
export const range = (model) =>
  model.range ? `Até ${model.range} km` : 'Sob consulta';
export const power = (model) =>
  model.power
    ? `${new Intl.NumberFormat('pt-BR').format(model.power)} W`
    : 'Sob consulta';
export const speed = (model) =>
  model.speed ? `${model.speed} km/h` : 'Consultar versão';
export const specificationRows = [
  ['Autonomia máxima', range],
  ['Potência nominal', power],
  ['Velocidade máxima', speed],
  ['Bateria', (model) => model.battery],
  ['Recarga', (model) => model.charge],
  ['Freios', (model) => model.brakes],
];

export function filterModels(models, { category, query, minRange, sort }) {
  const filtered = models.filter(
    (model) =>
      (category === 'Todos' || model.category === category) &&
      model.name
        .toLocaleLowerCase('pt-BR')
        .includes(query.toLocaleLowerCase('pt-BR')) &&
      (!minRange || (model.range || 0) >= minRange),
  );
  const comparators = {
    name: (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
    range: (a, b) => (b.range || 0) - (a.range || 0),
    power: (a, b) => (b.power || 0) - (a.power || 0),
  };
  return comparators[sort] ? filtered.sort(comparators[sort]) : filtered;
}
