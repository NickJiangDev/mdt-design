import classNames from 'classnames';
import PerfectScrollbar from 'perfect-scrollbar';
import './style/scrollbar.less';

export declare type PerfectScrollbarClass = PerfectScrollbar;
export declare type ScrollBarOptions = PerfectScrollbar.Options;
export declare type ScrollbarType = 'assist-bg' | 'menu-bg' | 'page-bg' | undefined;

const prefixCls = 'dmc-scrollbar';
const defaultOpts = { suppressScrollX: true, minScrollbarLength: 20 };

const createScrollbar = (
  dom?: Element,
  type?: ScrollbarType,
  options: ScrollBarOptions = defaultOpts,
  className?: string,
): [PerfectScrollbarClass, () => void] => {
  const classes = classNames(prefixCls, { [`${prefixCls}-${type}`]: type }, className).split(' ');
  dom?.classList.add(...classes);
  let ps: PerfectScrollbar | undefined = new PerfectScrollbar(dom as Element, options);
  return [
    ps,
    () => {
      ps?.destroy();
      ps = undefined;
      dom?.classList.remove(...classes);
      dom = undefined;
    },
  ];
};

export default createScrollbar;
