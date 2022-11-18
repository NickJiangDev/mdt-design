import * as React from 'react';
import ColorPicker from '@/components/color-picker';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ColorPicker1Demo = (props: PriviewProps) => {
  const [color, setColor] = React.useState('#fff');
  const [favors, setFavors] = React.useState<string[]>([]);
  const [stops, setStops] = React.useState([]);
  const [rotate, setRotate] = React.useState('10');
  const [size, setSize] = React.useState<string>('contain');
  const [type, setType] = React.useState('pure');
  const onStopsChange = React.useCallback((vals) => {
    setStops(vals);
  }, []);
  const onChange = React.useCallback((c) => {
    console.log('-c-', c);
    setColor(c);
  }, []);

  return (
    <DocPreview {...props}>
      <ColorPicker
        type={type}
        color={color}
        stops={stops}
        favors={favors}
        onChange={onChange}
        showTypeSelect
        rotate={rotate}
        imgSize={size}
        onActiveTypeChange={setType}
        onRotateChange={setRotate}
        onStopsChange={onStopsChange}
        onSizeChange={setSize}
        onChangeColors={setFavors}
      />
      <ColorPicker
        disabled
        type={type}
        color={color}
        stops={stops}
        favors={favors}
        onChange={onChange}
        showTypeSelect
        rotate={rotate}
        imgSize={size}
        onActiveTypeChange={setType}
        onRotateChange={setRotate}
        onStopsChange={onStopsChange}
        onSizeChange={setSize}
        onChangeColors={setFavors}
      />
    </DocPreview>
  );
};
export default ColorPicker1Demo;
