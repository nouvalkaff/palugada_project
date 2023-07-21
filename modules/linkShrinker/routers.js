const { Router } = require('express');
const router = Router();
const {
  shrinkTheURL,
  redirectToRealURL,
  createCustomURL,
  getAllURLs,
  createCustomURLWithPayload,
  deleteUrl
} = require('./controllers');

router.get('/doit', shrinkTheURL);

router.get('/custom', createCustomURL);

router.get('/custom-payload', createCustomURLWithPayload);

router.get('/all/:secretKey', getAllURLs);

router.delete('/delete/:secretKey/:id', deleteUrl);

// redirect route must be at the very bottom
router.get('/:id', redirectToRealURL);

module.exports = router;
