import * as React from 'react';
import classNames from 'classnames';
import { ObjectInterface } from '../_utils/interfaces';
import { IconButton } from '@/components/button';
import './field-item.less';
import textSvg from '@/components/icons/text/text.svg';
import numberSvg from '@/components/icons/num/num.svg';
import timeSvg from '@/components/icons/time/time.svg';
import { Input } from '@/components/input';

export interface FieldItemProps {
  /** 类型 */
  type: 'text' | 'number' | 'datetime';
  /** 显示文案 */
  name: string;
  /** 选中状态 */
  checked?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 提供外部容器额外扩充的属性 */
  provided?: ObjectInterface;
  /** dataValue添加属性 */
  dataValue?: string;
  /** 编辑状态 */
  editable?: boolean;
  /** 修改状态回调 */
  changeAlias?: (value: string) => void;
}
const prefixCls = 'dmc-field-item';
const FieldItem: React.FC<FieldItemProps> = React.memo((props: FieldItemProps) => {
  const {
    type,
    checked,
    name,
    onClose,
    provided,
    dataValue,
    editable,
    changeAlias,
    ...restProps
  } = props;
  const [isEdit, setIsEdit] = React.useState(false);
  const typeIcon = () => {
    let svgSource = '';
    if (type === 'text') {
      svgSource = textSvg;
    } else if (type === 'number') {
      svgSource = numberSvg;
    } else if (type === 'datetime') {
      svgSource = timeSvg;
    }
    if (svgSource) {
      return (
        <div
          style={{
            WebkitMaskImage: `url(${svgSource})`,
            WebkitMaskPosition: 'center center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
          }}
          className={`${prefixCls}-icon`}
        />
      );
    }
    return null;
  };
  const _onChange = (e: KeyboardEvent | React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(false);
    const value = (e as React.ChangeEvent<HTMLInputElement>).target.value;
    changeAlias && changeAlias(value);
  };
  return (
    <div
      {...restProps}
      className={classNames(prefixCls, {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-${type}`]: type,
      })}
      {...provided?.dragHandleProps}
    >
      {typeIcon()}
      {isEdit ? (
        <Input
          className={`${prefixCls}-name`}
          defaultValue={name}
          allowClear={false}
          autoFocus
          type="menu-bg"
          onBlur={_onChange}
          onPressEnter={_onChange}
        />
      ) : (
        <div className={`${prefixCls}-name`}>{name}</div>
      )}
      {editable && (
        <IconButton
          icon="edit"
          type="only-icon"
          onClick={() => {
            setIsEdit(true);
          }}
          data-value={dataValue}
        />
      )}
      {onClose && (
        <IconButton
          className={`${prefixCls}-close`}
          icon="close"
          type="only-icon"
          onClick={onClose}
          data-value={dataValue}
        />
      )}
    </div>
  );
});

FieldItem.defaultProps = {
  editable: false,
};
export default FieldItem;
