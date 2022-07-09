import React from 'react';
import FilterItem from './FilterItem'
type CheckboxFilters = 'color' | 'shape' | 'size';
type FilterItemOptions = {
  filter: CheckboxFilters;
  options: Array<string>;
};

const GroupFilterItem = ({ filter, options }: FilterItemOptions) => {
  return (
    <div className={['filter__items', filter].join(' ')}>
      {options.map((option) => (
        <FilterItem key={option} option={option}/>
      ))}
    </div>
  );
};

export default GroupFilterItem;
