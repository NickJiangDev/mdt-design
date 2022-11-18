import * as React from 'react';
import styled from '@emotion/styled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@/components/icon';
import { useDarkMode } from 'storybook-dark-mode';

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 180px;
  height: 100px;
  cursor: pointer;
  color: #bac1d7;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export const Label = styled.div`
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;
  color: #a3aac2;
`;

export const MaterialIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 50px 20px 0;
  flex-direction: column;
  width: 130px;
`;

interface IconItemProps {
  dirName: string;
  View?: React.FC<{ size: number; className?: string; style?: React.CSSProperties }>;
  className?: string;
  style?: React.CSSProperties;
  copyCallback?: (copy: boolean) => void;
}
export const IconItem: React.FC<IconItemProps> = (props: IconItemProps) => {
  const { View, dirName, className, style } = props;
  const [copied, setCopied] = React.useState(false);
  const onClick = React.useCallback(() => {
    setCopied(true);
  }, []);
  const onReset = React.useCallback(() => {
    setCopied(false);
  }, []);
  const themeStyle = { color: useDarkMode() ? '#bac1d7' : '#000' };
  return (
    <CopyToClipboard text={`<Icon icon='${dirName}' />`} onCopy={onClick}>
      <Item onMouseLeave={onReset} style={{ ...themeStyle, ...style }}>
        {View ? (
          <View size={40} className={className} />
        ) : (
          <Icon icon={dirName} size={40} className={className} />
        )}
        <Label style={themeStyle}>{copied ? dirName + '(已复制)' : dirName}</Label>
      </Item>
    </CopyToClipboard>
  );
};

export const MaterialIconItem: React.FC<IconItemProps> = (props: IconItemProps) => {
  const { View, dirName, className, style, copyCallback } = props;
  const onClick = React.useCallback(() => {
    copyCallback && copyCallback(true);
  }, [copyCallback]);
  const themeStyle = { color: useDarkMode() ? '#bac1d7' : '#000' };
  return (
    <React.Fragment>
      <CopyToClipboard text={`<Icon icon='${dirName}' />`} onCopy={onClick}>
        <Item style={{ ...themeStyle, ...style, width: '50px', height: '50px' }}>
          {View ? (
            <View size={40} className={className} />
          ) : (
            <Icon icon={dirName} size={40} className={className} />
          )}
        </Item>
      </CopyToClipboard>
    </React.Fragment>
  );
};

export const IconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #fff;
`;

export const IconList2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #a5abbe;
`;
