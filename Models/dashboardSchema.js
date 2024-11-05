const mongoose = require('mongoose');

const dashboardDataSchema = new mongoose.Schema({
    temperature: {
        type: String,
        required: true
    },
    windSpeedPeak: {
        type: String,
        required: true
    },
    windSpeedAvg: {
        type: String,
        required: true
    },
    windDirection: {
        type: String,
        required: true
    },
    pressure: {
        type: String,
        required: true
    },
    humidity: {
        type: String,
        required: true
    },
    PM10: {
        type: String,
        required: true
    },
    PM2p5: {
        type: String,
        required: true
    },
    CO2: {
        type: String,
        required: true
    },
    CO: {
        type: String,
        required: true
    },
    NO2: {
        type: String,
        required: true
    },
    SO2: {
        type: String,
        required: true
    },
    O3: {
        type: String,
        required: true
    },
    noise: {
        type: String,
        required: true
    },
    rain: {
        type: String,
        required: true
    },
    UV: {
        type: String,
        required: true
    },
    lux: {
        type: String,
        required: true
    },
    receivedTime: {
        type: Number,
        required: true
    },
    AQI: {
        type: String,
        required: true
    }
});

const deviceDataSchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    data: { type: dashboardDataSchema, required: true }
});

module.exports = mongoose.model('datas', deviceDataSchema);
