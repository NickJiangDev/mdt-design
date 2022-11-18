import * as React from 'react';
import Icon from '@/components/icon';
import {
  every,
  filter,
  flatten,
  get,
  isEmpty,
  isUndefined,
  map,
  max as getMax,
  min as getMin,
  pick,
  some,
} from 'lodash';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import { FieldType } from '../../enum';
import { DATE_NUM_KEYS } from '../../constants';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { prefixCls } from './Standard';
import { DateFilter, NumberFilter, TextFilter } from '@/components/create-filter';
import { formatLabelValue } from '../tiled/TiledFieldItem';

const filterViewMap: ObjectInterface = {
  number: NumberFilter,
  datetime: DateFilter,
  text: TextFilter,
};

/**
 * field,筛选字段，uuid， type， db, name,
 * filter,筛选条件，db，hType, objectType, list, min,max, start, end
 * onChange,每次点ok，就都抛出去
 * options(text: ['yyy', 'xxx'], number: [1,2], datetime: [2012-09-28, 2019-03-23])
 */
const StandardFieldItem: React.FC<ObjectInterface> = React.memo(
  ({
    field,
    fieldFilter,
    mode = 'multi',
    changeItem,
    onVisibleChange: onVisChange,
    options,
    textLabels,
  }) => {
    const { type, isCombined } = field;
    const originOptionsRef = React.useRef();
    //字段loading，这个针对于交叉筛选
    const [valLoading, setValLoading] = React.useState(false);
    const isNum = type === FieldType.number;
    const isDatetime = type === FieldType.datetime;
    const isText = type === FieldType.text;

    React.useEffect(() => {
      //日期不可以交叉联动
      if (isDatetime) {
        setValLoading(false);
        return;
      }
      if (isEqual(options, originOptionsRef.current)) {
        setValLoading(!options);
      } else {
        originOptionsRef.current = options;
        setValLoading(false);
      }
    }, [isDatetime, options, valLoading]);

    const keys = DATE_NUM_KEYS[type];
    const [fk, sk] = keys || [];
    const formatOptions = formatLabelValue(options, textLabels?.emptyValText);

    const cls = classNames(`${prefixCls}-item`, {
      [`${prefixCls}-item-selected`]: isText
        ? !isEmpty(get(fieldFilter, 'list'))
        : fieldFilter && some(keys, (k) => fieldFilter[k] !== undefined && fieldFilter[k] !== null),
    });

    const onClick = React.useCallback(() => {
      setValLoading(true);
      onVisChange(field);
    }, [field, onVisChange]);

    const onOk = React.useCallback(
      (val) => {
        let value = {};
        if (isText) {
          value = { list: val?.value ?? val };
        } else {
          //number和datetime 单选
          value = isCombined
            ? {
                [fk]: get(val, '[0][0]'),
                [sk]: get(val, '[0][1]'),
              }
            : val;
        }

        changeItem &&
          changeItem({ ...pick(field.detail, ['db', 'hType', 'hValue']), ...value }, field);
      },
      [isText, changeItem, field, isCombined, fk, sk],
    );

    //被聚合
    const numIsCombine = isNum && isCombined;
    const dateIsCombine = isDatetime && isCombined;

    const displayTypeList = numIsCombine || dateIsCombine || isText;
    const viewType = displayTypeList ? 'text' : type;
    const Filter = filterViewMap[viewType];

    const commonProps = React.useMemo(() => {
      return {
        onOk,
        //暂定为数值，时间字段聚合后单选和选择模式为单选这两种情况
        radio: mode === 'single' || numIsCombine || dateIsCombine,
        clickAway: true,
        emptyValText: textLabels?.emptyVal,
        allSelectLabel: textLabels?.allCheck,
        loading: valLoading,
      };
    }, [
      dateIsCombine,
      mode,
      numIsCombine,
      onOk,
      textLabels?.allCheck,
      textLabels?.emptyVal,
      valLoading,
    ]);

    const displayTypeListProps = React.useMemo(() => {
      const list = fieldFilter?.list ?? [];

      return displayTypeList
        ? {
            list: formatOptions,
            ...commonProps,
            values: !!formatOptions
              ? map(
                  filter(formatOptions, (it: ObjectInterface | string) => {
                    const flattenList = isText
                      ? flatten(list)
                      : [get(fieldFilter, `${fk}`), get(fieldFilter, `${sk}`)];

                    return isText
                      ? //这种情况是['a', 'b', 'c']
                        typeof it === 'string' || isNull(it)
                        ? flattenList.includes(it)
                        : Array.isArray(it.value)
                        ? //[{label: 'aa', value: ['a', 'b']}]
                          every(it.value, (i) => flattenList.includes(i))
                        : //[{label: 'aa', value: 'a'}]
                          flattenList.includes(it.value)
                      : isEqual((it as ObjectInterface).value ?? it, flattenList);
                  }),
                  (it) => (!isUndefined(it.value) ? it.value : it),
                )
              : [],
          }
        : {};
    }, [commonProps, displayTypeList, fieldFilter, fk, formatOptions, isText, sk]);

    const numberOrDateProps = React.useMemo(() => {
      const min = fieldFilter?.min;
      const max = fieldFilter?.max;

      const statisticMin = getMin(options);
      const statisticMax = getMax(options);
      return {
        ...commonProps,
        labelMax: textLabels?.labelMax,
        labelMin: textLabels?.labelMin,
        statisticMin,
        statisticMax,
        value: pick(fieldFilter, keys),
        max,
        min,
      };
    }, [commonProps, fieldFilter, keys, options, textLabels?.labelMax, textLabels?.labelMin]);

    const filterProps = React.useMemo(() => {
      //filter 中的value有三种情况，就是text: list, number: {min, max},datetime: {fastType, start, end等}
      return displayTypeList ? displayTypeListProps : numberOrDateProps;
    }, [displayTypeList, displayTypeListProps, numberOrDateProps]);

    return (
      <React.Fragment>
        <Filter {...filterProps}>
          <div className={cls} onClick={onClick}>
            <div className={`${prefixCls}-item-text`}>{field.name}</div>
            <Icon icon="chevron-down" size={12} />
          </div>
        </Filter>
        <div className={`${prefixCls}-item-split-line`} />
      </React.Fragment>
    );
  },
);

export default StandardFieldItem;
