const http = require(`http`);
const {parse} = require(`url`);
const fs = require(`fs`);
const {extname} = require(`path`);

const contentTypeMap = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/png`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`
};

const host = `127.0.0.1`;
const defaultPort = 3000;

// Получение пути файла по url
const getFilePathByUrl = (url) => {
  const path = parse(url).pathname;
  return `./static${path}${path === `/` ? `index.html` : ``}`;
};

// Получение типа контента по пути файла
const getContentTypeByPath = (path) =>
  contentTypeMap[extname(path)];

module.exports = {
  name: `--server`,
  description: `Запускает http сервер`,
  execute(port = defaultPort) {
    const server = http.createServer((req, res) => {

      const path = getFilePathByUrl(req.url);
      const fileStream = fs.createReadStream(path);

      // Обработка открытия файла
      const processOpenFile = () => {
        res.statusCode = 200;
        res.setHeader(`Content-Type`, getContentTypeByPath(path));
        fileStream.pipe(res);
      };

      // Обработка ошибки чтения файла
      const processErrorReadFile = () => {
        res.statusCode = 404;
        res.write(`not found`);
        res.end();
      };

      // Обработка закрытия файла
      const processCloseFile = () => {
        res.end();
      };

      fileStream.on(`open`, processOpenFile);
      fileStream.on(`error`, processErrorReadFile);
      fileStream.on(`close`, processCloseFile);
    });

    server.listen(port, host, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`Server started at http://${host}:${port}`);
    });
  },
  getFilePathByUrl
};
