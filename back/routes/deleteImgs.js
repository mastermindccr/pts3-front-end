const app = require('express');
const path = require('path');
const fs = require('fs');
const router = app.Router();

router.post('/', (req, res) => {
    const file = require('../public/json/showPic.json');
    for(let i in req.body){
        if(req.body[i].show){
            fs.unlink(path.join(__dirname, `../public/img/${req.body[i].name}`), (err)=>{
                if(err) console.error(err);
            });
            delete file[req.body[i].name];
        }   
    }
    fs.writeFile(path.join(__dirname, '../public/json/showPic.json'), JSON.stringify(file), (err) => {
        if(err) console.error(err);
    })
    res.json('good');
})

module.exports = router;