var mongoose = require('mongoose');
var clickSchema = new mongoose.Schema({
    clicks:String

});
module.exports = mongoose.model('Click', clickSchema);