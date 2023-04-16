const { Router } = require('express');
const router = Router();
const { userNameGenerator } = require('./controllers');

router.get('/generate', userNameGenerator);

module.exports = router;
