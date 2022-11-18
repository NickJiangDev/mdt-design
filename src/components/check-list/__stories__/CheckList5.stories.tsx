import { Meta, Story } from '@storybook/react';
import { Title, Subtitle } from '@storybook/addon-docs';
import CheckList, { CheckListProps } from '../CheckList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw5 from '!!raw-loader!./CheckList5.demo';
import Demo5 from './CheckList5.demo';

const list: string[] = [];
const values: string[] = [];
let sum = 0;
for (let i = 0; i < 50; i++) {
  sum += i;
  const val = `中文中文${sum}`;
  list.push(val);
  if (i % 2 === 0) {
    values.push(`英文英文${sum}`);
    list.push(`英文英文${sum}`);
  }
}

export default {
  title: '组件/CheckList/5.CheckList-自定义renderer',
  component: CheckList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>复选框列表。</Subtitle>
          <Demo5 dirName="check-list" code={raw5} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<CheckListProps> = (args) => {
  return <CheckList {...args} />;
};

export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  noContentText: '暂无数据',
  noResultText: '搜索无结果',
  placeholder: '搜索字段',
  loading: false,
  options: list,
  defaultValue: values,
  text: 'abc',
  renderer: (checked: boolean, title: string, value: string) => (
    <span
      style={{
        color: checked ? 'red' : 'white',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'auto',
      }}
    >
      {`${checked ? '\u2713' : '\u2717'} - title: ${title} value: ${value}`}
    </span>
  ),
};
DefaultStory.storyName = '5.CheckList-自定义renderer';
