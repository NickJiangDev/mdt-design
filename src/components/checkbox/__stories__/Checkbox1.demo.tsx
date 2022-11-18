import * as React from 'react';
import { DocPreview, FlexVerCenter, FlexVerStart } from '@/__stories-template__';
import Checkbox from '@/components/checkbox';
import Tooltip from '@/components/tooltip';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const CheckBoxDemo = (props: PriviewProps) => {
  const [isChecked, setIschecked] = React.useState(false);
  const onClick = React.useCallback((val: boolean) => {
    setIschecked(val);
  }, []);

  return (
    <DocPreview {...props}>
      <h2>normal</h2>
      <FlexVerCenter>
        <Checkbox defaultChecked />
        <Checkbox />
        <Checkbox indeterminate />
      </FlexVerCenter>

      <h2>disabled</h2>
      <FlexVerCenter>
        <Checkbox defaultChecked disabled />
        <Checkbox disabled />
        <Checkbox indeterminate disabled />
      </FlexVerCenter>

      <h2>compact</h2>
      <FlexVerCenter>
        <Checkbox size="compact" checked />
        <Checkbox size="compact" />
        <Checkbox size="compact" indeterminate />
      </FlexVerCenter>

      <h2>compact disabled</h2>
      <FlexVerCenter>
        <Checkbox size="compact" checked disabled />
        <Checkbox size="compact" disabled />
        <Checkbox size="compact" indeterminate disabled />
      </FlexVerCenter>

      <h2>onChange</h2>
      <FlexVerCenter>
        <Tooltip title={isChecked ? 1 : 0}>
          <Checkbox checked={isChecked} onChange={onClick} />
        </Tooltip>
        <Checkbox checked={isChecked} size="compact" onChange={onClick} />
      </FlexVerCenter>

      <h2>children</h2>
      <FlexVerStart>
        <Checkbox defaultChecked>
          <div style={{ marginLeft: 5, color: 'red' }}>apple</div>
        </Checkbox>
        <Checkbox defaultChecked title={'地图服务器渲染'} />
      </FlexVerStart>

      <h2>选项</h2>
      <FlexVerStart>
        <Checkbox
          defaultChecked
          title={'地图服务器渲染'}
          subTitle={'适合数据量很大地理的数据渲染，地图交互会略有延时'}
        />
        <Checkbox defaultChecked title={'地图服务器渲染'} />
      </FlexVerStart>

      <FlexVerStart>
        <Checkbox
          disabled
          defaultChecked
          title={'地图服务器渲染'}
          subTitle={'适合数据量很大地理的数据渲染，地图交互会略有延时'}
        />
        <Checkbox disabled defaultChecked title={'地图服务器渲染'} />
      </FlexVerStart>
    </DocPreview>
  );
};

export default CheckBoxDemo;
