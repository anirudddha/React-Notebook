const mongoose = require('mongoose');
// const mongoURI = "mongodb://0.0.0.0:27017/iNotebook"
const mongoURI = "mongodb+srv://aniruddha:aniruddha@inotebook.hfyzhli.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false);
const connetToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
         console.log("Connected to Mongo Succesfully");
    })
}

module.exports = connetToMongo;