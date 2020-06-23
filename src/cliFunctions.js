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

const textColor = (element) => {
  let text;
  if (element < 300) {
    text = chalk.green(element);
  } else if (element < 400 && element > 299) {
    text = chalk.yellow(element);
  } else {
    text = chalk.red(element);
  }
  return text;
};

module.exports = {
  filePath,
  instructions,
  textColor,
};
