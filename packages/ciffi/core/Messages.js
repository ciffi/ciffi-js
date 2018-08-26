const chalk = require('chalk');
const pkg = require('../package.json');

const showCommandErrorMessage = () => {
  console.log('');
  console.log('');
  console.log(chalk.red.bold('Command not found'));
  console.log('');
  console.log(chalk.cyan('ciffi -h') + chalk.green(' -- command list --'));
  console.log('');
};

const showGreetings = () => {
  console.log('');
  console.log('');
  showCommands();
  console.log(chalk.cyan.bold(pkg.author.name) + chalk.cyan.bold(' ^_^'));
  console.log('');
};

const showCommandListMsg = () => {
  console.log('');
  console.log('');
  console.log(chalk.green.bold('-- Ciffi Frontend Generator --'));
  console.log('');
  console.log('');
  console.log('Available tasks:');
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
  console.log(chalk.cyan('npm start') + chalk.green(' -- start livereload server and generate dev build with watch --'));
  console.log('');
  console.log(chalk.cyan('npm run dev') + chalk.green(' -- start livereload server and generate dev build with watch --'));
  console.log('');
  console.log(chalk.cyan('npm run build [env]') + chalk.green(' -- generate build (use defaultBuildEnv from .ciffisettings if env is not specified) --'));
  console.log('');
  console.log(chalk.cyan('npm run assets') + chalk.green(' -- copy all assets into build folder --'));
  console.log('');
  console.log(chalk.cyan('npm run config [env]') + chalk.green(' -- generate config.js (use defaultBuildEnv from .ciffisettings if env is not specified) --'));
  console.log('');
  console.log(chalk.cyan('npm test') + chalk.green(' -- test your code with jest --'));
  console.log('');
};

const showUpdate = (oldVersion, newVersion) => {
  console.log(chalk.blue('╭───────────────────────────────────────────╮'));
  console.log(`${chalk.blue('│')}      New version of ciffi available!      ${chalk.blue('│')}`);
  console.log(chalk.blue('│                                           │'));
  console.log(`${chalk.blue('│')}             ${chalk.yellow(oldVersion.trim())} → ${chalk.green(newVersion.trim())}              ${chalk.blue('│')}`);
  console.log(chalk.blue('│                                           │'));
  console.log(`${chalk.blue('│')}    Run ${chalk.green('npm install -g ciffi')} to update!    ${chalk.blue('│')}`);
  console.log(chalk.blue('╰───────────────────────────────────────────╯'));
};

module.exports = {
  showCommandErrorMessage,
  showCommandListMsg,
  showGreetings,
  showLogo,
  showUpdate
};