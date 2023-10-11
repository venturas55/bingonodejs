const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
} );

router.get('/bingo',(req,res)=>{
    res.render('bingo');
} );

router.get('/carton',(req,res)=>{
    res.render('carton');
} );


module.exports=router;