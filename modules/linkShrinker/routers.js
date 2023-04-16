const { Router } = require('express');
const router = Router();
const {
  shrinkTheURL,
  redirectToRealURL,
  getAllURLs
} = require('./controllers');

router.post('/doit', shrinkTheURL);

router.get('/all', getAllURLs);

// redirect route must be at the very bottom
router.get('/:id', redirectToRealURL);

module.exports = router;
