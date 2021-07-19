//MiddleWare - here we can do the auth part, as this middleware fun will be called everytime we hit any route, so here we can authenticate. 
const logger = (req,res,next) =>{
    req.hello = "Hello World"; // intialising a variable hello in req, which will be available to all the routes by -req.hello 
    // console.log("middleware ran!!!");
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
    next();
};
module.exports = logger;