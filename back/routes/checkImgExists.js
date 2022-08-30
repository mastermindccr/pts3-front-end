const app = require('express');
const path = require('path')
const fs = require('fs');
const router = app.Router();

router.post('/', (req, res) => {
    if(fs.existsSync(path.join(__dirname, `../public/img/${req.body.name}`))){
        res.json('repeated');
        return;
    }   
    res.json('');
})

module.exports = router;