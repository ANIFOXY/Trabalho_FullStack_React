const express = require("express");
const cors = require("cors");
const database = require("../src/config/database");

const UserRouter = require("../src/routes/user");
const JokeRouter = require("../src/routes/joke");
const UserApi = require("../src/api/user"); 
const authMiddleware = require("../src/middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/login", UserApi.login);
app.post("/api/user", UserApi.createUser); 

app.use("/api/user", authMiddleware(), UserRouter);
app.use("/api/joke", JokeRouter);

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e)
    })
module.exports = app;
