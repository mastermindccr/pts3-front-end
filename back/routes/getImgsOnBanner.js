const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const file = require('../public/json/showPic.json');

    var ret = [];
    let keys = Object.keys(file).reverse();
    for(let i in keys){
        if(ret.length==8) break;
        if(file[keys[i]].show){
            let start = file[keys[i]].start;
            let end = file[keys[i]].end;
            let now = new Date().toJSON();
            if(start<now && now<end){
                ret.push(keys[i]);
            }
        }
    }
    if(!ret.length) ret.push('default');
    res.json(ret);
})

module.exports = router;