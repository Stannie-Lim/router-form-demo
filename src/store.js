import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const users = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.users;
    default:
      return state;
  };
};

const reducer = combineReducers({
  users,
});

const store = createStore(reducer, applyMiddleware(thunk));

const getUsers = () => {
  return async dispatch => {
    const { data: users } = await axios.get('/api/users');
    dispatch({
      type: 'GET_USERS',
      users,
    });
  };
};

export default store;
export {
  getUsers,
}