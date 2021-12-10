import { FC, useState } from "react";
import { padding } from "./utils";

export const Base64: FC<{ str: string }> = ({ str }) => {
  const [target, setTarget] = useState("utf-8");

  const detail: { char: string; value: number[]; bytes: number }[] = [];
  if (target === "utf-8") {
    for (const s of str) {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(s);
      const tmp = [];
      for (let i = 0; i < uint8Array.length; i++) {
        tmp.push(uint8Array[i]);
      }
      detail.push({ char: s, value: tmp, bytes: uint8Array.length });
    }
  } else if (target === "utf-16") {
    for (const s of str) {
      const tmp = [];
      for (let i = 0; i < s.length; i++) {
        tmp.push(s.charCodeAt(i));
      }
      detail.push({ char: s, value: tmp, bytes: s.length * 2 });
    }
  }
  const all = detail
    .map((i) => i.value)
    .reduce((p, c) => [...p, ...c], [])
    .flatMap((i) =>
      Array.from(padding(i.toString(2), target === "utf-8" ? 8 : 16))
    );
  const groupBy6 = (() => {
    const padded = padding(all.join(""), 6, true);
    return (padded.match(/.{6}/g) as string[]).map((i) => Array.from(i));
  })();
  const base64Padding = 4 - (groupBy6.length % 4 || 4);

  return (
    <div style={{ margin: "30px 0" }} className="base64">
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>Base64</h2>
      <select
        style={{ marginBottom: 10 }}
        value={target}
        onChange={(e) => {
          setTarget(e.target.value);
        }}
      >
        <option value="utf-8">UTF-8</option>
        <option value="utf-16">UTF-16</option>
      </select>
      <div className="row no-bottom">
        {detail.map((i, idx) => (
          <div className={`item-${8 * i.bytes}`} key={str + "-" + idx}>
            {i.char}
          </div>
        ))}
      </div>
      <div className="row no-bottom">
        {all.map((i, idx) => (
          <div className="item-1" key={idx}>
            {i}
          </div>
        ))}
      </div>
      <div className="row no-bottom">
        {groupBy6.map((i, idx) => (
          <div className="item-6" key={idx}>
            {i.map((j, idx) => (
              <span key={idx} className="item">
                {j}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="row">
        {groupBy6.map((i, idx) => (
          <div className="item-6 no-item" key={idx}>
            {number2Base64(parseInt(i.join(""), 2))}
          </div>
        ))}
        {Array.from({ length: base64Padding }).map((_, idx) => (
          <div className="item-6 no-item" key={idx}>
            =
          </div>
        ))}
      </div>
    </div>
  );
};

const number2Base64 = (n: number) => {
  if (n >= 0 && n <= 25) return String.fromCharCode("A".charCodeAt(0) + n);
  if (n <= 51) return String.fromCharCode("a".charCodeAt(0) + n - 26);
  if (n <= 61) return n - 52 + "";
  if (n === 62) return "+";
  if (n === 63) return "/";
  return "?";
};
