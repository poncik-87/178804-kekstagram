const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);

const {postsValidationSchema} = require(`./validation-schema`);
const {validate} = require(`../validation`);
const {getPaginatedData} = require(`../utils`);
const {NotFoundError} = require(`../errors`);
const {bufferToStream} = require(`../utils`);
const {HTTP_STATUS_CODES} = require(`../consts`);

const upload = multer({storage: multer.memoryStorage()});

const postsRouter = new Router();

// возвращает посты по параметрам пагинации
postsRouter.get(`/`, async (req, res, next) => {
  try {
    const posts = await postsRouter.postsStore.getPosts();
    const data = await getPaginatedData(
        posts,
        req.query.skip && Number(req.query.skip),
        req.query.limit && Number(req.query.limit)
    );

    res.send(data);
  } catch (err) {
    next(err);
  }
});

// возвращает пост по дате
postsRouter.get(`/:date`, async (req, res, next) => {
  try {
    const post = await postsRouter.postsStore.getPost({date: Number(req.params.date)});

    if (!post) {
      const date = new Date(Number(req.params.date));
      throw new NotFoundError(`Post with date ${date} not found`);
    }

    res.send(post);
  } catch (err) {
    next(err);
  }
});

// возвращает картинку поста по дате
postsRouter.get(`/:date/image`, async (req, res, next) => {
  try {
    const filename = `api/posts/${req.params.date}/image`;
    const fileStream = await postsRouter.imageStore.getImage(filename);

    if (!fileStream) {
      throw new NotFoundError(`Post with date ${new Date(req.params.date)} not found`);
    }

    fileStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

// обработка post запроса с данными поста
postsRouter.post(`/`, bodyParser.json(), upload.single(`filename`), async (req, res, next) => {
  try {
    const date = Date.now();

    const imageObject = req.file || req.body.filename;

    validate(Object.assign({}, req.body, {filename: imageObject}), postsValidationSchema);

    const url = `api/posts/${date}/image`;
    await postsRouter.imageStore.saveImage(url, bufferToStream(imageObject.buffer));

    const postData = Object.assign({}, req.body, {date, url, likes: 0});
    await postsRouter.postsStore.savePost(postData);

    res.send(postData);
  } catch (err) {
    next(err);
  }
});

postsRouter.use((err, req, res, next) => {
  if (err.code) {
    res.status(err.code).send(err.message);
  } else {
    res.status(HTTP_STATUS_CODES.SERVER_ERROR).send(`server has some troubles`);
  }

  next();
});

module.exports = {
  name: `postsRoute`,
  description: `роутер постов`,
  getPostsRouter: (postsStore, imageStore) => {
    postsRouter.postsStore = postsStore;
    postsRouter.imageStore = imageStore;
    return postsRouter;
  }
};
