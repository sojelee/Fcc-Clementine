'use strict';
var Users = require('../../models/user');
class clickHandler{
   getClicks(req,res){
    Users.findOne({'github.id':req.user.github.id},{'_id':false},(err,clickdocs)=>{
        if(err) throw err;
        if(clickdocs){
            
            res.json(clickdocs.nbrClicks);
        }
     });
   }

   addClick(req,res){
   var custInc=0;
     Users.findOne({'github.id':req.user.github.id},(err,clickdocs)=>{
        if(err) throw err;
        if(clickdocs){
            custInc=JSON.parse((clickdocs.nbrClicks.clicks));
            custInc=custInc+1;
           
        }

            var updateClicks = {nbrClicks:{clicks:custInc}};
            Users.update({'github.id': req.user.github.id},updateClicks,{new:true},(err,clickdocs)=>{
                if(err) throw err;
                res.json(clickdocs.nbrClicks);      
            });
     });
  
}

resetClick(req,res){
 var updateClicks = {nbrClicks:{clicks:0}};
 Users.update({'github.id':req.user.github.id},updateClicks,(err,clickdocs)=>{
     if(err) throw err;
     res.json(clickdocs.nbrClicks);
 });
}
   
}



module.exports = clickHandler;