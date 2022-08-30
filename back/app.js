const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

const submitImage = require('./routes/submitImage');
const checkImageExists = require('./routes/checkImageExists');
const renderImages = require('./routes/renderImages');
const deleteImages = require('./routes/deleteImages');
const getImagesOnBanner = require('./routes/getImagesOnBanner');
const getAllImagesStatus = require('./routes/getAllImagesStatus');
const getAllPostsDetails = require('./routes/getAllPostsDetails');
const submitPost = require('./routes/submitPost');
const image = require('./routes/image');

app.use(cors({origin: process.env.frontend_server}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/submitImage', submitImage);
app.use('/checkImageExists', checkImageExists);
app.use('/renderImages', renderImages);
app.use('/deleteImages', deleteImages);
app.use('/getImagesOnBanner', getImagesOnBanner);
app.use('/getAllImagesStatus', getAllImagesStatus);
app.use('/getAllPostsDetails', getAllPostsDetails);
app.use('/submitPost', submitPost);
app.use('/', image);

app.listen(process.env.PORT, ()=>{
    console.log('app is ready!')
})