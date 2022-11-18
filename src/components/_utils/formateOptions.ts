import { LabelValueItemInterface } from './interfaces';

const formateOptions = (
  options: (LabelValueItemInterface | string)[],
  labelKey: string,
  valueKey: string,
) => {
  return options.map((option) => {
    if (typeof option === 'string') {
      return { [labelKey]: option, [valueKey]: option };
    }
    return option;
  });
};

export default formateOptions;
