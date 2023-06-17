const { Router } = require('express');
const router = Router();
const { titleFixer } = require('./controllers');

router.get('/yuk', titleFixer);

module.exports = router;