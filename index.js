const commandDispatcher = require(`./src/command-dispatcher`);

const parameters = process.argv.slice(2);
commandDispatcher.execute(parameters);
