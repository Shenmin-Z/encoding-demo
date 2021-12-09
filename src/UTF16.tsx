import { FC } from "react";
import { padding, InlineWrap } from "./utils";

export const UTF16: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  const detail = arr.map((str) => {
    const tmp = [];
    for (let i = 0; i < str.length; i++) {
      tmp.push(str.charCodeAt(i));
    }
    return tmp;
  });
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>UTF-16</h2>
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
            {detail.map((i, idx) => {
              let content = "?";
              if (i.length === 1) content = padding(i[0].toString(16), 4);
              if (i.length === 2)
                content = i[0].toString(16) + " " + i[1].toString(16);
              return <td key={str + "-" + idx}>{content}</td>;
            })}
          </tr>
          <tr>
            {detail.map((i, idx) => {
              let content = <span>?</span>;
              if (i.length === 1) {
                const str = padding(i[0].toString(2), 16);
                content = (
                  <>
                    <InlineWrap>
                      <span className="code-point-bits">
                        {str.substring(0, 8)}
                      </span>
                    </InlineWrap>
                    <InlineWrap>
                      <span className="code-point-bits">
                        {str.substring(8)}
                      </span>
                    </InlineWrap>
                  </>
                );
              }
              if (i.length === 2) {
                content = (
                  <>
                    <InlineWrap>
                      <span className="marker-bits">
                        {i[0].toString(2).substring(0, 6)}
                      </span>
                      <span className="code-point-bits">
                        {i[0].toString(2).substring(6, 8)}
                      </span>
                    </InlineWrap>
                    <InlineWrap>
                      <span className="code-point-bits">
                        {i[0].toString(2).substring(8)}
                      </span>
                    </InlineWrap>
                    <br />
                    <InlineWrap>
                      <span className="marker-bits">
                        {i[1].toString(2).substring(0, 6)}
                      </span>
                      <span className="code-point-bits">
                        {i[1].toString(2).substring(6, 8)}
                      </span>
                    </InlineWrap>
                    <InlineWrap>
                      <span className="code-point-bits">
                        {i[1].toString(2).substring(8)}
                      </span>
                    </InlineWrap>
                  </>
                );
              }
              return <td key={str + "-" + idx}>{content}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// let cc = str.codePointAt(0);
// if (!cc) return { type: "error", value: [0] };
// if (cc <= 0xd7ff || (cc >= 0xe000 && cc <= 0xffff)) {
//   return { type: "1", value: [cc] };
// }
// if (cc >= 0x010000 && cc <= 0x10ffff) {
//   const U = cc - 0x10000;
//   const yy = (U & 0b11111111110000000000) >> 10;
//   const xx = U & 0b1111111111;
//   const w1 = 0b1101100000000000 | yy;
//   const w2 = 0b1101110000000000 | xx;
//   return { type: "2", value: [w1, w2] };
// }
// return { type: "error", value: [0] };
