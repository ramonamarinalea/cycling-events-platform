import React from "react";

export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Vertical line */}
      <line
        x1="50"
        y1="5"
        x2="50"
        y2="95"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};