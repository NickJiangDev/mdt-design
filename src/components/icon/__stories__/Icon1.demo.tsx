import * as React from 'react';
import ColorPicker from '@/components/color-picker/ColorPicker';
import Icon from '@/components/icon';
import { InputNumber } from '@/components/input';

const IconDemo = () => {
  const [color, setColor] = React.useState('#000');
  const [size, setSize] = React.useState(100 as string | number);
  return (
    <React.Fragment>
      <Icon icon="add" size={size} style={{ color }} />
      <p>改变颜色</p>
      <ColorPicker color={color} onChange={setColor} />
      <p>改变大小</p>
      <InputNumber defaultValue={size} onChange={setSize} max={200} min={1} />
    </React.Fragment>
  );
};
export default IconDemo;
