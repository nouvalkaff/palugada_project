const { commands } = require('../../constant/commitMaker');
const { ADD_COMMAND, ENTER_COMMAND, PUSH_COMMAND } = commands;

const { smartCommitHandler } = require('../general_function_helper');

exports.smartCommitGenerator = (object) => smartCommitHandler(object);
