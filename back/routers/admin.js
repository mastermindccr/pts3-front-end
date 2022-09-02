const imgsRoute = require('../routes/admin/imgsRoute');
const fanPagesRoute = require('../routes/admin/fanPagesRoute');
const app = require('express');
const router = app.Router();

router.use('/imgs', imgsRoute);
router.use('/fanPages', fanPagesRoute);

module.exports = router;