const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullName:{
    firstname:{
      type : String,
      required : true,
      minlength : [3, 'First name must be at least 3 characters long'],
    },
    lastname:{
      type : String,
      minlength : [3, 'Last name must be at least 3 characters long'],
    }
  },
  email:{
    type : String,
    required : true,
    unique : true,    
    lowercase : true,
    match : [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password:{
    type : String,
    required : true,  
    select : false,
  },

  socketId:{
    type : String,
  },

  status:{
    type : String,
    enum : ['active', 'inactive'],
    default : 'inactive',
  },

  vehicle:{
    color :{
      type : String,
      required : true,
      minlength : [3, 'Vehicle color must be at least 3 characters long'],
    },
    plate:{
      type : String,
      required : true,
      minlength : [3, 'Vehicle plate must be at least 3 characters long'],
    },
    capacity:{
      type : Number,
      required : true,
      min : [1, 'Vehicle capacity must be at least 1'],
    },
    vehicleType:{
      type : String,
      required : true,
      enum : ['car', 'motorcycle', 'auto'],
    }
  },

  location :{
    lat:{
      type : Number,
    },
    lng:{
      type : Number,
    }
  }
});

// 3 method for captain model are generateAuthToken, ComparePassword, hashPassword

captainSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

captainSchema.methods.ComparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
}


const CaptainModel = mongoose.model('Captain', captainSchema);

module.exports = CaptainModel;