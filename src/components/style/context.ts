import React from 'react';

export enum ThemeEnum {
  dark = 'dark',
  light = 'light',
}
export enum LocaleEnum {
  zh = 'zh-CN',
  en = 'en-US',
}

interface BaseContextParams {
  // 主题信息
  theme?: ThemeEnum;
  // 多语言
  locale?: LocaleEnum;
}

// 初始化数据
const initialInfo: BaseContextParams = {
  theme: ThemeEnum.dark,
  locale: LocaleEnum.zh,
};

/**
 * 提供一个全局共享Context， 包含：
 * 主题
 * 多语言
 */
export const BaseContext = React.createContext(initialInfo);
