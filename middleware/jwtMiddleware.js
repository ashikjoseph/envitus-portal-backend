const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware");

    
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json("Authorization token is missing.");
    }
  
    try {
        
        const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("==jwtresponse==");
        console.log(jwtResponse);
        req.payload = jwtResponse.userId;
        next();
    } catch (err) {
        res.status(401).json("Authorization failed, Please Login");
    }
}

module.exports = jwtMiddleware;
