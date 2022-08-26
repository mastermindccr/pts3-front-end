const app = require('express')
const router = app.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
    dest: './public/img'
})

router.post('/', upload.single('img'), (req, res) => {
    if(req.file){
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `../public/img/${req.file.originalname}`);
        fs.rename(tempPath, targetPath, err => {
            if(err) console.error(err);
        })
        const file = require('../public/json/showPic.json');
        file[req.file.originalname] = false;
        fs.writeFile(path.join(__dirname, '../public/json/showPic.json'), JSON.stringify(file), (err) => {
            if(err) console.error(err);
        })
    }
    res.json('');
})

module.exports = router;