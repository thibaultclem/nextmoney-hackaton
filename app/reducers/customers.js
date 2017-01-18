// const initialState = [
//   {
//     name: 'Michael Chaille',
//     email: 'mchaile@gmail.com',
//     mobile: '+6576767676',
//     picture: 'https://d2ojpxxtu63wzl.cloudfront.net/static/f9682fd931fbd690af641dd09099859e_12f1a7c96bb490c8975edb55385e00b3c53962302c7c82704e1863e121b614c5',
//     status: 'prospect'
//   },
//   {
//     name: 'Michael Chaille',
//     email: 'mchaile@gmail.com',
//     mobile: '+6576767676',
//     picture: 'https://d2ojpxxtu63wzl.cloudfront.net/static/f9682fd931fbd690af641dd09099859e_12f1a7c96bb490c8975edb55385e00b3c53962302c7c82704e1863e121b614c5',
//     status: 'interested'
//   }
// ]

export default function customers(state = {}, action) {
  switch (action.type) {
    case 'CUSTOMER_FETCH_SUCCESS':
      return actions.customers;
    default:
    return state;
  }
}
