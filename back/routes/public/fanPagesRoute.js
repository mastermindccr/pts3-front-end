const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const file = require('../../public/json/fanPages.json');
    var ret = [];
    var length = file.choose.length;
    for(let i in file.choose){
        ret.push(file.choose[i]);
    }
    for(let i = length; i<3;i++){
        ret.push(file.default);
    }
    if(ret) res.json(ret);
    else res.json('');
})

module.exports = router;