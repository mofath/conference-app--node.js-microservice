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
      const fbName = req.body.fbName.trim();
      const fbTitle = req.body.fbTitle.trim();
      const fbMessage = req.body.fbMessage.trim();
      const feedbacklist = await feedback.getList();
      if (!fbName || !fbTitle || !fbMessage) {
        return res.json({
          error: true,
          fbName,
          fbMessage,
          fbTitle,
          feedbacklist,
        });
      }
      await feedback.addEntry(fbName, fbTitle, fbMessage);
      return res.json({ success: true });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
