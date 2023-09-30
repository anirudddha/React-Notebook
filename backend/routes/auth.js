const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'imverygood&$boy';
// Route 1: Create User using :POST  "/api/auth/createUser" dosent require auth no login required
router.post('/createUser', [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let succes =false;
    //if there are errors return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ succes,result: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    secPassword = await bcrypt.hash(req.body.password, salt);
    //check weather user exist already or not 
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "user with this email already exist" })
        }
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // .then(user => res.json(user));
        succes = true;
        res.json({succes,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    // res.send(req.body);
})

// Toute 2: Authentication of a Usr using :post :"/api/auth/login". no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blanck').exists(),
], async (req, res) => {
    let succes = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            succes = false;
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            succes = false;
            return res.status(400).json({ succes,error: "please try to login with correct credentials" });   
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        succes = true;
        res.json({ succes ,authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
})
// Toute 3: get logedin user details :post :"/api/auth/getuser". no login required

router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
})
module.exports = router