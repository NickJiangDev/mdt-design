import * as React from 'react';
import Input from '@/components/input';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { IconItem, IconList } from '@/__stories-template__';
import * as AllIcon from '@/components/icons';
import { search } from '@/components/_utils/pinyinUtil';

const allIconData = map(AllIcon, (_View, key) => {
  const dirName = key
    .split('')
    .map((it) => ((it.codePointAt(0) || 0) < 97 ? '-' + it.toLowerCase() : it))
    .join('')
    .slice(1);
  return { key, dirName };
});

const IconDemo = () => {
  const [data, setData] = React.useState(allIconData);
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setData(filter(allIconData, ({ key }) => search(key, value.replaceAll('-', '').trim())));
  }, []);
  return (
    <React.Fragment>
      <Input placeholder="在此搜索图标" onChange={onChange} prefixIcon="search" />
      <IconList>
        {map(data, ({ key, dirName }) => {
          return <IconItem key={key.toString()} dirName={dirName} />;
        })}
      </IconList>
    </React.Fragment>
  );
};
export default IconDemo;
