const express = require('express');
const {getBootcamp,getBootcamps,postBootcamp,updateBootcamp,deleteBootcamp} = require('../controllers/bootcamps');
const router = express.Router();
router
.route('/')
.get(getBootcamps)
.post(postBootcamp);

router
.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);

module.exports = router;