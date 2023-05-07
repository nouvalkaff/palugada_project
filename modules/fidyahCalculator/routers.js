const { Router } = require('express');
const router = Router();
const { fidyahController } = require('./controllers');

router.post('/hitung-fidyah', fidyahController);

module.exports = router;
