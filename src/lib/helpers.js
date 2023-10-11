const bcrypt=require('bcryptjs');
const path=require('path');
const fs = require('fs');
//const res = require('express/lib/response');
const helpers = {};

helpers.encryptPass = async (password) =>{
    const sal = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,sal);
    return password;
};

helpers.verifyPassword = async(password,hashedPassword)=>{
    try{
       return await bcrypt.compare(password, hashedPassword);
    }catch(e){
        console.log(e);
    }
}

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

helpers.isNotAuthenticated = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/profile');
}

helpers.listadoFotos = (req,res,next)=>{
    const nif=req;
    console.log(nif);
    var fotitos = [];
    var directorio = path.join(__dirname, "../public/img/imagenes", nif);
    fs.readdir(directorio, (err, files) => {
      if (files) {
        files.forEach(file => {
          fotitos.push(file);
        });
        console.log("===>"+fotitos);
      }
    });
    return fotitos;
}

module.exports = helpers;