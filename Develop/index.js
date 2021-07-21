const inquirer = require('inquirer');
const util = require('util')
const fs = require('fs');
const writefile = util.promisify(fs.writeFile);

function userPrompt (){
  return inquirer.prompt([
    {
      type: 'input',
      message: 'Title of project',
      name: 'Title',
    },
    {
      type: 'input',
      message: 'sections entitled Description',
      name: 'Description',
    },
    {
      type: 'confirm',
      message: 'Table of Contents',
      name: 'content',
    },
    {
      type: 'input',
      message: 'Installation',
      name: 'Installation',
    },
    {
      type: 'input',
      message: 'Usage',
      name: 'Usage',
    },
    {
      type: 'checkbox',
      message:"License options",
      name: 'License',
      choices :[
        "GNU",
        "MPL",
        "AL 2.0",
        "MIT",
        "BSL 1.0",
        "Unlicense",
      ]
    },
    {
      type: 'input',
      message: 'Contributing',
      name: 'Contributing',
    },
    {
      type: 'input',
      message: 'Tests',
      name: 'Tests',
    },
    {
      type: 'input',
      message: 'Github username',
      name: 'Github',
    },
    {
      type: 'input',
      message: 'email',
      name: 'email',
    },
    {
      type: 'input',
      message: 'Questions',
      name: 'Questions',
    },
  ])
}

function readMelayout(response){
  return `
#${response.Title}


# table of contents 
  - [Description](#description)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [License](#License)
  - [Contributing](#Contributing)
  - [Tests](#Tests)
  - [Questions](#Questions)
  
## Description:
- ${response.Description}
## Installation:
-${response.Installation}
## Usage:
-${response.Usage}
## License:
-${response.License}
![Licenses](https://img.shields.io/badge/License-${response.License}-blue.svg)
## Contributing: 
-${response.Contributing}
## Tests:
-${response.Tests}
## Questions:
-${response.Questions}
http://github.com/${response.Github}
[GitHub](http://github.com)
-${response.email}

  `;
}

async function int(){
  try{
    const response = await userPrompt();
    const readMe = readMelayout(response)

    await writefile("README.md", readMe);
    console.log("succes!");
  }catch (err){
    console.log(err);
  }
}
int();

