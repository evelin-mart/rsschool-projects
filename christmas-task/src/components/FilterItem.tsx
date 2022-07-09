import React from 'react';
type ItemOptions = { option: string };

const FilterItem = ({ option }: ItemOptions) => {
  return <div className='filter__item' data-filter={option}></div>;
};

export default FilterItem;
