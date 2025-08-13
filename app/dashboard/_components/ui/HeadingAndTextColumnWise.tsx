import React from "react";

interface Props {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

const HeadingAndTextColumnWise = ({ heading, text, children }: Props) => {
  return (
    <div className="grid grid-cols-10 gap-4 mb-4 text-sm print:break-inside-avoid">
      <div className="col-span-2 text-slate-700 ">{heading}</div>
      <div className="col-span-8 whitespace-pre-line">
        {children ? children : text}
      </div>
    </div>
  );
};

export default HeadingAndTextColumnWise;
