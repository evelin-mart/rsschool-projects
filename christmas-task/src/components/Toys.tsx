import React from 'react';
import { ToyT } from './data';
import ToyItem from './ToyItem';
type ToysProps = {
  current: ToyT[]
}

const Toys = ({ current }: ToysProps) => {
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
