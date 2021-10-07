import moment from 'moment'
import fs from 'fs'
import formidable from "formidable-serverless";
import slugify from 'slugify';
import path from 'path'
export const config = {
    api: {
        bodyParser: false
    }
}

const UploadFile = async (req, res) => {
    return new Promise((resolve, reject) => {

        const timeStamp = moment().format('DD-MM-YYYY')
        fs.mkdir(`./public/${timeStamp}`, { recursive: true }, (err) => {
            err && console.error(err)
        })

        const form = new formidable.IncomingForm({ multiples: false, uploadDir: `./public/${timeStamp}`, keepExtensions: true, maxFileSize: 1024 * 1024 * 1024 })

        form.on("fileBegin", (name, file) => {
            file.path = path.join(`public/${timeStamp}`, slugify(file.name, { trim: true, lower: true, replacement: "-" }))
        })
        // console.log('hit the post request')
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            res.json({ "files": files })
            resolve()
        })
    })


}

export default UploadFile