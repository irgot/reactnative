import CryptoJS from "crypto-js"
import fs from 'fs'
import path from 'path'
import filesAPI from "../files"
const getPathDir = (uid) => {
    const dirname = CryptoJS.MD5(uid)
    const path = process.env.DIRBASE + dirname
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
    return (path)
}

const getFilesList = (uid) => {
    const dirname = CryptoJS.MD5(uid)
    const path = process.env.DIRBASE + dirname
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
    const files = fs.readdirSync(path)
    const filesObj = []
    files.forEach(file => {
        const objFile = {
            name: file,
            extension: getFileExtension(file),
            url: getDownloadURL(file)
        }
        filesObj.push(objFile)
    });

    return filesObj
}

const getFileExtension = (file) => {
    return path.extname(file)
}
const getDownloadURL = (file) => {
    return ("http://localhost:3000/download/" + file)
}

export { getPathDir, getFilesList }