const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { 
        type : String
    },
    lastName: { 
        type : String
    },
    email: { 
        type : String
    },
    password: { 
        type : String
    },
    phoneNumber: { 
        type : String
    }
})

module.exports = mongoose.model('User', userSchema);