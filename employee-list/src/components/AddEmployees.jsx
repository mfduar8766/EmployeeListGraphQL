import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getDepartmentsQuery, addEmployeeMutation, getEmployeesQuery} from '../queries/queries';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            departmentID: ''
        };
    }

        displayDepartments() {
            let data = this.props.getDepartmentsQuery;
            if(data.loading) {
                return(<option disabled>Loading Departments</option>);
            } else {
                return data.departments.map(department => {
                    return(<option key={department.id} value={department.id}>{department.name}</option>)
                });
            }
        }

        submitForm(e) {
            e.preventDefault();
            this.props.addEmployeeMutation({
                variables: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    departmentID: this.state.departmentID
                },
                refetchQueries: [{query: getEmployeesQuery}]
            });         
        }

    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>first Name:</label>
                    <input type="text" onChange={(e) => this.setState({firstName: e.target.value})} />
                </div>
                <div className="field">
                    <label>last Name:</label>
                    <input type="text" onChange={(e) => this.setState({lastName: e.target.value})} />
                </div>
                <div className="field">
                    <label>email:</label>
                    <input type="text" onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div className="field">
                    <label>Department:</label>
                    <select onChange={(e) => this.setState({departmentID: e.target.value})}>
                        <option>Select Department</option>
                            {this.displayDepartments()}
                    </select>
                </div>
                <button id="submit">+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getDepartmentsQuery, {name: "getDepartmentsQuery"}),
    graphql(addEmployeeMutation, {name: "addEmployeeMutation"})
)(AddEmployee);
