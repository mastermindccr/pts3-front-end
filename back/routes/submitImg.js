const app = require('express')
const router = app.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fromString = require('uuid-by-string');

const upload = multer({
    dest: './public/img'
})

router.post('/', upload.single('img'), (req, res) => {
    if(req.file){
        const uuid = fromString(req.body.filename);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `../public/img/${uuid}`);
        fs.rename(tempPath, targetPath, err => {
            if(err) console.error(err);
        })

        const file = require('../public/json/showPic.json');
        let d = new Date().toJSON();
        let last_index = d.lastIndexOf(':');
        d = d.slice(0, last_index);

        file[uuid] = {
            name: req.body.filename,
            start: d,
            end: d,
            order: Object.keys(file).length+1,
            show: false
        };
        fs.writeFile(path.join(__dirname, '../public/json/showPic.json'), JSON.stringify(file), (err) => {
            if(err) console.error(err);
        })
    }
    res.json('');
})

module.exports = router;