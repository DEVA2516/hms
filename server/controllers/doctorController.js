const express = require('express')
var router = express.Router();

var {Doctor} = require('../models/doctor');
router.get('/',(req,res) => {
    Doctor.find((err,docs) => {
        if(!err) {res.send(docs);}
        else {console.log('error in retrieving doctor : '+JSON.stringify(err,undefined,2));}

    });
});

router.post('/',(req,res) => {
    var doc = new Doctor({
    docname: req.body.docname,
    dept: req.body.dept,
    username: req.body.username,
    pswd: req.body.pswd,
    });
    doc.save((err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in doctor save:' +JSON.stringify(err,undefined,2));}
    })
})

module.exports = router;