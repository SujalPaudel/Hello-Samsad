const express = require('express');
const app = express();
const words = require("./data/words.json");
// const path = require('path');

// app.use(express.static(path.resolve(__dirname)))

app.get("/search", (req,res)=>{
    console.log(req.query)
    const results = words.filter((word)=>
    new RegExp(`${req.query.q}`,'gi').test(word)
    );
    res.json(results);
})

module.exports=app