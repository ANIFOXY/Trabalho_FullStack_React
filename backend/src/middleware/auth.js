const jwt = require('jsonwebtoken')
const user = require('../controller/user')

function authMiddleware(roles = []) {
    return (req, res, next) => {
        const token = req.header["authorization"]
        
        if (!token) {
            res.status(500)>json("Usuário não está logado")
        }

        jwt.verify(token, 'MeuSegredo123!', async (err, decoded) => {
            if(err){
                return res.status(500).json("Usuário não está logado")
            }

            const userLogger = await user.findUser(decoded.id)

            if(!userLogger) {
                return res.status(500).json("Usuario sem permissao")
            }
            if(roles.length && !roles.includes(userLogger.role)) {
                return res.status(500).json("Usuario sem permissao")
            }
            

            req.senssion = decoded;

            next()
        })
    }
}

module.exports = authMiddleware