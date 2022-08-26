const express = require('express')
const app = express();
const cors = require('cors')

const submitImage = require('./routes/submitImage');
const checkImageExists = require('./routes/checkImageExists');
const renderImages = require('./routes/renderImages');
const deleteImages = require('./routes/deleteImages');
const getImagesOnBanner = require('./routes/getImagesOnBanner');
const getAllImagesStatus = require('./routes/getAllImagesStatus');
const image = require('./routes/image');

app.use(cors({origin: 'http://localhost:9000'}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/submitImage', submitImage);
app.use('/checkImageExists', checkImageExists);
app.use('/renderImages', renderImages);
app.use('/deleteImages', deleteImages);
app.use('/getImagesOnBanner', getImagesOnBanner);
app.use('/getAllImagesStatus', getAllImagesStatus);
app.use('/', image);

app.listen('5000', ()=>{
    console.log('app is ready!')
})