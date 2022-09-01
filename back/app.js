const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

const submitImg = require('./routes/submitImg');
const checkImgExists = require('./routes/checkImgExists');
const renderImgs = require('./routes/renderImgs');
const deleteImgs = require('./routes/deleteImgs');
const getImgsOnBanner = require('./routes/getImgsOnBanner');
const getAllImgsStatus = require('./routes/getAllImgsStatus');
const getAllPostsDetails = require('./routes/getAllPostsDetails');
const submitPost = require('./routes/submitPost');
const img = require('./routes/img');

app.use(cors({origin: process.env.frontend_server}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/submitImg', submitImg);
app.use('/checkImgExists', checkImgExists);
app.use('/renderImgs', renderImgs);
app.use('/deleteImgs', deleteImgs);
app.use('/getImgsOnBanner', getImgsOnBanner);
app.use('/getAllImgsStatus', getAllImgsStatus);
app.use('/getAllPostsDetails', getAllPostsDetails);
app.use('/submitPost', submitPost);
app.use('/img', img);
app.get('*', function (req, res){
    res.status(404).send({
        status: { type: 'error', message: 'Invalid Request.' },
        data: null 
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('app is ready!')
})