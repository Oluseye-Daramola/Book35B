
const { jwtSecret } = require("../Config/env");
const jwt = require("jsonwebtoken");
const Provider = require("../Models/Provider");



const protect = async(req, res, next) => {
  
  // the logic
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
    token = req.headers.authorization.split(" ")[1];
  }

  
  if (!token){
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }


  //verify token
  let decoded;

  try{
    decoded = jwt.verify(token, jwtSecret);
  } catch (err){
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }


  //Provider with request
  const provider = await Provider.findById(decoded.id);

  if (!provider){
    return res.status(401).json({
      success: false,
      message: "Not authorized, provider no longer exists",
    });
  }
  
  req.provider = provider;
  next();




  
};









module.exports = { protect };