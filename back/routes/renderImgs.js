const app = require('express');
const path = require('path');
const fs = require('fs');
const router = app.Router();

router.post('/', (req, res) => {

    function jsonWithTimezone(init) {
        let date = new Date(init);
        date.setSeconds(0, 0);
        let json = date.toJSON();
        let last_index = json.lastIndexOf(':');
        json = json.slice(0, last_index);
        return json;
    }

    const file = require('../public/json/showPic.json');
    try{
        for(let i in req.body){
            file[req.body[i].name] = {
                start: jsonWithTimezone(req.body[i].start),
                end: jsonWithTimezone(req.body[i].end),
                show: req.body[i].show
            };
        }
        fs.writeFile(path.join(__dirname, '../public/json/showPic.json'), JSON.stringify(file), (err) => {
            if(err) console.error(err);
        })
        res.json('good');
    }
    catch(e){
        res.json('invalid');
    }
})

module.exports = router;