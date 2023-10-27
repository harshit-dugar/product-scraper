const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const auth = require('./auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,
    useUnifiedTopology: true,
    user:process.env.DB_USER,
    pass:process.env.DB_PASSWORD,})
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ' + err.message);
    });
mongoose.connection.on('error', (err) => {
    console.error('MongoDB Connection Error: ' + err.message);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    }
});

const User = mongoose.model('User', userSchema);

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
// authentication endpoint
app.get("/auth-endpoint",auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});
app.get('/logout', (req, res) => {
    res.clearCookie('token').status(200).send({
        message: "Logout Success"
    });
});
app.post('/register',async(req, res) => {
    try {
        const hashedPassword =await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save().then(result => {
            res.status(200).send({
                message: "User Created"
            });
        })
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
});
app.post('/login',async(req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result) {
                    res.status(200).send({
                        message: "Login Success"
                    });
                } else {
                    res.status(500).send({
                        message: "Password Incorrect"
                    });
                }
            });
        } else {
            res.status(500).send({
                message: "User Not Found"
            });
        }
    });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening at port ${port}`));
