import * as React from 'react';
import {
  flatten,
  map,
  filter,
  every,
  get,
  isEmpty,
  isString,
  isEqual,
  isArray,
  size,
  pick,
  isUndefined,
} from 'lodash';
import Icon from '@/components/icon';
import DatePicker from '@/components/date-picker';
import { InputNumber } from '@/components/input';
import { useMeasure, useToggle } from 'react-use';
import Checkbox from '@/components/checkbox';
import Radio from '@/components/radio';
import Spin from '@/components/spin';
import dayjs from 'dayjs';
import isNull from 'lodash/isNull';
import { FieldItemProps, FilterItemTemplateProp, TextLabelsProps } from '../interface';
import { FieldType } from '../../enum';
import { DATE_NUM_KEYS } from '../../constants';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { prefixCls } from './Tiled';

export const FIELD_ROW_HEIGHT = 28;
const DEAFAULT_DISPLAY_NUM = 25;

interface TiledFieldItemProps {
  changeItem: (filterItem: FilterItemTemplateProp, field: FieldItemProps) => void;
  field: FieldItemProps;
  //options
  //未聚合(text: ['yyy', 'xxx'], number: [1,2], datetime: [2012-09-28, 2019-03-23])
  //聚合(text: [{ "label": "邓钱武","value": ["邓姝 (14)","钱涛 (9)","武杰 (3)"}, {"label": "杨欢 (14)","value": "杨欢 (14)"}], number: [{"label": "0-0.4","value": [0,0.4], max: 0.8, min: 0},{"label": "0.4-0.8","value": [0.4,0.8]}])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  fieldFilter?: FilterItemTemplateProp;
  textLabels?: TextLabelsProps;
  renderRestLabel?: (count: number) => string;
}

//如果是字符串，那就格式化{label: string, value: string}
//如果是null， 就按空值处理
//如果是object， 就直接返回
export const formatLabelValue = (arr: (string | null | React.ReactText)[], emptyVal?: string) =>
  map(arr, (it) =>
    typeof it === 'object'
      ? isNull(it)
        ? { label: emptyVal, value: it }
        : it
      : { label: it, value: it },
  );

const TiledFieldItem: React.FC<TiledFieldItemProps> = React.memo(
  ({ field, fieldFilter, changeItem, options, textLabels, renderRestLabel }) => {
    const { type, hiddenCustom, mode, isCombined } = field;
    const isNum = type === FieldType.number;
    const isDatetime = type === FieldType.datetime;
    const isText = type === FieldType.text;

    const [valLoading, setValLoading] = React.useState(false);
    const [isExpand, setIsExpand] = useToggle(false);
    const [filterWrapperRef, { height: filterHeight }] = useMeasure();
    const originOptionsRef = React.useRef();

    const filterItemTemplate = pick(field.detail, ['db', 'hType', 'hValue']);

    React.useEffect(() => {
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
    }, [isDatetime, options]);

    //被聚合
    const numIsCombine = isNum && isCombined;
    const dateIsCombine = isDatetime && isCombined;
    //暂定为数值，时间字段聚合后单选和选择模式为单选这两种情况
    const single = numIsCombine || dateIsCombine || mode === 'single';
    const checkboxOrRadio = single || isText;
    const multi = !single;
    const keys = DATE_NUM_KEYS[type];
    const [fk, sk] = keys || [];

    // //处理交叉筛选导致options为空的问题
    // const mixedOptions =
    //   options.length > 0
    //     ? options
    //     : isText
    //     ? fieldFilter?.list ?? []
    //     : map(keys, (k) => get(fieldFilter, [k]));

    const mixedOptions = React.useMemo(() => options ?? [], [options]);

    const [formatOptions, restVals]: [ObjectInterface[], string[]] = React.useMemo(() => {
      // 暂时前25个显示，其他的不显示
      const top25Opts = mixedOptions.slice(0, DEAFAULT_DISPLAY_NUM);
      const restVals = mixedOptions.slice(DEAFAULT_DISPLAY_NUM);

      const len = mixedOptions.length;

      const formatOptions =
        len > DEAFAULT_DISPLAY_NUM
          ? [
              ...formatLabelValue(top25Opts, textLabels?.emptyValText),
              {
                label: renderRestLabel && renderRestLabel(len - DEAFAULT_DISPLAY_NUM),
                value: 'rest',
              },
            ]
          : formatLabelValue(mixedOptions, textLabels?.emptyValText);
      return [formatOptions, restVals];
    }, [mixedOptions, renderRestLabel, textLabels?.emptyValText]);

    //todo 暂时num和datetime分成单选，因为合并之后的选项可能交叉
    const allCheck = React.useCallback(
      (checked) => {
        const obj: FilterItemTemplateProp = { ...filterItemTemplate };

        if (checked) {
          const vals = map(mixedOptions, (it) =>
            typeof it === 'string' || it === null ? it : it.value,
          );
          isText && (obj.list = flatten(vals));
        }
        // changeItem(obj, field);
        changeItem(obj, field);
      },
      [changeItem, filterItemTemplate, field, mixedOptions, isText],
    );

    //value string: 选择普通选项， string[]选择聚合选项，ObjectInterface：输入数字或者日期
    const change = React.useCallback(
      (value: string | ObjectInterface | string[], checked?: boolean) => {
        // let vals: unknown;
        // const item = filterItemRef.current;
        let valObj = {};
        if (multi) {
          const isRest = value === 'rest';
          const filterItemList = fieldFilter?.list ?? [];
          const v = isRest ? restVals : value;
          //判断是否数组，是因为聚合，value就可能是一个string[]
          const list = checked
            ? [...filterItemList, ...(isArray(v) ? v : [v])]
            : filter(filterItemList, (it) => (isArray(v) ? !v.includes(it) : it !== v));

          valObj = { list };
        } else {
          valObj = isText
            ? {
                list: isArray(value) ? value : value ? [value] : [],
              }
            : isEmpty(value)
            ? filterItemTemplate
            : { [fk]: get(value, '[0]'), [sk]: get(value, '[1]') };
        }
        changeItem({ ...filterItemTemplate, ...valObj }, field);
      },
      [multi, changeItem, filterItemTemplate, field, fieldFilter, restVals, isText, fk, sk],
    );

    const changeDateAndNum = React.useCallback(
      (key: string, value?: string | number) => {
        const obj = { ...(fieldFilter ?? filterItemTemplate), [key]: value ?? undefined };
        changeItem(obj, field);
      },
      [changeItem, field, filterItemTemplate, fieldFilter],
    );

    const style: React.CSSProperties = React.useMemo(
      () => ({
        flexWrap: 'wrap',
        height: isExpand ? 'auto' : FIELD_ROW_HEIGHT,
        overflow: isExpand ? 'auto' : 'hidden',
      }),
      [isExpand],
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateNumRange: { [key: string]: any } = {
      datetime: DatePicker,
      number: InputNumber,
    };
    const DateNumRangeComp = dateNumRange[type];

    const dateNumRangeProp = React.useMemo(() => {
      const arr: ObjectInterface[] = [];
      if (type === FieldType.text) return arr;
      const keys: string[] = DATE_NUM_KEYS[type];
      const obj = { size: 'compact' };
      for (let index = 0; index < 2; index++) {
        const k = keys[index];
        const value = get(fieldFilter, `${k}`);
        //未聚合的number格式， [1, 14]
        //聚合果的number格式[{"label": "0-0.4","value": [0,0.4],"max": 0.8,"min": 0}]，所以再获取一次
        const originPv = get(mixedOptions, `${index}`);
        const pv = ['string', 'number'].includes(typeof originPv)
          ? originPv
          : get(originPv, `${k}`);

        isDatetime
          ? arr.push({
              ...obj,
              onChange: (_val: ObjectInterface, dateString: string) =>
                changeDateAndNum(k, dateString),
              value: value ? dayjs(value) : null,
            })
          : arr.push({
              ...obj,
              visibilityHandler: true,
              placeholder: `${isNull(pv) || isUndefined(pv) ? '-' : pv}`,
              onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                const fv = parseFloat(e.target.value);
                const v = Number.isNaN(fv) ? undefined : fv;
                changeDateAndNum(k, v);
              },
              value,
            });
      }
      return arr;
    }, [changeDateAndNum, fieldFilter, isDatetime, mixedOptions, type]);

    const moreBtnStyle = React.useMemo(
      () => ({
        [`${isExpand ? 'top' : 'bottom'}`]: 4,
      }),
      [isExpand],
    );

    const AllCheck = React.useMemo(() => {
      const list = fieldFilter?.list ?? [];
      const checked = every(formatOptions, (it) =>
        isArray(it.value)
          ? every(it.value as string[], (i) => list.includes(i))
          : list.includes(it.value as string),
      );

      return (
        multi &&
        !!size(mixedOptions) && (
          <div className={`${prefixCls}-row-vals-it`}>
            <Checkbox checked={checked} onChange={allCheck} title={textLabels?.allSelectLabel} />
          </div>
        )
      );
    }, [
      allCheck,
      fieldFilter?.list,
      formatOptions,
      mixedOptions,
      multi,
      textLabels?.allSelectLabel,
    ]);

    const customInputs = React.useMemo(() => {
      return (
        (isDatetime || isNum) &&
        !hiddenCustom && (
          <div className={`${prefixCls}-row-vals-it`}>
            {map(dateNumRangeProp, (it, index) => {
              return (
                <React.Fragment key={`customInputs${index}`}>
                  <DateNumRangeComp {...it} />
                  {!index && <span className={`${prefixCls}-row-vals-it-separate`}>-</span>}
                </React.Fragment>
              );
            })}
          </div>
        )
      );
    }, [DateNumRangeComp, dateNumRangeProp, hiddenCustom, isDatetime, isNum]);

    const fieldMoreNode = React.useMemo(() => {
      return (
        filterHeight > FIELD_ROW_HEIGHT && (
          <div
            className={`${prefixCls}-row-vals-it ${prefixCls}-row-vals-it-expand-no`}
            onClick={setIsExpand}
          >
            <div style={moreBtnStyle}>
              <Icon icon={isExpand ? 'remove' : 'add'} />
              {isExpand ? textLabels?.more : textLabels?.expand}
            </div>
          </div>
        )
      );
    }, [filterHeight, isExpand, moreBtnStyle, setIsExpand, textLabels?.expand, textLabels?.more]);

    return (
      <div className={`${prefixCls}-row`} key={field.name}>
        <div className={`${prefixCls}-row-label`}>{field.name}</div>
        <div className={`${prefixCls}-row-vals ${prefixCls}-row-vals-loading`} style={style}>
          {valLoading ? (
            <Spin size="small" />
          ) : (
            <React.Fragment>
              <div
                className={`${prefixCls}-row-vals-wrapper`}
                ref={filterWrapperRef as React.LegacyRef<HTMLDivElement>}
              >
                {formatOptions.length === 0 && isText
                  ? '-'
                  : checkboxOrRadio && (
                      <>
                        {AllCheck}
                        {formatOptions.map((it, index) => {
                          const isRest = it.value === 'rest';
                          const list = fieldFilter?.list ?? [];
                          //聚合过的就用every,没有聚合过的就用includes
                          const multiChecked =
                            isArray(it.value) || isRest
                              ? every((isRest ? restVals : it.value) as string[], (i) =>
                                  list.includes(i),
                                )
                              : list.includes(it.value as string);

                          //字符串 单选
                          //   list ["中海金沙湾A区"]
                          //  it{label: "万科四季花城伴山美筑", value: "万科四季花城伴山美筑"}
                          // it.value万科四季花城伴山美筑
                          //字符串 聚合 单选
                          //   list (2) ["碧绿名苑", "顺德碧桂园蓝天花语五街"]
                          //  it {label: "1111", value: ["碧绿名苑", "顺德碧桂园蓝天花语五街"]} it.value ["四季康城", "五峰路"]
                          // datetime number 类型聚合
                          //  dateOrNumVals： {min: 0, max: 2000}
                          // it {label: "0-2000", value: {min: 0, max: 2000}} it.value{max: 2000, min: 0}

                          const radioChecked = isString(it.value)
                            ? list.includes(it.value)
                            : isEqual(
                                isText
                                  ? list
                                  : [get(fieldFilter, `${fk}`), get(fieldFilter, `${sk}`)],
                                it.value,
                              );
                          const multiIndex = Number(multi);
                          const props: ObjectInterface = {
                            value: it.label,
                            onChange: multi
                              ? (checked: boolean) => change(it.value, checked)
                              : () => change(radioChecked ? (isText ? '' : {}) : it.value),
                            title: it.label,
                            checked: get([radioChecked, multiChecked], `${multiIndex}`),
                          };
                          const View = get([Radio, Checkbox], `${multiIndex}`);

                          return (
                            <div className={`${prefixCls}-row-vals-it`} key={index}>
                              <View {...props}>{!multi && it.label}</View>
                            </div>
                          );
                        })}
                      </>
                    )}
                {customInputs}
              </div>
              {fieldMoreNode}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  },
);

export default TiledFieldItem;
