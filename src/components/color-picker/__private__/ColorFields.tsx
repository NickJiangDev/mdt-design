import * as React from 'react';
import { isValidHex } from 'react-color/lib/helpers/color';
import { EditableInput } from 'react-color/lib/components/common';
import { ColorFieldsProps } from './interface';
import { prefixClsCustom } from './constant';
import { ObjectInterface } from '../../_utils/interfaces';

export const ColorFields: React.FC<ColorFieldsProps> = ({ onChange, rgb, hsl, hex }) => {
  const handleChange = (data: ObjectInterface, e: React.ChangeEvent) => {
    if (data.hex) {
      if (isValidHex(data.hex)) {
        onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        );
      }
    } else if (data.r || data.g || data.b) {
      onChange(
        {
          r: data.r || rgb.r,
          g: data.g || rgb.g,
          b: data.b || rgb.b,
          a: rgb.a,
          source: 'rgb',
        },
        e,
      );
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }

      data.a /= 100;
      onChange(
        {
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: data.a,
          source: 'rgb',
        },
        e,
      );
    }
  };
  return (
    <div className={`${prefixClsCustom}-fileld`}>
      <div className={`${prefixClsCustom}-fileld-double`}>
        <EditableInput label="hex" onChange={handleChange} value={hex.replace('#', '')} />
      </div>
      <div className={`${prefixClsCustom}-fileld-single`}>
        <EditableInput
          label="r"
          value={rgb.r}
          dragLabel="true"
          dragMax="255"
          onChange={handleChange}
        />
      </div>
      <div className={`${prefixClsCustom}-fileld-single`}>
        <EditableInput
          label="g"
          value={rgb.g}
          dragLabel="true"
          dragMax="255"
          onChange={handleChange}
        />
      </div>
      <div className={`${prefixClsCustom}-fileld-single`}>
        <EditableInput
          label="b"
          value={rgb.b}
          dragLabel="true"
          dragMax="255"
          onChange={handleChange}
        />
      </div>
      <div className={`${prefixClsCustom}-fileld-alpha`}>
        <EditableInput
          label="a"
          dragLabel="true"
          dragMax="100"
          onChange={handleChange}
          value={Math.round((rgb.a || 0) * 100)}
        />
      </div>
    </div>
  );
};

ColorFields.displayName = 'ColorFields';
export default ColorFields;

const ColorFieldsMemo = React.memo(ColorFields);
ColorFieldsMemo.displayName = 'ColorFieldsMemo';
export { ColorFieldsMemo };
