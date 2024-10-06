const jokes = require("../model/joke");

class JokesController {
  async create(name, species, image, gender, status) {
    if (!name || !species || !image || !gender || !status) {
      throw new Error("Dados obrigatórios não preenchidos.");
    }

    const jokesValue = await jokes.create({
      name,
      species,
      image,
      gender,
      status
    });

    return jokesValue;
  }

  async findOne(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const jokesValue = await jokes.findByPk(id);

    if (!jokesValue) {
      throw new Error("Personagem não encontrado.");
    }

    return jokesValue;
  }
  
  async findAll(page = 1) {
    try {
      const limit = 20;
      const offset = (page - 1) * limit;
      const { count, rows: jokesValue } = await jokes.findAndCountAll({ limit, offset });

      if(page === 1 && jokesValue.length <= 0) {
        let page = 1;
        let hasMore = true;
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        while(hasMore){
          try {
            const response = await fetch(
              `https://rickandmortyapi.com/api/character?page=${page}`,
              requestOptions
            )
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();

            if(!data?.info?.next){
              hasMore = false
            }
            console.log(data)

            data.results.map(it => {
              jokes.create({
                id: it.id,
                name: it.name,
                species: it.species,
                image: it.image,
                gender: it.gender,
                status: it.status
              })
            })
            page++
          } catch (error) {
            hasMore = false
          }
        }
      }

      const pages = Math.ceil(count / limit)

      const result =  page <= pages 
        ? {
          info: {
            count: count,
            pages: pages,
            next: pages == page ? null : `http://localhost:3000/api/v1/character/?page=${page+1}`,
            prev: page == 1 ? null : `http://localhost:3000/api/v1/character/?page=${page}`
          },
          results: jokesValue
        } 
      : {
        info: {
          count: count,
          pages: pages,
          next: `http://localhost:3000/api/v1/character/?page=${1}`,
          prev: `http://localhost:3000/api/v1/character/?page=${1}`
        },
        results: []
      }

      return result;
    } catch (error) {
      console.log(error)
      throw new Error('Página não encontrada, tente novamente')
    }
  }

  async update(id, name, species, image, gender, status) {
    const oldJokes = await jokes.findByPk(id);

    if(!oldJokes){
      throw new Error('Personagem não encontrado!')
    }
    console.log(image)

    oldJokes.name = name || oldJokes.name;
    oldJokes.species = species || oldJokes.species;
    oldJokes.image = image || oldJokes.image;
    oldJokes.gender = gender || oldJokes.gender;
    oldJokes.status = status || oldJokes.status;
    oldJokes.save();

    return oldJokes;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const jokesValue = await this.findOne(id);
    jokesValue.destroy();

    return;
  }
}

module.exports = new JokesController();