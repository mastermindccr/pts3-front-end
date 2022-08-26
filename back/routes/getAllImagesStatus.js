const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    const file = require('../public/json/showPic.json');
    var ret = [];
    for(let i in file){
        ret.push({name: i, show: file[i]});
    }
    if(ret) res.json(ret);
    else res.json('');
})

module.exports = router;