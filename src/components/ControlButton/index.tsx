import React, { useState } from "react";
import { Button } from "@mui/material";

interface PropsI {
  status?: boolean;
  openIcon?: string;
  closeIcon?: string;
  openStatus?: string;
  closeStatus?: string;
  openColor?: string;
  closeColor?: string;
  handleChange?: any;
}

function index({
  status = false,
  openIcon,
  closeIcon,
  openStatus = "เปิด",
  closeStatus = "ปิด",
  openColor = "#f8df60",
  closeColor = "gray",
  handleChange,
}: PropsI) {
  const [controlStatus, setcontrolStatus] = useState(false);
  return (
    <Button
      startIcon={
        controlStatus && openIcon ? (
          <img style={{ width: 50 }} src={`/icons/${openIcon}`} />
        ) : !controlStatus && closeIcon ? (
          <img style={{ width: 50 }} src={`/icons/${closeIcon}`} />
        ) : undefined
      }
      size="large"
      sx={{
        height: "100%",
        width: "100%",
        color: "black",
        bgcolor: controlStatus ? openColor : closeColor,
      }}
      onClick={() => {
        setcontrolStatus(!controlStatus);
        if (handleChange) {
          handleChange(!controlStatus);
        }
      }}
    >
      {controlStatus ? openStatus : closeStatus}
    </Button>
  );
}

export default index;
