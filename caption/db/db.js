const mongoose = require("mongoose");


function connect() {
    mongoose.connect(process.env.Mongo_URL).then(()=>{
        console.log('Caption service connected to Mongodb');
    }).catch(err=>{
        console.log(err);
    })
}




module.exports = connect