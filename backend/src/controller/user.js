const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
  async createUser(nome, email, senha, permissao ) {
    if (!nome || !email || !senha) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);

    return user.create({
      nome,
      email,
      senha: cypherSenha,
      permissao,
    });
  }

  async findUser(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const userValue = await user.findByPk(id);
    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }

    return userValue;
  }

  async update(id, nome, email, senha) {
    const oldUser = await this.findUser(id);
    
    if (email) {
      const sameEmail = await user.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email já cadastrado.");
      }
    }

    oldUser.nome = nome || oldUser.nome;
    oldUser.email = email || oldUser.email;
    oldUser.senha = senha
      ? await bcrypt.hash(String(senha), SALT_VALUE)
      : oldUser.senha;

    await oldUser.save();
    return oldUser;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    
    const userValue = await this.findUser(id);
    await userValue.destroy();
  }

  async find() {
    return user.findAll();
  }

  async login(email, senha) {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userValue = await user.findOne({ where: { email } });
    if (!userValue) {
      throw new Error("Usuário e senha inválidos.");
    }

    const senhaValida = await bcrypt.compare(String(senha), userValue.senha);
    if (!senhaValida) {
      throw new Error("Usuário e senha inválidos.");
    }

    return jwt.sign({ id: userValue.id, permissao: userValue.permissao }, SECRET_KEY, { expiresIn: 60 * 60 });
  }

  async blockUser(id) {
    const userValue = await this.findUser(id);
    userValue.status = 'blocked';
    await userValue.save();
    return userValue;
  }

  async unblockUser(id) {
    const userValue = await this.findUser(id);
    userValue.status = 'active';
    await userValue.save();
    return userValue;
  }
}

module.exports = new UserController();
