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
 
  async findAll(type, language, category) {
    try {
      let where = {};
      if (type){
        if (type == "Any"){
          where.type = "single"
        }else {
          where.type= type
        }
      }
       // Adicionando o filtro 'language' se fornecido
    if (language) {
      where.lang = language;
    }

    // Adicionando o filtro 'category' se fornecido
    if (category) {
      where.category = category;
    }
      const jokesValue = await jokes.findAll({where });
console.log (jokesValue, where)
      if (jokesValue.length === 0 && (!type && !language && !category)) {
        let NumJoke = 1;
 
        while (NumJoke <= 100) {
          console.log ("batata")
          try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/Any`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
 
            const data = await response.json();
            console.log (data)
            
            let jokeText = null;
            if (data.type === 'twopart') {
              jokeText = `${data.setup}\n${data.delivery}`;
            } else if (data.joke) {
              jokeText = data.joke;
            }

            if (!jokeText) {
              console.log('Piada invalida ou ausente, tentando novamente...');
              continue;
            }

            await jokes.create({
              category: data.category,
              type: data.type,
              joke: data.joke,
              nsfw: data.flags.nsfw || false,
              religious: data.flags.religious || false,
              political: data.flags.political || false,
              racist: data.flags.racist || false,
              sexist: data.flags.sexist || false,
              explicit: data.flags.explicit || false,
              safe: data.safe || true,
              lang: data.lang || 'en'
            });
            NumJoke++;
          } catch (error) {
            NumJoke=20
          }
        }
      }
  
      return jokesValue;
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