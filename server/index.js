const koa = require('koa');
const router = require('koa-router')();
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const identifySong = require('identify-song');

const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

const ROOT_PATH = path.resolve(__dirname);

const app = koa();
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: true
});

router
  .get('/', function* () {
    yield this.render('index');
  })
  .get('/identify', function* () {
    yield new Promise((resolve, reject) => {
      identifySong({
        host: 'us-west-2.api.acrcloud.com',
        access_key: '257e2a4cf73b5ae30eabfdc6e1fe9ef2',
        access_secret: 'QpE1nSDMDK5bEK2IGll7kQ2VONaOlGSHr49kxZX4'
      })
      .then(response => {
        this.body = response;
        resolve();
      })
      .catch(error => reject(error));
    })
  });

app
  .use(serve(path.resolve(ROOT_PATH, '../build')))
  .use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  .use(webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
