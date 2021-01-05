class Employee{
    constructor(firstName,lastName,roleID, managerID){
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    };
    createEmployee(){
      const employeeObj = { first_name : this.firstName, last_name : this.lastName, role_id : this.roleID, manager_id : this.managerID};
      return employeeObj;
    };
}

module.exports = Employee;