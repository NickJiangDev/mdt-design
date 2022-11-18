import * as React from 'react';
import classNames from 'classnames';
import memoizeOne from 'memoize-one';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Affix from '../affix';
import { scrollTo, getScroll } from './utils';
import AnchorContext from './context';
import { ObjectInterface } from '../_utils/interfaces';
import './style/anchor.less';

export type AnchorContainer = HTMLElement | Window;

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: () => 'dmc-anchor',
});

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}

const sharpMatcherRegx = /#([\S ]+)$/;

type Section = {
  link: string;
  top: number;
};

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 锚点区域边界 */
  bounds?: number;
  /** 固定模式 */
  affix?: boolean;
  /** affix={false} 时是否显示小圆点 */
  showInkInFixed?: boolean;
  /** 指定滚动的容器 */
  getContainer?: () => AnchorContainer;
  /** 自定义高亮的锚点 */
  getCurrentAnchor?: () => string;
  /** click 事件的 handler */
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  /** 锚点滚动偏移量，默认与 offsetTop 相同 */
  targetOffset?: number;
  /** 监听锚点链接改变 */
  onChange?: (currentActiveLink: string) => void;
}

export interface AnchorState {
  activeLink: null | string;
}

export interface AnchorDefaultProps extends AnchorProps {
  prefixCls: string;
  affix: boolean;
  showInkInFixed: boolean;
  getContainer: () => AnchorContainer;
}

export interface DmcAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
}

class Anchor extends React.Component<AnchorProps, AnchorState, ConfigConsumerProps> {
  static defaultProps = {
    affix: true,
    showInkInFixed: false,
  };

  static contextType = ConfigContext;

  state = {
    activeLink: null,
  };

  content!: ConfigConsumerProps;

  private wrapperRef = React.createRef<HTMLDivElement>();

  private inkNode!: HTMLSpanElement;

  // scroll scope's container
  private scrollContainer!: HTMLElement | Window;

  private links: string[] = [];

  private scrollEvent!: ObjectInterface;

  private animating!: boolean;

  private prefixCls?: string;

  // Context
  registerLink = (link: string) => {
    if (!this.links.includes(link)) {
      this.links.push(link);
    }
  };

  unregisterLink = (link: string) => {
    const index = this.links.indexOf(link);
    if (index !== -1) {
      this.links.splice(index, 1);
    }
  };

  getContainer = () => {
    const { getTargetContainer } = this.context;
    const { getContainer } = this.props;

    const getFunc = getContainer || getTargetContainer || getDefaultContainer;

    return getFunc();
  };

  componentDidMount() {
    this.scrollContainer = this.getContainer();
    this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentDidUpdate() {
    if (this.scrollEvent) {
      const currentContainer = this.getContainer();
      if (this.scrollContainer !== currentContainer) {
        this.scrollContainer = currentContainer;
        this.scrollEvent.remove();
        this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
        this.handleScroll();
      }
    }
    this.updateInk();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  getCurrentAnchor(offsetTop = 0, bounds = 5): string {
    const linkSections: Array<Section> = [];
    const container = this.getContainer();
    this.links.forEach((link) => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  }

  handleScrollTo = (link: string) => {
    const { offsetTop, targetOffset } = this.props;

    this.setCurrentActiveLink(link);
    const container = this.getContainer();
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }

    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    this.animating = true;

    scrollTo(y, {
      callback: () => {
        this.animating = false;
      },
      getContainer: this.getContainer,
    });
  };

  saveInkNode = (node: HTMLSpanElement) => {
    this.inkNode = node;
  };

  setCurrentActiveLink = (link: string) => {
    const { activeLink } = this.state;
    const { onChange, getCurrentAnchor } = this.props;
    if (activeLink === link) {
      return;
    }
    this.setState({
      activeLink: typeof getCurrentAnchor === 'function' ? getCurrentAnchor() : link,
    });
    onChange?.(link);
  };

  handleScroll = () => {
    if (this.animating) {
      return;
    }
    const { offsetTop, bounds, targetOffset } = this.props;
    const currentActiveLink = this.getCurrentAnchor(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    this.setCurrentActiveLink(currentActiveLink);
  };

  updateInk = () => {
    const { prefixCls, wrapperRef } = this;
    const anchorNode = wrapperRef.current;
    const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

    if (linkNode) {
      this.inkNode.style.top = `${
        (linkNode as ObjectInterface).offsetTop + linkNode.clientHeight / 2 - 8
      }px`;
    }
  };

  getMemoizedContextValue = memoizeOne(
    (link: DmcAnchor['activeLink'], onClickFn: AnchorProps['onClick']): DmcAnchor => ({
      registerLink: this.registerLink,
      unregisterLink: this.unregisterLink,
      scrollTo: this.handleScrollTo,
      activeLink: link,
      onClick: onClickFn,
    }),
  );

  render() {
    const { getPrefixCls, direction } = this.context;
    const {
      prefixCls: customizePrefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
      onClick,
    } = this.props;
    const { activeLink } = this.state;

    const prefixCls = getPrefixCls('anchor', customizePrefixCls);

    this.prefixCls = prefixCls;

    const inkClass = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink,
    });

    const wrapperClass = classNames(
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    const anchorClass = classNames(prefixCls, {
      [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
    });

    const wrapperStyle = {
      maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
      ...style,
    };

    const anchorContent = (
      <div ref={this.wrapperRef} className={wrapperClass} style={wrapperStyle}>
        <div className={anchorClass}>
          <div className={`${prefixCls}-ink`}>
            <span className={inkClass} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    const contextValue = this.getMemoizedContextValue(activeLink, onClick);

    return (
      <AnchorContext.Provider value={contextValue}>
        {!affix ? (
          anchorContent
        ) : (
          <Affix offsetTop={offsetTop} target={this.getContainer}>
            {anchorContent}
          </Affix>
        )}
      </AnchorContext.Provider>
    );
  }
}

export default Anchor;

const AnchorMemo = React.memo(Anchor);
// AnchorMemo.displayName = 'AffixMemo';
export { AnchorMemo };
