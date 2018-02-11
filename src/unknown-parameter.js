const help = require(`./help`);

module.exports = {
  description: `Shows message for unknown parameter`,
  execute(parameter) {
    console.error(`Неизвестная команда \"${parameter}\".`);
    help.execute();

    process.exit(1);
  }
};
