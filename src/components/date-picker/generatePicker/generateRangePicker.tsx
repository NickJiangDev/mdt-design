import * as React from 'react';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import { PickerMode } from 'rc-picker/lib/interface';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { ObjectInterface } from '../../_utils/interfaces';
import { BaseContext, LocaleEnum } from '../../style/context';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import en from '../languages/en-US';
import zh from '../languages/zh-CN';

import {
  getRangePlaceholder,
  PickerRefConfig,
  TimeFormat,
  getTimeFormatPlaceholder,
  timeFormatValue,
} from '../util';
import Icon from '../../icon/Icon';
import RadioGroup from '../../radio/RadioGroup';
import { RangePickerProps, PickerLocale, getTimeProps, PickerComponents } from './';

const localeMap = {
  [LocaleEnum.en]: en,
  [LocaleEnum.zh]: zh,
};

const prefixCls = 'dmc-date-picker';

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): React.ComponentClass<RangePickerProps<DateType>> {
  type StateType = {
    timeFormat?: TimeFormat;
    value?: DateType;
    dateString?: string;
    timeFormatted?: boolean;
    selected?: boolean;
  };
  class RangePicker extends React.Component<RangePickerProps<DateType>, StateType> {
    constructor(props: RangePickerProps<DateType>) {
      super(props);
      this.state = {
        timeFormat: props.initialTimeFormat ?? TimeFormat.hms,
        selected: false,
        timeFormatted: false,
      };
    }

    static getDerivedStateFromProps(nextProps: RangePickerProps<DateType>, prevState: StateType) {
      if (nextProps.timeFormat && nextProps.timeFormat !== prevState.timeFormat) {
        return {
          timeFormat: nextProps.timeFormat as TimeFormat,
        };
      }
      return prevState;
    }
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

    handleRadioChange = (val: string) => {
      this.setState({ timeFormat: val as TimeFormat });
      this.props.onFormatChange?.(val as TimeFormat);
    };

    _renderExtraFooter = (mode: PickerMode) => {
      if (mode === 'date') {
        const local = this.getDefaultLocale();
        const options = [TimeFormat.hm, TimeFormat.hms].map((t) => ({
          value: t,
          label: getTimeFormatPlaceholder(t, local),
        }));
        return (
          <RadioGroup
            value={this.state.timeFormat}
            options={options}
            className={`${prefixCls}-footer-range-radio-group`}
            onChange={this.handleRadioChange}
          />
        );
      }
      const { renderExtraFooter } = this.props;
      if (renderExtraFooter) {
        return renderExtraFooter(mode);
      }
    };

    renderPicker = (locale: PickerLocale) => {
      const {
        className,
        bordered = true,
        placeholder,
        picker,
        type,
        size,
        onChange,
        onSelect,
        format,
        ...restProps
      } = this.props as ObjectInterface;
      let { showTime } = this.props as ObjectInterface;
      let newFormat = format;
      const { timeFormat } = this.state;
      if (showTime) {
        if (timeFormat === TimeFormat.h) {
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
      let additionalOverrideProps: ObjectInterface = {};

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format: newFormat, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format: newFormat, ...this.props, picker }) : {}),
        ...(showTime ? { renderExtraFooter: this._renderExtraFooter } : {}),
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
        <RCRangePicker<DateType>
          separator={
            <span aria-label="to" className={`${prefixCls}-separator`}>
              <Icon className={`${prefixCls}-separator-icon`} icon="remove" />
            </span>
          }
          ref={this.pickerRef}
          placeholder={getRangePlaceholder(picker, locale, placeholder)}
          suffixIcon={
            picker === 'time' ? (
              <Icon className={`${prefixCls}-suffix-icon`} icon="time-clock" />
            ) : (
              <Icon className={`${prefixCls}-suffix-icon`} icon="time" />
            )
          }
          clearIcon={<Icon className={`${prefixCls}-clear-icon`} icon="close" />}
          allowClear
          {...restProps}
          className={classNames(className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-borderless`]: !bordered,
          })}
          {...additionalOverrideProps}
          locale={locale.lang}
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
        />
      );
    };

    render() {
      const local = this.getDefaultLocale();
      return this.renderPicker(local);
    }
  }

  return RangePicker;
}
