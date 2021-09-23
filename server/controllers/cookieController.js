const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi');
  const value = Math.floor(Math.random() * 100);
  res.cookie('secret', `${value}`);

  next();
};
cookieController.setSSIDCookie = (req, res, next) => {
  const cookieOptions = {
    maxAge: 60000, // ms
    httpOnly: true,
  };

  res.cookie('ssid', `${res.locals.user}`, cookieOptions);
  next();
};

module.exports = cookieController;
