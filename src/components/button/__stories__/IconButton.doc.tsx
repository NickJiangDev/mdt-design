import { IconButton } from '../IconButton';
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
      <h5>默认样式</h5>
      <FlexHorAround>
        <FlexColumnVerCenter>
          <h4>&ensp;</h4>
          <LabelButton>Default</LabelButton>
          <LabelButton>Actived</LabelButton>
          <LabelButton>Disable</LabelButton>
          <LabelButton>Ghost</LabelButton>
          <LabelButton>Ghost Actived</LabelButton>
          <LabelButton>Compact</LabelButton>
          <LabelButton>Compact Actived</LabelButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>WithoutBorder(Default)</h4>
          <IconButton icon="add" />
          <IconButton icon="add" actived />
          <IconButton icon="add" disabled />
          <IconButton icon="add" ghost />
          <IconButton icon="add" ghost actived />
          <IconButton icon="add" size="compact" />
          <IconButton icon="add" size="compact" actived />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Border</h4>
          <IconButton type="border" icon="add" />
          <IconButton type="border" icon="add" actived />
          <IconButton type="border" icon="add" disabled />
          <IconButton type="border" icon="add" ghost />
          <IconButton type="border" icon="add" ghost actived />
          <IconButton type="border" icon="add" size="compact" />
          <IconButton type="border" icon="add" size="compact" actived />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Assist-bg</h4>
          <IconButton type="assist-bg" icon="add" />
          <IconButton type="assist-bg" icon="add" actived />
          <IconButton type="assist-bg" icon="add" disabled />
          <IconButton type="assist-bg" icon="add" ghost />
          <IconButton type="assist-bg" icon="add" ghost actived />
          <IconButton type="assist-bg" icon="add" size="compact" />
          <IconButton type="assist-bg" icon="add" size="compact" actived />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Assist-bg-border</h4>
          <IconButton type="assist-bg-border" icon="add" />
          <IconButton type="assist-bg-border" icon="add" actived />
          <IconButton type="assist-bg-border" icon="add" disabled />
          <IconButton type="assist-bg-border" icon="add" ghost />
          <IconButton type="assist-bg-border" icon="add" ghost actived />
          <IconButton type="assist-bg-border" icon="add" size="compact" />
          <IconButton type="assist-bg-border" icon="add" size="compact" actived />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Only-Icon</h4>
          <IconButton type="only-icon" icon="add" />
          <IconButton type="only-icon" icon="add" actived />
          <IconButton type="only-icon" icon="add" disabled />
          <IconButton type="only-icon" icon="add" ghost />
          <IconButton type="only-icon" icon="add" ghost actived />
          <IconButton type="only-icon" icon="add" size="compact" />
          <IconButton type="only-icon" icon="add" size="compact" actived />
        </FlexColumnVerCenter>
      </FlexHorAround>
      <h5>带有下拉的样式</h5>
      <FlexHorAround>
        <FlexColumnVerCenter>
          <h4>&ensp;</h4>
          <LabelButton>Default</LabelButton>
          <LabelButton>Actived</LabelButton>
          <LabelButton>Disable</LabelButton>
          <LabelButton>Ghost</LabelButton>
          <LabelButton>Ghost Actived</LabelButton>
          <LabelButton>Compact</LabelButton>
          <LabelButton>Compact Actived</LabelButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>WithoutBorder(Default)</h4>
          <IconButton icon="add" dropdown />
          <IconButton icon="add" actived dropdown />
          <IconButton icon="add" disabled dropdown />
          <IconButton icon="add" ghost dropdown />
          <IconButton icon="add" ghost actived dropdown />
          <IconButton icon="add" size="compact" dropdown />
          <IconButton icon="add" size="compact" actived dropdown />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Border</h4>
          <IconButton type="border" icon="add" dropdown />
          <IconButton type="border" icon="add" actived dropdown />
          <IconButton type="border" icon="add" disabled dropdown />
          <IconButton type="border" icon="add" ghost dropdown />
          <IconButton type="border" icon="add" ghost actived dropdown />
          <IconButton type="border" icon="add" size="compact" dropdown />
          <IconButton type="border" icon="add" size="compact" actived dropdown />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Assist-bg</h4>
          <IconButton type="assist-bg" icon="add" dropdown />
          <IconButton type="assist-bg" icon="add" actived dropdown />
          <IconButton type="assist-bg" icon="add" disabled dropdown />
          <IconButton type="assist-bg" icon="add" ghost dropdown />
          <IconButton type="assist-bg" icon="add" ghost actived dropdown />
          <IconButton type="assist-bg" icon="add" size="compact" dropdown />
          <IconButton type="assist-bg" icon="add" size="compact" actived dropdown />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Assist-bg-border</h4>
          <IconButton type="assist-bg-border" icon="add" dropdown />
          <IconButton type="assist-bg-border" icon="add" actived dropdown />
          <IconButton type="assist-bg-border" icon="add" disabled dropdown />
          <IconButton type="assist-bg-border" icon="add" ghost dropdown />
          <IconButton type="assist-bg-border" icon="add" ghost actived dropdown />
          <IconButton type="assist-bg-border" icon="add" size="compact" dropdown />
          <IconButton type="assist-bg-border" icon="add" size="compact" actived dropdown />
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>Only-Icon</h4>
          <IconButton type="only-icon" icon="add" dropdown />
          <IconButton type="only-icon" icon="add" actived dropdown />
          <IconButton type="only-icon" icon="add" disabled dropdown />
          <IconButton type="only-icon" icon="add" ghost dropdown />
          <IconButton type="only-icon" icon="add" ghost actived dropdown />
          <IconButton type="only-icon" icon="add" size="compact" dropdown />
          <IconButton type="only-icon" icon="add" size="compact" actived dropdown />
        </FlexColumnVerCenter>
      </FlexHorAround>
    </DocPreview>
  );
};
