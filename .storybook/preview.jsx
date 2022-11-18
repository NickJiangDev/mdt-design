import React, { useLayoutEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { useDarkMode } from 'storybook-dark-mode';
import { BaseContext, ThemeEnum } from '../src/components/style/context';
import { darkMode, lightMode } from './theme';
import { DocsContainer } from './components/DocContainer';
import { loadTheme } from '../src/components/style/themes';
import anysort from 'anysort';

const DARK_BG = '#282d40';
const LIGHT_BG = '#fbfcfe';
const DARK_ASSIST_BG = '#343b4d';
const DARK_MENU_BG = '#343c54';

const withThemeProvider = (Story, context) => {
  const isDark = useDarkMode();
  useLayoutEffect(() => {
    window.parent.document.getElementById('storybook-preview-wrapper').style.background = isDark
      ? DARK_BG
      : LIGHT_BG;
      const theme = isDark ? ThemeEnum.dark : ThemeEnum.light;
      loadTheme(theme);
  }, [isDark]);
  const local = context.globals.locale;
  return (
      <BaseContext.Provider value={{theme: isDark ? ThemeEnum.dark : ThemeEnum.light, locale: local}}>
        <Story {...context} />
      </BaseContext.Provider>
  );
};

addDecorator(withPropsTable);
addDecorator(withThemeProvider);

export const parameters = {
  docs: {
    container: DocsContainer,
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    default: 'dark',
    // Override the default dark theme
    dark: darkMode,
    // Override the default light theme
    light: lightMode,
  },
  backgrounds: {
    default: '',
    values: [
      {
        name: '深色辅助背景',
        value: DARK_ASSIST_BG,
      },
      {
        name: '深色菜单背景',
        value: DARK_MENU_BG,
      },
    ],
  },
  options: {
    showRoots: true,
    storySort: (previous, next) => {
      const [previousStory, previousMeta] = previous
      const [nextStory, nextMeta] = next

      return anysort(previousMeta.kind, nextMeta.kind, [
        'Overview/Intro',
        'Overview/Changelog',
        'Overview/Getting Started',
        'Overview/Themes',
        'Overview/**',
        'Usage/**',
        'Views/**',
        'Layout/**',
        '图标Icon/**',
        '组件/**',
        '组件库/**'
      ])
    }
  },

};

// i18n

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'zh-CN',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'zh-CN', right: '🇨🇳', title: '中文' },
        { value: 'en-US', right: '🇺🇸', title: 'English' },
      ],
    },
  },
};
