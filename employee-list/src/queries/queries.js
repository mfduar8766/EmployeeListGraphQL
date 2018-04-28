import {gql} from 'apollo-boost';
 
const getDepartmentsQuery = gql`
    {
        departments {
            id
            name
        }
    }

`; 

const addEmployeeMutation = gql`
    mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!, $departmentID: ID!) {
        addEmployee(firstName: $firstName, lastName: $lastName, email: $email, departmentID: $departmentID) {
            id
            firstName
            lastName
            email
        }
    }
`;

const getEmployeesQuery = gql`
    {
        employees {
            id
            firstName
            lastName
        }
    }
`;

const getEmployeeQuery = gql`
    query getEmployee($id: ID) {
        employee(id: $id) {
            id
            email
            gender
            departmentName
            departmentList {
                id
                name
                employees {
                    id
                    firstName
                }
            }
        }
    }

`;

export {getDepartmentsQuery, getEmployeesQuery, addEmployeeMutation ,getEmployeeQuery};