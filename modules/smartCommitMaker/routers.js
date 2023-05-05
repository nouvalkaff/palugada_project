const { Router } = require('express');
const router = Router();
const { smartCommitMaker } = require('./controllers');

router.post('/make-smart-commit', smartCommitMaker);

module.exports = router;