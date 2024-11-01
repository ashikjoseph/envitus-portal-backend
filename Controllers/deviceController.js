const devices = require('../Models/deviceSchema');

exports.deviceList = async (req, res) => {
    try {
        const allDevices = await devices.find();

        res.status(200).json({
            status: 'ok',
            errorCode: 0,
            message: null,
            data: {
                devices: allDevices 
            }
        });
    } catch (err) {

        console.error('Error fetching devices:', err);

        res.status(500).json({ 
            status: 'error',
            errorCode: 1, 
            message: "Request failed",
            error: err.message 
        });
    }
};
