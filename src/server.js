const express = require(`express`);

const {postsStore} = require(`./posts/store`);
const {imageStore} = require(`./images/store`);
const {getPostsRouter} = require(`./posts/route`);
const {logger} = require(`./logger`);

const host = process.env.SERVER_HOST || `127.0.0.1`;
const defaultPort = Number(process.env.SERVER_PORT) || 3000;

const app = express();
app.use(express.static(`static`));
app.use(`/api/posts`, getPostsRouter(postsStore, imageStore));

module.exports = {
  name: `server`,
  description: `http сервер`,
  run(port = defaultPort) {
    app.listen(port, (err) => {
      if (err) {
        logger.error(`Server failed to start started at http://${host}:${port}`, {error: err});
      }

      logger.info(`Server started at http://${host}:${port}`);
    });
  },
  app
};
