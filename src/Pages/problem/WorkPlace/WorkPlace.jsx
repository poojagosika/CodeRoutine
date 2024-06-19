import React from "react";
import Split from "react-split";
import Test from "./Test/Test";
import Code from "./Code";

const WorkPlace = () => {
  return (
    <div
      style={{
        backgroundColor: "#262626",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Split
        className="split"
        direction="vertical"
        sizes={[60, 40]}
        minSize={20}
        gutterSize={6}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 70px)",
        }}
      >
        <Code />
        <Test />
      </Split>
    </div>
  );
};

export default WorkPlace;
