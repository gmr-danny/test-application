const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
  username: {type: String, unique: true},
  email: String,
  password: String,
  name: String,
  age: Number,
  gender: String,
  preferredDates: [ String ],
  picture: {type: String, default: 'https://cdn.pixabay.com/photo/2015/10/16/19/18/balloon-991680__340.jpg'},
  about: String,
  minAge: {type: String, default: '0'},
  maxAge: {type: String, default: '9999'},
  preferredGender: [String],
  likedUsers: [ userSchema ],
  availableUsers: [ userSchema ],
  matches: [ userSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
