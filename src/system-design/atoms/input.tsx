import React, { ComponentProps } from "react";

interface InputAtomProps extends ComponentProps<"input"> {
  id: string;
}

export default function InputAtom({ id, ...props }: InputAtomProps) {
  return (
    <div>
      <input
        type="text"
        id={id}
        autoComplete="off"
        {...props}
        className="party-container__input"
      />
    </div>
  );
}

