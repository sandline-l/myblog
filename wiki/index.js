const express = require('express')
const router = express.Router();

router.get('/', function(req,res){
    res.send('维基首页')
})
router.get('/about', function(req,res){
    res.send('关于此维基')
})
module.exports = router;

