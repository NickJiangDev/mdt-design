const fs = require('fs');
const path = require('path');
const colors = require('colors');
const glob = require('glob');
const capitalize = require('lodash/capitalize');

const files = process.argv.slice(2);
if (files.length === 0 || !files[0].match(/^[a-z\-]+$/)) {
  console.log('请输入组件名称, ', '小写中划线'.red, ', 如: select-list');
  return;
}

const fileName = files[0];
const generateFunc = (name) => {
  // 驼峰
  const camelName = name
    .split('-')
    .map((t) => capitalize(t))
    .join('');
  // 模版路径
  const demoDir = 'scripts/__demo__';
  glob(demoDir + '/**', function (er, demoFiles) {
    //
    const targetDir = 'src/components/' + name;
    fs.mkdirSync(path.resolve(targetDir));

    demoFiles.forEach((f) => {
      if (f === demoDir) return;
      const st = fs.statSync(f);
      const relativePath = f
        .replace(demoDir, '')
        .replace(/_Demo/g, camelName)
        .replace(/_demo/g, name);
      const targetFile = targetDir + relativePath;
      if (st.isDirectory()) {
        fs.mkdirSync(path.resolve(targetFile));
      } else {
        const demoContent = fs.readFileSync(f).toString();
        const targetContent = demoContent
          .replace(/\{\{Demo\}\}/g, camelName)
          .replace(/\{\{demo\}\}/g, name);
        fs.writeFileSync(targetFile, targetContent);
      }
    });
  });
};

generateFunc(fileName);
