import React, { MouseEventHandler } from 'react';

type ButtonOptions = {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: string;
  props?: { [x: string]: string }[];
};

const MyButton = ({ className, children, ...props }: ButtonOptions) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default MyButton;
