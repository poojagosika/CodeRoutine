import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import CodeIcon from "@mui/icons-material/Code";
import { Button, Stack, Tab, Tabs, Typography } from "@mui/material";
const Code = () => {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <div
      style={{ backgroundColor: "#1e1e1e", width: "100%", overflow: "auto" }}
    >
      <Stack
        justifyContent="space-between"
        direction="row"
        style={{ backgroundColor: "#333333" }}
      >
        <Button startIcon={<CodeIcon style={{ color: "#25ac3e" }} />}>
          <p style={{ color: "#e9f5f5" }}> Code</p>
        </Button>
      </Stack>

      <CodeMirror
        value={value}
        theme={vscodeDark}
        style={{ fontSize: "12px" }}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
};

export default Code;
