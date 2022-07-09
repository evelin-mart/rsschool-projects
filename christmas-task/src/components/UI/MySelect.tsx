import React from 'react';
type SelectOptions = {
  options: { value: string; name: string }[];
  value: string;
  onChange: Function;
};

const MySelect = ({ options, value, onChange }: SelectOptions) => {
  return (
    <select
      className='select'
      value={value}
      onChange={(e): void => onChange(e.target.value)}
    >
      <option value='' hidden></option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
