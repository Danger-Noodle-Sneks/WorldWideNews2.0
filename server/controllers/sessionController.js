const models = require('../models/mapModels');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/

// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now }
// });

// Whenever someone is at homepage, check if their cookie matches the db
// if it does, log them in

// Start someones session whenever they log-in/sign-up

sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  res.cookie('test2', 'yee2t');

  return next();
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = async (req, res, next) => {
  // write code here

  // create new session document
  const newSession = {
    cookieId: res.locals.user,
  };

  await models.Session.create(newSession);

  next();
};

module.exports = sessionController;
