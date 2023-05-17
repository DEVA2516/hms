var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer')
var app = express();
var { MongoClient, Binary,ObjectID } = require('mongodb');
const multer = require('multer')
var doctorController = require('./controllers/doctorController.js');

app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('server is running'))

let uri = 'mongodb+srv://Madhu:Madhu%4025@cluster0.agxhj80.mongodb.net/test';
var db;

(async function () {
   db =  await connectToCluster(uri);
} )();


const upload = multer({})


app.post('/signup',async  (req, res) => {
    console.log(req.body);

    db.collection('user').insertOne(req.body)

    let insertQuery = 'INSERT INTO patient (p_name,address,phn_no,age,gender,email,pswd) values (?,?,?,?,?,?,?)';

    con.query(insertQuery, [req.body.uname, req.body.address, req.body
        .phonenumber, req.body.age, req.body.gender, req.body.email, req.body.pswd], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(422).json(  {message:'Something went wrong'});
            }

            console.log(result);
            return res.status(200).send('Inserted Successfullyy');

        })
})


async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();

        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient.db('test');
        // db.collection('timeslots').insertMany([
        //     { duration: '9AM - 11AM', slot: 1 },
        //     { duration: "11AM - 1PM", slot: 2 },
        //     { duration: "2PM - 4PM", slot: 3 },
        //     { duration: "4PM - 6PM", slot: 4 }
        // ])

    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

app.get('/department', async (_req, res) => {
    try{
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

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})

app.post('/doctorlogin', async (req, res) => {
    try{
      let user = await db.collection('doctor').findOne({$and:[{'username':req.body.uname},{'pswd':req.body.pname}]})
      console.log(user);

      if (user) {
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

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})

app.post('/patientlogin', async (req, res) => {
    try{
      let user = await db.collection('patient').findOne({$and:[{'username':req.body.uname},{'pswd':req.body.pname}]})
      console.log(user);

      if (user) {
        return res.status(200).json(
            {
                success: true,
                message: 'login successfully',
                data:user
            }
        );
    } else {
        return res.status(422).json({
            success: false,
            message: 'Invalid EmailId or Password'
        })
    }

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }finally {
        // db.close()
    }
})
app.post('/supportingstafflogin', async (req, res) => {
    try{
      let user = await db.collection('suppstaff').findOne({$and:[{'username':req.body.uname},{'pswd':req.body.pname},{'type':req.body.type}]})
      console.log(user);

      if (user) {
        return res.status(200).json(
            {
                success: true,
                message: 'login successfully'
            }
        );
    } else {
        return res.status(422).json({
            success: false,
            message: 'Invalid EmailId or Password'
        })
    }

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})

app.post('/adminlogin', async (req, res) => {
    
    try{
      let user = await db.collection('admin').findOne({$and:[{'username':req.body.uname},{'pswd':req.body.pname}]})
      console.log(user);

      if (user) {
        return res.status(200).json(
            {
                success: true,
                message: 'login successfully'
            }
        );
    } else {
        return res.status(422).json({
            success: false,
            message: 'Invalid EmailId or Password'
        })
    }

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'login failed'
            }
        )
    }
})


app.post('/addDepartment',async (req, res) => {
    
    try {

        let dep = await db.collection('department').insertOne({dname:req.body.deptname,location:req.body.deptlocation})
    
        if (dep) {
            // sendmail(req.body.docemail,req.body.docpswd,'doctor-dashboard');
    
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
    
        }catch (err){
            console.log(err);
            return res.status(422).json(
                {
                    success: false,
                    message: 'failed to add dept'
                }
            )
        }
       
    })


app.post('/addSupportingstaff',async (req,res) => {
    try {

        let supp = await db.collection('suppstaff').insertOne({sname:req.body.suppname,username:req.body.suppemail,pswd:req.body.supppswd,type:req.body.supptype,sgender:req.body.suppgender})
    
        if (supp) {
             sendmail(req.body.suppemail,req.body.supppswd,'supportingstaffdashboard');
    
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
    
        }catch (err){
            console.log(err);
            return res.status(422).json(
                {
                    success: false,
                    message: 'failed to add supporting staff'
                }
            )
        }
       
    })
    
    

app.post('/addDoctor',async(req,res) => {
    try {

    let doc = await db.collection('doctor').insertOne({docname:req.body.docname,dept:req.body.docdept,username:req.body.docemail,pswd:req.body.docpswd,phnnum:req.body.phnnum})

    if (doc) {
        sendmail(req.body.docemail,req.body.docpswd,'doctor-dashboard');

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

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message: 'failed to add doctor'
            }
        )
    }
   
})

app.post('/addPatient',async (req,res) => {
    try {

        let pat = await db.collection('patient').insertOne({patname:req.body.patname,address:req.body.address,username:req.body.patemail,pswd:req.body.patpswd,age:req.body.age,phnnum:req.body.phnnum,gender:req.body.suppgender})
    
        if (pat) {
            sendmail(req.body.patemail,req.body.patpswd,'patient-dashboard');
    
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
    
        }catch (err){
            console.log(err);
            return res.status(422).json(
                {
                    success: false,
                    message: 'failed to add doctor'
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
    
        }catch (err){
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
  let doctorDetails = await  db.collection('doctor').findOne({_id : new ObjectID(req.query.id)})
//   .aggregate([
//         { $lookup:
//            {
//              from: 'department',
//              localField: 'dept',
//              foreignField: 'dname',
//              as: 'deptDetails'
//            }
//          }
//         ])

        
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
               message:'unable to load doctor details'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                message:'unable to load doctor details'
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

    }catch (err){
        console.log(err);
        return res.status(422).json(
            {
                success: false,
                //message: 'login failed'
            }
        )
    }
})   


app.get('/patientById', async (req, res) => {
    try { 
        let patArr = await db.collection('patient').findOne({_id:new ObjectID(req.query.id)});

        console.log("patientById",patArr,req.query);
    
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
    
        }catch (err){
            console.log(err);
            return res.status(422).json(
                {
                    success: false,
                    //message: 'login failed'
                }
            )
        }
    })


function sendmail(email,password,path) {

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
        html: '<html><body><br><br><p><h1> Your Login Credentials <h1><br> <p> Email :'+email 
        +'</p><br><p>Password:'+password 
        +' </p> <br> <a href="http://localhost:4200/'+path+'"> click here to login </a> </p> </body> </html>'
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

        let pat = await db.collection('bill').insertOne({username:req.body.patientName,amount:req.body.amount,status:false})
    
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
    
        }catch (err){
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

    try{
        let bills = await  db.collection('patient').aggregate([
            { $lookup:
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
  
      }catch (err){
          console.log(err);
          return res.status(422).json(
              {
                  success: false,
                  //message: 'login failed'
              }
          )
      }
  })
   

app.get('/getBillById', async (req, res) => {

    try{
        let bills = await  db.collection('bill').find({username:req.query.id})
        // .aggregate([
        //     { $lookup:
        //        {
        //          from: 'patient',
        //          localField: 'username',
        //          foreignField: '_id',
        //          as: 'patient'
        //        }
        //      }
        //     ]).
            .toArray()

            console.log("bills by id -->",bills);
  
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
  
      }catch (err){
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

    // con.query(insertQuery,[req.body.status,req.body.billNo] ,(err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(422).json({message:'Something went wrong'});
    //     }

    //     console.log(result);
    //     return res.status(200).json({message:'Bill Updated Successfully'});
    // })
})


app.get('/getSummaryById', async (req, res) => {
    try {
        let summ = await db.collection('summary').find({ patname: req.query.id }).toArray()
        summ.map(e => {
            e['file'] = "data:application/pdf;base64," + e.summary.buffer.toString('base64');
            return e;
        })

        if (summ) {
            return res.status(200).json({ data : summ });
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



app.get('/getSummaryList', async (req, res) => {
    try {
        let summ = await db.collection('summary').find().toArray()
        summ.map(e => {
            e['file'] = "data:application/pdf;base64," + e.summary.buffer.toString('base64');
            return e;
        })

        if (summ) {
            return res.status(200).json({ data : summ });
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

        console.log("req", req.file)
        let summ = await db.collection('summary').insertOne({ patname: req.body.patientName, summary: Binary(req.file.buffer) })

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
        let  saldet = await  db.collection('salary').insertOne({docname:req.body.docId,creditDate:new Date(req.body.creditDate),amount:req.body.amount})
            
            if (saldet) {
                return res.status(200).json({message: "Salary updated successfully.."});
            } else {
                return res.status(422).json({message:"error"})
            }
        } catch (err) {
            console.log(err);
            return res.status(422).json(
                {
                    success: false,
                    message:'unable to update salary'
                    //message: 'login failed'
                }
            )
        }
    })
   
    // let insertQuery = 'INSERT INTO salary (doctor_id,salary,creditDate) VALUES (?,?,?)';

    // con.query(insertQuery,[req.body.docId,req.body.amount,req.body.creditDate] ,(err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(422).json({message:'Something went wrong'});
    //     }

    //     console.log(result);
    //     return res.status(200).json({message:'Salary Updated Successfully'});
    // })
// })


app.get('/getDocSalary', async (req, res) => {

    try {

        const doctorSalary = await db.collection('salary').find({docname:req.query.id}).toArray();
    
            if (doctorSalary) {
                return res.status(200).json({ data : doctorSalary });
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
            return res.status(200).json({ data : timeslots });
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
                 
        let summ =  await db.collection('appointment').updateOne({patname : req.body.patname},{
            $set : {
                status:true,
                tokennum:req.body.tokenNo
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

        // const db = await connectToCluster(uri)
                 
        let summ = await db.collection('appointment').find({}).toArray()

        if (summ) {
            return res.status(200).json({ data : summ });
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


app.get('/getAppointMentsById', async (req, res) => {
    try {

        // const db = await connectToCluster(uri)
                 
        let summ = await db.collection('appointment').find({patname:req.query.id}).toArray()

        if (summ) {
            return res.status(200).json({ data : summ });
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



