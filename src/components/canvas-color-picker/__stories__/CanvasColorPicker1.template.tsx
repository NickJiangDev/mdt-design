import * as React from 'react';
import { Story } from '@storybook/react';
import CanvasColorPicker, { CanvasColorPickerProps } from '@/components/canvas-color-picker';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@/components/button';
import { useDarkMode } from 'storybook-dark-mode';
// import { CanvasColorPickerPosition } from '@/components/canvas-color-picker/CanvasColorPicker';
// import Image from './testImage.png';

const CanvasColorPickerDemo: Story<CanvasColorPickerProps> = (args) => {
  const [visible, setVisible] = useState(false);
  const labelColor = useDarkMode() ? '#fff' : '#000';
  // const imageRef = useRef<HTMLImageElement | null>(null);
  const [color, setColor] = useState<number[]>([]);
  const toMeasureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (toMeasureCanvasRef.current) {
      const ctx = toMeasureCanvasRef.current.getContext('2d');
      if (ctx) {
        const grd = ctx.createLinearGradient(0, 0, 300, 0);
        grd.addColorStop(0, 'red');
        grd.addColorStop(1, 'white');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 300, 150);
      }
    }
  }, [toMeasureCanvasRef]);

  // const handleImageLoad = () => {
  //   if (toMeasureCanvasRef.current && imageRef.current) {
  //     const ctx = toMeasureCanvasRef.current.getContext('2d');
  //     if (ctx) {
  //       ctx.drawImage(imageRef.current, 0, 0, 900, 450, 0, 0, 300, 150);
  //     }
  //   }
  // };

  const handlePickColor = (colors: number[]) => {
    setColor(colors);
  };

  const handleVisibleChange = React.useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  return (
    <div>
      {/*<img src={Image} style={{ display: 'none' }} onLoad={handleImageLoad} ref={imageRef} alt="" />*/}
      <canvas ref={toMeasureCanvasRef} />
      <h4 style={{ color: labelColor }}>基本用法</h4>
      <span style={{ color: labelColor }}>默认固定于页面右上角</span>
      <div>
        <CanvasColorPicker
          {...args}
          visible={visible}
          toMeasureCanvas={toMeasureCanvasRef.current}
          handlePickColor={handlePickColor}
          handleVisibleChange={handleVisibleChange}
          // fixedPosition={CanvasColorPickerPosition.topRight} // 固定位置
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton icon="color-picker" type="only-icon" onClick={() => setVisible(!visible)} />
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: `rgba(${color.join(',')})`,
              border: `1px solid ${labelColor}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasColorPickerDemo;
