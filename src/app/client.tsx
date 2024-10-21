"use client";
import { useState } from "react";

export function Client() {
  const [i, setState] = useState(0);
  return (
    <span>
      Client {i}{" "}
      <button className="bg-foreground text-background" onClick={() => setState((v) => v + 1)}>
        Increment
      </button>
    </span>
  );
}
