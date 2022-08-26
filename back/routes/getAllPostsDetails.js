const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    const file = require('../public/json/showPost.json');
    var ret = [];
    var length = Object.keys(file.choose).length || 0;
    for(let i in file.choose){
        ret.push({link: i, type: file[i]});
    }
    for(let i = length; i<3;i++){
        ret.push({link: Object.keys(file.default)[0], type:Object.values(file.default)[0]});
    }
    if(ret) res.json(ret);
    else res.json('');
})

module.exports = router;