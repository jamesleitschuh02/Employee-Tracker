const Department = require("./lib/Department");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",

  database: "info_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Employee Tracker \n");
  enterInfo();
});

function enterInfo() {
  inquirer
    .prompt({
      type: "rawlist",
      name: "action",
      pageSize: 8,
      message: "What would you like to do?",
      choices: [
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Role",
        "View Employees",
        "View Roles",
        "View Departments",
        "Update Employee Manager",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Update Role":
          updateRole();
          break;

        case "View Employees":
          setTimeout(viewEmployees(),500);
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Departments":
          viewDepartments();
          break;

        case "Update Employee Manager": //8
          updateManager();
          break;

        case "Exit":                    //9
          connection.end();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter new department name",
      },
    ])
    .then((response) => {
      const department = new Department(response.name);
      insertInfo(department.createDepartment(),"department");      
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter Title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Salary",
      },
      {
        type: "input",
        name: "departmentID",
        message: "Enter department ID",
      },
    ])
    .then((response) => {
      const role = new Role(response.title, response.salary, response.departmentID);
      insertInfo(role.createRole(),"roles");
    });
}

function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter First Name",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter Last Name",
    },
    {
      type: "input",
      name: "roleID",
      message: "Enter Role ID",
    },
    {
      type: "input",
      name: "managerID",
      message: "Enter Manager ID",
    }
  ])
  .then((response) => {
    const employee = new Employee(response.firstName, response.lastName, response.roleID, response.managerID);
    insertInfo(employee.createEmployee(),"employee");
  });
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary, employee.manager_id FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id",
     function (err, res) {
      console.log("\n");
      console.table(res);
      enterInfo();
    });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    console.log("\n");
    console.table(res);
    enterInfo();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.log("\n");
    console.table(res);
    enterInfo();
  });
}

function insertInfo(obj,table){
  connection.query("INSERT INTO " + table + " SET ?",obj,function (err, res) {
      if (err) throw err;
      enterInfo();
  });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleID",
        message: "Enter the ID number of Role you wish to update",
      },
      {
        type: "input",
        name: "title",
        message: "Enter Updated Title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Updated Salary",
      },
      {
        type: "input",
        name: "departmentID",
        message: "Enter Updated Department ID",
      }
    ])
    .then((response) => {
      const query = "UPDATE roles SET title = '" + response.title + "', salary = " + response.salary + ", department_id = " + response.departmentID + " WHERE id = " + response.roleID;
      connection.query(query,function (err, res) {
        if (err) throw err;
        enterInfo();
    });
  });
}

function updateManager() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "employeeID",
      message: "Enter the ID number of Employee you wish to update their manager",
    },
    {
      type: "input",
      name: "managerID",
      message: "Enter Updated Manager ID",
    }
  ])
  .then((response) => {
    const query = "UPDATE employee SET manager_id = " + response.managerID + " WHERE id = " + response.employeeID;
    connection.query(query,function (err, res) {
      if (err) throw err;
      enterInfo();
  });
});
}