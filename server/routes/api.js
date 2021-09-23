const express = require('express');
const apiController = require('../controllers/apiController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');


const router = express.Router();

router.get('/population/:countryName', apiController.getPopulationData, (req, res) => res.status(200).set('Content-Type', 'application/json').json(res.locals.population));

router.get('/getArticles/:countryName', apiController.getArticles, (req, res) => res.status(200).json(res.locals.articles));

// route to sign-up
router.post('/signup',
 apiController.createUser, cookieController.setSSIDCookie,
 sessionController.startSession,
  (req, res) => {
    res.status(200).send(res.locals.user);
  });

// route and middlewares to execute when user tries to login
router.post('/login',
  apiController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  apiController.getUserData,
  (req, res) => {
    res.status(200).json(res.locals.data);
  });

// route and middlewares to execute when user adds favourite links
router.post('/addFav',
  apiController.addFav,
  (req, res) => {
    res.status(200).json(res.locals.user);
  });

router.post('/loginWithGoogle',
  apiController.googleSignIn, apiController.getUserData,
  (req, res) => {
    res.status(200).json(res.locals.data);
  });

// route and middlewares to execute when user wants to delete a favourite link
router.delete('/deleteFav', apiController.deleteFav, (req, res) => {
  res.status(200).json(res.locals.user);
});
module.exports = router;
