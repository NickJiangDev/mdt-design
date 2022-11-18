import {
  DocPreview,
  FlexColumnVerCenter,
  FlexHorAround,
  LabelButton,
} from '@/__stories-template__';
import FieldItem from '@/components/field-item';
import { PriviewProps } from '@/__stories-template__/DocPreview';

function handleClose() {
  // do something
}

export default (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <FlexColumnVerCenter>
        <h4>&ensp;</h4>
        <LabelButton>default</LabelButton>
        <LabelButton>checked</LabelButton>
        <LabelButton>onClose</LabelButton>
      </FlexColumnVerCenter>
      <FlexColumnVerCenter>
        <h4>type: text</h4>
        <FieldItem type="text" name="type: text" />
        <FieldItem type="text" name="type: text" checked />
        <FieldItem type="text" name="type: text" onClose={handleClose} />
      </FlexColumnVerCenter>
      <FlexColumnVerCenter>
        <h4>type: number</h4>
        <FieldItem type="number" name="type: number" />
        <FieldItem type="number" name="type: number" checked />
        <FieldItem type="number" name="type: number" onClose={handleClose} />
      </FlexColumnVerCenter>
      <FlexColumnVerCenter>
        <h4>type: datetime</h4>
        <FieldItem type="datetime" name="type: datetime" />
        <FieldItem type="datetime" name="type: datetime" checked />
        <FieldItem type="datetime" name="type: datetime" onClose={handleClose} />
      </FlexColumnVerCenter>
    </FlexHorAround>
  </DocPreview>
);
