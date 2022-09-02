const imgsRoute = require('../routes/admin/imgsRoute');
const postsRoute = require('../routes/admin/postsRoute');
const app = require('express');
const router = app.Router();

router.use('/imgs', imgsRoute);
router.use('/posts', postsRoute);

module.exports = router;