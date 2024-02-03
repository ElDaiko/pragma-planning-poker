import React, { ComponentProps } from "react";

interface InputAtomProps extends ComponentProps<"input"> {
  id: string;
}

export default function InputAtom({ id, className, ...props }: InputAtomProps) {
  return (
    <>
      <input
        type="text"
        id={id}
        autoComplete="off"
        {...props} 
        className={`global__input ${className}`}
      />
    </>
  );
}

