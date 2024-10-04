const express = require("express");
const cors = require("cors");
const database = require("./config/database");

const UserApi = require("./api/user");
const UserRouter = require("./routes/user");
const JokeRouter = require("./routes/joke");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());

app.use(cors());

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
    if (!process.env.TEST) {
      app.listen(3000, (_) => {
        console.log("Server running on port 3000");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados ${e}`);
  });

module.exports = app;
