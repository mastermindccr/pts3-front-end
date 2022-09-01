const app = require('express');
const path = require('path');
const router = app.Router();
require('dotenv').config(path.join(__dirname, '../.env'));

router.get('/:image', (req, res) => {
    res.sendFile(path.join(__dirname, `../public/img/${req.params.image}`), err => {
        if(err) {
            res.redirect(404, `http://localhost:${process.env.PORT}/img/default.png`)
        }
    })
})

module.exports = router;