import React, { useState } from 'react';
import { CheckboxFilter } from '../CheckboxFilter/CheckboxFilter';
export type CheckboxFilters = 'color' | 'shape' | 'size';
type FilterItemOptions = {
  filter: CheckboxFilters;
  options: Array<string>;
  onClick: Function
};
type FilterSettings = {
  value: string;
  state: boolean;
};

export const CheckboxGroup = ({ filter, options, onClick }: FilterItemOptions) => {
  const [filterState, setFilterState] = useState<string[]>([]);
  const setFilter = ({ value, state }: FilterSettings) => {
    let temp = filterState
    if (state) {
      temp.push(value);
    } else {
      temp = filterState.filter((i) => i !== value);
    }
    setFilterState(temp);
    onClick(temp.length ? { [filter]: temp } : { [filter]: null });
  };
  return (
    <div className={['filter__items', filter].join(' ')}>
      {options.map((option) => (
        <CheckboxFilter key={option} option={option} onClick={setFilter} />
      ))}
    </div>
  );
};
