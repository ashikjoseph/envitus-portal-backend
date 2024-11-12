const jwt = require('jsonwebtoken');

// Default username and password 
const DEFAULT_USERNAME = 'demouser1';
const DEFAULT_PASSWORD = 'D@mo!24#';

const JWT_SECRET = 'supersecretkey12345'; 

// login
exports.login = (req, res) => {
    const { username, password } = req.body;  
    
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {  
        
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });  
        
        return res.status(200).json({
            status: 'ok',
            errorCode: 0,
            message: null,
            data: { token }
        });
    }

    return res.status(401).json({
        status: 'error',
        errorCode: 1,
        message: 'Invalid credentials'
    });
};
