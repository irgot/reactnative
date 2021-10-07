export const config = {
    api: {
        bodyParser: false
    }
};
import fs from 'fs'
import path from 'path'
import mime from 'mime'

const DownloadFile = async (req, res) => {
    if (req.method == 'GET') {

        console.log(req.method)
        const file = "./public/07-10-2021/nt_193000_client.zip"
        const filename = path.basename(file)
        const mimetype = mime.getType(file)



        res.setHeader('Content-disposition', 'attachment; filename=' + filename)
        res.setHeader('Content-type', mimetype)
        res.setHeader('x-suggested-filename', filename)
        const fileStream = fs.createReadStream(file)
        const fileInformation = fs.statSync(file)
        res.setHeader('Content-Length', fileInformation.size)


        fileStream.pipe(res)
    }

}

export default DownloadFile