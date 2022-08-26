const app = require('express');
const path = require('path');
const router = app.Router();

router.get('/:image', (req, res) => {
    res.sendFile(path.join(__dirname, `../public/img/${req.params.image}`))
})

module.exports = router;