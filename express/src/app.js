const express = require('express');
const app = express();
const words = require("./data/words.json");
// const path = require('path');

// app.use(express.static(path.resolve(__dirname)))

app.get("/search", (req,res)=>{
    const results = words.filter((word)=>
    new RegExp(`^${req.query.q}`).test(word)
    );
    res.json(results);
})

module.exports=app