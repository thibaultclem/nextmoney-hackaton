import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import customers from './customers';

export default combineReducers({
  messages,
  auth,
  customers
});
