const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    departmentName: String,
    departmentID: String
});

module.exports = mongoose.model('Employees', employeeSchema);