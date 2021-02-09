const router = require('express').Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (param) => {
  const { speakers } = param;

  router.get('/images/:type/:file', async (req, res, next) => {
    try {
      const { type, file } = req.params;
      const image = await speakers.getImage(`${type}/${file}`);
      return image.pipe(res);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const promises = [];
      promises.push(speakers.getListShort());
      promises.push(speakers.getAllArtwork());

      const results = await Promise.all(promises);

      return res.json({
        speakerslist: results[0],
        artwork: results[1],
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(param));
  router.use('/feedback', feedbackRoute(param));

  return router;
};
