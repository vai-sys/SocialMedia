require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const Admin=require("./model/AdminSchema")
const bcrypt=require("bcrypt")

const app = express();

const jwt=require('jsonwebtoken')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg and .png files are accepted'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: fileFilter
});


const User = require('./model/db');

app.post('/upload', upload.array('files', 10), async (req, res) => {
    try {
        const { username, socialMediaHandle } = req.body; 
        const newUser = new User({
            username,
            socialMediaHandle,
            files: req.files.map(file => ({
                filename: file.filename,
                path: file.path,
                originalname: file.originalname
            }))
        });
        await newUser.save();
        res.status(201).json({
            message: 'User and files uploaded successfully!',
            user: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while uploading files',
            error: error.message
        });
    }
});


app.get("/users", async (req, res) => {
    try {
        const response = await User.find().sort({ createdAt: 1 });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users data',
            error: error.message
        });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user data',
            error: error.message
        });
    }
});


app.post("/signup",async(req,res)=>{
    const {username,password}=req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try{
        const admin=await Admin.findOne({username});
    if(admin){
        return res.status(400).json({error:"User already exists"});
    }

    const saltrounds=10;
    const hashedPassword=await bcrypt.hash(password,saltrounds);

    const newAdmin=new Admin({
        username:username,
        password:hashedPassword
    })
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully!' });

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error, please try again later' });

    }

    


})

app.post("/login",async(req,res)=>{
    const {username,password}=req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    try{
        const admin=await Admin.findOne({username});
        if(!admin){
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isValidPassword=await bcrypt.compare(password,admin.password);
        if(!isValidPassword){
           return  res.status(400).json({error:'Invalid password'})
        }


        const token = jwt.sign(
            { userId: admin._id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '1h' }  
        );
        console.log("token",token);
        res.status(200).json({
            message: 'Login successful',
            token: token
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error, please try again later' });
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
