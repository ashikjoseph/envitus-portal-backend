const datas = require('../Models/dashboardSchema'); 

exports.getDashboardData = async (req, res) => {

  const apiKey = req.headers['apikey']; 

  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      status: 'error',
      errorCode: 403,
      message: 'Forbidden: Invalid or missing API key'
    });
  }

  const { deviceIds } = req.query;

  if (!deviceIds) {
    return res.status(400).json({
      status: 'error',
      errorCode: 400,
      message: 'Device ID(s) required'
    });
  }

  try {
    const dashboardData = await datas.find({ deviceId: deviceIds });
    
    console.log("Searching for device ID(s):", deviceIds); 
     

    const responseData = dashboardData.map(data => {
      // Generate random pollutant values
      const pollutants = {
        PM10: (Math.random() * 150).toFixed(2),
        PM2p5: (Math.random() * 100).toFixed(2),
        CO: (Math.random()).toFixed(2),
        NO2: (Math.random() * 100).toFixed(2),
        SO2: (Math.random() * 100).toFixed(2),
        O3: (Math.random() * 150).toFixed(2),
      };

      // Identify the prominent pollutant with the highest value
      const prominentPollutant = Object.entries(pollutants).reduce(
        (maxPollutant, [key, value]) => {
          return parseFloat(value) > parseFloat(maxPollutant.value) ? { key, value } : maxPollutant;
        }, { key: '', value: '0' }
      ).key;

      console.log(`Prominent Pollutant for Device ${data.deviceId}:`, prominentPollutant);

      return {
        deviceId: data.deviceId,
        dataList: [
          {
            logicalDeviceId: `${data.deviceId}_L`,
            data: {
              temperature: (20 + Math.random() * 15).toFixed(2),  // Random temperature between 20 and 35
              windSpeedPeak: (Math.random() * 10).toFixed(2),      // Random wind speed peak between 0 and 10
              windSpeedAvg: (Math.random() * 10).toFixed(2),       
              windDirection: (Math.random() * 360).toFixed(2),     
              pressure: (980 + Math.random() * 40).toFixed(2),     
              humidity: (30 + Math.random() * 70).toFixed(2),      
              PM10: pollutants.PM10,                                 
              PM2p5: pollutants.PM2p5,                              
              CO2: (300 + Math.random() * 700).toFixed(2),         
              CO: pollutants.CO,                                    
              NO2: pollutants.NO2,                                  
              SO2: pollutants.SO2,                                  
              O3: pollutants.O3,                                    
              noise: (30 + Math.random() * 70).toFixed(2),         
              rain: (Math.random() * 20).toFixed(2),               
              UV: (0 + Math.random() * 10).toFixed(2),             
              lux: (0 + Math.random() * 2000).toFixed(2),          
              receivedTime: Date.now(),                             
              AQI: Math.floor(Math.random() * 500),                
              prominentPollutant: prominentPollutant                
            }
          }
        ]
      };
    });

    res.status(200).json({
      status: 'ok',
      errorCode: 0,
      message: null,
      data: { liveDataPerDeviceId: responseData }
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      status: 'error',
      errorCode: 500,
      message: 'Internal Server Error'
    });
  }
};
