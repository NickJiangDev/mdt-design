// * 引用路径使用 `import from '.'` 替换为 `import from './index'`, [babel plugin bug](https://github.com/tleunen//babel-plugin-module-resolver/pull/409/commits/e6d9b87b5259637b6890b4d5e3dfa2dd21236de6)

const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const glob = require('glob');
const colors = require('colors');

const rootPath = path.resolve();

const isAll = process.argv.includes('-a');

if (isAll) {
  glob('src/**', { nodir: true }, function (er, files) {
    checkFiles(files);
  });
} else {
  // git files to commit
  const files = process.argv.slice(2);
  checkFiles(files);
}

const errDesc = [
  {
    reg: /^import(.*)\.['|"];$/,
    msgFunc: (errMsg) => {
      console.log(
        `\n【${errMsg.length} 】个文件出错`.red,
        `引用路径 `,
        `import from '.'`.red,
        `替换为 `,
        `import from './index'`.red,
        `, [babel plugin bug](https://github.com/tleunen//babel-plugin-module-resolver/pull/409/commits/e6d9b87b5259637b6890b4d5e3dfa2dd21236de6)\n`,
      );
    },
  },
  {
    reg: /['|"]@\/components['|"]/,
    msgFunc: (errMsg) => {
      console.log(
        `\n【${errMsg.length} 】个文件出错`.red,
        `不直接引用全量组件'@/components'，请按需引入\n`,
      );
    },
  },
];

function checkFiles(files) {
  Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }),
  ).then((bfs) => {
    const contents = bfs.map((c) => c.toString());
    let errMsg = new Array(errDesc.length).fill('').map(() => []);
    contents.forEach((c, i) => {
      const lines = c.split('\n');
      let errLines = new Array(errDesc.length).fill('').map(() => []);
      lines.forEach((l, j) => {
        errDesc.forEach((d, k) => {
          let matched = l.match(d.reg);
          if (matched) {
            errLines[k].push({ line: j + 1, content: l });
          }
        });
      });
      errLines.forEach((d, k) => {
        if (errLines[k].length) {
          errMsg[k].push({ path: files[i].replace(rootPath + '/', ''), lines: errLines[k] });
        }
      });
    });
    let hasError = false;
    errDesc.forEach((d, k) => {
      if (errMsg[k].length) {
        d.msgFunc(errMsg[k]);
        errMsg[k].forEach((e) => {
          console.log(`${e.path}`.bgRed);
          e.lines.map((l) => {
            console.log(`   line ${l.line}: `.brightWhite.bold, l.content);
          });
          console.log('\n');
        });
        hasError = true;
      }
    });
    if (hasError) {
      exit(1);
    }
    console.log('commit check done');
  });
}
