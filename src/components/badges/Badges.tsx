import * as React from 'react';
import classNames from 'classnames';
import './style/badge.less';

export interface BadgesProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  /** 外层包裹样式 */
  style?: React.CSSProperties;
  /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 */
  count?: React.ReactNode;
  /** 展示封顶的数字值 */
  overflowCount?: number;
  /** 当数值为 0 时，是否展示 Badge */
  showZero?: boolean;
  /** 不展示数字，只有一个小红点 */
  dot?: boolean;
  /** 徽标数状态 */
  type?: 'processing' | 'warning' | 'success';
  /** 设置偏移量（[上|右]） */
  offsetFromTopRight?: [number | string, number | string];
  /** 徽标数样式 */
  badgeStyle?: React.CSSProperties;
  /** 设置鼠标放在状态点上时显示的文字 */
  title?: string;
}

const prefixCls = 'dmc-badge';

const Badges: React.FC<BadgesProps> = (props) => {
  const {
    className,
    style,
    count,
    overflowCount,
    showZero,
    dot,
    type,
    offsetFromTopRight,
    badgeStyle,
    children,
    ...restProps
  } = props;
  const displayCount =
    overflowCount === undefined
      ? count
      : (count as number) > overflowCount
      ? `${overflowCount}+`
      : count;

  const isZero = displayCount === 0;

  const isHidden =
    displayCount === null ||
    displayCount === undefined ||
    displayCount === '' ||
    (isZero && !showZero);

  const badgeCls = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
  });

  const styleWithOffset = offsetFromTopRight
    ? {
        right: -parseInt(offsetFromTopRight[0] as string, 10),
        marginTop: offsetFromTopRight[1],
        ...badgeStyle,
      }
    : badgeStyle;

  return (
    <div {...restProps} style={style} className={badgeCls}>
      {children}
      {!isHidden && ((isZero && showZero) || (!isZero && !dot)) && (
        <span style={styleWithOffset} className={`${prefixCls}-count`}>
          {displayCount}
        </span>
      )}
      {!isHidden && !isZero && dot && (
        <span style={styleWithOffset} className={`${prefixCls}-dot`}></span>
      )}
    </div>
  );
};

Badges.defaultProps = {
  showZero: false,
  dot: false,
  overflowCount: 99,
};

Badges.displayName = 'Badge';
export default Badges;

const BadgesMemo = React.memo(Badges);
BadgesMemo.displayName = 'BadgeMemo';
export { BadgesMemo };
