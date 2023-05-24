var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer')
var app = express();
var { MongoClient, Binary, ObjectID } = require('mongodb');
const multer = require('multer');
var jwt = require("jsonwebtoken");
var { expressjwt: jwtVerify } = require("express-jwt");

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('server is running'))

let uri = 'mongodb+srv://Madhu:Madhu%4025@cluster0.agxhj80.mongodb.net/test';
var db;

app.use(
    jwtVerify({
        secret: "iiissss",
        algorithms: ["HS256"],
    }).unless({ path: ["/department", "/doctorLogin", "/patientLogin", "/adminLogin","/supportingstaffLogin"] })
);

var jwt_key = "iiissss";

(async function () {
    db = await connectToCluster(uri);
})();


const upload = multer({})


async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();

        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient.db('test');

    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

// common apis

app.get('/department', async (_req, res) => {
    try {
        let dept = await db.collection('department').find({}).toArray();
        console.log(dept);

        if (dept) {
            return res.status(200).json(
                {
                    success: true,
                    data: dept
                }
            );
        } else {
            return res.status(422).json({
                success: false,
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})

app.post('/doctorLogin', async (req, res) => {
    try {
        let user = await db.collection('doctor').findOne(
            { $and: [{ 'username': req.body.uname }, { 'pswd': req.body.pname }] })
        console.log(user);

        if (user) {
            const payload = {
                id: user._id,
                userName: user.docname,
                email: user.username,
                roleId: user.roleId
            }

            user['token'] = jwt.sign(payload, jwt_key)

            return res.status(200).json(
                {
                    success: true,
                    message: 'login successfully',
                    data: user
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'Invalid EmailId or Password'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})

app.post('/patientLogin', async (req, res) => {
    try {
        let user = await db.collection('patient').findOne(
            { $and: [{ 'username': req.body.uname }, { 'pswd': req.body.pname }] })
        console.log(user);


        if (user) {

            const payload = {
                id: user._id,
                userName: user.patname,
                email: user.username,
                roleId: user.roleId
            }

            user['token'] = jwt.sign(payload, jwt_key)

            return res.status(200).json(
                {
                    success: true,
                    message: 'login successfully',
                    data: user
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'Invalid EmailId or Password'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    } finally {
        // db.close()
    }
})

app.post('/supportingstafflogin', async (req, res) => {
    try {
        let user = await db.collection('suppstaff').findOne(
            { $and: [{ 'username': req.body.uname }, { 'pswd': req.body.pname }, { 'type': req.body.type }] })
        console.log(user);

        if (user) {

            const payload = {
                id: user._id,
                userName: user.sname,
                email: user.username,
                roleId: user.roleId,
            }

            user['token'] = jwt.sign(payload, jwt_key)

            return res.status(200).json(
                {
                    success: true,
                    message: 'login successfully',
                    data: user,
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'Invalid EmailId or Password'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})

app.post('/adminLogin', async (req, res) => {

    try {
        let user = await db.collection('admin').findOne(
            { $and: [{ 'username': req.body.uname }, { 'pswd': req.body.pname }] })
        console.log(user);

        if (user) {
            const payload = {
                id: user._id,
                userName: user.adminName,
                email: user.username,
                roleId: user.roleId
            }

            user['token'] = jwt.sign(payload, jwt_key)

            return res.status(200).json(
                {
                    success: true,
                    message: 'login successfully',
                    data: user
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'Invalid EmailId or Password'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})


app.post('/addDepartment', async (req, res) => {

    try {

        if (req.auth.roleId != 1) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let dep = await db.collection('department').insertOne(
            { dname: req.body.deptname, location: req.body.deptlocation })

        if (dep) {
            return res.status(200).json(
                {
                    success: true,
                    message: 'added successfully'
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add dept'
            }
        )
    }

})


app.post('/addSupportingstaff', async (req, res) => {
    try {

        if (req.auth.roleId != 1) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let roleId = 0;

        if (req.body.supptype == "nurse") {
            roleId = 4;
        } else if (req.body.supptype == "receptionist") {
            roleId = 5;
        } else {
            roleId = 6;
        }

        let supp = await db.collection('suppstaff').insertOne(
            { sname: req.body.suppname, username: req.body.suppemail, pswd: req.body.supppswd, supptype: req.body.supptype, sgender: req.body.suppgender, roleId: roleId })

        if (supp) {
            sendmail(req.body.suppemail, req.body.supppswd, 'supportingstaffdashboard');

            return res.status(200).json(
                {
                    success: true,
                    message: 'added successfully'
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add supporting staff'
            }
        )
    }

})



app.post('/addDoctor', async (req, res) => {
    try {

        if (req.auth.roleId != 1) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let doc = await db.collection('doctor').insertOne(
            { docname: req.body.docname, dept: req.body.docdept, username: req.body.docemail, pswd: req.body.docpswd, phnnum: req.body.phnnum, roleId: 2 })

        if (doc) {
            sendmail(req.body.docemail, req.body.docpswd, 'doctor-dashboard');

            return res.status(200).json(
                {
                    success: true,
                    message: 'added successfully'
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add doctor'
            }
        )
    }

})

app.post('/addPatient', async (req, res) => {
    try {

        if (req.auth.roleId != 5) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }


        let pat = await db.collection('patient').insertOne(
            { patname: req.body.patname, address: req.body.address, username: req.body.patemail, pswd: req.body.patpswd, age: req.body.age, phnnum: req.body.phnnum, gender: req.body.suppgender, roleId: 3 })

        if (pat) {
            sendmail(req.body.patemail, req.body.patpswd, 'patient-dashboard');

            return res.status(200).json(
                {
                    success: true,
                    message: 'added successfully'
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add patient'
            }
        )
    }

})


app.get('/doctor', async (req, res) => {
    try {
        let doctorArr = await db.collection('doctor').find({}).toArray();

        if (doctorArr) {
            return res.status(200).json(
                {
                    success: true,
                    data: doctorArr,
                }
            );
        } else {
            return res.status(422).json({
                success: false,

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})



app.get('/doctorById', async (req, res) => {
    try {

        if (req.auth.roleId != 2) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let doctorDetails = await db.collection('doctor').findOne({ _id: new ObjectID(req.auth.id) })

        if (doctorDetails) {
            return res.status(200).json(
                {
                    success: true,
                    data: doctorDetails,
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to load doctor details'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'unable to load doctor details'
            }
        )
    }
})

app.get('/patient', async (req, res) => {
    try {
        let patientArr = await db.collection('patient').find({}).toArray();

        if (patientArr) {
            return res.status(200).json(
                {
                    success: true,
                    data: patientArr,
                }
            );
        } else {
            return res.status(422).json({
                success: false,

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})


// patient apis

app.get('/patientById', async (req, res) => {
    try {

        if (req.auth.roleId != 3) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let patArr = await db.collection('patient').findOne({ _id: new ObjectID(req.auth.id) });

        console.log("patientById", patArr, req.auth);

        if (patArr) {
            return res.status(200).json(
                {
                    success: true,
                    data: patArr,
                }
            );
        } else {
            return res.status(422).json({
                success: false,
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})

app.get('/getSummaryById', async (req, res) => {
    try {

        if (req.auth.roleId != 3) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let summ = await db.collection('summary').find({ patname: req.auth.userName }).toArray()
        summ.map(e => {
            e['file'] = "data:application/pdf;base64," + e.summary.buffer.toString('base64');
            return e;
        })

        if (summ) {
            return res.status(200).json({ data: summ });
        }
        else {
            return res.status(422).json({
                success: false,
                message: 'unable to add',

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to update summary'
            }
        )
    }

})

app.get('/getBillById', async (req, res) => {

    try {

        if (req.auth.roleId != 3) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })

        }

        let bills = await db.collection('bill').find({ username: req.auth.userName }).toArray()

        console.log("bills by id -->", bills);

        if (bills) {
            return res.status(200).json(
                {
                    success: true,
                    data: bills
                }
            );
        } else {
            return res.status(422).json({
                success: false,

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
            }
        )
    }
})

app.get('/getAppointMentsById', async (req, res) => {
    try {

        if (req.auth.roleId != 3) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })

        }

        let summ = await db.collection('appointment').find({ patname: req.auth.userName }).toArray()

        if (summ) {
            return res.status(200).json({ data: summ });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to get appointment'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to get appointment'
            }
        )
    }

})


function sendmail(email, password, path) {

    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "35d8a70abecfe4",
            pass: "b9ed2f31e103c2"
        }
    });

    message = {

        from: "from-example@email.com",
        to: email,
        subject: "Reset Password",
        text: "",
        html: '<html><body><br><br><p><h1> Your Login Credentials <h1><br> <p> Email :' + email
            + '</p><br><p>Password:' + password
            + ' </p> <br> <a href="http://localhost:4200/' + path + '"> click here to login </a> </p> </body> </html>'
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}


app.post('/generateBill', async (req, res) => {

    try {

        let pat = await db.collection('bill').insertOne(
            { username: req.body.patientName, amount: req.body.amount, status: false })

        if (pat) {

            return res.status(200).json(
                {
                    success: true,
                    message: 'added successfully'
                }
            );
        } else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add bill'
            }
        )
    }

})



app.get('/getBills', async (req, res) => {

    try {
        let bills = await db.collection('patient').aggregate([
            {
                $lookup:
                {
                    from: 'bill',
                    localField: '_id',
                    foreignField: 'username',
                    as: 'bills'
                }
            }
        ]).toArray()

        if (bills) {
            return res.status(200).json(
                {
                    success: true,
                    data: bills


                }
            );
        } else {
            return res.status(422).json({
                success: false,

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})




app.post('/updateBillStatus', (req, res) => {

    let insertQuery = 'Update bill set status = ? where bill_no = ?';

})






app.get('/getSummaryList', async (req, res) => {
    try {

        if (req.auth.roleId != 2) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let summ = await db.collection('summary').find().toArray()
        summ.map(e => {
            e['file'] = "data:application/pdf;base64," + e.summary.buffer.toString('base64');
            return e;
        })

        if (summ) {
            return res.status(200).json({ data: summ });
        }
        else {
            return res.status(422).json({
                success: false,
                message: 'unable to add',

            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to update summary'
            }
        )
    }

})


app.post('/updateSummary', upload.single("file"), async (req, res) => {
    try {

        if(req.auth.roleId != 4) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        console.log("req", req.file)
        let summ = await db.collection('summary').insertOne(
            { patname: req.body.patientName, summary: Binary(req.file.buffer) })

        if (summ) {
            return res.status(200).json({ message: 'Summary Updated Successfully' });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to add'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to update summary'
            }
        )
    }

})




app.post('/updateSalary', async (req, res) => {
    try {

        if (req.auth.roleId != 1) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let saldet = await db.collection('salary').insertOne(
            { docname: req.body.docId, creditDate: new Date(req.body.creditDate), amount: req.body.amount })

        if (saldet) {
            return res.status(200).json({ message: "Salary updated successfully.." });
        } else {
            return res.status(422).json({ message: "error" })
        }
    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'unable to update salary'
                //message: 'login failed'
            }
        )
    }
})



app.get('/getDocSalary', async (req, res) => {

    try {

        if (req.auth.roleId != 2) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        const doctorSalary = await db.collection('salary').find({ docname: req.auth.userName }).toArray();

        if (doctorSalary) {
            return res.status(200).json({ data: doctorSalary });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to get doc salary'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to get  doc salary'
            }
        )
    }

})

app.post('/makeAppointment', async (req, res) => {
    try {
        const appointments = await db.collection('appointment')
            .find({ $and: [{ date: new Date(req.body.date) }, { slot: req.body.time.slot }] }).toArray();

        console.log("appointments", appointments);

        let summ = await db.collection('appointment').insertOne(
            {
                patname: req.body.patname,
                docname: req.body.docname,
                preferredTime: req.body.time.duration,
                slot: req.body.time.slot,
                phnnum: req.body.phonenum,
                date: new Date(req.body.date),
                status: false,
                tokennum: appointments.length + 1
            })

        if (summ) {
            return res.status(200).json({ message: 'Appointment Booked Successfully' });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to request appointment'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to request appointment'
            }
        )
    }
})

app.get("/getTimeSlots", async (req, res) => {

    try {

        const timeslots = await db.collection('timeslots').find({}).toArray()

        if (timeslots) {
            return res.status(200).json({ data: timeslots });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to get timeslots'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to get timeslots'
            }
        )
    }

})

app.post('/updateAppointMent', async (req, res) => {
    try {

        // const db = await connectToCluster(uri)

        let summ = await db.collection('appointment').updateOne({ patname: req.body.patname }, {
            $set: {
                status: true,
                tokennum: req.body.tokenNo
            }
        })

        if (summ) {
            return res.status(200).json({ message: 'appointment updated Successfully' });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to update appointment'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to update appointment'
            }
        )
    }

})


app.get('/getAppointMents', async (req, res) => {
    try {

        let summ = await db.collection('appointment').find({}).toArray()

        if (summ) {
            return res.status(200).json({ data: summ });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to get appointment'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to get appointment'
            }
        )
    }

})


app.get('/getAppointMentsByDoctorId', async (req, res) => {
    try {

        if (req.auth.roleId != 2) {
            return res.status(403).json({
                message: "Forbidden Resource"
            })
        }

        let summ = await db.collection('appointment').find({ docname: req.auth.userName }).toArray()

        if (summ) {
            return res.status(200).json({ data: summ });
        }

        else {
            return res.status(422).json({
                success: false,
                message: 'unable to get appointment'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to get appointment'
            }
        )
    }

})





