const isExportNamedDeclaration = item => item.type === "ExportNamedDeclaration";

const hasExportNamedDeclaration = (items) => {
  if (items === null) {
    return false;
  }

  if (items instanceof Array) {
    return !!(items && items.find(isExportNamedDeclaration))
  }

  return isExportNamedDeclaration(items)
}

const getName = (component) => {
  if (component instanceof Object) {
    return component.name;
  }

  return component;
}

const customTemplate = (
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) => {
  const ReactComponent = hasExportNamedDeclaration(exports)
    ? ''
    : 'export const ReactComponent = ' + getName(componentName);

  return template.ast`
    ${imports}
    function ${componentName}(${props}) {
      return ${jsx};
    }
    ${ReactComponent}
    ${exports}
  `
}

module.exports = {
  template: customTemplate
}
