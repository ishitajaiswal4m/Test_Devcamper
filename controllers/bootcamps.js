const Bootcamp = require('../models/Bootcamp');
//@desc     Get all bootcamps
//@route    GET/api/bootcamps
//@access   Public 
exports.getBootcamps=(req,res,next) =>{
    res.status(200).json({success:true,msg:"show all bootcamps"});
}

//@desc     Get a bootcamp
//@route    GET/api/bootcamps/:id
//@access   Public 
exports.getBootcamp=(req,res,next) =>{
    res.status(200).send({success:true,msg:`show the bootcamp ${req.params.id}`});
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
exports.updateBootcamp=(req,res,next) =>{
    res.status(200).json({success:true,msg:`update the bootcamp no:${req.params.id}`});
}

//@desc     DELETE the bootcamp
//@route    DELETE/api/bootcamps/:id
//@access   Private
exports.deleteBootcamp=(req,res,next) =>{
    res.status(200).json({success:true,msg:`Delete the bootcamp no:${req.params.id}`});
}