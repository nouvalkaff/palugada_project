const { calculateFidyah } = require('./helper_function');
const rate = 1.4;

exports.fidyahController = async (req, res) => {
  try {
    const data = await calculateFidyah(rate, req.body);

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Di bawah ini adalah total fidyah yang harus kamu bayarkan.',
      totalBayar: `Rp ${data}`
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
