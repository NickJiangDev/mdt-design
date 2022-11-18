import AdaptiveMore, { AdaptiveMoreProps } from '@/components/adaptive-more';
import { Story } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

const list = [
  'id',
  '供应or成交',
  '推广名',
  '物业类型',
  '户型',
  '上市/成交日期',
  '总供应/成交面积段',
  '套总价段',
  '成交单价',
  '成交总价',
  '供应/成交建筑总面积',
  '套数',
  'lng',
  'lat',
  '板块',
  'name',
  'address',
];

// eslint-disable-next-line import/no-anonymous-default-export
const AdaptiveMoreDemo: Story<AdaptiveMoreProps> = (args) => {
  const dark = useDarkMode();
  const getBackground = dark ? '#4285f4' : '#3D7FE9';
  const labelColor = dark ? 'white' : 'black';
  return (
    <div>
      <h2 style={{ color: labelColor }}>拖动窗口观察变化</h2>
      <h4 style={{ color: labelColor }}>默认</h4>
      <div style={{ height: 30, width: '100%' }}>
        <AdaptiveMore
          {...args}
          renderMore={(hiddenList) => {
            return <div>{hiddenList}</div>;
          }}
        >
          {list.map((it, index) => {
            return (
              <div
                key={index}
                style={{
                  border: '1px solid',
                  margin: '0 5px',
                  background: getBackground,
                  padding: 5,
                  color: 'white',
                }}
              >
                {it}
              </div>
            );
          })}
        </AdaptiveMore>
      </div>
    </div>
  );
};

export default AdaptiveMoreDemo;
