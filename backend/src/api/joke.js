const JokesController = require('../controller/joke')

class JokesApi {
    async createJoke(req, res) {
        const { category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang } = req.body

        try {
            const jokes = await JokesController.create(category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang)
            return res.status(201).send(jokes)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar piada: ${e.message}`})
        }
    }

    async updateJoke(req, res) {
        const { id } = req.params
        const { category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang } = req.body

        try {
            const jokes = await JokesController.update(Number(id), category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang)
            return res.status(200).send(jokes)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar piada: ${e.message}`})
        }
    }

    async deleteJoke(req, res) {
        const { id = 0 } = req.params

        try {
            await JokesController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar piada: ${e.message}`})
        }
    }

    async findOneJoke(req, res) {
        const { id } = req.params
        try {
            const jokes = await JokesController.findOne(id)
            return res.status(200).send(jokes)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar piadas: ${e.message}`})
        }
    }

    async findAllJokes(req, res) {
        try {
            const jokes = await JokesController.findAll()
            return res.status(200).send(jokes)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar piadas: ${e.message}`})
        }
    }
}

module.exports = new JokesApi()