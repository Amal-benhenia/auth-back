//require mongoose
const mongoose = require('mongoose')

// require the schema
const Schema = mongoose.Schema

// create the schema

const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required : true
    },

    role : {
        type : String,
        default: 'user'
        
    }

})
module.exports = User = mongoose.model('User', userSchema )