import React, { useState } from 'react';
import FilterItem from './FilterItem';
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

const GroupFilterItem = ({ filter, options, onClick }: FilterItemOptions) => {
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
        <FilterItem key={option} option={option} onClick={setFilter} />
      ))}
    </div>
  );
};

export default GroupFilterItem;
