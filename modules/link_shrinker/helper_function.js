const { User_URL } = require("../../models");
const PREFIX_PALUGADA = process.env.PREFIX;
const LEN_CHARACTER = 4;

function ShrinkMyLongURLPlease(VeryLongURL) {
  try {
    // Step 1, obtain prefix from file .env
    const PREFIX = PREFIX_PALUGADA;

    // Step 2, get the pattern with regex named 'REGEX_URL_INFO'

    /** DESCRIPTION
     * #1 (https\:\/{2}.*\.\w{2,5}|http\:\/{2}.*\.\w{2,5}|.*\.\w{2,5})
     * #2 (.+)
     
     * FIRST GROUP is to catch pattern begin with 'http', 'https',
     * or without both 'http or https' plus the domain name
     
     * SECOND GROUP is to catch string after the domain name

     * Link exp: https://keep.google.com/u/0/#LIST/1Xnb69pL6qQZsWa8iBTjS-Qxsg5kyA9BxQ7n6yPGZQdGCmzimtoxM7aBWof-mxw
     * FIRST GROUP WILL CATCH ==> 'https://keep.google.com'
     * SECOND GROUP WILL CATCH ==> '/u/0/#LIST/1Xnb69pL6qQZsWa8iBTjS-Qxsg5kyA9BxQ7n6yPGZQdGCmzimtoxM7aBWof-mxw'
     */

    const REGEX_URL_INFO =
      /^(https\:\/{2}.*\.\w{2,5}|http\:\/{2}.*\.\w{2,5}|.*\.\w{2,5})(.+)$/;

    // Step 3, match the long url with regex above
    let match_URL = VeryLongURL.match(REGEX_URL_INFO);

    const FIRST_GROUP = match_URL[1];
    const SECOND_GROUP = match_URL[2];

    // *note* Using ASCII character (47-57,  65-90, 97-122) *note*

    // Step 4, the unique code will be 4 chars long
    const LEN_CHARS = LEN_CHARACTER;
    let uniqueChar = "";

    for (let i = 0; i < LEN_CHARS; i++) {
      const ORDER = getRandomInt(1, 5);

      // getRandomInt(48, 58) generate char 0 - 9
      // getRandomInt(65, 91) generate char A - Z
      // getRandomInt(97, 123) generate char a - z

      if (ORDER === 1) uniqueChar += String.fromCharCode(getRandomInt(48, 58));
      if (ORDER === 2) uniqueChar += String.fromCharCode(getRandomInt(65, 91));
      if (ORDER === 3) uniqueChar += String.fromCharCode(getRandomInt(97, 123));
      if (ORDER === 4) {
        const LAST_ORDER = getRandomInt(1, 4);

        if (LAST_ORDER === 1)
          uniqueChar += String.fromCharCode(getRandomInt(48, 58));
        if (LAST_ORDER === 2)
          uniqueChar += String.fromCharCode(getRandomInt(65, 91));
        if (LAST_ORDER === 3)
          uniqueChar += String.fromCharCode(getRandomInt(97, 123));
      }
    }

    // Return the unique url prefix + unique char ==> Example: 'plgd.id/dN2m'
    return [PREFIX + uniqueChar, FIRST_GROUP, SECOND_GROUP];
  } catch (error) {
    console.error(error);
  }
}

async function ShrinkAgainPlease(VeryLongURL) {
  try {
    const newUniqueChar = ShrinkMyLongURLPlease(VeryLongURL);

    const IS_EXIST = await User_URL.findOne({
      where: { uniqchar: newUniqueChar },
    });

    if (!IS_EXIST) return newUniqueChar;
    else ShrinkAgainPlease(VeryLongURL);
  } catch (error) {
    console.error(error);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

module.exports = {
  ShrinkMyLongURLPlease,
  ShrinkAgainPlease,
};
