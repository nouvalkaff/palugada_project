const { Router } = require('express');
const router = Router();
const {
  shrinkTheURL,
  redirectToRealURL,
  getAllURLs,
  deleteUrl
} = require('./controllers');

router.post('/doit', shrinkTheURL);

router.get('/all/:secretKey', getAllURLs);

router.delete('/delete/:secretKey/:id', deleteUrl);

// redirect route must be at the very bottom
router.get('/:id', redirectToRealURL);

module.exports = router;
