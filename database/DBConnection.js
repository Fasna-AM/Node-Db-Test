const mongoose = require("mongoose")

const connectionString = process.env.DBConnectionString
mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas connected successfully with nodeDbServer");
    
}).catch(err=>{
    console.log("MongoDB Atlas connection Failed");
    console.log(err);
})