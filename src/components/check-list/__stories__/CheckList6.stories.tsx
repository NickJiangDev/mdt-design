import { Meta, Story } from '@storybook/react';
import { Title, Subtitle } from '@storybook/addon-docs';
import CheckList, { CheckListProps } from '../CheckList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw6 from '!!raw-loader!./CheckList6.demo';
import Demo6 from './CheckList6.demo';

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
  title: '组件/CheckList/6.CheckList-单选-radio',
  component: CheckList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>复选框列表单选</Subtitle>
          <Demo6 dirName="check-list" code={raw6} />
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
  radio: true,
  options: list,
};
DefaultStory.storyName = '6.CheckList-单选-radio';
