const VERSION = `1.0.0`;

const parameters = process.argv.slice(2);

if (parameters.length === 0) {
  console.log(
      `Привет!\n` +
      `Эта программа будет запускать сервер кекстаграма\n` +
      `Автор: Алексей Комаров`
  );
} else {
  switch (parameters[0]) {
    case `--version`:
      console.log(`v${VERSION}`);
      break;
    case `--help`:
      console.log(
          `Доступные команды:\n` +
          `--version - версия программы\n` +
          `--help    - справка по программе`
      );
      break;
    default:
      console.error(
          `Неизвестная команда \"${parameters[0]}\".\n` +
          `Воспользуйтесь командой --help для вызова справки.`
      );
  }
}
