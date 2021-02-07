const express = require("express");

const service = express();

module.exports = (config) => {
  const log = config.log();
  if (service.get("env") === "development") {
    service.use((req, res, next) => {
      service.use((req, res, next) => {
        log.debug(`${req.method} : ${req.url}`);
        return next();
      });
    });
  }
};

service.get('/list', (req, res, next) =>{
  return next('Not implemented');
});

service.get('/list-short', (req, res, next) =>{
  return next('Not implemented');
});

service.get('/names', (req, res, next) =>{
  return next('Not implemented');
});

service.get('/speaker/:shortname', (req, res, next) =>{
  return next('Not implemented');
});

service.get('/artwork/:shortname', (req, res, next) =>{
  return next('Not implemented');
});


service.use((error, req, res, next) => {
  res.status(error.status || 500);
  log.error(error);
  return res.json({
    error: {
      message: error.message,
    },
  });
});
