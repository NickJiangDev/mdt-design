import Toggle from '@/components/toggle';
import Icon from '@/components/icon';
import {
  DocPreview,
  FlexColumnVerCenter,
  FlexHorAround,
  SmallLabelButton,
} from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ToggleDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <FlexColumnVerCenter>
        <h4>&ensp;</h4>
        <SmallLabelButton>Default</SmallLabelButton>
        <SmallLabelButton>Disabled</SmallLabelButton>
        <SmallLabelButton>Compact</SmallLabelButton>
        <SmallLabelButton>Compact Disabled</SmallLabelButton>
        <SmallLabelButton>Customer icon</SmallLabelButton>
        <SmallLabelButton>No Icon</SmallLabelButton>
        <SmallLabelButton>String</SmallLabelButton>
        <SmallLabelButton>Text</SmallLabelButton>
        <SmallLabelButton>Icon Text</SmallLabelButton>
        <SmallLabelButton>Compact Text</SmallLabelButton>
        <SmallLabelButton>Text Disabled</SmallLabelButton>
        <SmallLabelButton>loading</SmallLabelButton>
      </FlexColumnVerCenter>
      <FlexColumnVerCenter>
        <h4>默认开关</h4>
        <Toggle />
        <Toggle disabled />
        <Toggle size="compact" />
        <Toggle size="compact" disabled />
        <Toggle
          checkedChildren={<Icon icon="save-outlined" size={12} />}
          unCheckedChildren={<Icon icon="code" size={12} />}
        />
        <Toggle checkedChildren={<div />} unCheckedChildren={<div />} />
        <Toggle checkedChildren={'开'} unCheckedChildren={'关'} />
        <Toggle showText checkedText={'开启'} unCheckedText={'关闭'} />
        <Toggle
          showText
          checkedText={<Icon icon="visibility-on" size={16} />}
          unCheckedText={<Icon icon="visibility-off" size={16} />}
        />
        <Toggle size="compact" showText checkedText={'开启'} unCheckedText={'关闭'} />
        <Toggle disabled showText checkedText={'开启'} unCheckedText={'关闭'} />
        <Toggle disabled showText checkedText={'开启'} unCheckedText={'关闭'} loading />
        <Toggle
          disabled
          showText
          checkedText={'开启'}
          unCheckedText={'关闭'}
          loading
          size={'compact'}
        />
      </FlexColumnVerCenter>
      <FlexColumnVerCenter>
        <h4>选中开关</h4>
        <Toggle defaultChecked />
        <Toggle disabled checked />
        <Toggle size="compact" defaultChecked />
        <Toggle size="compact" defaultChecked disabled />
        <Toggle
          defaultChecked
          checkedChildren={<Icon icon="save-outlined" size={12} />}
          unCheckedChildren={<Icon icon="code" size={12} />}
        />
        <Toggle defaultChecked checkedChildren={<div />} unCheckedChildren={<div />} />
        <Toggle defaultChecked checkedChildren={'开'} unCheckedChildren={'关'} />
        <Toggle defaultChecked showText checkedText={'开启'} unCheckedText={'关闭'} />
        <Toggle
          defaultChecked
          showText
          checkedText={<Icon icon="visibility-on" size={16} />}
          unCheckedText={<Icon icon="visibility-off" size={16} />}
        />
        <Toggle
          defaultChecked
          size="compact"
          showText
          checkedText={'开启'}
          unCheckedText={'关闭'}
        />
        <Toggle disabled defaultChecked showText checkedText={'开启'} unCheckedText={'关闭'} />
        <Toggle
          disabled
          defaultChecked
          showText
          checkedText={'开启'}
          unCheckedText={'关闭'}
          loading
        />
        <Toggle
          disabled
          defaultChecked
          showText
          checkedText={'开启'}
          unCheckedText={'关闭'}
          loading
          size={'compact'}
        />
      </FlexColumnVerCenter>
    </FlexHorAround>
  </DocPreview>
);
export default ToggleDemo;
