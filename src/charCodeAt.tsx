import { FC } from "react";

export const CharCodeAt: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>charCodeAt</h2>
      <table
        className="simple-table"
        style={{ "--td-width": "220px", "--td-height": "30px" } as any}
      >
        <tbody>
          <tr>
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>{i}</td>
            ))}
          </tr>
          <tr>
            {arr.map((i, idx) => {
              const tmp = [];
              for (let j = 0; j < i.length; j++) {
                tmp.push(i.charCodeAt(j));
              }
              return (
                <td key={str + "-" + idx}>
                  {tmp.map((k, idx) => (
                    <code key={idx} className="code-snippet">
                      "{i}".charCodeAt({idx}) =={" "}
                      <span className="number">0x{k.toString(16)}</span>
                    </code>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
