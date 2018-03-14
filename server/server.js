let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let users = [
    {
        "id": 1,
        "name": "firstUser"
    },
    {
        "id": 2,
        "name": "secondUser"
    },
    {
        "id": 3,
        "name": "thirdUser"
    }

];

app.get("/", (req, res) => {
   res.send("Hello server")
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    let user = {
        id: Date.now(),
        name: req.body.name
    };
    console.log(req.body);
    users.push(user);

    res.send(user);
});

app.listen(3001, () => {
    console.log("app started");
});