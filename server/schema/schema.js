const graphql = require('graphql');
const Employee = require('../models/employee');
const Department = require('../models/department');

const {GraphQLObjectType, GraphQLString, 
    GraphQLSchema, GraphQLID, 
    GraphQLInt, GraphQLList, 
    GraphQLNonNull} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        gender: {type: GraphQLString},
        departmentName: {type: GraphQLString},
        departmentList: {
            type: DepartmentType,
            resolve(parent, args) {
                return Department.findById(parent.departmentID);
            }
        }
    })
});

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return Employee.find({departmentID: parent.id});
            }
        }        
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee: {
            type: EmployeeType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Employee.findById(args.id);
            }
        },
        department: {
            type: DepartmentType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Department.findById(args.id);
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return Employee.find({});
            }
        },
        departments: {
            type: new GraphQLList(DepartmentType),
            resolve(parent, args) {
                return Department.find({});
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                gender: {type: GraphQLString},
                departmentName: {type: GraphQLString},
                departmentID: {type:  new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let emp = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    gender: args.gender,
                    departmentName: args.departmentName,
                    departmentID: args.departmentID
                });
                    return emp.save();
            }
        },
        addDepartment: {
            type: DepartmentType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let dep = new Department({
                    name: args.name
                });
                    return dep.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
