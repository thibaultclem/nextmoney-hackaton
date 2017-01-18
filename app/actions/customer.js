export function fetchCustomer(token) {
return (dispatch) => {
  return fetch('/customers', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    if (response.ok) {
      return response.json().then((customers) => {
        dispatch({
          type: 'CUSTOMER_FETCH_SUCCESS',
          customers
        });
      });
    } else {
      return response.json().then((json) => {
        //TODO:
      });
    }
  });
};
};
