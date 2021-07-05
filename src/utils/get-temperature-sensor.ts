import { getSensorsUids, getSensor, Sensor } from "w1temp";

const getTemperatureSensor = async (pollInterval: number) => {
  const sensors = await getSensorsUids();
  return <Sensor>await getSensor(sensors.pop(), true, pollInterval, false);
};

export default getTemperatureSensor;
