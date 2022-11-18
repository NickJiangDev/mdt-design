import { ThemeEnum } from '../context';
import './dark';
import './light';

/**
 * 设置主题
 * @param {ThemeEnum} theme 主题类型
 * @param {} customVariables 需要自定义的主题变量对象集合
 * @param {string} elementId 当前节点id
 */
export const loadTheme = (
  theme = ThemeEnum.dark,
  customVariables = {
    [ThemeEnum.dark]: {},
    [ThemeEnum.light]: {},
  },
  elementId = '',
): void => {
  // 当前的结点 默认documentElement
  const currentDom = elementId ? document.getElementById(elementId) : document.documentElement;
  // 移除增加的自定义style标签
  const darkStyleDom = document.getElementById('dataThemeDark');
  const lightStyleDom = document.getElementById('dataThemeLight');
  darkStyleDom?.remove();
  lightStyleDom?.remove();
  // 暗色系自定义变量
  if (
    theme === ThemeEnum.dark &&
    customVariables[ThemeEnum.dark] &&
    Object.keys(customVariables[ThemeEnum.dark]).length
  ) {
    const element = document.createElement('style');
    element.id = 'dataThemeDark';
    element.type = 'text/css';
    const styleString = Object.entries(customVariables[ThemeEnum.dark])
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    element.innerText = `[data-theme='dark'] {${styleString};}`;
    currentDom?.append(element);
  }
  // 亮色系自定义变量
  if (
    theme === ThemeEnum.light &&
    customVariables[ThemeEnum.light] &&
    Object.keys(customVariables[ThemeEnum.light]).length
  ) {
    const element = document.createElement('style');
    element.id = 'dataThemeLight';
    element.type = 'text/css';
    const styleString = Object.entries(customVariables[ThemeEnum.dark])
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    element.innerText = `[data-theme='light'] {${styleString};}`;
    currentDom?.append(element);
  }
  // 设置当前主题
  currentDom?.setAttribute('data-theme', theme);
};

/**
 * 获取当前主题
 * @returns {ThemeEnum} 当前主题
 */
export const getTheme = (elementId = ''): ThemeEnum | undefined => {
  if (elementId) {
    const theme = document.getElementById(elementId)?.getAttribute('data-theme') as ThemeEnum;
    return theme ? ThemeEnum[theme] : undefined;
  }
  const theme = document.documentElement.getAttribute('data-theme') as ThemeEnum;
  return theme ? ThemeEnum[theme] : undefined;
};
