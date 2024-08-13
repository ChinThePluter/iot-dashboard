import mqtt from "mqtt";
import React, { useState, useEffect } from "react";

const PubSubDashboard = () => {
    const topicMqtt = "chinto-iot-555/#"
    const topicSensorData = "chinto-iot-555/sensorData";
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState(null);
    const [moisturePercent, setMoisturePercent] = useState("");
    const [temperatureC, setTemperatureC] = useState("");
    const [ledBrightness, setLedBrightness] = useState("");
    const [distanceCar, setDistanceCar] = useState("");
    const [doorState, setDoorState] = useState("");
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
                    setMoisturePercent(rawData[0]);
                    setTemperatureC(rawData[1]);
                    setLedBrightness(rawData[2]);
                    setDistanceCar(rawData[3]);
                    setDoorState(rawData[4]);

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
        <div>
            <h1>Moisture Percent: {moisturePercent}</h1>
            <h1>temperature : {temperatureC}</h1>
            <h1>LED Brightness: {ledBrightness}</h1>
            <h1>Distance Car: {distanceCar}</h1>
            <h1>Door State: {doorState}</h1>
            {!isConnected && <h2>Attempting to reconnect...</h2>}
        </div>
    );
};

export default PubSubDashboard;