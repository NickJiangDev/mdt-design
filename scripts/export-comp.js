const fs = require('fs');
const path = require('path');

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

const srcDir = 'src/components';

let content = "import './style/dark.less';";

const list = fs.readdirSync(resolveFile(srcDir));

function toCapitalize(str) {
  return str
    .split('-')
    .map((s) => {
      let arr = s.split('');
      arr.splice(0, 1, s[0].toUpperCase());
      return arr.join('');
    })
    .join('');
}

list.forEach((name) => {
  const file = resolveFile(path.join(srcDir, name, 'index.tsx'));
  if (fs.existsSync(file)) {
    content += `\nexport { default as ${toCapitalize(name)} } from './${name}';`;
  }
});

content += '\n';

fs.writeFileSync(resolveFile(path.join(srcDir, 'index.tsx')), content);
