import * as React from 'react';
import classNames from 'classnames';
import useStaticCallback from '@/hooks/useStaticCallback';
import { LabelValueItemInterface } from '../_utils/interfaces';
import formateOptions from '../_utils/formateOptions';
import { CheckboxMemo as Checkbox } from './Checkbox';

export interface CheckboxGroupProps {
  /** 多选框的类型 */
  type?: 'page-bg' | 'menu-bg' | 'assist-bg';
  /** 多选框的大小 */
  size?: 'compact';
  /** 变化时回调函数 */
  onChange?: (checkedList: string[]) => void;
  /** 指定可选项 */
  options: (LabelValueItemInterface | string)[];
  /** 默认选中的选项 */
  defaultValue?: string[];
  /**	指定选中的选项 */
  value?: string[];
  /** 整组失效 */
  disabled?: boolean;
  /** 列表label字段的关键值 */
  labelKey?: string;
  /** 列表value字段的关键值 */
  valueKey?: string;
  /** 类名 */
  className?: string;
  /** 列表单元的类名 */
  itemClassName?: string;
  /** 自定义渲染列表单元 */
  renderItem?: (item: LabelValueItemInterface) => React.ReactNode;
}

const prefixCls = 'dmc-checkbox-group';

const defaultProps = {
  options: [],
  valueKey: 'value',
  labelKey: 'label',
};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  const {
    type,
    size,
    options,
    valueKey,
    labelKey,
    onChange,
    defaultValue,
    value,
    disabled,
    className,
    itemClassName,
    renderItem,
    ...restProps
  } = props as CheckboxGroupProps & typeof defaultProps;
  const [unControlVal, setUnControlVal] = React.useState(defaultValue || []);
  const opts = React.useMemo(() => formateOptions(options, labelKey, valueKey), [
    options,
    labelKey,
    valueKey,
  ]);
  const isControl = 'value' in props;
  const val = isControl ? value ?? [] : unControlVal;

  const onCheckboxChange = useStaticCallback((_checked, value) => {
    const curr = [...val];
    const index = curr.indexOf(value);
    index === -1 ? curr.push(value) : curr.splice(index, 1);
    !isControl && setUnControlVal(curr);
    onChange && onChange(curr);
  });

  return (
    <div {...restProps} className={classNames(prefixCls, className)} ref={ref}>
      {opts.map((it) => {
        const vk = it[valueKey];
        return (
          <Checkbox
            key={vk}
            value={vk}
            type={type}
            size={size}
            disabled={it.disabled || disabled}
            checked={val.includes(vk)}
            onChange={onCheckboxChange}
            className={itemClassName}
            title={it[labelKey]}
          >
            {renderItem && renderItem(it)}
          </Checkbox>
        );
      })}
    </div>
  );
});

CheckboxGroup.defaultProps = defaultProps;

CheckboxGroup.displayName = 'CheckboxGroup';
export default CheckboxGroup;

const CheckboxGroupMemo = React.memo(CheckboxGroup);
CheckboxGroupMemo.displayName = 'CheckboxGroupMemo';
export { CheckboxGroupMemo };
