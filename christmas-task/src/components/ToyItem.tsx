import React from 'react';
import { ToyT } from './data';

const ToyItem = (toy: ToyT) => {
  const { id, name, count, price, year, shape, color, size } = toy;
  const src = `./assets/toys/${id}.png`;
  return (
    <div className='toy-card' data-id={id}>
      <h3 className='toy-card__header'>{name}</h3>
      <div className='toy-card__description'>
        <img className='toy__img' src={src} alt={name}></img>
        <div className='toy-description'>
          <p>Год: {year}</p>
          <p>Форма: {shape}</p>
          <p>Цвет: {color}</p>
          <p>Размер: {size}</p>
          <p>Количество: {count}</p>
        </div>
      </div>
      <div className='price'>${price}</div>
    </div>
  );
};

export default ToyItem;
