import * as React from 'react';
import ColorGradient from '@/components/color-gradient';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';

const ColorGradient1Demo = (props: PriviewProps) => {
  const [stops, setStops] = React.useState([
    { offset: 0, color: '#9adafa' },
    { offset: 0.5, color: '#000' },
    { offset: 1, color: '#028080' },
  ]);
  const onChange = React.useCallback((stops) => {
    setStops(stops);
  }, []);
  return (
    <DocPreview {...props}>
      <ColorGradient color="#ddd" stops={stops} onChange={onChange} />
    </DocPreview>
  );
};
export default ColorGradient1Demo;
