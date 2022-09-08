const app = require('express');
const path = require('path');
const router = app.Router();
const fromString = require('uuid-by-string');
require('dotenv').config(path.join(__dirname, '../../.env'));

router.get('/:name', (req, res) => {
    if(req.params.name=='default.jpg'){
        res.sendFile(path.join(__dirname, `../../public/img/default.jpg`), err => {
            if(err) {
                res.end(404, 'No default image! Please check the image folder!');
            }
        })
    }
    else{
        const link = fromString(req.params.name);
        res.sendFile(path.join(__dirname, `../../public/img/${link}`), err => {
            if(err) {
                res.redirect('./default.jpg');
            }
        })
    }
    
})

module.exports = router;