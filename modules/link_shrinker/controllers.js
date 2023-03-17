const {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist,
  getAllData
} = require('./helper_function');
const uniqueCharLength = process.env.CHAR_LENGTH;

exports.getAllURLs = async (_, res) => {
  try {
    const allData = await getAllData();
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

    // field url cannot be empty or undefined
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
     * [0] = unique chars
     * [1] = domain + unique chars
     * [2] = status function
     */
    const shrinkedURL = ShrinkMyLongURLPlease(longURL, uniqueCharLength);
    const [uniqueChars, , status] = shrinkedURL;

    if (status === false) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Please input valid URL format.'
      });
    }

    // below is a function to check the unique characters already exist or not
    const uniqueCharsChecker = await checkMyUniqChars(
      longURL,
      uniqueCharLength,
      uniqueChars,
      shrinkedURL
    );

    const [uniqChar, shortenURL] = uniqueCharsChecker;
    const savedData = await saveToDB(longURL, uniqChar);

    if (savedData === true) {
      return res.status(200).send({
        code: 200,
        codeMessage: 'OK',
        success: true,
        message: 'Here is your new short URL',
        urlOri: longURL,
        urlShrinked: shortenURL
      });
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
