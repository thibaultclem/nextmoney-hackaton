exports.get = function(accountId) {
    if (accountId == 1) {
        return {
            AccountBalance: 10000,
            Spending: 5000,
            Age: 37,
            EmploymentSeniority: 'Senior',
            CompanySize: 1000,
            Income: 5000  
        };
    }
    else if (accountId == 2) {
        return {
            AccountBalance: 30000,
            Spending: 10000,
            Age: 27,
            EmploymentSeniority: 'CXO',
            CompanySize: 2,
            Income: 4000  
        };
        
    }
}