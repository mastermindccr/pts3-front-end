const app = require('express')
const router = app.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fromString = require('uuid-by-string');

const upload = multer({dest: './public/img'}) // used to upload image

router.get('/', (req, res) => {
    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (2*h*60*1000));
        return this;
    }
    let diff = -new Date().getTimezoneOffset();
    function jsonWithTimezone(init) {
        let date = new Date(init);
        date.addHours(diff);
        date.setSeconds(0, 0);
        let json = date.toJSON();
        let last_index = json.lastIndexOf(':');
        json = json.slice(0, last_index);
        return json;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const file = require('../../public/json/imgs.json');
    var ret = [];
    const d = new Date().toJSON();
    for(let i in file){
        ret.push({
            uuid: i,
            name: file[i].name,
            start: jsonWithTimezone(file[i].start), 
            end: jsonWithTimezone(file[i].end),
            order: file[i].order,
            show: (file[i].start<d && d<file[i].end)?file[i].show:0
        });
    }
    ret.sort((a, b) => a.order<b.order?-1:1)
    res.json(ret);
})

router.post('/', (req, res) => {
    function jsonWithTimezone(init) {
        let date = new Date(init);
        date.setSeconds(0, 0);
        let json = date.toJSON();
        let last_index = json.lastIndexOf(':');
        json = json.slice(0, last_index);
        return json;
    }

    const file = require('../../public/json/imgs.json');
    let sequence = 1;
    for(let i in req.body){
        if(req.body[i].show==2){
            fs.unlink(path.join(__dirname, `../../public/img/${req.body[i].uuid}`), (err)=>{
                if(err) console.error(err);
            });
            delete file[req.body[i].uuid];
        }
        else{
            file[req.body[i].uuid] = {
                name: req.body[i].name,
                start: jsonWithTimezone(req.body[i].start),
                end: jsonWithTimezone(req.body[i].end),
                order: sequence,
                show: req.body[i].show
            };
            sequence++;
        }
        
    }
    fs.writeFile(path.join(__dirname, '../../public/json/imgs.json'), JSON.stringify(file), (err) => {
        if(err) console.error(err);
    })
    res.json('good');
})

router.post('/:name', upload.single('img'), (req, res) => {
    if(req.file){
        const uuid = fromString(req.params.name);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `../../public/img/${uuid}`);
        fs.rename(tempPath, targetPath, err => {
            if(err) console.error(err);
        })

        const file = require('../../public/json/imgs.json');
        let d = new Date().toJSON();
        let last_index = d.lastIndexOf(':');
        d = d.slice(0, last_index);

        file[uuid] = {
            name: req.params.name,
            start: d,
            end: d,
            order: Object.keys(file).length+1,
            show: 0
        };
        fs.writeFile(path.join(__dirname, '../../public/json/imgs.json'), JSON.stringify(file), (err) => {
            if(err) console.error(err);
        })
    }
    res.json('');
})

module.exports = router;