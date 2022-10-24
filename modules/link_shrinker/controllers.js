const { User_URL } = require("../../models");
const { ShrinkMyLongURLPlease, saveToDB } = require("./helper_function");
const UNIQ_LEN_LINK = process.env.UNIQ_LEN_LINK;

exports.doItNow = async (req, res) => {
  try {
    const longURL = req.body.url_ori;

    // field url_ori cannot be empty or undefined
    if (!longURL) {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: "Field url_ori cannot be empty or undefined",
      });
    }

    const shrinkedURL = ShrinkMyLongURLPlease(longURL, UNIQ_LEN_LINK);

    if (shrinkedURL[2] === false) {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: "URL is not valid. Please input the valid URL.",
      });
    }

    const savedData = await saveToDB(longURL, shrinkedURL[0]);

    if (savedData) {
      return res.status(200).send({
        code: 200,
        codeMessage: "OK",
        success: true,
        message: "Shorter right?",
        urlOri: longURL,
        urlShrinked: shrinkedURL[1],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: "Internal Server Error",
      success: false,
    });
  }
};
