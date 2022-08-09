const express = require('express')
const cors = require('cors')
const path = require('path')
const { handleExport } = require('./compress/handleExport')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/export', handleExport);

app.get('/zip/*',(req,res)=>{
    try {
        const name = req.url
        //filePath是要下载的文件的路径，fileName是要下载的文件的名字
        let filePath = `${__dirname}/${name}`;
        let fileName = path.basename(filePath);
        res.download(filePath, fileName);
    } catch (error) {
        return res.status(500).send({
            result: 'error',
            message: `Failed to download file: ${error.message}`
        })
    }
})

app.listen(9999, () => console.log('服务器启动了，端口是9999'))