import { Meta, Story } from '@storybook/react';
import { Title, Subtitle } from '@storybook/addon-docs';
import CheckList, { CheckListProps } from '../CheckList';
import Demo1 from './CheckList1.demo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw1 from '!!raw-loader!./CheckList1.demo';

const list: string[] = [];
let sum = 0;
for (let i = 0; i < 50; i++) {
  sum += i;
  const val = `中文中文${sum}`;
  list.push(val);
  if (i % 2 === 0) {
    list.push(`英文英文${sum}`);
  }
}

export default {
  title: '组件/CheckList/1.CheckList-基本用法',
  component: CheckList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>复选框列表。</Subtitle>
          <Demo1 dirName="check-list" code={raw1} />
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
  listHeight: 400,
};
DefaultStory.storyName = '1.CheckList-基本用法';
