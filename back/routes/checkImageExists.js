const app = require('express');
const fs = require('fs');
const router = app.Router();

router.post('/', (req, res) => {
    if(fs.existsSync(`../public/img/${req.body.name}`)){
        res.json('repeated');
        return;
    }   
    res.json('');
})

module.exports = router;