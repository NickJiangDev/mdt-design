import { create } from '@storybook/theming';
export const darkMode = create({
  base: 'dark',
  brandTitle: 'Datamap Docs',
  brandUrl: 'https://www.datlas.cn',
  // appContentBg: '#282d40',
});

export const lightMode = create({
  base: 'light',
  brandTitle: 'Datamap Docs',
  brandUrl: 'https://www.datlas.cn',
  // appContentBg: '#fbfcfe',
});