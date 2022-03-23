import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  render() {
    const { users } = this.props;

    const onSubmit = async (event) => {
      event.preventDefault();

      await axios.post('/api/users', { name: this.state.name });
    };

    const onChange = (event) => {
      this.setState({ name: event.target.value });
    };

    /**
     * 1. the name 
     * 2. an onChange: how do you change that value?
     * 3. a value: what is displayed onto the screen
     */
    return (
      <>
        <form onSubmit={onSubmit}>
          <input value={this.state.name} onChange={onChange} />
          <button>Create</button>
        </form>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
};

class SingleUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    // retrieve the user whose id matches const { id } = props.match.params;
    const response = await axios.get(`/api/users/${id}`);
    this.setState({ user: response.data });
  }

  render() {
    if (!this.state.user) return '...loading';
    return <h1>{this.state.user.name}</h1>
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    // call the api to retrieve all the users
    const response = await axios.get('/api/users');
    this.setState({ users: response.data, });
  }

  render() {
    const { users } = this.state;

    return (
      <HashRouter>
        <Route exact path='/' render={(props) => <Homepage {...props} users={users} />} />
        <Route exact path='/users/:id' component={SingleUser} />
      </HashRouter>
    );
  }
}

render(<App />, document.querySelector('#root'));
