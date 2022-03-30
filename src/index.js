import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';

import store, { getUsers } from './store';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  async componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapState = ({ users }) => {
  return {
    users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

const Connected = connect(mapState, mapDispatch)(App);

render(
  <Provider store={store}>
    <Connected />
  </Provider>
, document.querySelector('#root'));
