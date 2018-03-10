const express = require(`express`);

const {postsStore} = require(`./posts/store`);
const {imageStore} = require(`./images/store`);
const {getPostsRouter} = require(`./posts/route`);

const host = `127.0.0.1`;
const defaultPort = 3001;

const app = express();
app.use(express.static(`static`));
app.use(`/api/posts`, getPostsRouter(postsStore, imageStore));

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
