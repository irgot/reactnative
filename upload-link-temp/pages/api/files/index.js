import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import fs from 'fs'
import { getFilesList, getPathDir } from "../services/files";
const filesAPI = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method === "GET") {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWTSECRET)
                const { user, exp } = decoded;
                // console.log(user)

                const path = getPathDir(user.uid)
                const files = getFilesList(user.uid)
                // console.log(files)
                // console.log(dirname.toString(CryptoJS.enc.Base64))
                res.json(JSON.stringify(files))
                resolve()
            }
            catch (error) {
                console.log(error)
                res.status(401).json(error)
                resolve()
            }
        } else {
            res.status(404).end("error")
            resolve()
        }
    })
}


export default filesAPI