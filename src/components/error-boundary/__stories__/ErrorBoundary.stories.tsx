// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ErrorBoundary, { ErrorBoundaryProps } from '../ErrorBoundary';
import Template1 from './ErrorBoundary1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./ErrorBoundary1.demo';
import { DocPreview } from '@/__stories-template__';

export default {
  title: '组件/ErrorBoundary/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>错误边界。</Subtitle>
          <DocPreview dirName="errorBoundary" code={code}>
            <Template1 />
          </DocPreview>
        </>
      ),
    },
  },
} as Meta;

const ErrorBoundarytory: Story<ErrorBoundaryProps> = (args) => (
  <ErrorBoundary {...args}>Demo详见Doc</ErrorBoundary>
);
export const DefaultStory = ErrorBoundarytory.bind({});
DefaultStory.storyName = 'ErrorBoundary';
