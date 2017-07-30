const config = require('./config')

const getRoomId = (projectName) => {
  let projects = config.projects
  for(let project of projects) {
    if(project.name === projectName) {
      return project.id
    }
  }
}

module.exports = {
  getRoomId
}