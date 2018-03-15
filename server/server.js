const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

let users = require("./db/users");
let notes = require("./db/notes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.get("/users", (req, res) => {
    let html = "<h3>Users</h3><ol>";
    users.forEach(user => html = html + `<li>${user.name}</li>` );
    html += "</ol>";
    res.send(html);
});

app.post("/users", (req, res) => {
    users.push({
        id : users.length + 1,
        name : req.body.name
    });
    res.send(users);
});


//страница всех заметок пользователя
app.get("/users/:user", (req, res) => {
    let user = req.params.user;

    let html = `<h3>${user} notes</h3><ol>`;
    let userNotes  = notes[user];
    userNotes.forEach(note => html = html + `<li>${note.title}</li>`);
    html += "<ol/>";

    res.send(html)
});

//добавить новую заметку
app.post("/users/:user", (req, res) => {
    let user = String(req.params.user);

    let userNotes = notes[user];
    userNotes.push({
        title : req.body.title,
        body : req.body.body
    });

    res.send(userNotes);
});

//удалить все заметки,пока не доделал
app.delete("/users/:user", (req, res) => {
    // let user = String(req.params.user);
    // let currNotes = notes[user];
    //
    // currNotes.filter((_, i) => i != 1);
    //
    // res.sendStatus(200);
    // console.log(currNotes.filter((_, i) => i != 1))

});

//текущая/выбранная заметка
app.get("/users/:user/notes/:id", (req, res) => {
    let user = String(req.params.user);

    let userNotes = notes[user];
    let currentNote = userNotes[Number(req.params.id)];

    let html = `<h1>${user} note number ${Number(req.params.id)}</h1>
                <h3>${currentNote.title}</h3>
                <p>${currentNote.body}</p>`;


    res.send(html);
});

//обновить текущую заметку
app.put("/users/:user/notes/:id", (req, res) => {
    let user = String(req.params.user);
    let userNotes = notes[user];
    let currentNote = userNotes[Number(req.params.id)];

    currentNote.title = req.body.title;
    currentNote.body = req.body.body

    res.send(currentNote);
});


app.listen(3001, () => {
    console.log("Server is up and running on port 3001 ");
});