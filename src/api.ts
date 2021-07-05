import express from "express";
import cors from "cors";

export default (args) => {
  const { temperatureSensor, config } = args;

  const app = express();

  app.use(cors());

  app.get("/status", (req, res) => {
    res.send({
      temperature: temperatureSensor.getTemperature(),
    });
  });

  app.get("/config", (req, res) => {
    res.send(config);
  });

  return new Promise((resolve) => {
    app.listen(config.apiPort, () => {
      resolve(true);
    });
  });
};
