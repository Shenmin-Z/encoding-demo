import { FC } from "react";
import { Wrap, padding } from "./utils";

export const Unicode: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>Unicode</h2>
      <table
        className="simple-table"
        style={{ "--td-width": "150px", "--td-height": "30px" } as any}
      >
        <tbody>
          <tr>
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>{i}</td>
            ))}
          </tr>
          <tr className="uppercase">
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>
                {padding(i.codePointAt(0)?.toString(16) || "", 2)}
              </td>
            ))}
          </tr>
          <tr>
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>
                {withPadding(i.codePointAt(0)?.toString(2))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const withPadding = (s: string | undefined) => {
  if (!s) s = "";
  s = padding(s, 8);
  return s.match(/.{8}/g)?.map((i, idx) => <Wrap key={idx}>{i}</Wrap>);
};
