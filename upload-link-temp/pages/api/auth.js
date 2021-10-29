import { authenticate } from "ldap-authentication";
import jwt from "jsonwebtoken";
import { stringify } from "uuid";
const authAPI = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            const { email, password } = req.body
            const username = email.split('@')[0]
            authenticate({
                ldapOpts: { url: process.env.URLLDAP },
                adminDn: process.env.ADMINDN,
                adminPassword: process.env.ADMINPWD,
                userPassword: password,
                userSearchBase: process.env.BASEDN,
                usernameAttribute: 'uid',
                username: username,

            }).catch((err) => {
                res.status(401).json({ error: 'Erro desconhecido.' })
                resolve()
            }).then((data) => {
                if (data) {
                    const { cn, givenName, uid, mail, displayName, gecos } = data
                    const user = { cn, givenName, uid, mail, displayName, gecos }
                    const token = jwt.sign({ user }, process.env.JWTSECRET, {
                        expiresIn: '1h'
                    })
                    const response = {
                        user,
                        "token": token
                    }
                    res.status(200).json(response)
                    resolve()
                }
                else {
                    // res.status(200).json({ error: 'Usuário ou senha invalidos.' })
                    resolve()
                }

            }).finally(() => {
                // console.log('finaly')
                reject()
            })
        }
        else {
            res.end()
            resolve()
        }
    })
}
export default authAPI