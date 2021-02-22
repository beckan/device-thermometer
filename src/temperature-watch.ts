import axios from "axios";
import printMessage from "./utils/print-message";
import {Config} from './index';

type argsType = {
    temperature: number; 
    config: Config;
}

const temperatureWatch = ({temperature, config}: argsType): void => {
    printMessage.message(`Current temperature: ${temperature}°C`);

    axios.post(config.dataEndpoint, {
        device: config.deviceId,
        unit: 'celcius',
        value: temperature,
        date: Date.now()
    });
};

export default temperatureWatch;