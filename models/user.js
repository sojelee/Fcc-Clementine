
var mongoose    = require('mongoose');

var userSchema = new mongoose.Schema({
  github: {
      id:String,
      displayname: String,
      username: String,
      publicRepos: Number
  },
  nbrClicks:{
      clicks:Number
  }
});

module.exports = mongoose.model('User',userSchema);
