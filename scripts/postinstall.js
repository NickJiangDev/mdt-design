const colors = require('colors');
const { execSync } = require('child_process');

const run = (commands) => {
  commands.forEach((command) => execSync(command, { stdio: 'inherit' }));
};
run(['node node_modules/.bin/husky install']);

console.log('\n 快速命令: '.green,'\n   yarn gc'.red,' -- 快速生成组件\n'.green);
