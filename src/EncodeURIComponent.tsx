import { FC } from "react";

export const EncodeURIComponent: FC<{ str: string }> = ({ str }) => {
  const arr = Array.from(str);
  return (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "12px 0", fontWeight: "bold" }}>
        EncodeURIComponent
      </h2>
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
              return (
                <td key={str + "-" + idx}>
                  <code className="code-snippet">
                    encodeURIComponent("{i}") == "
                    <span className="number">{encodeURIComponent(i)}</span>"
                  </code>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
