const express = require("express")
const People = require("./people") // new
const router = express.Router()

router.get("/search", async (req, res) => {
  const people = await People.find()
  const results = people.filter((word)=>
    new RegExp(`${req.query.q}`,'gi').test(word.name)
    );
  res.json(results);
})

router.post("/people", async (req, res) => {
    const people = new People({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender
    })
    await people.save()
    res.send(people)
})

router.get("/people/:id", async (req,res)=>{
  try{
    const people = await People.findOne({_id:req.params.id})
    res.send(people)
  }
  catch{
    res.status(404)
    res.send("Politician doesn't exist !")
  }
})

module.exports = router
