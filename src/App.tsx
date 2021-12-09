import { useState } from "react";
import { Unicode } from "./Unicode";
import { ASCII } from "./ASCII";
import { UTF8 } from "./UTF8";
import { UTF16 } from "./UTF16";
import { CharCodeAt } from "./charCodeAt";
import { EncodeURIComponent } from "./EncodeURIComponent";
import { Base64 } from "./Base64";
import "./common.less";

const INIT_DISPLAY = {
  ascii: true,
  unicode: true,
  utf8: true,
  utf16: true,
  charCodeAt: true,
  encodeURIComponent: true,
  base64: true,
};
const NO_DISPLAY = {
  ascii: false,
  unicode: false,
  utf8: false,
  utf16: false,
  charCodeAt: false,
  encodeURIComponent: false,
  base64: false,
};
type DisplayKey = keyof typeof INIT_DISPLAY;

export const App = () => {
  const [str, setStr] = useState("Hello world");
  const [display, setDisplay] = useState(INIT_DISPLAY);

  return (
    <div style={{ padding: 10 }}>
      <a
        href="https://docs.google.com/presentation/d/1AMgYMR1T9BFLTvj8u91IFcCBqpPt1prlMdPx7oA3jMQ/edit?usp=sharing"
        target="_blank"
        style={{ marginBottom: 10 }}
      >
        Slide
      </a>
      <div className="settings-container">
        <div>
          <span style={{ marginRight: 10 }}>Input string:</span>
          <input
            value={str}
            onChange={(e) => {
              setStr(e.target.value);
            }}
          />
        </div>
        <div className="example-values">
          <button
            onClick={() => {
              setStr("Aa ()");
            }}
          >
            Aa ()
          </button>
          <button
            onClick={() => {
              setStr("😘新垣结衣😍");
            }}
          >
            😘新垣结衣😍
          </button>
          <button
            onClick={() => {
              setStr("$¢한𐍈");
            }}
          >
            $¢한𐍈
          </button>
          <button
            onClick={() => {
              setStr("$€𐐷𤭢");
            }}
          >
            $€𐐷𤭢
          </button>
        </div>
      </div>
      <div className="settings-container">
        <div>
          {Object.keys(display).map((key) => (
            <span
              key={key}
              style={{
                marginRight: 10,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={display[key as DisplayKey]}
                onChange={(e) => {
                  const t = { ...display };
                  t[key as DisplayKey] = e.target.checked;
                  setDisplay(t);
                }}
              />
              <span>{key}</span>
            </span>
          ))}
        </div>
        <div className="display-settings">
          <button
            onClick={() => {
              setDisplay(INIT_DISPLAY);
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setDisplay(NO_DISPLAY);
            }}
          >
            None
          </button>
          <button
            onClick={() => {
              const t = { ...NO_DISPLAY };
              t.unicode = true;
              t.utf8 = true;
              setDisplay(t);
            }}
          >
            Unicode+UTF-8
          </button>
          <button
            onClick={() => {
              const t = { ...NO_DISPLAY };
              t.encodeURIComponent = true;
              t.utf8 = true;
              setDisplay(t);
            }}
          >
            UTF-8+encodeURIComponent
          </button>
          <button
            onClick={() => {
              const t = { ...NO_DISPLAY };
              t.charCodeAt = true;
              t.utf16 = true;
              setDisplay(t);
            }}
          >
            UTF-16+charCodeAt
          </button>
          <button
            onClick={() => {
              const t = { ...NO_DISPLAY };
              t.base64 = true;
              setDisplay(t);
            }}
          >
            base64
          </button>
        </div>
      </div>
      {display.ascii && <ASCII str={str} />}
      {display.unicode && <Unicode str={str} />}
      {display.utf8 && <UTF8 str={str} />}
      {display.utf16 && <UTF16 str={str} />}
      {display.charCodeAt && <CharCodeAt str={str} />}
      {display.encodeURIComponent && <EncodeURIComponent str={str} />}
      {display.base64 && <Base64 str={str} />}
    </div>
  );
};
