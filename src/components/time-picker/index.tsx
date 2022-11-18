import * as React from 'react';
import { Dayjs } from 'dayjs';
import DatePicker from '../date-picker';
import { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export type TimeRangePickerProps = RangePickerTimeProps<Dayjs>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => {
  return <InternalRangePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {
  addon?: () => React.ReactNode;
  popupClassName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, popupClassName, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }
      if (addon) {
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...restProps}
        dropdownClassName={popupClassName}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

TimePicker.displayName = 'TimePicker';

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
