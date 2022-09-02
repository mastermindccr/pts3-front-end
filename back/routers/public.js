const postsRoute = require('../routes/public/postsRoute');
const bannersRoute = require('../routes/public/bannersRoute');
const imgsRoute = require('../routes/public/imgsRoute');

const app = require('express');
const router = app.Router();

router.use('/posts', postsRoute);
router.use('/banners', bannersRoute);
router.use('/imgs', imgsRoute);

module.exports = router;