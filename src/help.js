const version = require(`./version`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);

const HELP_MODULE_NAME = `--help`;
const HELP_MODULE_DESCRIPTION = `Показывает справку по программе`;

const getHelpMessageLine = (name, desc) =>
  `${name.gray}    - ${desc.green}`;

module.exports = {
  name: HELP_MODULE_NAME,
  description: HELP_MODULE_DESCRIPTION,
  execute() {
    const commands = [version, author, description, license];
    let message = `Доступные команды:\n`;
    commands.forEach((command) => {
      message += getHelpMessageLine(command.name, command.description) + `\n`;
    });
    message += getHelpMessageLine(HELP_MODULE_NAME, HELP_MODULE_DESCRIPTION);
    console.log(message);
  }
};
