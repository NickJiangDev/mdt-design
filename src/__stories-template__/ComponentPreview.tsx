/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import template from 'lodash/template';
import { ThemeEnum } from '../components/style/context';
import { useDarkMode } from 'storybook-dark-mode';
export interface ThemeProps {
  thm?: ThemeEnum;
}

const themeColorMap = {
  [ThemeEnum.dark]: 'white',
  [ThemeEnum.light]: 'black',
};

const PreviewStyled = styled.div<ThemeProps>`
  padding: 0px 40px;
  background: ${({ thm = ThemeEnum.dark }) => (thm === ThemeEnum.dark ? '#282d40' : '#fbfcfe')};
  border-radius: 3px;
  color: ${({ thm = ThemeEnum.dark }) => themeColorMap[thm] || 'black'};
`;

const Title = styled.h3``;

export interface BgProps extends ThemeProps {
  bg?: 'dark' | 'gray' | 'light' | 'page';
}

const bgMap = {
  [ThemeEnum.dark]: {
    dark: '#282d40',
    gray: '#343b4d',
    light: '#343c54',
    page: '#1e2130',
  },
  [ThemeEnum.light]: {
    dark: '#fbfcfe',
    gray: '#fbfcfe',
    light: '#fbfcfe',
    page: '#fbfcfe',
  },
};

const ViewBg = styled.div<BgProps>`
  background: ${({ bg = 'dark', thm = ThemeEnum.dark }) => bgMap[thm]?.[bg] ?? '#eee'};
  padding: 20px 10px;
  border-radius: 0.3em;
  > * {
    margin-right: 20px;
  }
`;

export interface CodeProps {
  language?: 'jsx' | 'tsx' | 'md' | 'js';
  code: string;
}

const Code: React.FC<CodeProps> = ({ language = 'jsx', code }) => {
  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export interface PriviewProps extends BgProps {
  children: React.ReactNode;
  dirName?: string;
  code?: string;
}

const temp = `<%= a %> <%= b %> <%= c %> '<%= d %>/<%= e %>/<%= f %>';`;

const ComponentPreview: React.FC<PriviewProps> = ({ children, dirName, code, bg = 'dark' }) => {
  const isDark = useDarkMode();
  const theme = isDark ? ThemeEnum.dark : ThemeEnum.light;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(Prism.highlightAll);
  let uc = null;
  if (dirName) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const name = dirName
      .split('/')
      .pop()
      .split('-')
      .map((it) => it[0].toUpperCase() + it.slice(1))
      .join('');
    const compiled = template(temp);
    const useStr = compiled({
      a: 'import',
      b: name,
      c: 'from',
      d: '@',
      e: 'components',
      f: dirName,
    });
    uc = (
      <React.Fragment>
        <Title>引用方式：</Title>
        <Code code={useStr} />
      </React.Fragment>
    );
  }
  let cc = null;
  if (code) {
    cc = (
      <React.Fragment>
        <Title>代码演示</Title>
        <Code code={code} />
      </React.Fragment>
    );
  }

  return (
    <PreviewStyled thm={theme}>
      {uc}
      <Title>组件展示</Title>
      <ViewBg bg={bg} thm={theme}>
        {children}
      </ViewBg>
      {cc}
    </PreviewStyled>
  );
};

export default ComponentPreview;
