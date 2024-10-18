import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`accordion ${show && "active"} ${className}`}>
      <button className="accordion-header" onClick={() => setShow(!show)}>
        {title}
        <div className="accordion-icon min-w-[1.1em] min-h-[1.1em] relative bg-primary rounded-full">
          <div className="w-[2px] h-[60%] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white opacity-100 accordion-icon-active"></div>
          <div className="w-[2px] h-[60%] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-90"></div>
        </div>
      </button>
      <div className="accordion-content">{children}</div>
    </div>
  );
};

export default Accordion;
