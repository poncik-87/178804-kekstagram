const express = require(`express`);

const {postsRouter} = require(`./posts/route`);

const host = `127.0.0.1`;
const defaultPort = 3000;

const app = express();
app.use(express.static(`static`));
app.use(`/api/posts`, postsRouter);

module.exports = {
  name: `server`,
  description: `http сервер`,
  run(port = defaultPort) {
    app.listen(port, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`Server started at http://${host}:${port}`);
    });
  },
  app
};
