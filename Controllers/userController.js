
const jwt = require('jsonwebtoken');

// Default username and password 
const DEFAULT_USERNAME = 'demouser1';
const DEFAULT_PASSWORD = 'D@mo!24#';


const JWT_SECRET = 'supersecretkey12345'; 

// login
exports.login = (req, res) => {
    const { email, password } = req.body;

    
    if (email === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        
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
