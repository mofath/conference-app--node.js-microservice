const express = require('express');

const router = express.Router();

module.exports = (param) => {
  const { feedback } = param;

  router.get('/', async (req, res) => {
    try {
      const feedbacklist = await feedback.getList();
      return res.json(feedbacklist);
    } catch (err) {
      return err;
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { fbName, fbTitle, fbMessage } = req.body;
      const msg = JSON.stringify({ fbName, fbTitle, fbMessage });
      await feedback.addEntry(msg);
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

  return router;
};

// {
//   'fbName': 'h1',
//   'fbTitle': 'h2',
//   'fbMessage':'h3'
// }

// if (!fbName || !fbTitle || !fbMessage) {
//   return res.json({
//     error: true,
//     fbName,
//     fbMessage,
//     fbTitle,
//     feedbacklist,
//   });
// }
