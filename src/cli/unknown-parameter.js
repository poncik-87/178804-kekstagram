const help = require(`./help`);

module.exports = {
  description: `Показывает сообщение при неизвестной команде`,
  execute(parameter) {
    console.error(`Неизвестная команда \"${parameter}\".`);
    help.execute();

    process.exit(1);
  }
};
