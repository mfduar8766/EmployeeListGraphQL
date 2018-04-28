import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import './App.css';

import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployees';

const Provider = new ApolloClient({
  uri: `http://localhost:4000/graphql`
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={Provider}>
      <div className="App">
          <header className="App-header">
            <h1 className="App-title">Employee List</h1>
          </header>
            <EmployeeList/>
            <AddEmployee/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
