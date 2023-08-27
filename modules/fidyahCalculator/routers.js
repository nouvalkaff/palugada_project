const { Router } = require('express');
const router = Router();
const { fidyahController, tambahUserController } = require('./controllers');

router.post('/hitung', fidyahController);
router.post('/tambah-user', tambahUserController);

module.exports = router;
