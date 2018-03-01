const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);

const {generateEntity} = require(`../entity-generator`);

// генерирует данные сервера о постах
const generateEntities = (elementsCount) => {
  let data = [];
  for (let i = 0; i < elementsCount; i++) {
    data.push(generateEntity());
  }
  return data;
};

const data = generateEntities(300);
const upload = multer({storage: multer.memoryStorage()});

const postsRouter = new Router();

// возвращает посты по параметрам пагинации
postsRouter.get(`/`, (req, res) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 50;
  const selectedData = data.slice(skip, skip + limit);
  res.send(selectedData);
});

// возвращает пост по дате
postsRouter.get(`/:date`, (req, res) => {
  const selectedData = data.find(({date}) => {
    const dataDate = new Date(date);
    const paramDate = new Date(Number(req.params.date));
    return dataDate.getDate() === paramDate.getDate();
  });
  res.send(selectedData);
});

// обработка post запроса с данными поста
postsRouter.post(`/`, bodyParser.json(), upload.single(`photo`), (req, res) => {
  const postData = Object.assign({}, req.body);
  res.send(postData);
});

module.exports = {
  name: `postsRoute`,
  description: `роутер постов`,
  postsRouter
};
