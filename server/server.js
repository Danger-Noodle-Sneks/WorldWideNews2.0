const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');
const apiController = require('./controllers/apiController');

// eslint-disable-next-line import/no-dynamic-require
const apiRouter = require(path.join(__dirname, 'routes/api.js'));

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', sessionController.isLoggedIn, (req, res) => res.status(200).sendFile(path.join(__dirname, '../public/index.html')));
}

app.get('/sessionCheck',
  sessionController.isLoggedIn,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  apiController.getUserData,
  (req, res) => {
    res.status(200).json([res.locals.user, res.locals.data]);
  });

app.get('/signout',
  sessionController.endSession,
  cookieController.deleteCookies,
  (req, res) => {
    res.sendStatus(200);
  });
app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/client/HTML404Page.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Listening on 3000'));
