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
exports.postBootcamp=(req,res,next) =>{
    res.status(200).json({success:true,msg:"Add the bootcamps"});
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