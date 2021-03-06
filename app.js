const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];
const idArray = [];

function mainMenu() {
    function createManager() {
        console.log("Please build your team")
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "managerID",
            message: "What is your manager's ID?",
            validate: answer => {
                if (parseInt(answer) > 0) {
                    idArray.push(answer)
                    return true;
                }
                return "Please enter a valid ID"
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Enter your manager's email?",
            validate: answer => {
                const pass = answer.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address";
              }
        },
        {
            type: "input",
            name: "managerNumber",
            message: "Enter your manager's office number?",
            validate: answer => {
                
                const pass = answer.match(
                    /^[0-9]/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a valid phone number";
              }
        }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerNumber)
            // adds manager to array
            teamMembers.push(manager)
            // determines which set of propmts to show next
            addnewEmployee();
        })
    }
    createManager();

    function createEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "Enter the engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "engineerID",
            message: "Enter the engineer's ID?",

            validate: answer => {
                if (parseInt(answer) > 0) {
                     
                    return true;
                }
                return "Please enter an ID"
            }

        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Enter the engineer's email?",
            validate: answer => {
                const pass = answer.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address.";
              }
        },
        {
            type: "input",
            name: "engineerGit",
            message: "Enter the engineer's GitHub?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a github username"
            }
        }

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGit)
            // adds engineer object to array
            teamMembers.push(engineer)
            // determines which set of prompts to show next
            addnewEmployee();
        })
    }
    function createIntern() {
        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "Enter the intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "internID",
            message: "Enter the intern's ID?",
            // ID has not already been used
            validate: answer => {
                if (parseInt(answer) > 0) {
                    idArray.push(answer)
                    return true;
                }
                return "Please enter an ID"
            }

        },
        {
            type: "input",
            name: "internEmail",
            message: "Enter the intern's email?",
            validate: answer => {
                const pass = answer.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address.";
              }
        },
        {
            type: "input",
            name: "internSchool",
            message: "Enter the intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a school"
            }
        }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
            // adds intern object to array
            teamMembers.push(intern)
            // determines which set of prompts to show next
            addnewEmployee();
        })
    }

    function addnewEmployee() {
        inquirer.prompt([{
            type: "list",
            name: "memberType",
            message: "Which type of team member would you like to add?",
            choices: ['Engineer',
                "Intern",
                "I don't want to add anymore team memebers"]
        }
        ]).then(answers => {
            switch (answers.memberType){
            case "Engineer":
                createEngineer(); 
                break;
            case "Intern":
                createIntern(); 
                break;
            case "I don't want to add anymore team memebers":
                renderHTML(); 
                break;
            }
        })
    }
//create output by passing in array of team members
// check if folder exists & create if it doesnt
    function renderHTML(){
        if(!fs.existsSync("./output")){
            fs.mkdirSync("./output")
        }
        fs.writeFile(outputPath, render(teamMembers) , (err)=>{
        if (err) throw err;
        console.log("The file was saved!");
    })
    }
}

mainMenu()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
