import { LinkButton } from '../LinkButton';
import {
  FlexHorAround,
  FlexColumnVerCenter,
  LabelButton,
  DocPreview,
} from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <FlexColumnVerCenter>
          <h4>&ensp;</h4>
          <LabelButton>Default</LabelButton>
          <LabelButton>Disable</LabelButton>
          <LabelButton>Left Icon</LabelButton>
          <LabelButton>Right Icon</LabelButton>
          <LabelButton>Compact</LabelButton>
          <LabelButton>Compact Disabled</LabelButton>
          <LabelButton>Compact Left Icon</LabelButton>
          <LabelButton>Compact Right Icon</LabelButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Default</h4>
          <LinkButton>链接按钮</LinkButton>
          <LinkButton disabled>链接按钮</LinkButton>
          <LinkButton leftIcon="add">链接按钮</LinkButton>
          <LinkButton rightIcon="launch-2">链接按钮</LinkButton>
          <LinkButton size="compact">链接按钮</LinkButton>
          <LinkButton size="compact" disabled>
            链接按钮
          </LinkButton>
          <LinkButton size="compact" leftIcon="add">
            链接按钮
          </LinkButton>
          <LinkButton size="compact" rightIcon="launch-2">
            链接按钮
          </LinkButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Danger</h4>
          <LinkButton status="danger">链接按钮</LinkButton>
          <LinkButton status="danger" disabled>
            链接按钮
          </LinkButton>
          <LinkButton status="danger" leftIcon="add">
            链接按钮
          </LinkButton>
          <LinkButton status="danger" rightIcon="launch-2">
            链接按钮
          </LinkButton>
          <LinkButton status="danger" size="compact">
            链接按钮
          </LinkButton>
          <LinkButton status="danger" size="compact" disabled>
            链接按钮
          </LinkButton>
          <LinkButton status="danger" size="compact" leftIcon="add">
            链接按钮
          </LinkButton>
          <LinkButton status="danger" size="compact" rightIcon="launch-2">
            链接按钮
          </LinkButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Plain</h4>
          <LinkButton status="plain">链接按钮</LinkButton>
          <LinkButton status="plain" disabled>
            链接按钮
          </LinkButton>
          <LinkButton status="plain" leftIcon="add">
            链接按钮
          </LinkButton>
          <LinkButton status="plain" rightIcon="launch-2">
            链接按钮
          </LinkButton>
          <LinkButton status="plain" size="compact">
            链接按钮
          </LinkButton>
          <LinkButton status="plain" size="compact" disabled>
            链接按钮
          </LinkButton>
          <LinkButton status="plain" size="compact" leftIcon="add">
            链接按钮
          </LinkButton>
          <LinkButton status="plain" size="compact" rightIcon="launch-2">
            链接按钮
          </LinkButton>
        </FlexColumnVerCenter>
      </FlexHorAround>
    </DocPreview>
  );
};
