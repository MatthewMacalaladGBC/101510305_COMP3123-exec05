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
routerUser.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, "../useras.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return next(err);
        };

        const user = JSON.parse(data);

        if (username !== user.username) {
            return res.json({ status: false, message: "User Name is invalid." })
        };
        if (password !== user.password){
            return res.json({ status: false, message: "Password is invalid." })
        };

        res.json({ status: true, message: "User is valid."})
    });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.get('/logout/:username', (req, res) => {
    const username = req.params.username; 
    // Need to append .username to avoid getting the entire json object.
    // Using just req.params sets username to { username: "name_value"} instead of just "name_value"
    res.send(`<b>${username} successfully logged out.<b>`)
});

module.exports = routerUser;