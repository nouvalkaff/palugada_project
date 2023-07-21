const {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist,
  getAllData,
  processAndValidateMyCustomUrl,
  deleteTheUrlById
} = require('./helper_function');
const uniqueCharLength = process.env.CHAR_LENGTH;

exports.getAllURLs = async (req, res) => {
  try {
    if (req.params.secretKey !== process.env.SECRET_KEY) {
      return res.status(401).send({
        code: 401,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Wrong secret key'
      });
    }

    const allData = await getAllData();
    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Succesfully get all data from database',
      count: allData.length,
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

    const [data] = isExist;
    const { originallink } = data;
    return res.writeHead(301, { Location: originallink }).end();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: 'Internal Server Error',
      success: false,
      message: error.message
    });
  }
};

exports.shrinkTheURL = async (req, res) => {
  try {
    const { url: longURL, simple } = req.query;

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
        message:
          'Please input valid URL format ==> https://www.example.com <== [minimal URL has protocol {http/https} and hostname {www.example.com}]'
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
      if (simple === '1') {
        return res
          .setHeader('Content-type', 'text/html')
          .status(200)
          .send(` Please save your short URL ==> ${shortenURL} <==`);
      }

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

exports.createCustomURL = async (req, res) => {
  try {
    const { url: longURL, customPrefix, skurl } = req.query;

    if (skurl !== process.env.SK_URL) {
      return res.status(401).send({
        code: 401,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Wrong secret key'
      });
    }

    const [customUrl, status] = await processAndValidateMyCustomUrl(
      longURL,
      customPrefix
    );

    if (status === false) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message:
          'Please input valid URL format ==> https://www.example.com <== [minimal URL has protocol {http/https} and hostname {www.example.com}]'
      });
    }

    // const savedData = await saveToDB(longURL, customPrefix);

    // if (savedData === true)
    return res
      .setHeader('Content-type', 'text/html')
      .status(200)
      .send(` Please save your short URL ==> ${customUrl} <==`);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: 'Internal Server Error',
      success: false
    });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const { secretKey, id } = req.params;

    if (secretKey !== process.env.SECRET_KEY) {
      return res.status(401).send({
        code: 401,
        codeMessage: 'Bad Request',
        success: false,
        message: 'Wrong secret key'
      });
    }

    const isSeparatorExists = id.includes(',');

    if (isSeparatorExists) {
      const separatedId = id.split(',');
      for (let id of separatedId) await deleteTheUrlById(id);
    } else {
      await deleteTheUrlById(id);
    }

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: `ID ${id} is deleted successfully`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: 'Internal Server Error',
      success: false
    });
  }
};
