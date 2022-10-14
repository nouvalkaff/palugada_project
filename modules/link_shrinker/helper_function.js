export async function ShrinkMyLongURLPlease(VeryLongURL) {
  try {
    // Testing area
    const LAST_CODE_1 = "";
    // Testing area

    // Step 1, prepare prefix
    const PREFIX = "http://adagulap.id/";

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

    const TIMESTAMP = Date.now();

    // *note* THERE ARE 127 ASCII CHARACTER *note*
    const RANDOM_NUMBER = Math.random(128);
    // const GET_ASCII =
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    console.log(getRandomInt(65, 127));
  } catch (error) {
    console.error(error);
  }
}
ShrinkMyLongURLPlease("youtube.com/watch?v=osdoLjUNFnA");
