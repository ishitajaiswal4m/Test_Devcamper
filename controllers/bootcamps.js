const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
//@desc     Get all bootcamps
//@route    GET/api/bootcamps
//@access   Public 
exports.getBootcamps= async(req,res,next) =>{
    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success:true,count:bootcamps.length,data:bootcamps});
    }
    catch(err){
        res.status(400).json({success:false});
    }  
}

//@desc     Get a bootcamp
//@route    GET/api/bootcamps/:id
//@access   Public 
exports.getBootcamp= async(req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); //if id is not found in db
        } 
        res.status(200).json({success: true, data:bootcamp});
    }
    catch(err){
       //res.status(400).json({success:false});
       next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
}

//@desc     Create new bootcamp
//@route    POST/api/bootcamps
//@access   Private
exports.createBootcamp= async(req,res,next) =>{
    console.log(req.body); //gives undefined without body parser in server.js
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success : true,
            data : bootcamp
        });
    }
    catch(err){
        res.status(400).json({success:false});
    }
}

//@desc     UPDATE the bootcamp
//@route    PUT/api/bootcamps/:id
//@access   Private
exports.updateBootcamp=async(req,res,next) =>{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!bootcamp){
        return res.status(400).json({success:false}); //if id is not found in db
    }
    res.status(200).json({success:true,data:bootcamp});
}

//@desc     DELETE the bootcamp
//@route    DELETE/api/bootcamps/:id
//@access   Private
exports.deleteBootcamp=async(req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return res.status(400).json({success:false}); //if id is not found in db
        }
        res.status(200).json({success:true,data:{}});
    }
    catch(err){
        res.status(400).json({success:false});
    }
   
}