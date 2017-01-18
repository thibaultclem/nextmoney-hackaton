var express    = require('express');
var app        = express();
var db         = require('./data.js');
var reload     = require('require-reload')

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/api/calculate/score/:customerId', function(req, res) {
    var ruleset = reload('./rule_set1.js');

    var accountId = req.param('account')
    var data = db.get(accountId);
    var result = ruleset.calc(data);

    res.json(result);
});

app.use('/api', router);

app.listen(port);
console.log('listening on ' + port);
