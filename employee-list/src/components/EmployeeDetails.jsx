import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getEmployeeQuery} from '../queries/queries';

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

        employeeDetails() {
            const {employee} = this.props.data;
            if(employee) {
                return(
                    <div>
                        <p>{employee.email}</p>
                        <p>{employee.gender}</p>
                        <p>Employees: {employee.departmentName}</p>
                        <ul className="dept">
                        {employee.departmentList.employees.map(item => {
                            return <li key={item.id}>{item.firstName}</li>
                        })}</ul>
                    </div>
                );
            } else {
                return(<div>No Employee Selected</div>);
            }
        }

    render() {
        return (
            <div id="details">
                {this.employeeDetails()}
            </div>
        );
    }
}

export default graphql(getEmployeeQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.empID
            }
        }
    }
})(EmployeeDetails);
