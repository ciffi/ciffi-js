const chalk = require('chalk');

const showCommandErrorMessage = () => {
  console.log('');
  console.log('');
  console.log(chalk.red.bold('Command not found'));
  console.log('');
  console.log(chalk.blue('ciffi -h') + chalk.green(' -- core list --'));
  console.log('');
};

const showGreetings = () => {
  console.log('');
  console.log('');
  showCommands();
  console.log(chalk.blue.bold(pkg.author.name) + chalk.blue.bold(' ^_^'));
  console.log('');
};

const showCommandListMsg = () => {
  console.log('');
  console.log('');
  console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
  console.log('');
  console.log('');
  console.log('Available core:');
  console.log('');
  showCommands();
  console.log('');
};

const showLogo = () => {
  console.log(chalk.black(''));
  console.log(chalk.black('           `-+shmNNNNNNmhy+:`           '));
  console.log(chalk.black('        .odNmmNNNNNNNNNNNNmmNdo-        '));
  console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+      '));
  console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN/    '));
  console.log(chalk.black('   sMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
  console.log(chalk.black('  hMdMhssymMMMMMMd:MMMMyoMMMMMNs+dMdNm` '));
  console.log(chalk.black(' yMdMMMMMNhsoyNMMMsoMMy+MMMMmoomMMMMdMd '));
  console.log(chalk.black(':MdMMMMMMMMMMNsosNM-NsoMmysosNMMMMMMMdM+'));
  console.log(chalk.black('hMdMMMMMMMMMMdos:-+:+-s::+sssssNMMMMMmMm'));
  console.log(chalk.black('mMmMMMMMMMMNy.dMdM:-mmooddohMMMMMMMMMMdM'));
  console.log(chalk.black('mMmMMMMMMMMNy.mMmM:-mmoodhohMMMMMMMMMMdM'));
  console.log(chalk.black('hMdMMMMMMMMMMdos:-/:+-o-:osssssNMMMMMmNm'));
  console.log(chalk.black(':MdMMMMMMMMMMNyosNM-NsoMmysoyMMMMMMMMdMo'));
  console.log(chalk.black(' yMdMMMMMNhsosmMMMyoMMy+MMMMmooNMMMMdNm '));
  console.log(chalk.black(' `dMdMhssydMMMMMMd:MMMMyoMMMMMNsodMmNm. '));
  console.log(chalk.black('   yMmNMMMMMMMMMm:NMMMMM-MMMMMMMMhmMh`  '));
  console.log(chalk.black('    :mNmNMMMMMMm:NMMMMMM:NMMMMMNmNN+    '));
  console.log(chalk.black('      /dNmmNMMMMMMMMMMMMsmMMNmmNm+`     '));
  console.log(chalk.black('        .odNmmNNNNNMMMNNNNmmNms-        '));
  console.log(chalk.black('           `:oydmNNNNNNmdyo:`           '));
  console.log(chalk.black(''));
};

const showCommands = () => {
  console.log(chalk.blue('ciffi setup projectname') + chalk.green(' -- create new project --'));
  console.log('');
  console.log(chalk.blue('ciffi dev') + chalk.green(' -- start livereload server and generate local build with watch --'));
  console.log('');
  console.log(chalk.blue('ciffi build') + chalk.green(' -- generate build --'));
  console.log('');
  console.log(chalk.blue('ciffi e2e') + chalk.green(' -- e2e test with nightwatch and cucumber (default configuration) --'));
  console.log('');
  console.log(chalk.blue('ciffi e2e chrome //default, chrome or firefox') + chalk.green(' -- e2e test with nightwatch and cucumber (custom configuration) --'));
  console.log('');
  console.log(chalk.blue('ciffi newpage pagename') + chalk.green(' -- create new html and js page --'));
  console.log('');
  console.log(chalk.blue('ciffi newmodule modulename') + chalk.green(' -- create new js module --'));
  console.log('');
  console.log(chalk.blue('ciffi newcomponent componentname') + chalk.green(' -- create new js component --'));
  console.log('');
  console.log(chalk.blue('ciffi jsdoc') + chalk.green(' -- generate javascript documentation with jsdoc into ./jsdoc path --'));
  console.log('');
  console.log(chalk.blue('ciffi cssdoc') + chalk.green(' -- generate sass documentation with sassdoc into ./cssdoc path --'));
  console.log('');
  console.log(chalk.blue('ciffi styleguide') + chalk.green(' -- generate style guides with kss into ./styleguide path --'));
  console.log('');
};

module.exports = {
  showCommandErrorMessage,
  showCommandListMsg,
  showCommands,
  showGreetings,
  showLogo
};