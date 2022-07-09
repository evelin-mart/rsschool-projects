import React, { ChangeEventHandler } from 'react';
type InputOptions = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className: string;
  placeholder: string;
  props?: { [x: string]: string }[];
};

const MyTextInput = (props: InputOptions) => {
  return <input type='text' {...props} />;
};

export default MyTextInput;
