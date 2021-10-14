const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports.executeShellCommand = executeShellCommand;

async function executeShellCommand(command) {
    const {stdout, stderr } = await exec(command);
    return stdout ? stdout : stderr
}
