var async = require('async');
var mongoose = require('mongoose');
var fs = require('fs');
var csv = require('fast-csv');
var dotenv = require('dotenv');
var userAccounts = JSON.parse(fs.readFileSync('./csv/customer.json', 'utf8'));

// Load environment variables from .env file
dotenv.load();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB);

var schemaOptions = {
  timestamps: true
};
//
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
  imageUrl: String,
  zip: String,
  city: String,
  twitter: String,
  google: String,
  github: String,
  score: String,
  confidence: String,
  testUserName: String,
  comments: [],
  accounts: [mongoose.Schema.Types.Mixed],
  status: mongoose.Schema.Types.Mixed,
  fbData: mongoose.Schema.Types.Mixed,
  linkedInData: {
    url: String,
    company: []
  },
  otherData: [mongoose.Schema.Types.Mixed]
}, schemaOptions);

var Customer = mongoose.model('Customer', customerSchema);

function importAccounts() {
  var i=1;
  async.eachSeries(userAccounts.data, function (customer, nextCustomer) {
    var customerData = new Customer({
      customerId: i++,
      name: customer.Name,
      email: customer.email,
      mobile: customer.Mobile,
      nationality: customer.Nationality,
      dob: customer.DateofBirth,
      location: customer.Location,
      address: customer.Address,
      zip: customer.zip,
      city: customer.city,
      testUserName: customer.Testdata,
      accounts: customer.account,
      imageUrl:customer.image_url ,
      fbData: customer.facebook,
      linkedInData:customer.linkedIn
    });

    customerData.save(function(err) {
      i++;
      return nextCustomer(err);
    });

   }, function (err) {
     if(err) return console.error(err);
     console.log('All customers Updated');
   });
}
importAccounts();
