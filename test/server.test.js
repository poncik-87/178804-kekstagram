const assert = require(`assert`);
const request = require(`supertest`);
const express = require(`express`);

const {getPostsRouter} = require(`../src/posts/route`);
const {mocPostsStore, mocImageStore} = require(`./mock-store`);
const {HTTP_STATUS_CODES} = require(`../src/consts`);

const isValidPost = (post) => {
  return ![`url`, `scale`, `effect`, `hashtags`, `description`, `likes`, `comments`, `date`]
      .some((field) => !post.hasOwnProperty(field));
};

const isArrayOfVilidPosts = (posts) => {
  return !posts.some((post) => !isValidPost(post));
};

const app = express();
app.use(`/api/posts`, getPostsRouter(mocPostsStore, mocImageStore));

describe(`get api/posts?skip=0&limit=5`, () => {
  it(`should return paginated posts`, () => {
    request(app)
        .get(`/api/posts`)
        .expect(HTTP_STATUS_CODES.OK)
        .expect(`Content-Type`, /json/)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          const posts = res.body;

          assert.ok(Array.isArray(posts));
          assert.ok(posts.length === 0 || isArrayOfVilidPosts(posts));
        });
  });
});

describe(`get api/posts/:date`, () => {
  it(`should return empty object or post with same date`, () => {
    const date = new Date();
    request(app)
        .get(`/api/posts/${date.getTime()}`)
        .expect(HTTP_STATUS_CODES.OK)
        .expect(`Content-Type`, /json/)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          const post = res.body;

          assert.ok(!post || Object.keys(post).length === 0 || isValidPost(post));
        });
  });
});

describe(`post api/posts`, () => {
  const path = `/api/posts`;

  it(`should consume JSON`, () => {
    const post = {
      filename: {
        mimetype: `image/`
      },
      scale: `100`,
      effect: `none`,
      description: `best cat`
    };

    return request(app).post(path)
        .send(post)
        .expect(HTTP_STATUS_CODES.OK);
  });

  it(`should consume multiform`, () => {
    return request(app).post(path)
        .field(`scale`, `100`)
        .field(`effect`, `none`)
        .field(`description`, `best cat`)
        .attach(`filename`, `test/fixtures/1.jpg`)
        .expect(HTTP_STATUS_CODES.OK);
  });

  it(`should return ${HTTP_STATUS_CODES.VALIDATION_ERROR} on invalid data`, () => {
    return request(app).post(path)
        .send({})
        .expect(HTTP_STATUS_CODES.VALIDATION_ERROR);
  });
});
