import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Cardvalue from "../../components/Cardvalue";
import { API_IOT_SOCKET_PATH, API_CORE_SOCKET } from "../../config";
import { io } from "socket.io-client";

const socket = io(API_CORE_SOCKET || "", {
  path: API_IOT_SOCKET_PATH,
  transports: ["websocket"],
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const device_id = "device_001";

export default function BasicGrid() {
  const [count, setcount] = useState(1);
  useEffect(() => {
    // console.log('...SOCKET...', API_CORE_SOCKET, API_CORE_SOCKET_PATH);
    socket.on(`control`, (data: any) => {
      console.log("post ::: ", data);
    });

    socket.on(device_id, (data: any) => {
      console.log("device_id ::: ", device_id, data);
      setcount(prev => prev+1)
    });

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from server");
      console.log("Reason:", reason);
    });

    socket.on("error", (error) => {
      console.log("Socket error:", error);

      // Check for specific error and log details
      if (error.message && error.stack) {
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
      }

      // Log additional context or data if available
    });

    // socket.emit("control", {
    //   device_id: device_id,
    //   value: count,
    //   timestamp: new Date(),
    // });

    return () => {
      socket.off("control");
      socket.off("value");
      socket.off(device_id);
      //   socket.off("value");
    };
  }, []);


  useEffect(() => {
    // socket.emit("control", {
    //   device_id: device_id,
    //   value_a: count,
    //   value_b: true,
    //   timestamp: new Date(),
    // });
  }, [count])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        sx={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}
        container
        spacing={2}
      >
        <Grid item xl lg={3} md={4} sm xs={12}>
          <Cardvalue
            title="อุณหภูมิ"
            value={25}
            unit="C"
            icon="info.png"
            bgColor="#baddff"
            fontColor="red"
          />
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Cardvalue
            title="ความสว่าง"
            value={10}
            unit="lumen"
            icon="help.png"
            bgColor="#baffc0"
            fontColor="#490be8"
          />
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Item>C</Item>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Item>D</Item>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Item>E</Item>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Item>F</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
