import * as React from 'react';

export interface IconProps {
  size?: string | number;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export interface IconRenderProps extends IconProps {
  children: (props: IconProps) => React.FunctionComponentElement<IconProps>;
}

const IconRender: React.FC<IconRenderProps> = (props) => {
  const { children, ...others } = props;
  return children(others);
};

IconRender.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default IconRender;
