require(`colors`);

const version = require(`./cli/version`);
const help = require(`./cli/help`);
const author = require(`./cli/author`);
const description = require(`./cli/description`);
const license = require(`./cli/license`);
const unknownParameter = require(`./cli/unknown-parameter`);
const emptyParameters = require(`./cli/empty-parameters`);
const server = require(`./cli/server`);

module.exports = {
  name: `command-dispatcher`,
  description: `Управляет параметрами интерфейса командной строки`,
  execute(parameters) {
    const commands = [server, version, help, author, description, license];

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


