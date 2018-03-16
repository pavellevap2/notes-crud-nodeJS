const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

let users = require("./db/db").users;
let notes = require("./db/db").notes;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

//список всех юзеров
app.get("/users", (req, res) => {
    let html = "<h3>Users</h3><ol>";

    users.forEach(user => html = html + `<li>${user.username}</li>` );
    html += "</ol>";

    if(!html) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html)
    }
});

//добавить юзера
app.post("/users", (req, res) => {
    users.push({
        id : users.length + 1,
        username: req.body.username
    });

    if(!req.body.username ){//не уверен насчёт этого условия
        res.send("not found username")
    } else{
        res.json(users);
    }

});

//обновить юзера
app.put("/users/:id", (req, res) => {
   let user = users.find((user) => user.id == Number(req.params.id - 1));
   user.username = req.body.username;

   if( !req.body.username){
       res.sendStatus(200);
   } else {
       res.sendStatus(404);
   }

});

//удалить юзера
app.delete("/users/:id", (req, res) => {
    users = users.filter(user =>  user.id != Number(req.params.id -1 ) );

    if(!users){
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }
});


//все заметки
app.get("/notes", (req, res) => {
    let html = `<h3>Notes of users</h3><ol>`;

    notes.forEach(note => html = html +
            `<li>
                <h4>${users[note.userId].username}</h4>
                <p>${note.title}</p>
             </li>`
    );
    html += "<ol/>";

    if(!html) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html)
    }
});

//добавить новую заметку
app.post("/notes", (req, res) => {
    notes.push({
        userId: req.body.userId,
        title: req.body.title
    });
    if(!req.body.title && !req.body.userId){
        res.sendStatus(404)
    } else {
        res.json(notes);
    }
});

//обновить заметку
app.put("/notes/:id", (req, res) => {
    let note = notes[req.params.id - 1];
    note.title = req.body.title;

    if(req.body.title){
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

//удалить заметку
app.delete("/notes/:id", (req, res) => {
    notes = notes.filter(notes => notes.userId != Number(req.params.id - 1));

    if(!notes){
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }

});

app.listen(3001, () => {
    console.log("Server is up and running on port 3001 ");
});