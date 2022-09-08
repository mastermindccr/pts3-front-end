const admin = require('./routers/admin');
const public = require('./routers/public');

const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(cors({origin: process.env.FRONTEND_URL}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/admin', admin);
app.use('/public', public);

app.use(function (req, res){
    res.status(404).end('404 Page Not Found');
});

app.listen(process.env.PORT, ()=>{
    console.log('app is ready!')
})