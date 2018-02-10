module.exports = {
  name: `--help`,
  description: `Shows program help`,
  execute() {
    console.log(
        `Доступные команды:\n` +
        `--version - версия программы\n` +
        `--help    - справка по программе`
    );
  }
};
