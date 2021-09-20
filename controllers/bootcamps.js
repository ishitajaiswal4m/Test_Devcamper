const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//@route    GET/api/bootcamps
//@access   Public 
exports.getBootcamps= asyncHandler(async(req,res,next) =>{
        console.log(req.query);
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
        console.log(queryStr);
        const bootcamps = await Bootcamp.find(JSON.parse(queryStr));
        res.status(200).json({success:true,count:bootcamps.length,data:bootcamps});
});

//@desc     Get a bootcamp
//@route    GET/api/bootcamps/:id
//@access   Public 
exports.getBootcamp= asyncHandler(async(req,res,next) =>{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); //if id is not found in db
        } 
        res.status(200).json({success: true, data:bootcamp});

       //res.status(400).json({success:false});
      // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
});

//@desc     Create new bootcamp
//@route    POST/api/bootcamps
//@access   Private
exports.createBootcamp= asyncHandler(async(req,res,next) =>{
    console.log(req.body); //gives undefined without body parser in server.js
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success : true,
            data : bootcamp
        });
});

//@desc     UPDATE the bootcamp
//@route    PUT/api/bootcamps/:id
//@access   Private
exports.updateBootcamp=asyncHandler(async(req,res,next) =>{
   
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); //if id is not found in db
        }
        res.status(200).json({success:true,data:bootcamp});
   
});

//@desc     DELETE the bootcamp
//@route    DELETE/api/bootcamps/:id
//@access   Private
exports.deleteBootcamp=asyncHandler(async(req,res,next) =>{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); //if id is not found in db
        }
        res.status(200).json({success:true,data:{}});
   
});
// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
 // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});