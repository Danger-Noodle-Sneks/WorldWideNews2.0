const cookieController = {};

cookieController.deleteCookies = (req, res, next) => {
  res.clearCookie('ssid');
  next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  const numOfSeconds = 600;
  const cookieOptions = {
    maxAge: 1000 * numOfSeconds, // ms
    httpOnly: true,
  };

  res.cookie('ssid', `${res.locals.user}`, cookieOptions);
  next();
};

module.exports = cookieController;
