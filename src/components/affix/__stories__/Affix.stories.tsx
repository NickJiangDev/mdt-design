import { Story, Meta } from '@storybook/react';
import Affix, { AffixProps } from '../index';
import AffixDoc from './Affix.doc';
import Button from '@/components/button';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Affix.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/Affix/Affix',
  component: Affix,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>固钉。</Subtitle>
          <AffixDoc dirName="affix" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<AffixProps> = (args) => {
  return (
    <Affix offsetTop={10} {...args}>
      <Button type="primary">Affix top</Button>
    </Affix>
  );
};

export const PrimaryStory = Template.bind({});
PrimaryStory.storyName = 'Affix';
