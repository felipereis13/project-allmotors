import { useState } from 'react';
import { models } from '../data/products.js';
import { power, range } from '../lib/catalog.js';

const slides = [
  {
    model: models[0],
    word: 'Q5',
    lines: ['Seu próximo', 'movimento', 'é elétrico.'],
    description:
      'Design que inspira. Tecnologia que simplifica. Encontre sua próxima AIMA na All Motors.',
  },
  {
    model: models[1],
    word: 'LIBERTY',
    lines: ['Liberdade', 'para viver', 'a cidade.'],
    description:
      'Mais autonomia e conforto para transformar os trajetos de todos os dias.',
  },
  {
    model: models[5],
    word: 'X6',
    lines: ['Vá além.', 'Sinta uma', 'nova energia.'],
    description: 'Conheça o desempenho e a tecnologia da AIMA X6.',
  },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const { model, word, lines, description } = slides[slide];
  return (
    <>
      <div id="hero-container">
        <section
          className="hero"
          aria-roledescription="carrossel"
          aria-label="Modelos em destaque"
        >
          <div key={`copy-${slide}`} className="hero-copy hero-panel">
            <div className="eyebrow">
              AIMA NA ALL MOTORS · MOBILIDADE ELÉTRICA
            </div>
            <h1>
              {lines[0]}
              <br />
              {lines[1]}
              <br />
              <em>{lines[2]}</em>
            </h1>
            <p>{description}</p>
            <a href={`#modelo/${model.id}`} className="btn">
              Conheça a {model.name}
              <span>↗</span>
            </a>
          </div>
          <div key={`art-${slide}`} className="hero-art hero-panel">
            <div className="hero-word">{word}</div>
            <img src={`/assets/${model.image}`} alt={`AIMA ${model.name}`} />
            <div className="hero-tag">
              <div>
                <b>{range(model)}*</b>
                <span>de autonomia</span>
              </div>
              <div>
                <b>{power(model)}</b>
                <span>de potência</span>
              </div>
            </div>
          </div>
          <span className="hero-side">ALL MOTORS · ENERGIA QUE MOVE VIDAS</span>
          <div className="hero-pagination">
            <span className="slide-num">0{slide + 1} / 03</span>
            {slides.map((_, index) => (
              <button
                key={index}
                className={slide === index ? 'active' : ''}
                aria-current={slide === index ? 'true' : 'false'}
                aria-label={`Mostrar destaque ${index + 1}`}
                onClick={() => setSlide(index)}
              />
            ))}
            <div className="hero-controls">
              <button
                className="hero-slide-arrow"
                aria-label="Destaque anterior"
                onClick={() => setSlide((slide + 2) % 3)}
              >
                ‹
              </button>
              <button
                className="hero-slide-arrow"
                aria-label="Próximo destaque"
                onClick={() => setSlide((slide + 1) % 3)}
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
      <p
        id="carousel-status"
        className="visually-hidden"
        role="status"
        aria-live="polite"
      >
        Destaque {slide + 1} de 3: AIMA {model.name}
      </p>
    </>
  );
}
