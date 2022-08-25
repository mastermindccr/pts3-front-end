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
        const file = require('./public/showPic.json')
        file[req.file.originalname] = false;
        fs.writeFile(path.join(__dirname, './public/showPic.json'), JSON.stringify(file), (err) => {
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

app.post('/render', (req, res) => {
    const file = require('./public/showPic.json');
    for(let i in req.body){
        file[req.body[i].name] = req.body[i].show;
    }
    fs.writeFile(path.join(__dirname, './public/showPic.json'), JSON.stringify(file), (err) => {
        if(err) console.error(err);
    })
    res.json('good');
})

app.get('/getImagesURL', (req, res) => {
    const file = require('./public/showPic.json');
    var ret = [];
    for(let i in file){
        ret.push({name: i, show: file[i]});
    }
    if(ret) res.json(ret);
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