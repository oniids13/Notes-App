import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "notes",
    password: "Asakapa00",
    port: 5432
  })

  db.connect();



app.use(bodyParser.urlencoded({ extended: true }));


app.get("/getData", async (req, res) =>{
    try {
        const result = await db.query("SELECT * from notesDB");
        const noteLists = result.rows;
        res.send(noteLists)
    } catch(err) {
        console.log(err)
    }

});


app.post("/add", async (req, res) => {
    const {title, content} = req.body
    try {
        const result = await db.query("INSERT INTO notesDB (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
        res.status(201).json(result.rows[0]);
    } catch(err) {
        console.error('Error adding note', err)
        res.status(500).json({error: 'Error adding note'});
    }
});

app.post("/delete", async (req, res) => {
    const id = req.body.id
    try {
        const result = await db.query("DELETE FROM notesDB WHERE id= $1",[id])
        res.status(200).json({success: true, id})
    } catch(err) {
        res.status(500).json({error: 'Error deleting note'});
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})