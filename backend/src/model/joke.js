const database = require("../config/database");

class Jokes {
  constructor() {
    this.model = database.db.define("jokes", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: database.db.Sequelize.ENUM(
          'Programming', 
          'Miscellaneous', 
          'Dark', 
          'Pun', 
          'Spooky', 
          'Christmas'
        ),
        allowNull: false,
      },
      type: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      joke: {
        type: database.db.Sequelize.TEXT,
        allowNull: false,
      },
      nsfw: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      religious: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      political: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      racist: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      sexist: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      explicit: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      safe: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
      },
      lang: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
    });
  }
}

module.exports = new Jokes().model;
