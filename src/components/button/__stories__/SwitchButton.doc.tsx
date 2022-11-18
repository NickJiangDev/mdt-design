import { SwitchButton } from '../SwitchButton';
import { FlexHorAround, FlexColumnVerCenter, DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <FlexColumnVerCenter>
          <h4>Default</h4>
          <SwitchButton>不限</SwitchButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Checked</h4>
          <SwitchButton checked>不限</SwitchButton>
        </FlexColumnVerCenter>
      </FlexHorAround>
    </DocPreview>
  );
};
