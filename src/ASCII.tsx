import { FC } from "react";

export const ASCII: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>ASCII</h2>
      <table
        className="simple-table"
        style={{ "--td-width": "30px", "--td-height": "30px" } as any}
      >
        <tbody>
          <tr>
            {arr.map((i, idx) => (
              <td key={str + "-" + idx}>{i}</td>
            ))}
          </tr>
          <tr className="uppercase">
            {arr.map((i, idx) => {
              const ok = /^[\x00-\x7F]*$/.test(i);
              return (
                <td key={str + "-" + idx}>
                  {ok ? i.charCodeAt(0).toString(16) : "?"}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
