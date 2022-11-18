import * as React from 'react';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import { PickerMode } from 'rc-picker/lib/interface';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { ObjectInterface } from '../../_utils/interfaces';

import {
  getPlaceholder,
  getTimeFormatPlaceholder,
  PickerRefConfig,
  prefixCls,
  TimeFormat,
  timeFormatValue,
} from '../util';
import {
  PickerComponents,
  getTimeProps,
  PickerDateProps,
  PickerLocale,
  PickerProps,
  PickerTimeProps,
} from './';
import Icon from '../../icon/Icon';
import RadioGroup from '../../radio/RadioGroup';
import '../style/index.less';
import { BaseContext, LocaleEnum } from '../../style/context';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import en from '../languages/en-US';
import zh from '../languages/zh-CN';

const localeMap = {
  [LocaleEnum.en]: en,
  [LocaleEnum.zh]: zh,
};

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType>;
  type StateType = {
    panelMode?: PickerMode;
    timeFormat?: TimeFormat;
    value?: DateType;
    dateString?: string;
    timeFormatted?: boolean;
    selected?: boolean;
  };

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    class Picker extends React.Component<InnerPickerProps, StateType> {
      constructor(props: InnerPickerProps) {
        super(props);
        this.state = {
          panelMode: picker,
          timeFormat: props.initialTimeFormat ?? TimeFormat.no,
          selected: false,
          timeFormatted: false,
        };
      }
      static getDerivedStateFromProps(nextProps: InnerPickerProps, prevState: StateType) {
        if (nextProps.timeFormat && nextProps.timeFormat !== prevState.timeFormat) {
          return {
            timeFormat: nextProps.timeFormat,
          };
        }
        return prevState;
      }

      static displayName: string;
      static contextType = BaseContext;

      pickerRef = React.createRef<PickerRefConfig>();

      focus = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.focus();
        }
      };

      blur = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.blur();
        }
      };

      handleRadioChange = (val: string) => {
        this.setState({ timeFormat: val as TimeFormat, timeFormatted: true });
        this.props.onFormatChange?.(val as TimeFormat);
      };

      _renderExtraFooter = (mode: PickerMode) => {
        if (mode === 'date') {
          const local = this.getDefaultLocale();
          const { timeFormat } = this.state;
          const options = [TimeFormat.no, TimeFormat.hm, TimeFormat.hms].map((t) => ({
            value: t,
            label: getTimeFormatPlaceholder(t, local),
          }));
          return (
            <RadioGroup
              value={timeFormat}
              options={options}
              className={`${prefixCls}-footer-radio-group`}
              onChange={this.handleRadioChange}
            />
          );
        }
        const { renderExtraFooter } = this.props;
        if (renderExtraFooter) {
          return renderExtraFooter(mode);
        }
      };

      getDefaultLocale = () => {
        const { locale = {} } = this.props;
        const language = (this.context.locale || LocaleEnum.zh) as LocaleEnum;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const local = localeMap[language];
        dayjs.locale(language);
        const result = {
          ...local,
          ...locale,
        };
        result.lang = {
          ...result.lang,
          ...((locale || {}) as PickerLocale).lang,
        };
        return result;
      };

      renderPicker = (locale: PickerLocale) => {
        const { timeFormat } = this.state;
        const {
          className,
          bordered = true,
          placeholder,
          dropdownClassName,
          type,
          size,
          onChange,
          onSelect,
          format,
          ...restProps
        } = this.props;
        let { showTime } = this.props as ObjectInterface;
        let newFormat = format;
        if (!showTime) {
          if (timeFormat === TimeFormat.no) {
            showTime = false;
          } else if (timeFormat === TimeFormat.h) {
            showTime = true;
            newFormat = 'HH';
          } else if (timeFormat === TimeFormat.hm) {
            showTime = true;
            newFormat = 'HH:mm';
          } else if (timeFormat === TimeFormat.hms) {
            showTime = true;
            newFormat = 'HH:mm:ss';
          }
        }
        const additionalProps = {
          showToday: true,
        };

        let additionalOverrideProps: ObjectInterface = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
        }
        const mergedPicker = picker || this.props.picker;

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime
            ? getTimeProps({ format: newFormat as string, picker: mergedPicker, ...showTime })
            : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format: newFormat as string, ...this.props, picker: mergedPicker })
            : {}),
        };

        const _onChange = (value: DateType, dateString: string) => {
          onChange && onChange(value, dateString, timeFormat);
          this.setState({ value, dateString });
        };

        const _onSelect = (value: DateType) => {
          onSelect && onSelect(value, timeFormat);
          if (value !== this.state.value && timeFormat !== TimeFormat.no) {
            this.setState({ selected: true });
          }
        };

        const _pickerOnchange = () => {
          const { value, timeFormatted, selected } = this.state;
          const { value: propsValue, format } = this.props;
          if (timeFormatted && !selected) {
            _onChange(
              (value || propsValue) as DateType,
              dayjs((value as unknown) as Date).format(
                (format as string) || timeFormatValue(timeFormat),
              ),
            );
          }
          this.setState({ timeFormatted: false, selected: false });
        };
        return (
          <RCPicker<DateType>
            ref={this.pickerRef}
            placeholder={getPlaceholder(mergedPicker, locale, placeholder)}
            suffixIcon={
              mergedPicker === 'time' ? (
                <Icon className={`${prefixCls}-suffix-icon`} icon="time-clock" />
              ) : (
                <Icon className={`${prefixCls}-suffix-icon`} icon="time" />
              )
            }
            clearIcon={<Icon className={`${prefixCls}-clear-icon`} icon="close" />}
            allowClear
            {...additionalProps}
            {...restProps}
            {...additionalOverrideProps}
            locale={locale.lang}
            className={classNames(
              {
                [`${prefixCls}-${type}`]: type,
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-borderless`]: !bordered,
              },
              className,
            )}
            dropdownClassName={classNames(dropdownClassName, {
              [`${prefixCls}-show-time`]: showTime,
            })}
            prefixCls={prefixCls}
            onChange={_onChange}
            onSelect={_onSelect}
            format={format || timeFormatValue(timeFormat)}
            generateConfig={generateConfig}
            prevIcon={<Icon className={`${prefixCls}-prev-icon`} icon="chevron-left-2" />}
            nextIcon={<Icon className={`${prefixCls}-next-icon`} icon="chevron-right-2" />}
            superPrevIcon={<Icon className={`${prefixCls}-super-prev-icon`} icon="fold-left" />}
            superNextIcon={<Icon className={`${prefixCls}-super-next-icon`} icon="fold-right" />}
            components={PickerComponents({ onClick: _pickerOnchange })}
            renderExtraFooter={this._renderExtraFooter}
          />
        );
      };

      render() {
        const local = this.getDefaultLocale();
        return this.renderPicker(local);
      }
    }

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker as React.ComponentClass<InnerPickerProps>;
  }

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week', 'WeekPicker');
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month', 'MonthPicker');
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year', 'YearPicker');
  const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('time', 'TimePicker');

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker };
}
