const chalk = require('chalk');

const filePath = (file, route) => {
  const index = file.indexOf(route.replace('.', ''));
  return file.slice(index, file.length);
};

const instructions = () => {
  const message = `
  ${chalk.yellow('Guide:')}

  Options:
  ${chalk.yellow('--validate')} | ${chalk.yellow('-v')}
  ${chalk.yellow('--stats')} | ${chalk.yellow('-s')}

  How to use:
  ${chalk.yellow('md-links <path>')} get all the links
  ${chalk.yellow('md-links <path> --validate')} get status of the links
  ${chalk.yellow('md-links <path> --stats')} get stats
  ${chalk.yellow('md-links <path> --validate --stats')} get number of unique and broken links
  `;
  return message;
};

const textColor = (element, status) => {
  let text;
  if (status < 300) {
    text = chalk.green(element, status);
  } else if (status < 400 && status > 299) {
    text = chalk.yellow(element, status);
  } else {
    text = chalk.red(element, status);
  }
  return text;
};

module.exports = {
  filePath,
  instructions,
  textColor,
};
