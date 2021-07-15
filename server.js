var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var bodyparser = require('body-parser');

app.use(cors())
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname+ '/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/build/index.html'));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+ '/build/index.html'));
});

//var server = require('http').createServer()




var port  = process.env.PORT || 5000

app.listen(port,()=>{
    console.log("server is listening on" , port );

})





