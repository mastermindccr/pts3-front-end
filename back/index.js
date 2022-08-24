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

app.use(cors({origin: '*', credentials: true}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/submit',/*  bodyParser.raw({type: ['image/jpeg', 'image/png']}),  */  (req, res) => {
    res.setHeader('Access-Allow-Origin': true)
    console.log(req.body);
    res.end(JSON.stringify("Home"))
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