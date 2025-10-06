// Added proper express setup, as well as fs and path
const express = require("express");
const fs = require("fs");
const path = require("path");
const routerUser = express.Router(); // Adjust all calls from router to routerUser

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get("/profile", (req, res, next) => {
    fs.readFile(path.join(__dirname, "../user.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(JSON.parse(data));
    });
});

// Error handling middle-ware test
routerUser.get("/test-error", (req, res, next) => {
    throw new Error("Error Handling Test")
});




/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
routerUser.post('/login', (req, res) => {
    const { username, password } = req.body;
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.get('/logout', (req,res) => {
  res.send('This is logout router');
});

module.exports = routerUser;