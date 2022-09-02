const fanPagesRoute = require('../routes/public/fanPagesRoute');
const bannersRoute = require('../routes/public/bannersRoute');
const imgsRoute = require('../routes/public/imgsRoute');

const app = require('express');
const router = app.Router();

router.use('/fanPages', fanPagesRoute);
router.use('/banners', bannersRoute);
router.use('/imgs', imgsRoute);

module.exports = router;