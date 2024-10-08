const jokes = require("../model/joke");
 
class JokesController {
  async create(category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang) {
    if (!category || !type || !joke || nsfw === undefined || religious === undefined ||
        political === undefined || racist === undefined || sexist === undefined ||
        explicit === undefined || safe === undefined || !lang) {
      throw new Error("Dados obrigatórios não preenchidos.");
    }
 
    const jokesValue = await jokes.create({
      category,
      type,
      joke,
      nsfw,
      religious,
      political,
      racist,
      sexist,
      explicit,
      safe,
      lang
    });
 
    return jokesValue;
  }
 
  async findOne(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
 
    const jokesValue = await jokes.findByPk(id);
 
    if (!jokesValue) {
      throw new Error("Piada não encontrada.");
    }
 
    return jokesValue;
  }
 
  async findAll(page = 1) {
    try {
      const limit = 20;
      const offset = (page - 1) * limit;
      const { count, rows: jokesValue } = await jokes.findAndCountAll({ limit, offset });
 
      if (page === 1 && jokesValue.length === 0) {
        let hasMore = true;
        let pageNum = 1;
 
        while (hasMore) {
          try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/Any?page=${pageNum}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
 
            const data = await response.json();
            hasMore = data.hasOwnProperty('nextPage') && data.nextPage !== null;
 
            data.jokes.forEach(it => {
              jokes.create({
                category: it.category,
                type: it.type,
                joke: it.joke,
                nsfw: it.nsfw || false,
                religious: it.religious || false,
                political: it.political || false,
                racist: it.racist || false,
                sexist: it.sexist || false,
                explicit: it.explicit || false,
                safe: it.safe || true,
                lang: it.lang || 'en'
              });
            });
            pageNum++;
          } catch (error) {
            hasMore = false;
          }
        }
      }
 
      const pages = Math.ceil(count / limit);
 
      return {
        info: {
          count: count,
          pages: pages,
          next: page < pages ? `http://localhost:3000/api/v1/jokes?page=${page + 1}` : null,
          prev: page > 1 ? `http://localhost:3000/api/v1/jokes?page=${page - 1}` : null
        },
        results: jokesValue
      };
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao listar as piadas, tente novamente.');
    }
  }
 
  async update(id, category, type, joke, nsfw, religious, political, racist, sexist, explicit, safe, lang) {
    const oldJokes = await jokes.findByPk(id);
 
    if (!oldJokes) {
      throw new Error('Piada não encontrada!');
    }
 
    oldJokes.category = category || oldJokes.category;
    oldJokes.type = type || oldJokes.type;
    oldJokes.joke = joke || oldJokes.joke;
    oldJokes.nsfw = nsfw !== undefined ? nsfw : oldJokes.nsfw;
    oldJokes.religious = religious !== undefined ? religious : oldJokes.religious;
    oldJokes.political = political !== undefined ? political : oldJokes.political;
    oldJokes.racist = racist !== undefined ? racist : oldJokes.racist;
    oldJokes.sexist = sexist !== undefined ? sexist : oldJokes.sexist;
    oldJokes.explicit = explicit !== undefined ? explicit : oldJokes.explicit;
    oldJokes.safe = safe !== undefined ? safe : oldJokes.safe;
    oldJokes.lang = lang || oldJokes.lang;
 
    await oldJokes.save();
 
    return oldJokes;
  }
 
  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
   
    const jokesValue = await this.findOne(id);
    await jokesValue.destroy();
 
    return;
  }
}
 
module.exports = new JokesController();