const express = require('express');
const app = express();
const words = require("./data/words.json");
const words2 = require("./data/type2.json")

// words2.map((each)=>console.log(each.name))


app.get("/search", (req,res)=>{
    const results = words2.filter((word)=>
    new RegExp(`${req.query.q}`,'gi').test(word.name)
    );
    res.json(results);
})

module.exports=app