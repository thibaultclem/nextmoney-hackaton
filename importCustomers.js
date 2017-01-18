var async = require('async');
var Customer = require('./models/Customer');

var fs = require('fs');
var csv = require('fast-csv');
const filePath = './controllers/customers.csv'

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
