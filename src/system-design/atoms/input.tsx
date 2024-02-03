import React, { ComponentProps } from "react";

interface InputAtomProps extends ComponentProps<"input"> {
  id: string;
}

export default function InputAtom({ id, className, ...props }: InputAtomProps) {
  return (
    <div>
      <input
        type="text"
        id={id}
        autoComplete="off"
        {...props} 
        className={`global-container__input ${className}`}
      />
    </div>
  );
}

