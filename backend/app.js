
var express = require('express')
var {nanoid} = require('nanoid')
var cors = require('cors')
var app = express()
app.use(cors());

app.get('/',(req,res) => {
    return res.status(200).json('succsess')
})

app.listen(8000, () => {
    console.log(`Backend Listening on port 8000`);
});
