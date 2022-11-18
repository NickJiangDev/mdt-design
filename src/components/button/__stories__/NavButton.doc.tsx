import { NavButton } from '../NavButton';
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
          <LabelButton>Loading</LabelButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>保存</h4>
          <NavButton>保存</NavButton>
          <NavButton disabled>保存</NavButton>
          <NavButton loading>保存</NavButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>放弃</h4>
          <NavButton type="danger">放弃</NavButton>
          <NavButton type="danger" disabled>
            放弃
          </NavButton>
          <NavButton type="danger" loading>
            放弃
          </NavButton>
        </FlexColumnVerCenter>
        <FlexColumnVerCenter>
          <h4>完成</h4>
          <NavButton type="success">完成</NavButton>
          <NavButton type="success" disabled>
            完成
          </NavButton>
          <NavButton type="success" loading>
            完成
          </NavButton>
        </FlexColumnVerCenter>
      </FlexHorAround>
    </DocPreview>
  );
};
