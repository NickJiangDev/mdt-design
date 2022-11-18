import * as React from 'react';
import classNames from 'classnames';
import useStaticCallback from '@/hooks/useStaticCallback';
import { LabelValueItemInterface } from '../_utils/interfaces';
import formateOptions from '../_utils/formateOptions';
import { RadioMemo as Radio } from './Radio';
import { RadioButtonMemo as RadioButton } from './RadioButton';
import { RadioNavMemo as RadioNav } from './RadioNav';

export interface RadioGroupProps {
  /** 类型 */
  type?: 'page-bg' | 'menu-bg' | 'assist-bg';
  /** 大小 */
  size?: 'compact';
  /** 选择回调 */
  onChange?: (value: string) => void;
  /** 配置项 */
  options: (LabelValueItemInterface | string)[];
  /** 默认当前值 */
  defaultValue?: string;
  /** 当前值 */
  value?: string;
  /** 整组失效 */
  disabled?: boolean;
  /** label 关键字替换 */
  labelKey?: string;
  /** value 关键字替换 */
  valueKey?: string;
  /** 类名 */
  className?: string;
  /** 单元类名 */
  itemClassName?: string;
  /** 自定义渲染单元 */
  renderItem?: (item: LabelValueItemInterface) => React.ReactNode;
  /** 单选框类型 */
  radioType?: 'button' | 'nav';
}

const prefixCls = 'dmc-radio-group';

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    type,
    size,
    options = [],
    valueKey = 'value',
    labelKey = 'label',
    onChange,
    defaultValue,
    value,
    disabled,
    className,
    itemClassName,
    renderItem,
    radioType,
    ...restProps
  } = props;

  const [unControlVal, setUnControlVal] = React.useState(defaultValue || '');
  const opts = React.useMemo(() => formateOptions(options, labelKey, valueKey), [
    options,
    labelKey,
    valueKey,
  ]);
  const isControl = 'value' in props;
  const val = isControl ? value : unControlVal;

  const onRadioChange = useStaticCallback((value: string) => {
    !isControl && setUnControlVal(value);
    onChange && onChange(value);
  });

  const isButton = radioType === 'button';
  const isNav = radioType === 'nav';
  const View = isButton ? RadioButton : isNav ? RadioNav : Radio;
  const wrapperCls = classNames(
    prefixCls,
    {
      'dmc-radio-button-group': isButton,
      'dmc-radio-nav-group': isNav,
    },
    className,
  );

  return (
    <div {...restProps} className={wrapperCls} ref={ref}>
      {opts.map((it) => {
        const vk = it[valueKey];
        const buttonProps = isButton
          ? { onlyIcon: it.onlyIcon, leftIcon: it.leftIcon, rightIcon: it.rightIcon }
          : {};
        return (
          <View
            key={vk}
            value={vk}
            type={type}
            size={size}
            checked={vk === val}
            onChange={onRadioChange}
            className={itemClassName}
            disabled={it.disabled || disabled}
            icon={it.icon}
            {...buttonProps}
          >
            {renderItem ? renderItem(it) : it[labelKey]}
          </View>
        );
      })}
    </div>
  );
});

RadioGroup.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
};

const RadioGroupMemo: React.FC<RadioGroupProps> = React.memo(RadioGroup);

RadioGroupMemo.displayName = 'RadioGroupMemo';
export { RadioGroupMemo };

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
