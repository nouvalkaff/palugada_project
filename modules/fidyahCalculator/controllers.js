const isEmpty = require('lodash/isEmpty');
const { calculateFidyah } = require('./helper_function');
const { validateUserFidyah } = require('../general_function_helper');
const { fidyah } = require('../../database/executor');
const { queryInFormatter } = require('../general_function_helper');

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

exports.listUserController = async (req, res) => {
  try {
    const query = req.query;
    const allUsers = await fidyah.getAllUser(query);

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message:
        'Semua data pengguna fitur klakulator fidyah berhasil didapatkan.',
      totalData: allUsers.length,
      data: allUsers
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

exports.deleteOneOrManyUserController = async (req, res) => {
  try {
    let message;

    const query = req.query;
    const { secretKey, id } = query;
    const isIdPatternValid = /^[0-9]+$/.test(id);
    const noCommaValue = [':', '|', '-', '_', '.', '\\', '+', '/'];
    const noCommaSeparator = noCommaValue.some((value) => id.includes(value));

    if (!isIdPatternValid && noCommaSeparator) {
      throw new Error('Gunakan koma (,) sebagai pemisah pada query id.');
    }

    if (secretKey !== process.env.SECRET_KEY_FIDYAH) {
      throw new Error('Key tidak valid.');
    }

    const deletedUsers = await fidyah.deleteOneOrManyUser(query);

    if (isEmpty(deletedUsers)) message = 'Tidak ada data pengguna yang dihapus';
    else {
      message = `Berhasil menghapus pengguna dengan id: ${queryInFormatter(
        id
      )}.`;
    }

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message,
      totalData: deletedUsers.length,
      data: deletedUsers
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
