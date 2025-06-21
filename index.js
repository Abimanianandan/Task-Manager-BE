const mongoose = require("mongoose");
const app = require("./app");
const config = require("./utils/config");
console.log("connecting to mongodb...");
mongoose.connect(config.Mongodb_URL)
.then(()=>{
    console.log("mongodb connected successfully...👍");
    app.listen(config.Port,()=>{
        console.log(`server running on ${config.Port}..🌍`);     
    })
})
.catch((err)=>{
    console.log("error connecting to DB...😵‍💫",err)
})

