import { FC } from "react";

export const Wrap: FC = ({ children }) => {
  return (
    <span
      style={{
        border: "1px solid #ccc",
        background: "#eee",
        margin: 5,
        display: "block",
      }}
    >
      {children}
    </span>
  );
};

export const InlineWrap: FC = ({ children }) => {
  return (
    <span
      style={{
        border: "1px solid #ccc",
        background: "#eee",
        margin: "5px 2px",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

export const padding = (s: string, length: number, end = false) => {
  const n = Math.ceil(s.length / length);
  return end ? s.padEnd(n * length, "0") : s.padStart(n * length, "0");
};
