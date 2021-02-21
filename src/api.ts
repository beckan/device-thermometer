import express from 'express';

export default (args) => {
    const {
        temperatureSensor, 
        config
    } = args;

    const app = express();

    app.get('/status', (req, res) => {
        res.send({
            temperature: temperatureSensor.getTemperature()
        });
    });

    app.get('/config', (req, res) => {
        res.send(config);
    });

    return new Promise(resolve => {
        app.listen(process.env.API_PORT, () => {
            resolve(true);
        });
    });
};