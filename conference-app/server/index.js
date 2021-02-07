const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const configs = require("./config");
const Speakers = require("./services/Speakers");
const routes = require("./routes");

const app = express();

const config = configs[app.get("env")];

const speakers = new Speakers(config);

if (app.get("env") === "development") app.locals.pretty = true;
app.locals.title = config.sitename;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const names = await speakers.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use('/', routes({ speakers }));

app.use((req, res, next) => next(createError(404, 'File not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.send(err);
});

app.listen(3080, () => console.log('Conference app is listening on port 3080'));

module.export = app;
