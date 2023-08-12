require("./database/server");
const Users = require('./users/user')
const bodyParser = require('body-parser');
const express = require("express");
const Data = require("./models/data");
const Image = require("./models/image")
var bcrypt = require('bcryptjs');
var jwt_decode = require("jwt-decode");
var jwt = require('jsonwebtoken');
const auth = require('./middleware/middle');
const checkemaill = require('./middleware/middle');
var { ObjectId } = require('mongodb');
var cors = require('cors')
const app = express();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const multer = require("multer");
const path = require("path");
const { read } = require("fs");

// app.use(express.static(path.join(__dirname +'public'))); 
// app.use(express.static("public"));


app.use('/uploads', express.static(path.join('uploads')))

// app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './uploads'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});


const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3001;
app.use(cors({
    origin: 'http://localhost:4200'
}));

//CREATE 
app.post("/create", upload.single('image'), async (req, res) => {
    // console.log(req.file)
    try {
        const body = req.body;
        console.log(body)

        if (!(body.Firstname && body.Lastname && body.email && body.mobile && body.gender && body.password)) {
            return res.status(400).send("ALL FIELD  IS REQUIRED")
        }
        const olduser = await Data.findOne({ email: body.email });
        if (olduser) {
            return res.status(409).json({ status: false, error: "USER ALREADY REGISTER", data: [] })
        }
        const salt = await bcrypt.genSalt(10);
        HashPassword = await bcrypt.hash(body.password, salt);
        const user = await Data.create({
            Firstname: body.Firstname,
            Lastname: body.Lastname,
            email: body.email.toLowerCase(),
            mobile: body.mobile,
            gender: body.gender,
            password: HashPassword,
            image: (req.hasOwnProperty("file")) ? `localhost:3001/uploads/${req.file.originalname}` : ''
            // image :`localhost:3001/uploads/${req.file.originalname}`

        });
        return res.status(200).json({ "status": true, "message": "sucess", data: user })
    } catch (err) {
        console.log(err)
    }
}
)


//LOGIN
app.post("/login", async (req, res) => {
    try {
        const body = req.body;
        if (!(body.email && body.password)) {
            res.status(400).send("BOTH FIELD IS REQUIRE")
        }
        const user = await Data.findOne({ email: body.email });
        if (!user) {
            return res.status(401).send({
                message: "USER NOT FOUND"
            });
        }
        if (user) {
            const validpassword = await bcrypt.compare(body.password, user.password);
            if (!validpassword) {
                return res.status(400).send({
                    message: "incorrect password"
                })
            }
            const jwttoken = jwt.sign({
                id: user._id
            }, 'secret');
            return res.status(200).send({
                succesfull: true,
                data: user,
                message: 'login successfull',
                sucess: 'welcome to token',
                token: jwttoken
            })
        }
    } catch (err) {
        console.log(err);
    }
})


//READALLDATA
// app.get("/fetchdata", async (req, res) => {

//     const user = await Data.find();
//     console.log(user)

//     // let offset = parseInt(req.query.offset) || 0;
// 	// let size = parseInt(req.query.limit) || user.length;

//     // let from = offset * size;
// 	// let to = from + size;

//     // let users = user.slice(from, to);
// 	// res.status(200).json({
// 	// 	total:user.length,
// 	// 	users
// 	// });

//     res.status(200).send({
//         message: "GET ALL DATA",
//         Data: user
//     })

//     let offset = parseInt(req.query.offset) || 0;
// 	let size = parseInt(req.query.limit) || user.length;

//     let from = offset * size;
// 	let to = from + size;

//     let users = user.slice(from, to);
// 	res.status(200).json({
// 		total:user.length,
// 		users
// 	});
// });

//GETBYID
app.get("/user", auth, async (req, res) => {
    try {
        let token = req.headers['xtoken']
        const decode = jwt.verify(token, 'secret')
        console.log("decode.id", decode.id);

        const user = await Data.findOne({ _id: { $eq: decode.id } });
        console.log("user", user);
        if (user) {

            res.status(200).send({
                sucess: true,
                data: user,

            })
        } else res.status(404).send("USER NOT FOUND")
    }
    catch (err) {
        console.log("erro.id", err);

        res.status(400).send(err)
    }
}
)

//UPDATE
app.put("/updateuser", auth, async (req, res) => {
    try {
        let token = req.headers['xtoken']
        const decode = jwt.verify(token, 'secret')
        console.log(decode)
        const user = await Data.findOne({ _id: { $eq: decode.id } })
        console.log(user)
        const { Firstname, Lastname, email, mobile, gender } = req.body;
        const update = await Data.updateOne({ _id: { $eq: decode.id } }, {
            $set: {
                Firstname: Firstname,
                Lastname: Lastname,
                email: email,
                mobile: mobile,
                gender: gender,


            }
        }, { new: true })
        if (update.modifiedCount) {
            res.status(200).json({ message: "Your user has updated successfully" });
        }
        else {
            res.status(400).send("User Update Failed");
        }
    } catch (err) {
        res.status(400).send(err)
        console.log(err)
    }


})

app.get("/findbystatus", async (req, res) => {

    let status = req.query.status;
    console.log("status", status)
    const user = await Data.find({ status: req.query.status })
    if (user) {

        return res.status(200).json(user);
    } else {
        return res.status(404).send(" not found")

    }

});

app.put("/updatestatus", auth, async (req, res) => {
    try {
        const { _id, status } = req.body;

        const updatestatus = await Data.updateOne({ "_id": { $eq: _id } }, {
            $set: { status: status }
        }, { new: true })

        if (updatestatus.modifiedCount) {
            res.status(200).json("status is updated")
        }
        else {
            return res.status(404).send("status is not updated")
        }

    } catch (err) {
        console.log(err)
    }

})

app.get("/count", async (req, res) => {

    // let status = req.query.status;
    let criteria = {};

    if (typeof req.query.status != 'undefined') {
        criteria.status = req.query.status;
    }
    if (typeof req.query.name != 'undefined') {
        criteria.Firstname = req.query.name;
    }

    console.log("query criteria:---", criteria);

    const totalcount = await Data.count(criteria)
    // const totalentries = await Data.count()
    if (totalcount) {
        return res.status(200).json(totalcount);
    }
    else res.status(404).send('err')



})
// app.post("/forgotpassword",async(req,res)=>{
//     try{
//         const body = req.body
//         const user = await Data.findOne({ email: body.email });
//         if(user){
//             const randomString=randomstring.generate();
//            const forgotpwd= await Data.updateOne({email:body.email},{$set:{token:randomString}})
//            res.status(400).send({succes : true, message : "check your mail and reset your password"})
//         }else{
//             res.status(400).send({succes : false, message :"Email is not exist"})
//         }
//     }catch(err){
//        res.status(400).send({succes : false, message :err.message})
//     }
// })
app.post("/forgotpassword", async (req, res) => {

    try {
        const body = req.body
        if (!(body.email)) {
            res.status(400).send("Email IS REQUIRE")
        }
        const user = await Data.findOne({ email: body.email });
        if (!user) {
            return res.status(401).send({
                message: 'Sorry Email does not Exist!'

            });
        }
        // console.log('hfghfghdfdhfdh')
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            host: 'smtp.gmail.com',
            port: '587',
            auth: {
                user: 'rachitasalaria10@gmail.com',
                pass: 'Rachita@2000',
            },


        });


        const mailOptions = {
            from: 'rachitasalaria10@gmail.com',
            to: email,
            subject: 'Please Reset your Password',
            html: '<h3>Dear User</h3><p>You have requested to Reset your password. To Reset your password Successfully, Follow the Link bellow to Reset it</p><p>Click <a href="https://localhost:3001/resetPassword">https://onepercentsoft.oxygen.com/user/resetPassword.jsp</a></p><p>This Email is subject to mandatory instruction.</p><p>Regards,</p><p>Online Service</p>',
        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) throw error;
            return res.send({ error: false, data: info, message: 'OK' });
        });
    } catch (err) {
        res.status(500).send({ messageefsdgsgsg: err });
    }
})


// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   }
//   );
// }catch (err) {
//     res.status(500).send({ messageefefefe: err });
//   }
// });





//check email
// app.post('/checkemail',async(req,res)=>{

//     const existemail = await Data.findOne({email: req.body.email});
//     if (existemail) {
//         res.status(409).json({status: false,  error:"USER ALREADY REGISTER"})
//     }else{
//         res.status(200).json({status: true , error : "new user"})
//     }

// })



// app.get('/alluser', (req,res,next) =>{
//     console.log("Get Users");
//     let offset = parseInt(req.query.offset) || 0;
//     let size = parseInt(req.query.limit) || Users.length;

//     let from = offset * size;
//     let to = from + size;

//     let users = Users.slice(from, to);

//     console.log(users)
//     res.status(200).json({
//      total:Users.length,
//      users
//     });
//    });
app.get("/fetchdata", async (req, res) => {
    try {
        let { page, size, sort, asc, search } = req.query;

        if (!page) {
            page = 1;

        }
        if (!size) {
            size = 10;

        }
        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const user = await Data.find({ name: { $regex: search, $options: "i" } }).sort({ [sort]: asc }).limit(limit).skip(skip);
        // const total = await Data.countDocuments({name:{$regex : search,$options:"i"}})

        res.status(200).send({
            message: "GET ALL DATA",
            Data: user
        })
    } catch (err) {
        console.log(err);
    }
})

app.get('/alluser', async (req, res) => {



    let offset = parseInt(req.query.offset) || 0;
    let size = parseInt(req.query.limit) || users.length;

    // const searchParams = req.query
    //     console.log(searchParams)

    let sort = req.query.sort;
    let orderby = req.query.orderby;


    let from = offset * size;
    let to = from + size;
    const sortObject = {};
    sortObject[sort] = orderby === 'asc' ? 1 : -1;

    console.log("Get Users");
    // const users = await Data.find().skip( offset * size).limit((offset * size)+size);
    let users = await Data.find().sort(sortObject)
    let x = users.slice(from, to)
    // let users = Users.slice(from, to)
    // let sorting = Users.sort(sortObject)



    console.log(x)
    res.status(200).json({
        x,
        total: users.length,
        //  users,

    });
});

app.get('/userss', async (req, res) => {
    try {
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit);
        let search = req.query.search || "";
        let sort = req.query.sort;
        let orderby = req.query.orderby;
        const sortObject = {};
        sortObject[sort] = orderby === 'asc' ? 1 : -1;

        const users = await Data.find({ Firstname: { $regex: search, $options: "i" } }).sort(sortObject).skip(offset * limit).limit(limit);
        const total = await Data.countDocuments({ Firstname: { $regex: search, $options: "i" } })

        const response = {
            error: false,
            total,
            offset: offset + 1,
            limit,
            users

        };
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
    }
})

//pagenation with single search
app.get('/userss1', async (req, res) => {
    try {
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit);
        let query = req.query;
        let sort = req.query.sort;
        let orderby = req.query.orderby;

        const sortObject = {};


        let criteria = [];
        console.log('query', query);

        if (query.search && query.search.length > 0) {
            criteria.push({ Firstname: { $regex: query.search, $options: "i" } });

        }
        //criteria.push({ gender: 'male' });

        if (query.gender && query.gender.length > 0) {
            criteria.push({ gender: query.gender });
        }

        criteria = criteria.length > 0 ? { $and: criteria } : {};
        //console.log('criteria',criteria);

        sortObject[sort] = orderby === 'asc' ? 1 : -1;
        const users = await Data.find(criteria).sort(sortObject).skip(offset * limit).limit(limit);
        const total = await Data.countDocuments(criteria)

        const response = {
            error: false,
            total,
            offset: offset + 1,
            limit,
            users,


        };
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
    }
})




//pagination with mutiple search
app.get('/users', async (req, res) => {
    try {
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit);
        let query = req.query;
        let sort = req.query.sort;
        let orderby = req.query.orderby;
        const sortObject = {};
        let criteria = [];
        console.log('query', query);
        if (query.search && query.search.length > 0) {
            criteria.push({ firstName: { $regex: query.search, $options: "i" } });
            criteria.push({ lastName: { $regex: query.search, $options: "i" } });
            criteria.push({ email: { $regex: query.search, $options: "i" } });
            criteria.push({
                $expr: {
                    $regexMatch: {
                        input: { $toString: { $toLong: "$mobile" } },
                        regex: query.search
                    }
                }
            })
        }
        criteria = criteria.length > 0 ? { $or: criteria } : {};
        //console.log('criteria',criteria);
        sortObject[sort] = orderby === 'asc' ? 1 : -1;
        const users = await data.find(criteria).sort(sortObject).skip(offset * limit).limit(limit);
        const total = await data.countDocuments(criteria)

        const response = {
            error: false,
            total,
            offset: offset + 1,
            limit,
            users,
        };
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
    }
})



app.get("/findbygender", async (req, res) => {

    let gender = req.query.gender;
    console.log("gender", gender)
    const user = await Data.find({ gender: req.query.gender })
    if (user) {

        return res.status(200).json(user);
    } else {
        return res.status(404).send(" not found")

    }

});

// app.get("/gender", async (req, res) => {
//     // const body = req.body;
//     let gender = req.query.gender;
//     const query = { gender: { $match: male } };

//     const user = await Data.find(query)
//     if (user) {

//         return res.status(200).json(user);
//     } else {
//         return res.status(404).send(" not found")

//     }
// })

app.get('/gender', async (req, res,) => {
    const filters = req.query;

    console.log(filters)
    const filteredUsers = Data.find({}).filter(user => {

        for (key in filters) {
            console.log(key, user[key], filters[key]);
            isValid = isValid && user[key] == filters[key];
        }

    });
    res.send(filteredUsers);

});
app.get('/sort', async (req, res) => {
    try {
        let sort = req.query.sort;
        let orderby = req.query.orderby;
        const sortObject = {};
        sortObject[sort] = orderby === 'asc' ? 1 : -1;
        let users = await Data.find().sort(sortObject)
        console.log(users)

        res.json(users);

    } catch (err) {
        console.log(err)
    }

})

// app.use('/uploads', express.static('uploads'))

app.post("/image", upload.single('image'), async (req, res) => {
    // console.log(req.file)
    try {
        const { Firstname } = req.body;
        // console.log(image,Firstname)
        if (!Firstname) {
            res.status(400).send("ALL FIELD  IS REQUIRED")
        }
        console.log("fndjsnjdn")
        const user = await Image.create({
            Firstname: Firstname,
            image: (req.hasOwnProperty("file")) ? `localhost:3001/uploads/${req.file.originalname}` : ''
            // image :`localhost:3001/uploads/${req.file.originalname}`
        });
        res.status(200).json({ "status": true, "message": "sucess", data: user })
    } catch (err) {
        console.log(err)
    }
}
)

app.get('/uploads', async (req, res) => {
    const images = await Image.find();
    res.status(200).json({ images })
})

// app.get("/image.png", (req, res) => {
//     res.sendFile(path.join(__dirname, "./uploads/image.png"));
//   });

// app.get("/uploads/:imagename",async(req,res)=>{
//     try{

//         // console.log("image", image)
//         const user = await Image.find({ image: req.params.image })
//         console.log("userrrr",user)
//         if (user) {

//             return res.status(200).json(user);
//         } else {
//             return res.status(404).send(" not found")

//         }

//     }catch(err){
//         console.log(err)
//     }
// });

app.listen(3001, () => {
    console.log('Listening to port 3001');
})


