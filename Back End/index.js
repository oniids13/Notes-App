import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "notes",
    password: "Asakapa00",
    port: 5432
  })

  db.connect();



app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) =>{

    try {
        const result = await db.query("SELECT * from notesDB");
        const noteLists = result.rows;
        res.send (noteLists)
    } catch(err) {
        console.log(err)
    }

});


app.post("/add", async (req, res) => {
    try {

    } catch(err) {
        console.log(err)
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})