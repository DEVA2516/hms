const mongoose = require('mongoose')
var Doctor = mongoose.model('Doctor',{
    docname: {type: String},
    dept: {type: String},
    username: {type: String},
    pswd: {type: String}
});

module.exports = { Doctor:Doctor};
