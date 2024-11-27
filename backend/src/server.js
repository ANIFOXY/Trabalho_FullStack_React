const express = require("express");
const cors = require("cors");
const database = require("../src/config/database");
const UserModel = require("../src/model/user"); 

const UserRouter = require("../src/routes/user");
const JokeRouter = require("../src/routes/joke");
const UserApi = require("../src/api/user");
const authMiddleware = require("../src/middleware/auth");

require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/login", UserApi.login);
app.post("/api/user", UserApi.createUserViewer);

app.use("/api/user", authMiddleware(), UserRouter);
app.use("/api/joke", JokeRouter);

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      console.error("As variáveis ADMIN_EMAIL, ADMIN_PASSWORD e ADMIN_NAME são obrigatórias no .env.");
      return;
    }

    await UserModel.create({
      nome: adminName,
      email: adminEmail,
      senha: adminPassword, 
      permissao: "admin",
    });
    console.log(`Usuário admin criado com sucesso: ${adminEmail}`);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("Usuário admin já existe ou houve um conflito de chave única.");
    } else {
      console.error("Erro ao criar o usuário admin: ", error);
    }
  }
};

database.db
  .sync({ force: false })
  .then(async () => {
    await createAdminUser();
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((e) => {
    console.error("Erro ao conectar com o banco: ", e);
  });

module.exports = app;
