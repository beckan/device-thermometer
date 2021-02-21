import printMessage from './utils/print-message';
import getTemperatureSensor from './utils/get-temperature-sensor';
import { Sensor } from 'w1temp';
import { Gpio } from 'onoff';
import startApi from './api';
import temperatureWatch from './temperature-watch';
import onApplicationExit from './utils/on-application-exit';
import doesConfigFileExist from './utils/does-config-file-exist';

require('dotenv').config();
const packageJSON = require('../package.json');

export interface Config {
    apiPort: number;
    temperaturePollIntervall: number;
    dataEndpoint: string;
    deviceId: string;
    gpioPowerLed: number;
}

const app = async () => {
    printMessage.splash(`Welcome to ${packageJSON.name} ${packageJSON.version}`);

    if (!doesConfigFileExist()) {
        printMessage.error('Can\'t find .config.json file... Create it and try again.');
        return;
    }

    const config: Config = require('../.config.json');
    const gpioPowerLed = new Gpio(Number(config.gpioPowerLed), 'out');

    printMessage.heading('Get temperature sensor');
    const temperatureSensor: Sensor = await getTemperatureSensor(Number(config.temperaturePollIntervall));

    printMessage.success('[DONE]');

    printMessage.heading('Starting API');

    await startApi({
        temperatureSensor,
        config
    });

    printMessage.success('[DONE]');

    temperatureSensor.on('change', temperature => {
        temperatureWatch({temperature, config});
    });

    gpioPowerLed.writeSync(Gpio.HIGH);

    printMessage.message('The thermometer is up and running');

    onApplicationExit(() => {
        gpioPowerLed.writeSync(Gpio.LOW);
    });
};

app().catch((error) => {
    printMessage.error('[ERROR]');
    console.log(error);
    process.exit(1);
});