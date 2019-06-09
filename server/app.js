const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const User = require("./models/User");

app.use(express.static("client"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"))
});

app.get("/users", (req, res) => {
    User
        .getAllUsers()
        .then(result => res.status(200).json(result))
        .catch(e => console.log(e));
});

app.post("/users", (req, res) => {
    const user = new User(req.body.name);
    user
        .save()
        .then(() => res.status(201).end())
        .catch(e => console.log(e));
});


app.listen(80, () => console.log("Server is running on 80"));