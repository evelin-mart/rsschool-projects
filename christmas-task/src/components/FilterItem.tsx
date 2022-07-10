import React, { useState } from 'react';
type ItemOptions = { option: string, onClick: Function };

const FilterItem = ({ option, onClick }: ItemOptions) => {
  const [state, setState] = useState(false);
  const setFilterItem = (value: string) => {
    const temp = !state;
    setState(temp);
    return {
      value: value,
      state: temp
    };
  }
  return (
    <div
      className={['filter__item', state ? 'active' : ''].join(' ')}
      data-filter={option}
      onClick={(e) => onClick(setFilterItem(e.currentTarget.dataset.filter!))}></div>
  );
};

export default FilterItem;
