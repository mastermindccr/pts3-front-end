const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (2*h*60*1000));
        return this;
    }
    let diff = -new Date().getTimezoneOffset();
    function jsonWithTimezone(init) {
        let date = new Date(init);
        date.addHours(diff);
        date.setSeconds(0, 0);
        let json = date.toJSON();
        let last_index = json.lastIndexOf(':');
        json = json.slice(0, last_index);
        return json;
    }
    
    const file = require('../public/json/showPic.json');
    var ret = [];
    for(let i in file){
        ret.push({
            name: i,
            start: jsonWithTimezone(file[i].start), 
            end: jsonWithTimezone(file[i].end), 
            show: file[i].show
        });
    }
    if(ret) res.json(ret);
    else res.json('');
})

module.exports = router;