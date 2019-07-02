const  mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


var SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    displayName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new  Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('You  cannot password as password')
            }
        }

    },
    creationData: {
        type: Date, default: Date.now
    },
    signInDate : {
        type: Date, default: Date.now
    },
    role: {
        type: String,
        enum: ['Agent','Closer','Admin']
    }
})

userSchema.pre("save", function(done) {
    var user = this;
  
    if (!user.isModified("password")) {
      return done();
    }
  
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) { return done(err); }
      bcrypt.hash(user.password, salt, function(err, hashedPassword) {
        if (err) { return done(err); }
        user.password = hashedPassword;
        done();
      });
    });
  });
  
  userSchema.methods.getPublicUser = function (){
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.creationData
    delete userObject.signInDate

    return userObject
  }
  userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
      done(err, isMatch);
    });
  };
  
  userSchema.methods.name = function() {
    return this.displayName || this.username;
  };
const User = mongoose.model('User',userSchema)

module.exports = User