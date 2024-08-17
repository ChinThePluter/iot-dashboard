import { useState , useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cardvalue from "../../components/Cardvalue";
import MapItem from "../../components/MapItem";
import mqtt from "mqtt";

export default function BasicGrid() {
  const topicMqtt = "chinto-iot-555/#";
  const topicSensorData = "chinto-iot-555/sensorData";
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [hum, sethum] = useState("");
  const [temp, settemp] = useState("");
  const [light, setlight] = useState("");
  const [car, setcar] = useState("");
  const [door, setdoor] = useState("");
  
  useEffect(() => {
    const connectClient = () => {
      const mqttClient = mqtt.connect("ws://broker.emqx.io/mqtt", {
        port: 8083,
      });

      mqttClient.on("connect", () => {
        setIsConnected(true);
        mqttClient.subscribe(topicMqtt);
      });

      mqttClient.on("message", (topic, message) => {
        console.log(topic);
        console.log(message.toString());

        if (topic === topicSensorData) {
          const rawData = message.toString().split(",");
          console.log(rawData);
          sethum(rawData[0]);
          settemp(rawData[1]);
          setlight(rawData[2]);
          setcar(rawData[3]);
          setdoor(rawData[4]);
        }
      });

      mqttClient.on("close", () => {
        console.log("Connection lost, trying to reconnect...");
        setIsConnected(false);
        setTimeout(connectClient, 5000); // Try to reconnect after 5 seconds
      });

      mqttClient.on("offline", () => {
        console.log("Client went offline, trying to reconnect...");
        setIsConnected(false);
        setTimeout(connectClient, 5000); // Try to reconnect after 5 seconds
      });

      setClient(mqttClient);
    };

    connectClient();

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

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
        <Grid item lg={2} md={4} xs={12}>
          <div>
          {!isConnected && <h2>Attempting to reconnect...</h2>}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
