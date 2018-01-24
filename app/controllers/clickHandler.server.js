'use strict';
var Click = require('../../models/click');
class clickHandler{
   getClicks(req,res){
     var clickProjection = {_id:0}
     Click.findOne({},(err,clickdocs)=>{
        if(err) throw err;
        if(clickdocs){
            res.json(clickdocs)
        }else{
         Click.create({clicks:0},(err,clickdocs)=>{
             if(err) throw err;
             res.json(clickdocs);
         });
        }
     });
   }

   addClick(req,res){
   var custInc=0;
     Click.findOne({},(err,clickdocs)=>{
        if(err) throw err;
        if(clickdocs){
            custInc=JSON.parse((clickdocs).clicks);
            custInc++;
        }

                    var updateClicks = {clicks:custInc}
            Click.update({},updateClicks,{new:true},(err,clickdocs)=>{
                if(err) throw err;
                res.json(clickdocs);      
            });
     });
  
}

resetClick(req,res){
 var updateClicks = {clicks:0}
 Click.update({},updateClicks,(err,clickdocs)=>{
     if(err) throw err;
     res.json(clickdocs);
 });
}
   
}



module.exports = clickHandler;