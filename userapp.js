// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  date: { type: Date },

  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});
// the schema is useless so far
// we need to create a model using it
var Usertwo = mongoose.model('Usertwo', userSchema);

// make this available to our users in our Node applications
module.exports = Usertwo;
console.log('This loaded');
