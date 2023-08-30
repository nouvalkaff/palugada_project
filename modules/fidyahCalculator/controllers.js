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
    let message;
    const payload = req.body;
    const { email } = payload;

    validateUserFidyah(payload);

    const isEmailExist = await fidyah.checkUserFidyahByEmail(payload);

    if (!isEmailExist) {
      await fidyah.addUserFidyah(payload);
      message =
        'User baru pada module kalkulator fidyah berhasil ditambahkan. Silakan lanjut';
    } else {
      message = `User dengan email ${email} sudah ada di database. Silakan lanjut.`;
    }

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message
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
