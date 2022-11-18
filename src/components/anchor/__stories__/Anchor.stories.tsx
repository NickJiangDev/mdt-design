import { Story, Meta } from '@storybook/react';
import Anchor, { AnchorProps } from '../index';
import AnchorDoc from './Anchor.doc';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Anchor.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/Anchor/Anchor',
  component: Anchor,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>铆点</Subtitle>
          <AnchorDoc dirName="anchor" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<AnchorProps> = (args) => <Anchor {...args}>见doc文档</Anchor>;

export const PrimaryStory = Template.bind({});
PrimaryStory.storyName = 'Anchor';
