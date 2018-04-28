import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getEmployeesQuery} from '../queries/queries';
import EmployeeDetails from '../components/EmployeeDetails';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    
        displayEmployees() {
            let data = this.props.data;
            if(data.loading) {
                return(<div>Loading Employee Data...</div>);
            } else {
                return data.employees.map(employee => {
                    return(
                        <li key={employee.id} 
                        onClick={(e) => {this.setState({selected: employee.id})}}> 
                        {employee.firstName} {` `} 
                        {employee.lastName}
                        </li>
                    )
                });
            }
        }

    render() {
        return (
            <div>
                <h1 id="list-title">Employee List</h1>
                <ul id="list">
                    {this.displayEmployees()}
                </ul>
                <EmployeeDetails empID={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getEmployeesQuery)(EmployeeList);
