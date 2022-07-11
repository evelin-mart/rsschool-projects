import React from 'react';
import { ToyT } from '../../resources/data.types';
import {ToyItem} from '../Toy/ToyItem';

export const Container = ({ current }: { current: ToyT.Toy[] }) => {
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
