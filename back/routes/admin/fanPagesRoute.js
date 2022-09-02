const app = require('express');
const path = require('path');
const fs = require('fs');
const router = app.Router();

router.post('/', (req, res) => {
    const file = require('../../public/json/fanPages.json');
    for(let i in req.body){
        file.choose[i] = req.body[i];
    }
    fs.writeFile(path.join(__dirname, '../../public/json/fanPages.json'), JSON.stringify(file), (err) => {
        if(err){
            console.error(err);
            res.end(404, 'sorry for some internal server errors');
        }
        else res.json('good');
    })
})

module.exports = router;