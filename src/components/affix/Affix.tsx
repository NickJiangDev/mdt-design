import * as React from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import omit from 'lodash/omit';
import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom,
  throttleByAnimationFrameDecorator,
} from './utils';
import './style/affix.less';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

export interface AffixProps {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  children: React.ReactNode;
}

enum AffixStatus {
  None,
  Prepare,
}

export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;

  prevTarget: Window | HTMLElement | null;
}

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}
class Affix extends React.Component<AffixProps, AffixState> {
  static contextType = React.createContext<ConfigConsumerProps>({
    getPrefixCls: () => 'dmc-affix',
  });

  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null,
  };

  placeholderNode!: HTMLDivElement;

  fixedNode!: HTMLDivElement;

  private timeout?: NodeJS.Timeout;

  context!: ConfigConsumerProps;

  private getTargetFunc() {
    const { getTargetContainer } = this.context;
    const { target } = this.props;

    if (target !== undefined) {
      return target;
    }

    return getTargetContainer || getDefaultTarget;
  }

  // Event handler
  componentDidMount() {
    const targetFunc = this.getTargetFunc();
    if (targetFunc) {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      this.timeout = setTimeout(() => {
        addObserveTarget(targetFunc(), this);
        // Mock Event object.
        this.updatePosition();
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps) {
    const { prevTarget } = this.state;
    const targetFunc = this.getTargetFunc();
    const newTarget = targetFunc?.() || null;

    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        // Mock Event object.
        this.updatePosition();
      }

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ prevTarget: newTarget });
    }

    if (
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.updatePosition();
    }

    this.measure();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout as NodeJS.Timeout);
    removeObserveTarget(this);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.updatePosition?.cancel();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.lazyUpdatePosition?.cancel();
  }

  getOffsetTop = () => {
    const { offsetBottom, offsetTop } = this.props;
    return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
  };

  getOffsetBottom = () => this.props.offsetBottom;

  savePlaceholderNode = (node: HTMLDivElement) => {
    this.placeholderNode = node;
  };

  saveFixedNode = (node: HTMLDivElement) => {
    this.fixedNode = node;
  };

  // =================== Measure ===================
  measure = () => {
    const { status, lastAffix } = this.state;
    const { onChange } = this.props;
    const targetFunc = this.getTargetFunc();
    if (status !== AffixStatus.Prepare || !this.fixedNode || !this.placeholderNode || !targetFunc) {
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();

    const targetNode = targetFunc();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(this.placeholderNode);
    const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }

    this.setState(newState as AffixState);
  };

  prepareMeasure = () => {
    // event param is used before. Keep compatible ts define here.
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });
  };

  // Handle realign logic
  @throttleByAnimationFrameDecorator()
  updatePosition() {
    this.prepareMeasure();
  }

  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition() {
    const targetFunc = this.getTargetFunc();
    const { affixStyle } = this.state;

    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const offsetTop = this.getOffsetTop();
      const offsetBottom = this.getOffsetBottom();

      const targetNode = targetFunc();
      if (targetNode && this.placeholderNode) {
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(this.placeholderNode);
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    // Directly call prepare measure since it's already throttled.
    this.prepareMeasure();
  }

  // =================== Render ===================
  render() {
    const { getPrefixCls } = this.context;
    const { affixStyle, placeholderStyle } = this.state;
    const { prefixCls, children } = this.props;
    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: !!affixStyle,
    });

    let props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
    // Omit this since `onTestUpdatePosition` only works on test.
    if (process.env.NODE_ENV === 'test') {
      props = omit(props as typeof props);
    }

    return (
      <ResizeObserver
        onResize={() => {
          this.updatePosition();
        }}
      >
        <div {...props} ref={this.savePlaceholderNode}>
          {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
          <div className={className} ref={this.saveFixedNode} style={affixStyle}>
            <ResizeObserver
              onResize={() => {
                this.updatePosition();
              }}
            >
              {children}
            </ResizeObserver>
          </div>
        </div>
      </ResizeObserver>
    );
  }
}

export default Affix;

const AffixMemo = React.memo(Affix);
AffixMemo.displayName = 'AffixMemo';
export { AffixMemo };
