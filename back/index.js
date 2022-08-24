const express = require('express')
const app = express();
const fs = require('fs');
const cors = require('cors')
const multer = require('multer');
const path = require('path');
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
    res.json('');
})

app.post('/checkImageExists', (req, res) => {
    if(fs.existsSync(`./public/img/${req.body.name}`)){
        res.json('repeated');
        return;
    }   
    res.json('');
})

app.get('/getImagesURL', (req, res) => {
    const Urls = fs.readdirSync('./public/img', (err, data) => {
        if(err) console.error(err);
        return data;
    })
    if(Urls) res.json(Urls);
    else res.json('');
})

app.get('/getImages', (req, res) => {
    var files = [];
    fs.readdir('./public/img', (err, data) => {
        if(err) console.error(err);
        files = data.map(file => {
            fs.readFile(`./public/img/${file}`, (err, data) => {
                if(err) console.log(err);
                return data;
            })
        })
    })
    console.log(files);
    res.data = files;
    res.json(res);
})

app.listen('5000', ()=>{
    console.log('app is ready!')
})