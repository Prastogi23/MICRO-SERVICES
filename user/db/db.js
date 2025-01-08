const mongoose = require("mongoose");


function connect() {
    mongoose.connect(process.env.Mongo_URL).then(()=>{
        console.log('User service connected to Mongodb');
    }).catch(err=>{
        console.log(err);
    })
}




module.exports = connect