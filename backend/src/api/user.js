const UserController = require('../controller/user');

class UserApi {
    async createUserViewer(req, res) {
        const { nome, email, senha } = req.body;
        console.log ("entrou aqui")

        try {
            const user = await UserController.createUser(nome, email, senha, "viewer");
            return res.status(201).send(user);
        } catch (e) {
            console.log(e)
            return res.status(400).send({ error: `Erro ao criar usuário: ${e.message}` });
        }
    }

    async createUserAdmin(req, res) {
        const { nome, email, senha } = req.body;
        console.log (req.body)

        try {
            const user = await UserController.createUser(nome, email, senha, "admin");
            return res.status(201).send(user);
        } catch (e) {
            console.log(e)
            return res.status(400).send({ error: `Erro ao criar usuário: ${e.message}` });
        }
    }


    async updateUser(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            const user = await UserController.update(Number(id), nome, email, senha);
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário: ${e.message}` });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            await UserController.delete(Number(id));
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário: ${e.message}` });
        }
    }

    async findUser(req, res) {
        try {
            const users = await UserController.find();
            return res.status(200).send(users);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuários: ${e.message}` });
        }
    }

    async findContext(req, res) {
        try {
            const user = await UserController.findUser(req.session.id);
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao encontrar usuário: ${e.message}` });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const token = await UserController.login(email, senha);
            return res.status(200).send({ token });
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async blockUser(req, res) {
        const { id } = req.params;

        try {
            const user = await UserController.blockUser(Number(id));
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao bloquear usuário: ${e.message}` });
        }
    }

    async unblockUser(req, res) {
        const { id } = req.params;

        try {
            const user = await UserController.unblockUser(Number(id));
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao desbloquear usuário: ${e.message}` });
        }
    }
}

module.exports = new UserApi();
