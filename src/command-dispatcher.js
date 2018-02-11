const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const unknownParameter = require(`./unknown-parameter`);
const emptyParameters = require(`./empty-parameters`);

module.exports = {
  name: `command-dispatcher`,
  description: `Dispatch program CLI parameters`,
  execute(parameters) {
    const commands = [version, help, author, description, license];

    if (parameters.length === 0) {
      emptyParameters.execute();
    } else {
      const command = commands.find(({name}) => name === parameters[0]);
      if (command) {
        command.execute();
      } else {
        unknownParameter.execute(parameters[0]);
      }
    }
  }
};

