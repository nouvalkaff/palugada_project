const {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist
} = require('./helper_function');
const { shrinkUrl } = require('../../database/executor');
const CHAR_LENGTH = process.env.CHAR_LENGTH;

exports.getAllURLs = async (req, res) => {
  try {
    const allData = await shrinkUrl.getAllDataFromShrinkURL();
    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Succesfully get all data from database',
      data: allData
    });
  } catch (error) {
    console.error(error);
  }
};

exports.redirectToRealURL = async (req, res) => {
  try {
    const uniqChars = req.params.id;

    const isExist = await isUniqueCharsExist(uniqChars);

    if (!isExist) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Set of unique characters that you search is not exist'
      });
    }

    return res
      .writeHead(301, {
        Location: isExist.original
      })
      .end();
  } catch (error) {
    console.error(error);
  }
};

exports.shrinkTheURL = async (req, res) => {
  try {
    const longURL = req.query.url;

    // field url_ori cannot be empty or undefined
    if (!longURL) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Field url cannot be empty or undefined'
      });
    }

    /**
     * shrinkedURL = [ '5JwbK7W', 'localhost:1927/5JwbK7W', true ]
     * uniqueChars = unique chars
     * [1] = domain + unique chars
     * status = status function
     */
    const shrinkedURL = ShrinkMyLongURLPlease(longURL, CHAR_LENGTH);

    const [uniqueChars, , status] = shrinkedURL;

    if (status === false) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: 'URL is not valid. Please input the valid URL.'
      });
    }

    // below is a function to check the unique characters already exist or not
    const uniqueCharsChecker = await checkMyUniqChars(
      longURL,
      CHAR_LENGTH,
      uniqueChars,
      shrinkedURL
    );

    if (uniqueCharsChecker.length !== 0) {
      const savedData = await saveToDB(longURL, uniqueCharsChecker[0]);

      if (savedData) {
        return res.status(200).send({
          code: 200,
          codeMessage: 'OK',
          success: true,
          message: 'Here is your new short URL',
          urlOri: longURL,
          urlShrinked: uniqueCharsChecker[1]
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: 'Internal Server Error',
      success: false
    });
  }
};
