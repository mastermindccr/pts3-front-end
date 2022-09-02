const app = require('express');
const path = require('path');
const router = app.Router();
const fromString = require('uuid-by-string');
require('dotenv').config(path.join(__dirname, '../.env'));

router.get('/:image', (req, res) => {
    const link = fromString(req.params.image);
    res.sendFile(path.join(__dirname, `../public/img/${link}`), err => {
        if(err) {
            res.redirect(404, `http://localhost:${process.env.PORT}/img/default.png`)
        }
    })
})

module.exports = router;