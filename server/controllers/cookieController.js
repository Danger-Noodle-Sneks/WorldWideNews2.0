const cookieController = {};

cookieController.deleteCookies = (req, res, next) => {
  res.clearCookie('ssid');
  next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  const cookieOptions = {
    maxAge: 120000, // ms
    httpOnly: true,
  };

  res.cookie('ssid', `${res.locals.user}`, cookieOptions);
  next();
};

module.exports = cookieController;
