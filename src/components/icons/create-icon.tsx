import * as React from 'react';
import IconRender, { IconProps } from './icon-render';
import { ThemeEnum } from '@/components/style/context';
import { getTheme } from '../style';

type ReactSvgElement = React.ElementType<React.SVGProps<SVGSVGElement>>;

// /**
//  *
//  * @param Icons
//  */
const createIcon = (Icons: ReactSvgElement | ReactSvgElement[]) => {
  return (props: IconProps) => {
    const theme = getTheme();
    if (Array.isArray(Icons)) {
      let Icon: ReactSvgElement;
      switch (theme) {
        case ThemeEnum.dark:
          Icon = Icons[0];
          break;
        case ThemeEnum.light:
          Icon = Icons[1];
          break;
        default:
          Icon = Icons[0];
          break;
      }
      return (
        <IconRender
          {...props}
          children={({ color, size, ...others }) => {
            return <Icon color={color} width={size} height={size} {...others} />;
          }}
        />
      );
    }
    const Icon = Icons;
    return (
      <IconRender
        {...props}
        children={({ color, size, ...others }) => {
          return <Icon color={color} width={size} height={size} {...others} />;
        }}
      />
    );
  };
};

export default createIcon;
