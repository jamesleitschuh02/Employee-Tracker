class Department {
  constructor(departmentName) {
    this.departmentName = departmentName;
  }
  createDepartment() {
    const departmentObj = { name : this.departmentName};
    return departmentObj;
  }
}

module.exports = Department;
