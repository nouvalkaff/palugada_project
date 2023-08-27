const { calculateFidyah } = require('./helper_function');
const { validateUserFidyah } = require('../general_function_helper');
const { fidyah } = require('../../database/executor');
const rate = process.env.FIDYAH_RATE;

exports.fidyahController = async (req, res) => {
  try {
    const data = await calculateFidyah(rate, req);

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Di bawah ini adalah total fidyah yang harus kamu bayarkan.',
      totalBayar: data
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      code: 400,
      codeMessage: 'Bad Request',
      success: false,
      message: error.message || error
    });
  }
};

exports.tambahUserController = async (req, res) => {
  try {
    const payload = req.body;

    validateUserFidyah(payload);

    await fidyah.addUserFidyah(payload);

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'User baru pada module kalkulator fidyah berhasil ditambahkan.'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      code: 400,
      codeMessage: 'Bad Request',
      success: false,
      message: error.message || error.errorMessage || error.errMessage || error
    });
  }
};
