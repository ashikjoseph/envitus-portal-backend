const datas = require('../Models/dashboardSchema'); 

exports.getDashboardData = async (req, res) => {
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
    console.log("Dashboard Data Found:", dashboardData); 

    const responseData = dashboardData.map(data => ({
      deviceId: data.deviceId,
      dataList: [
        {
          logicalDeviceId: `${data.deviceId}_L`,
          data: data.data
        }
      ]
    }));

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
