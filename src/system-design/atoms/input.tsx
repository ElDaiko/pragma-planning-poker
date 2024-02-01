import React, { ComponentProps } from "react";

interface InputAtomProps extends ComponentProps<"input"> {
  id: string;
}

export default function InputAtom({ id, ...props }: InputAtomProps) {
  return (
    <div className="input">
      <input
        type="text"
        id={id}
        name={id}
        autoComplete="off"
        {...props}
        className="party-container__input"
      />
    </div>
  );
}

