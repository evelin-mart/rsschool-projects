import React, { useState } from 'react';
import ToyItem from './ToyItem';
import { data } from './data';

const Toys = () => {
  const [current, setCurrent] = useState(data);

  return (
    <div className='cards-wrapper'>
      {current.length ? (
        current.map((toy) => <ToyItem {...toy} key={toy.id} />)
      ) : (
        <div className='not-found'>Ничего не найдено!</div>
      )}
    </div>
  );
};

export default Toys;
