require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 7000;
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Note = require("./models/note.model");
const config = require("./config.json");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

mongoose.connect(config.connectionString); 

app.use(express.json());
app.use(cors({origin: "*"}));


// Test API
app.get('/',(req,res) => {
    res.json({data: "This is TESTING API"});
    console.log("TESTING API WORKING !!!!")
});

// Create Account API
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required"});
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required"});
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required"});
    }

    const isUser = await User.findOne({email: email});

        if(isUser){
            return res.json({error: true, message:"User already exist",});
        }
        const user = new User({fullName,email,password,});

        await user.save();

        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36m",
        });

        return res.json({
            error: false, user, accessToken, message: "Registration Successful",
        });
});
// Login API
app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        return res.status(400).json({message: "Email is required"});
    }
    if (!password) {
        return res.status(400).json({message: "Password is required"});
    }

    const userInfo = await User.findOne({email: email});

    if(!userInfo) {
        return res.status(400).json({message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({error: false, message: "Login Successful", email, accessToken,});

    } else {
        return res.status(400).json({error: true, message: "Invalid Credentials",});
    }
})
// Get User API
app.get("/get-user", authenticateToken, async (req, res) => {
    const {user} = req.user;

    const isUser = await User.findOne({_id: user._id});

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn
    }, message: ""});
});
// Add Note API
app.post("/add-note", authenticateToken, async (req, res) => {
    const { content } = req.body;
    const { user } = req.user;

    if (!content) {
        return res.status(400).json({error: true, message: "Content is required"});
    }
    try {
        const note = new Note({
            content,
            userId: user._id,
        });

        await note.save();

        return res.json({error: false, note, message: "Note added successfully"});

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});
// Edit Note API
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { content } = req.body;
    const { user } = req.user;

    if (!content) {
        return res.status(400).json({error: true, message: "No Change provided"});
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found"});
        }

        if (content) note.content = content;
        
        await note.save();

        return res.json({error: false, note, message: "Note updated successfully",});
    } catch (error) {return res.status(500).json({error: true, message: "Internal Server Error",})};
})

// Get All Notes API
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id })
        return res.json({error: false, notes, message: "All notes retrieved successfully,"});
    } catch (error) {
        return res.status(500).json({error: true, message: "Internal Server Error",});
    }
})

// Delete Note API
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note) {
            return res.status(404).json({error: true, message: "Note note found"});
        }

        await Note.deleteOne({_id: noteId, userId: user._id});

        return res.json({error: false, message: "Note deleted successfully"});
    } catch (error) {
        return res.status(500).json({error: true, message: "Internal Server Error"});
    }
})


app.listen(PORT, () => console.log(`Server is listening on locahost:${PORT}`));


module.exports = app;