const admin = require('./routers/admin');
const public = require('./routers/public');

const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(cors({origin: process.env.frontend_server}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/admin', admin);
app.use('/public', public);

app.use(function (req, res){
    res.status(404).send({
        status: { type: 'error', message: 'Invalid Request.' },
        data: null 
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('app is ready!')
})