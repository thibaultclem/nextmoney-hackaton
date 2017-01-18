var async = require('async');
var mongoose = require('mongoose');
var fs = require('fs');
var csv = require('fast-csv');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB);

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

var filePath = './csv/customers.csv'
var stream = fs.createReadStream(filePath);
var rows = [];
var successCount = 0;
var options = {
  objectMode: true,
  headers: true,
  ignoreEmpty: true,
  delimiter: ',',
  trim: true
};
var i = 1;

csv
.fromStream(stream, options)
.validate(function(data, next) {
  next(null, true);
})
.on("data-invalid", function(data) {
  status.failed.push(data);
})
.on('data', function(data) {
  rows.push(data);
})
.on('end', function() {
  async.eachSeries(rows, function (customer, nextCustomer) {

    var customerData = new Customer({
      customerId: i,
      name: customer.name,
      email: customer.email,
      mobile: customer.Mobile,
      nationality: customer.Nationality,
      dob: customer.DateofBirth,
      location: customer.Location,
      address: customer.Address,
      zip: customer.Zip,
      city: customer.City,
      testUserName: customer.Testdata,
    });

    customerData.save(function(err) {
      i++;
      return nextCustomer(err);
    });
  }, function (err) {
    if(err) return console.error(err);

    console.log('All customers Imported');
  });
});
