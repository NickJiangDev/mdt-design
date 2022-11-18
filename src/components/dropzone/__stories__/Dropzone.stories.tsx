// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Dropzone, { DropzoneProps } from '../Dropzone';
import Template1 from './Dropzone1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Dropzone1.demo';

export default {
  title: '组件/Dropzone/Dropzone',
  component: Dropzone,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>提供一个上传空间。</Subtitle>
          <Template1 dirName="dropzone" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dropzonetory: Story<DropzoneProps> = (args) => <Dropzone {...args} />;
export const DefaultStory = Dropzonetory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Dropzone';
