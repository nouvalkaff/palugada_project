const { Router } = require('express');
const router = Router();
const { commitMaker } = require('./controllers');

router.post('/make-git-commit', commitMaker);

module.exports = router;