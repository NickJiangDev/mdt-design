import * as React from 'react';
import loadable from '@loadable/component';
import classNames from 'classnames';
import ErrorBoundary from '@/components/error-boundary';
import Tooltip from '@/components/tooltip';
import Error from '@/components/icons/alert';
import './style/icon.less';

interface SvgIconProps {
  icon: string;
  size: string;
  style?: React.CSSProperties;
}
const SvgIcon = loadable((props: SvgIconProps) => import(`../icons/${props.icon}`), {
  cacheKey: (props: SvgIconProps) => props.icon,
});

export interface IconProps {
  icon: string;
  className?: string;
  size?: string | number;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

const prefixCls = 'dmc-icon';
export const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref) => {
  const { className, size, icon, style = {}, ...restProps } = props;
  const errorRef = React.useRef<ErrorBoundary>(null);
  const errorNode = React.useCallback((error: string) => {
    return (
      <Tooltip overlay={error}>
        <Error
          className={`${prefixCls}-load-error`}
          onClick={() => {
            errorRef.current && errorRef.current.reload();
          }}
        />
      </Tooltip>
    );
  }, []);
  return (
    <div
      {...restProps}
      ref={ref}
      className={classNames(prefixCls, className)}
      style={{ width: size, height: size, ...style }}
    >
      <ErrorBoundary errorNode={errorNode} ref={errorRef}>
        <SvgIcon icon={icon} size={'100%'} />
      </ErrorBoundary>
    </div>
  );
});

Icon.displayName = 'Icon';

export default React.memo(Icon);
