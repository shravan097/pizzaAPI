const jwt = require('jsonwebtoken');
const key = require('./env');


exports.checkCustomer = (req,res,next)=>{
     try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, key.env.JWT_KEY);
        req.userData = decoded;j
        if(decoded['typeOfUser']!="Customer") throw "User Logged in is not a Customer!";
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!',
            error: error
        });
    }
};

exports.checkChef = (req,res,next)=>{
     try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, key.env.JWT_KEY);
        req.userData = decoded;
        if(decoded['typeOfUser']!="Chef") throw "User Logged in is not a Chef!";
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!',
            error: error
        });
    }
};

exports.checkManager = (req,res,next)=>{
     try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, key.env.JWT_KEY);
        req.userData = decoded;
        if(decoded['typeOfUser']!="Manager") throw "User Logged in is not a Manager!";
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!',
            error: error
        });
    }
};

exports.checkDelivery = (req,res,next)=>{
     try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, key.env.JWT_KEY);
        req.userData = decoded;
        if(decoded['typeOfUser']!="Delivery") throw "User Logged in is not a Delivery!";
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!',
            error: error
        });
    }
};

