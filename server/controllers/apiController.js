const axios = require('axios');

const apiController = {};

const populationCache = {};
apiController.getPopulationData = (req, res, next) => {
  let { countryName } = req.params;
  const alternateCountryNames = {
    'Democratic Republic of the Congo': 'DR Congo',
    'Republic of the Congo': 'Congo',
    Brunei: 'Brunei ',
    Czechia: 'Czech Republic (Czechia)',
    'Virgin Islands': 'U.S. Virgin Islands',
    'Saint Kitts and Nevis': 'Saint Kitts & Nevis',
    'Saint Vincent and the Grenadines': 'St. Vincent & Grenadines',
    'Ivory Coast': 'Côte d\'Ivoire',
  };

  if (alternateCountryNames[countryName]) countryName = alternateCountryNames[countryName];

  if (populationCache[countryName]) {
    res.locals.population = populationCache[countryName];
    return next();
  }
  const populationRequest = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/population',
    params: { country_name: countryName },
    headers: {
      'x-rapidapi-host': 'world-population.p.rapidapi.com',
      'x-rapidapi-key': '0a9cc778c4msh8ec778a834e5103p1683bajsn6db8490b850c',
    },
  };

  axios.request(populationRequest)
    .then((response) => {
      const { population } = response.data.body;
      res.locals.population = population;
      populationCache[countryName] = population;
      next();
    }).catch((error) => {
      const defaultErr = {
        log: 'Error handler caught an error inside apiController.getPopulationData',
        status: 500,
        message: { err: `An error occurred inside a middleware named apiController.getPopulationData : ${error}` },
      };
      next(defaultErr);
    });
};

const articlesCache = {};
apiController.getArticles = async (req, res, next) => {
  const { countryName } = req.params;

  if (articlesCache[countryName]) {
    res.locals.articles = articlesCache[countryName];
    return next();
  }
  const requestDetails = {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: {
      q: countryName, lang: 'en', page: '1', page_size: '10',
    },
    headers: {
      'x-rapidapi-key':
      // '0a9cc778c4msh8ec778a834e5103p1683bajsn6db8490b850c',
      'c9dd5fae0bmshb0c6910ac9ff173p1739a1jsn7a43e27d0bc4',
      'x-rapidapi-host': 'free-news.p.rapidapi.com',
    },
  };

  axios.request(requestDetails)
    .then((response) => {
      const previousTitles = {};
      const articles = response.data.articles.map((elem) => {
        if (!previousTitles[elem.title] && elem.summary.length > 400) {
          previousTitles[elem.title] = true;
          return {
            title: elem.title,
            summary: elem.summary,
            link: elem.link,
          };
        }
      });
      const articlesFiltered = articles.filter((post) => post !== undefined);
      articlesCache[countryName] = articlesFiltered;
      res.locals.articles = articlesFiltered;

      return next();
    }).catch((err) => {
      const defaultErr = {
        log: 'Error handler caught an error inside apiController.getArticles',
        status: 500,
        message: { err: `An error occurred inside a middleware named apiController.getArticles : ${err}` },
      };
      next(defaultErr);
    });
};

module.exports = apiController;
