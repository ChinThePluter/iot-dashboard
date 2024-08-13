import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Cardvalue from "../../components/Cardvalue";
import ControlButton from "../../components/ControlButton";
import { API_IOT_SOCKET_PATH, API_CORE_SOCKET } from "../../config";
import { io } from "socket.io-client";
import { Popover } from "antd";
import Draggable from "react-draggable";
import MapItem from "../../components/MapItem";
import DoorFrontIcon from "@mui/icons-material/DoorFront";

const socket = io(API_CORE_SOCKET || "", {
  path: API_IOT_SOCKET_PATH,
  transports: ["websocket"],
  extraHeaders: {
    authorization: "Basic xxx",
  },
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
  const [temp, settemp] = useState(0);
  const [hum, sethum] = useState(0);
  const [door, setdoor] = useState(0);
  const [light , setlight] = useState(0);
  const [car , setcar] = useState(0);

  useEffect(() => {
    // console.log('...SOCKET...', API_CORE_SOCKET, API_CORE_SOCKET_PATH);
    socket.on(`control`, (data: any) => {
      console.log("post ::: ", data);
    });

    socket.on(device_id, (data: any) => {
      console.log("device_id ::: ", device_id, data);
      settemp(data.temp);
      sethum(data.hum);
      setcount((prev) => prev + 1);
      // socket.emit("value", {
      //   device_id: device_id,
      //   value_a: count,
      //   value_b: true,
      //   timestamp: new Date(),
      // });
    });

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", (reason, x) => {
      console.log("Disconnected from server");
      console.log("Reason:", reason, x);
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
    };
  }, []);

  useEffect(() => {
    if (socket.id && count < 3) {
      console.log("....Send", socket.id);
      socket.emit("value", {
        device_id: device_id,
        led_a: "on",
        timestamp: new Date(),
      });
    }
  }, [count]);

  const controlLed = (status: boolean) => {
    console.log("control", status);
    socket.emit("value", {
      device_id: device_id,
      led_a: status ? "on" : "off",
      timestamp: new Date(),
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        sx={{
          textAlign: "-webkit-center",
          paddingTop: 4,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <div>
            <div
              className="container"
              style={{
                width: "auto",
                height: "100vh",
                position: "relative",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(/maps/farmmap.png)`,
              }}
            >
              <MapItem
                x={-200}
                y={200}
                icon="temparature.png"
                content={
                  <Cardvalue
                    title="อุณหภูมิ"
                    value={temp}
                    unit="C"
                    icon="temparature.png"
                    bgColor="#baddff"
                    fontColor="red"
                  />
                }
              />
              <MapItem
                x={300}
                y={320}
                icon="humidity.png"
                content={
                  <Cardvalue
                    title="ความชื้น"
                    value={hum}
                    unit="%"
                    icon="humidity.png"
                    bgColor="#baffc0"
                    fontColor="#490be8"
                  />
                
                }
              />
              <MapItem
                x={200}
                y={450}
                icon="driver.png"
                content={
                  <Cardvalue
                    title="ประตู"
                    value={door}
                    unit=""
                    icon="driver.png"
                    bgColor="#777777"
                    fontColor="#000000"
                  />
                
                }
              />
              <MapItem
                x={-50}
                y={350}
                icon="car.png"
                content={
                  <Cardvalue
                    title="โรงจอดรถ"
                    value={car}
                    unit="C"
                    icon="car.png"
                    bgColor="#baddff"
                    fontColor="red"
                  />
                }
              />
              <MapItem
                x={0}
                y={100}
                icon="on.png"
                content={
                  <Cardvalue
                    title="โคมไฟ"
                    value={light}
                    unit="%"
                    icon="on.png"
                    bgColor="#baffc0"
                    fontColor="#490be8"
                  />
                
                }
              />
            </div>
          </div>
        </Grid>
        <Grid item xl lg={2} md={4} sm xs={12}>
          <Cardvalue
            title="อุณหภูมิ"
            value={temp}
            unit="C"
            icon="temparature.png"
            bgColor="#baddff"
            fontColor="red"
          />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Cardvalue
            title="ความชื้น"
            value={hum}
            unit="%"
            icon="humidity.png"
            bgColor="#baffc0"
            fontColor="#490be8"
          />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Cardvalue
            title="ประตู"
            value={door}
            unit=""
            icon="driver.png"
            bgColor="#825d2e"
            fontColor="#e3a35f"
          />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Cardvalue
            title="โคมไฟ"
            value={light}
            unit=""
            icon="on.png"
            bgColor="#502b5e"
            fontColor="#d161fa"
          />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Cardvalue
            title="รถจอด"
            value={car}
            unit=""
            icon="car.png"
            bgColor="#017d16"
            fontColor="#60e076"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
