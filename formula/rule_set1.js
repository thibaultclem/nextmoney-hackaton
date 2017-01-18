exports.calc = function(data) {
    var score = 0

    var accountBalance = calcAccountBalance(data);
    var spendings = calcSpendings(data);
    var income = calcIncome(data);
    var employment = calcEmployment(data);
    var age = calcAge(data);
    var weights = getWeights();

    score += accountBalance * weights.accountBalance;
    score += spendings * weights.spendings;
    score += income * weights.income;
    score += employment * weights.employment;
    score += age * weights.age;

    return {
        confidence: calcConfidence(data),
        score: score,
        subcat: {
            accountBalance: accountBalance,
            spendings: spendings,
            income: income,
            employment: employment,
            age: age
        }
    }
}

function calcConfidence(data) {
    var conf = 1;
    var weights = getWeights();

    if (typeof data.AccountBalance === 'undefined') {
        conf = conf - weights.accountBalance;
    }
    if (typeof data.Spending === 'undefined') {
        conf = conf - weights.spendings;
    }
    if (typeof data.Income === 'undefined') {
        conf = conf - weights.income;
    }
    if (typeof data.EmploymentSeniority === 'undefined' || typeof data.CompanySize == 'undefined') {
        conf = conf - weights.employment;
    }
    if (typeof data.Age === 'undefined') {
        conf = conf - weights.age;
    }

    return conf * 100;
}

function calcAccountBalance(data) {
    if (data.AccountBalance >= 1000000)
        return 0.5;
    else if (data.AccountBalance >= 500000)
        return 0.25;
    else if (data.AccountBalance >= 200000)
        return 0.125;
    else if (data.AccountBalance >= 50000)
        return 0.0625;
    else if (data.AccountBalance >= 10000)
        return 0.03125;
    else
        return 0.015625;
}

function calcSpendings(data) {
    if (data.Spending >= 35000)
        return 0.5;
    else if (data.Spending >= 25000)
        return 0.25;
    else if (data.Spending >= 15000)
        return 0.125;
    else if (data.Spending >= 8000)
        return 0.0625;
    else if (data.Spending >= 5000)
        return 0.03125;
    else
        return 0.015625;
}

function calcIncome(data) {
    if (data.Income >= 35000)
        return 0.5;
    else if (data.Income >= 25000)
        return 0.25;
    else if (data.Income >= 15000)
        return 0.125;
    else if (data.Income >= 8000)
        return 0.0625;
    else if (data.Income >= 5000)
        return 0.03125;
    else
        return 0.015625;
}

function calcEmployment(data) {
  var sweight;

  if (data.EmploymentSeniority == "Owner")
      sweight = 0.5;
  else if (data.EmploymentSeniority == "CXO")
      sweight = 0.25;
  else if (data.EmploymentSeniority == "Partner")
      sweight = 0.125;
  else if (data.EmploymentSeniority == "Director")
      sweight = 0.0625;
  else if (data.EmploymentSeniority == "VP")
      sweight = 0.03125;
  else if (data.EmploymentSeniority == "Manager")
      sweight = 0.015625;
  else if (data.EmploymentSeniority == "Senior")
      sweight = 0.0078125;
  else
      sweight = 0.00390625;

  var cweight;

  if (data.CompanySize >= 10000)
      cweight = 0.5;
  else if (data.CompanySize >= 5001)
      cweight = 0.25;
  else if (data.CompanySize >= 1001)
      cweight = 0.125;
  else if (data.CompanySize >= 501)
      cweight = 0.0625;
  else if (data.CompanySize >= 201)
      cweight = 0.03125;
  else if (data.CompanySize >= 51)
      cweight = 0.015625;
  else if (data.CompanySize >= 10)
      cweight = 0.0078125;
  else
      cweight = 0.00390625;

  return sweight * cweight * 2;
}

function calcAge(data) {
  if (data.Age > 65)
      return 0.25;
  else if (data.Age >= 55)
      return 0.5;
  else if (data.Age >= 45)
      return 0.25;
  else if (data.Age >= 35)
      return 0.125;
  else if (data.Age >= 25)
      return 0.0625;
  else if (data.Age >= 18)
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
