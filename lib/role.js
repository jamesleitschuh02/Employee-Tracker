class Role{
    constructor(title,salary,departmentID){
        this.title = title;
        this.salary = salary;
        this.departmentID = departmentID;
    };
    createRole(){
      const roleObj = { title: this.title, salary : this.salary, department_id: this.departmentID};
      return roleObj;
    };
}

module.exports = Role;