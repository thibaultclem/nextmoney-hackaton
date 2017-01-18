var crypto = require('crypto');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var customerSchema = new mongoose.Schema({
  customerId: Number,
  name: String,
  email: { type: String },
  mobile: String,
  nationality: String,
  dob: String,
  gender: String,
  location: String,
  address: String,
  zip: String,
  city: String,
  picture: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  score: String,
  confidence: String,
  testUserName: String,
  comments: [],
  status: mongoose.Schema.Types.Mixed,
  fbData: [mongoose.Schema.Types.Mixed],
  linkedinData: [mongoose.Schema.Types.Mixed],
  otherData: [mongoose.Schema.Types.Mixed]
}, schemaOptions);

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
