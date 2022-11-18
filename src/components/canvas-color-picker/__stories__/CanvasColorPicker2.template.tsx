import { Story } from '@storybook/react';
import CanvasColorPicker, { CanvasColorPickerProps } from '@/components/canvas-color-picker';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@/components/button';
import { useDarkMode } from 'storybook-dark-mode';
// import Image from './testImage.png';

const CanvasColorPickerDemo: Story<CanvasColorPickerProps> = (args) => {
  const labelColor = useDarkMode() ? '#fff' : '#000';
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState<number[]>([]);
  const toMeasureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const toPickColorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (toMeasureCanvasRef.current) {
      const ctx = toMeasureCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.font = '30px serif';
        ctx.fillStyle = labelColor;
        ctx.fillText('从此 canvas 获取定位', 10, 90);
      }
    }
    if (toPickColorCanvasRef.current) {
      const ctx = toPickColorCanvasRef.current.getContext('2d');
      if (ctx) {
        const grd = ctx.createLinearGradient(0, 0, 300, 0);
        grd.addColorStop(0, 'purple');
        grd.addColorStop(1, 'white');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 300, 150);
        ctx.font = '30px serif';
        ctx.fillStyle = 'white';
        ctx.fillText('实际取色 canvas', 10, 90);
      }
    }
  }, [labelColor, toMeasureCanvasRef]);

  const handlePickColor = (colors: number[]) => {
    setColor(colors);
  };

  const handleVisibleChange = (v: boolean) => {
    setVisible(v);
  };

  return (
    <div>
      <canvas ref={toMeasureCanvasRef} style={{ border: `1px solid ${labelColor}` }} />
      <canvas ref={toPickColorCanvasRef} />
      <h4 style={{ color: labelColor }}>实际取色 canvas 与获取坐标 canvas 非相同 canvas</h4>
      <div>
        <CanvasColorPicker
          {...args}
          visible={visible}
          magnifierScaleRatio={10}
          toMeasureCanvas={toMeasureCanvasRef.current} // 获取定位 canvas
          toGetColorCanvas={toPickColorCanvasRef.current} // 实际取色 canvas
          useShadowElementToPickColor // 使用额外元素监听光标事件，防止触发原 canvas 光标事件
          handlePickColor={handlePickColor}
          handleVisibleChange={handleVisibleChange}
          magnifierFollowMouse
          displayColorInfo
          // shadowElementContainer={document.querySelector('.sbdocs-content') as HTMLElement}
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
