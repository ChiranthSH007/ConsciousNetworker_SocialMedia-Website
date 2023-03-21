const mongoose = require('mongoose')
const db ="mongodb+srv://consciousnetwork728:hZF1VBqYnAlcqOw8@cluster0.lnimepz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db)
.then(()=>{
    console.log("db Connected")
}).catch(err=>{
    console.log(err)
})
//hZF1VBqYnAlcqOw8