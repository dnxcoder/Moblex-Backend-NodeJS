const express = require('express');

const app = express();


app.get('/', (req,res)=> {

    res.send('Welcome to Moblex BACKEND !');
})

app.listen(3030);