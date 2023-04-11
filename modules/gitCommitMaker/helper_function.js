const { commands } = require('../../constant/commitMaker');
const { ADD_COMMAND, ENTER_COMMAND, PUSH_COMMAND } = commands;

const { commitMessageHandler } = require('../general_function_helper');

exports.commitGenerator = (object) => {
  const { branch, bullet, commitMessage, headMessage, useStep } = object;

  const [commits, totalCommits] = commitMessageHandler({
    bullet,
    commitMessage,
    headMessage
  });

  if (totalCommits > 5)
    throw new Error('For now, cannot exceed five commit messages');

  const resultUseStep = {
    step1: ADD_COMMAND,
    step2: ENTER_COMMAND,
    step3: commits,
    step4: ENTER_COMMAND,
    step5: `${PUSH_COMMAND} ${branch} `,
    step6: ENTER_COMMAND,
    totalCommitMessages: totalCommits
  };

  const noUseStep = commits;

  return useStep === '0' ? noUseStep : resultUseStep;
};
