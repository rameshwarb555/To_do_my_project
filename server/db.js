const mongoose = require("mongoose");


const uri = "mongodb://127.0.0.1:27017/my_project";


const connect = () => { mongoose.connect( uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})


const db = mongoose.connection
db.on('error', console.error.bind(console,'connection error:'))
db.once('open', () => {
  console.log("MongoDB connection established successfully");
});
}
module.exports ={
    connect,
}
