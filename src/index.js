const core = require('@actions/core');
import { info, error, setFailed } from '@actions/core';
import { context, GitHub } from '@actions/github';

const main = async () => {
  // Dump event data first
  console.log(JSON.stringify(context, undefined, 2));

  // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
  const GITHUB_TOKEN = getInput('GITHUB_TOKEN');
  const github = new GitHub(GITHUB_TOKEN);

  // Get owner and repo from context of payload that triggered the action
  const { owner, repo } = context.repo;

  const pullRequests = context.payload.check_suite.pull_requests;
  if (pullRequests === undefined) {
    info(`Skipping: pull request information is unavailable.`);
    return;
  }

  for (const pullRequest of pullRequests) {
    console.log(JSON.stringify(pullRequest, undefined, 2));
  }
};

main().catch((error) => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});

/*
async function run() {
  try {
    // Dump event data first
    console.log(JSON.stringify(context, undefined, 2));

    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const github = new GitHub(GITHUB_TOKEN);

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    console.log(`owner: ${owner}/${repo}, GITHUB_ACTION: ${GITHUB_ACTION}, GITHUB_SHA: ${GITHUB_SHA}, GITHUB_REF: ${GITHUB_REF}`);

    const suites = await github.checks.listSuitesForRef({
      owner,
      repo,
      GITHUB_SHA,
    });

    console.log(JSON.stringify(suites, undefined, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  run();
}
*/