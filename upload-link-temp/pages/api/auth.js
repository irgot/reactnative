import { authenticate } from "ldap-authentication";
import jwt from "jsonwebtoken";
const authAPI = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            const { username, password } = req.body
            authenticate({
                ldapOpts: { url: process.env.URLLDAP },
                adminDn: process.env.ADMINDN,
                adminPassword: process.env.ADMINPWD,
                userPassword: password,
                userSearchBase: process.env.BASEDN,
                usernameAttribute: 'uid',
                username: username,

            }).catch((err) => {
                res.status(401).json({ erro: 'Erro desconhecido.' })
                resolve()
            }).then((data) => {
                const { cn, givenName, uid, mail } = data
                const userData = { cn, givenName, uid, mail }
                const token = jwt.sign({ userData }, process.env.JWTSECRET, {
                    expiresIn: 60000
                })
                const response = { "token": 'Bearer ' + token }

                res.status(200).json(response)
                resolve()
            }).finally(() => {
                // console.log('finaly')
                reject()
            })
        }
    })
}
export default authAPI