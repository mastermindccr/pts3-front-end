const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const upload = multer({
    dest: './public/img'
})

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    var imgs = JSON.parse(fs.readFileSync(path.join(__dirname, './public/records/select.txt')).toString());
    console.log(imgs);
    res.render('home', {
        imgs
    })
})

app.get('/backstage', (req, res) => {
    var imgs = fs.readFileSync(path.join(__dirname, './public/records/path.txt')).toString().split("\n").filter(val => val!=='');
    res.render('backstage', {
        imgs
    });
})

app.post('/form', upload.single('file'), async (req, res) => {
    const select = req.body.options?(typeof(req.body.options)==typeof([])?req.body.options:[req.body.options]):[];
    await fs.writeFileSync(path.join(__dirname, './public/records/select.txt'), JSON.stringify(select), (e)=>{console.log(e)});
    if(req.file){
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `./public/img/${req.body.name}.png`);
        await fs.appendFileSync(path.join(__dirname, './public/records/path.txt'), `${req.body.name}\n`, ()=>{})
        fs.rename(tempPath, targetPath, err => {
            if(err) console.error(err);
        })
    }
    
    
    res.redirect('/backstage');
})

app.listen('5000', ()=>{
    console.log('app is ready!')
})