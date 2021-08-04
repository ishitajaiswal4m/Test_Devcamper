const errorHandler = (err,req,res,next)=>{
//log to console for dev
console.log(err.stack.red); //will give error and file info
res.status(err.statusCode || 500).json({
    success:false,
    error:err.message || 'server error'
});
}
module.exports = errorHandler;