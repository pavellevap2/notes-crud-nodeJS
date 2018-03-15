const express = require("express");
const bodyParser = require("body-parser");
let users = require("../db/users");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    if (res.statusCode == 200) {
        res.send(`Hello status ${res.statusCode}`);
    } else if (res.statusCode == 404) {
        res.send (`Error ${res.statusCode.code}`);
    }
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    let user = {
        id: 4,
        name: `${req.body.name}`
    };
    users.push(user);

    res.send(user);
});
app.get("/users/:id", (req, res) => {
    let user = users.find((user) => user.id == Number(req.params.id));
    res.send(user);
});


app.put("/users/:id", (req, res) => {
    let user = users.find((user) => user.id == Number(req.params.id));
    user.name = req.body.name;

    if (res.statusCode == 200) {
        res.send(user);
    } else if (res.statusCode == 404) {
        res.send(`Error : ${res.statusCode}`);
    }

});

app.delete("/users/:id", (req, res) => {
    users = users.filter(user => user.id != Number(req.params.id));
    res.sendStatus(200);
});

app.listen(3001, () => {
    console.log("Server is up and running on port 3001 ");
});