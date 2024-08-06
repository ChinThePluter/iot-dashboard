import React from "react";
import { Card, Stack, Typography } from "@mui/material";
import { Person2Rounded } from "@mui/icons-material";

type propsType = {
  title: string;
  value: number;
  unit: string;
  icon: string;
  bgColor: string;
  fontColor?: string;
};

function index({ title, value, unit, icon, bgColor, fontColor='black' }: propsType) {
  return (
    <Card sx={{ padding: 1, backgroundColor: bgColor }}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <img src={`/icons/${icon}`} style={{ width: 60, height: "auto" }} />
        <Stack direction={"column"} spacing={2} justifyContent={"end"}>
          <Typography variant="h6" color={fontColor}>
            {title}
          </Typography>
          <Stack direction={"row"} spacing={2} justifyContent={"end"}>
            <Typography color={fontColor} variant="body1">
              {value}
            </Typography>
            <Typography color={fontColor} variant="body2">
              {unit}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default index;
