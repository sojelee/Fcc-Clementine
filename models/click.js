var mongoose = require('mongoose');
var clickSchema = new mongoose.Schema({
    clicks:Number

});
module.exports = mongoose.model('Click', clickSchema);