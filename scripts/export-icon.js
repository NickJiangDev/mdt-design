const fs = require('fs');
const path = require('path');

const func = () => {
  const dir = path.resolve(__dirname, `../src/components/icons`);
  const list = fs.readdirSync(dir);
  const es = [];
  list.forEach((name) => {
    if (name.indexOf('.') === -1) {
      const cn = name
        .split('-')
        .map((it) => it[0].toUpperCase() + it.slice(1))
        .join('');
      es.push(`export { default as ${cn} } from './${name}'`);
    }
  });
  if (es.length) {
    let str = es.join(';\n');
    const f = `${dir}/index.tsx`;
    str += ';\n';
    fs.writeFileSync(f, str, 'utf8');
  }
};

func();
