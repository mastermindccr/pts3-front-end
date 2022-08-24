const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const multer = require('multer')
const upload = multer({
    dest: './public/img'
})

app.use(cors({origin: 'http://localhost:9000'}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/submit', upload.single('img'), (req, res) => {
    if(req.file){
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `./public/img/${req.file.originalname}`);
        fs.rename(tempPath, targetPath, err => {
            if(err) console.error(err);
        })
    }
    res.end(JSON.stringify(''));
})

app.post('/checkImageExists', (req, res) => {
    if(fs.existsSync(`./public/img/${req.body.name}`)){
        res.end(JSON.stringify('repeated'));
        return;
    }   
    res.end(JSON.stringify('ok'));
})

app.listen('5000', ()=>{
    console.log('app is ready!')
})