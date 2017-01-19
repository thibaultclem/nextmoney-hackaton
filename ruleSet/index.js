exports.calc = function(data, callback) {
    var score = 0

    var accountBalance = calcAccountBalance(data);
    var spendings = calcSpendings(data);
    var income = calcIncome(data);
    var employment = calcEmployment(data);
    var age = calcAge(data);
    var weights = getWeights();

    score += accountBalance * weights.accountBalance;
    // console.log('AccountBalance', score);
    score += spendings * weights.spendings;
    // console.log('spendings', spendings * weights.spendings);
    score += income * weights.income;
    // console.log('income', income * weights.income);
    score += employment * weights.employment;
    // console.log('employment', employment * weights.employment);
    score += age * weights.age;
    // console.log('age', age * weights.age);

    return callback({
      confidence: calcConfidence(data),
      score: (score / 0.5),
      originalScore: score,
      subcat: {
          accountBalance: accountBalance,
          spendings: spendings,
          income: income,
          employment: employment,
          age: age
      }
    });
}

function calcConfidence(data) {
    var conf = 1;
    var weights = getWeights();

    if (typeof data.accountBalance === 'undefined') {
        conf = conf - weights.accountBalance;
    }
    if (typeof data.spending === 'undefined') {
        conf = conf - weights.spendings;
    }
    if (typeof data.income === 'undefined') {
        conf = conf - weights.income;
    }
    if (typeof data.employmentSeniority === 'undefined' || typeof data.companySize == 'undefined') {
        conf = conf - weights.employment;
    }
    if (typeof data.age === 'undefined') {
        conf = conf - weights.age;
    }

    return conf * 100;
}

function calcAccountBalance(data) {
    if (data.accountBalance >= 1000000)
        return 0.5;
    else if (data.accountBalance >= 500000)
        return 0.4;
    else if (data.accountBalance >= 200000)
        return 0.3;
    else if (data.accountBalance >= 50000)
        return 0.2;
    else if (data.accountBalance >= 10000)
        return 0.1;
    else
        return 0.015625;
}

function calcSpendings(data) {
    if (data.spending >= 35000)
        return 0.5;
    else if (data.spending >= 25000)
        return 0.4;
    else if (data.spending >= 15000)
        return 0.3;
    else if (data.spending >= 8000)
        return 0.2;
    else if (data.spending >= 5000)
        return 0.1;
    else
        return 0.015625;
        // wrong
}

function calcIncome(data) {
    if (data.income >= 35000)
        return 0.5;
    else if (data.income >= 25000)
        return 0.4;
    else if (data.income >= 15000)
        return 0.3;
    else if (data.income >= 8000)
        return 0.2;
    else if (data.income >= 5000)
        return 0.1;
    else
        return 0.015625;
}

function calcEmployment(data) {
  var sweight;

  if (data.employmentSeniority == "Owner")
      sweight = 0.5;
  else if (data.employmentSeniority == "CXO")
      sweight = 0.4;
  else if (data.employmentSeniority == "Partner")
      sweight = 0.4;
  else if (data.employmentSeniority == "Director")
      sweight = 0.3;
  else if (data.employmentSeniority == "VP")
      sweight = 0.2;
  else if (data.employmentSeniority == "Manager")
      sweight = 0.2;
  else if (data.employmentSeniority == "Senior")
      sweight = 0.1;
  else
      sweight = 0.00390625;

  var cweight;

  if (data.companySize >= 10000)
      cweight = 0.5;
  else if (data.companySize >= 5001)
      cweight = 0.4;
  else if (data.companySize >= 1001)
      cweight = 0.3;
  else if (data.companySize >= 501)
      cweight = 0.2;
  else if (data.companySize >= 201)
      cweight = 0.2;
  else if (data.companySize >= 51)
      cweight = 0.1;
  else if (data.companySize >= 10)
      cweight = 0.1;
  else
      cweight = 0.00390625;

  return sweight * cweight * 2;
}

function calcAge(data) {
  if (data.age > 65)
      return 0.25;
  else if (data.age >= 55)
      return 0.5;
  else if (data.age >= 45)
      return 0.25;
  else if (data.age >= 35)
      return 0.2;
  else if (data.age >= 25)
      return 0.1;
  else if (data.age >= 18)
      return 0.03125;
  else
      return 0.15625;
}

function getWeights () {
  return {
      accountBalance: 0.31,
      spendings: 0.23,
      income: 0.23,
      employment: 0.15,
      age: 0.08
  };
}
