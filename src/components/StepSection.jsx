import React, { forwardRef } from "react";

const StepSection = forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="step flex flex-col justify-center min-h-screen px-6 py-20 pb-32"
    >
      <div className="flex flex-col items-center justify-center flex-grow space-y-6 max-w-3xl mx-auto text-burgundy text-[1.175rem] leading-relaxed">
        {children}
      </div>
    </div>
  );
});

export default StepSection;
