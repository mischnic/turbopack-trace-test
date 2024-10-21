"use client";

import CountUpInner from "react-countup";

export const CountUp = (props) => (
  <CountUpInner {...props}>
    {({ countUpRef, start }) => (
      <div>
        <span ref={countUpRef} />
      </div>
    )}
  </CountUpInner>
);
