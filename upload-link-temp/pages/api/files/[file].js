const files = (req, res) => {

    return new Promise((resolve, reject) => {
        console.log(req.query.file)
        res.send('ok')
        resolve()
    })

}

export default files