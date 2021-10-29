import jwt from "jsonwebtoken";
const meAPI = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method === "GET") {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWTSECRET)
                const { user, exp } = decoded;
                const endDate = new Date(0)
                endDate.setUTCSeconds(exp)
                const now = new Date()
                const expireInMins = ((((endDate - now) % 86400000) % 3600000) / 60000)


                const newtoken = expireInMins < 20 ? jwt.sign({ user }, process.env.JWTSECRET, {
                    expiresIn: '1h'
                }) : token

                const response = {
                    user,
                    "token": newtoken
                }
                res.json(response)
            }
            catch (error) {
                res.json({ token: "expired" })
                // console.log(error)
            }


            resolve()
        }
    })
}


export default meAPI