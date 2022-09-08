const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const file = require('../../public/json/imgs.json');
    var tmp = [];
    for(let i in file){
        tmp.push({
            name: file[i].name,
            start: file[i].start, 
            end: file[i].end,
            order: file[i].order,
            show: file[i].show
        });
    }
    tmp.sort((a, b) => a.order<b.order?-1:1)
    var ret = [];
    for(let i in tmp){
        if(ret.length==8) break;
        if(tmp[i].show==1){
            let start = tmp[i].start;
            let end = tmp[i].end;
            let now = new Date().toJSON();
            if(start<now && now<end){
                ret.push(tmp[i].name);
            }
        }
    }
    if(!ret.length) ret.push('default.jpg');
    res.json(ret);
})

module.exports = router;