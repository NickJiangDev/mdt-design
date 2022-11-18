import { Story, Meta } from '@storybook/react';
import {{Demo}}, { {{Demo}}Props } from '../index';
import {{Demo}}Doc from './{{Demo}}.doc';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./{{Demo}}.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/{{Demo}}/{{Demo}}',
  component: {{Demo}},
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>描述</Subtitle>
          <{{Demo}}Doc dirName="{{demo}}" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<{{Demo}}Props> = (args) => <{{Demo}} {...args}>{{Demo}}</{{Demo}}>;

export const PrimaryStory = Template.bind({});
PrimaryStory.storyName = '{{Demo}}';
