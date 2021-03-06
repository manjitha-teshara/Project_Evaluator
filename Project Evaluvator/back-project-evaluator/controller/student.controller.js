const mongoose =require('mongoose')
const passport = require('passport')
const _ = require('lodash')
const Student = mongoose.model('Students')
const Studentdetail =mongoose.model('Studentdetail')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'laahirudulanjaya@gmail.com',
    pass: 'Passward1223*'
  }
});
module.exports.register=(req,res,next)=>{
    var student = new Student()
    student.UserName = req.body.UserName
    student.Email = req.body.Email
    student.Registrationnumber =req.body.Registrationnumber
    student.Password =req.body.Password
    student.Cpassword = req.body.Cpassword
    student.save((err, doc) => {
        if (!err){
            res.send(doc);            
        }
        else
        {
                if (err.code === 11000){
                    res.status(422).send('Data you entered has already been used');
                }
                else{
                    console.log(err)
                    return next(err);
                    }
        }
        });

}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.studentprofile = (req, res, next) =>{
    Student.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['UserName','Email','Registrationnumber','Phonenumber']) });
        }
    );
}

module.exports.Importstudent =(req,res,next)=>{
    // // res.forEach(element => {
    //     var studentdetails = new Studentdetail();
    //     studentdetails.Registrationnumber= req.body.Registrationnumber
    //     studentdetails.Name = req.body.Name
    //     studentdetails.save((err,doc)=>{
    //     if (!err){
    //         res.send(doc);            
    //     }
    //     else{
    //         console.log(err)
    //     }
        
    //  //   })
    
// })
    Studentdetail.insertMany(req.body.arr,(err,doc)=>{
        if (!err){
            res.send(doc)
        }
        else{
            res.status(422).send(error)
        }
    })
}

module.exports.getallStudentdetail =(req,res,next)=>{

    Studentdetail.find({},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else
        {
            res.status(422).send(err)
        }
    })
}
module.exports.sendemail =(req,res,next)=>{
    var maillist=[]

    Studentdetail.find({isRegistered:false},{'Email':1,'_id':0},(err,doc)=>{
        if(!err){
            
           doc.forEach((Email)=>{
            maillist.push(Email.Email)
            })
            console.log(maillist)
        }
    })
    var mailOptions = {
        from: 'laahirudulanjaya@gmail.com',
        to: maillist,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(422).send(error)
        } else {
          res.status(200).json(info)
        }
      });
}

module.exports.getstudentsbyYear =(req,res,next)=>{
    Studentdetail.find({Projectname:new RegExp(req.params.year)},'Registrationnumber Name',(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}



