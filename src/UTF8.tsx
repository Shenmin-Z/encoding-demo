import { FC } from "react";
import { Wrap, padding } from "./utils";

export const UTF8: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  const detail = arr.map((str) => {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(str);
    const tmp = [];
    for (let i = 0; i < uint8Array.length; i++) {
      tmp.push(uint8Array[i]);
    }
    return tmp;
  });
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>UTF-8</h2>
      <table
        className="simple-table"
        style={{ "--td-width": "150px", "--td-height": "20px" } as any}
      >
        <tbody>
          <tr>
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>{i}</td>
            ))}
          </tr>
          <tr className="uppercase">
            {detail.map((i, idx) => (
              <td key={str + "-" + idx}>
                {i.map((j) => j.toString(16)).join(" ")}
              </td>
            ))}
          </tr>
          <tr>
            {detail.map((i, idx) => (
              <td key={str + "-" + idx}>
                {i.map((n, idx) => (
                  <Wrap key={idx}>
                    <Byte str={n.toString(2)} />
                  </Wrap>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Byte: FC<{ str: string }> = ({ str }) => {
  str = padding(str, 8);
  if (str.startsWith("0")) {
    return (
      <>
        <span className="marker-bits">0</span>
        <span className="code-point-bits">{str.substring(1)}</span>
      </>
    );
  } else if (str.startsWith("10")) {
    return (
      <>
        <span className="marker-bits">10</span>
        <span className="code-point-bits">{str.substring(2)}</span>
      </>
    );
  } else if (str.startsWith("110")) {
    return (
      <>
        <span className="marker-bits">110</span>
        <span className="code-point-bits">{str.substring(3)}</span>
      </>
    );
  } else if (str.startsWith("1110")) {
    return (
      <>
        <span className="marker-bits">1110</span>
        <span className="code-point-bits">{str.substring(4)}</span>
      </>
    );
  } else if (str.startsWith("11110")) {
    return (
      <>
        <span className="marker-bits">11110</span>
        <span className="code-point-bits">{str.substring(5)}</span>
      </>
    );
  } else {
    return <>invalid!</>;
  }
};

// let cc = str.charCodeAt(0);
// if (!cc) return [-1];
// if (cc < 0x80) {
//   return [cc];
// } else if (cc < 0x800) {
//   return [0xc0 | (cc >> 6), 0x80 | (cc & 0x3f)];
// } else if (cc < 0xd800 || cc >= 0xe000) {
//   return [0xe0 | (cc >> 12), 0x80 | ((cc >> 6) & 0x3f), 0x80 | (cc & 0x3f)];
// }
// // surrogate pair
// else {
//   // UTF-16 encodes 0x10000-0x10FFFF by
//   // subtracting 0x10000 and splitting the
//   // 20 bits of 0x0-0xFFFFF into two halves
//   cc = 0x10000 + (((cc & 0x3ff) << 10) | (str.charCodeAt(1) & 0x3ff));
//   return [
//     0xf0 | (cc >> 18),
//     0x80 | ((cc >> 12) & 0x3f),
//     0x80 | ((cc >> 6) & 0x3f),
//     0x80 | (cc & 0x3f),
//   ];
// }
