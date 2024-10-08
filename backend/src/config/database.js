const { Sequelize } = require("sequelize");

class Database {

    constructor() {
        this.init();
    }
    
    init(){
        this.db = new Sequelize({
            database:"apiRenan",
            host:"localhost",
            password:"root",
            username:"root",
            dialect:"mysql"
        })
    }
}

module.exports = new Database();