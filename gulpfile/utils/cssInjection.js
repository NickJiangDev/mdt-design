const camelcase = require('camelcase');

// We convert less to css
function cssInjection(content) {
  return content.replace(/\.less/g, '.css');
}

// hack import("../icons" + props.icon) => import("../icons" + props.icon + "index.js")
function iconInjection(content) {
  let result = '';
  const lines = content.split('\n');

  // const vars = [];

  lines.forEach((l) => {
    let line = l + '\n';
    if (l.includes("return __importStar(require") && l.includes('+')) {
      line = l.replace("));", ' + "/index.js"));') + '\n';
    }
    if (l.includes("return import(") && l.includes('+')) {
      line = l.replace(");", ' + "/index.js");') + '\n';
    }
    result += line;
  });
  return result;
}

function esSvgInjection(content) {
  let result = '';
  const lines = content.split('\n');
  lines.forEach((l) => {
    let match = l.match(
      /(?<key>import|export)\s+(?:(?<alias>[\w,{}\s\*]+)\s+from)?\s*(?:(["'])?(?<ref>[@\w\s\\\/.-]+)\3?)\s*;/,
    );
    if (match) {
      const ref = match.groups.ref;
      const alias = match.groups.alias;
      const compNameMatch = alias && alias.match(/ReactComponent\sas\s(\w+)\s/);
      const svgMatch = ref && ref.match(/(.*\/)*([^.]+)\.svg$/);
      if (svgMatch && compNameMatch) {
        // const name = svgMatch[1] + camelcase(svgMatch[2], { pascalCase: true }) + '.js';
        // result += `import ${compNameMatch[1]} from "${name}";\n`;
        result +=
          l.replace(svgMatch[2] + '.svg', camelcase(svgMatch[2], { pascalCase: true }) + '.js') +
          '\n';
      } else {
        result += l + '\n';
      }
    } else {
      result += l + '\n';
    }
  });
  return result;
}

const findMatch = (lines, str) => {
  return lines.some((l) => {
    return l.match(str + '.ReactComponent');
  });
};

function cjsSvgInjection(content) {
  let result = '';
  const lines = content.split('\n');

  // const vars = [];

  lines.forEach((l) => {
    const match = l.match(/var\s(\S+)\s=\srequire\(['"]((\S+)\.svg)['"]\)/);
    const variable = match && match[1];
    let line = l + '\n';
    if (variable && findMatch(lines, variable)) {
      const ref = match[2];
      // vars.push(variable);
      const svgMatch = ref && ref.match(/(.*\/)*([^.]+)\.svg$/);
      if (svgMatch) {
        const name = svgMatch[1] + camelcase(svgMatch[2], { pascalCase: true }) + '.js';
        line = `var ${match[1]} = require("${name}");\n`;
      }
    }
    // vars.forEach((v) => {
    //   line = line.replace(v + '.ReactComponent', v + '.default');
    // });
    result += line;
  });
  return result;
}

function svgInjection(content, isEsModule) {
  return isEsModule ? esSvgInjection(content) : cjsSvgInjection(content);
}

module.exports = {
  cssInjection,
  svgInjection,
  iconInjection,
};
