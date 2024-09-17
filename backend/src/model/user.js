const usersMock = new Array ({
    email: "joao@joao.com",
    password: "123456"
})

class UserModel {
    findAll(){
        return usersMock
    }

    create() {

    }
}

module.exports = new UserModel()