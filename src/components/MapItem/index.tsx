import React from "react";
import { Popover } from "antd";
import Draggable from "react-draggable";
interface PropsI {
  icon: string;
  content: any;
  x: number;
  y: number;
}
function index({ icon, content, x, y }: PropsI) {
  return (
    <div>
      <Draggable
        key={icon}
        axis="both"
        disabled={true}
        allowAnyClick={true}
        defaultPosition={{
          x: x,
          y: y,
        }}
        grid={[3, 3]}
        scale={1}
        bounds="parent"
      >
        <div>
          <Popover
            // trigger={"click"}
            content={content}
            children={<img style={{ width: 50 }} src={`/icons/${icon}`} />}
          />
        </div>
      </Draggable>
    </div>
  );
}

export default index;
