import * as React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import Icon from '../icon';
import { ObjectInterface } from '../_utils/interfaces';
import './style/spin.less';

export interface SpinProps {
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: 'small' | 'large';
  tip?: string;
  delay?: number;
  wrapperClassName?: string;
}

export interface SpinState {
  spinning?: boolean;
}

const prefixCls = 'dmc-spin';
const shouldDelay = (spinning?: boolean, delay?: number): boolean => {
  return !!spinning && !!delay && !isNaN(Number(delay));
};

class Spin extends React.Component<SpinProps, SpinState> {
  static defaultProps = {
    spinning: true,
  };
  originalUpdateSpinning: () => void;

  constructor(props: SpinProps) {
    super(props);
    const { spinning, delay } = props;
    const shouldBeDelayed = shouldDelay(spinning, delay);
    this.state = {
      spinning: spinning && !shouldBeDelayed,
    };
    this.originalUpdateSpinning = this.updateSpinning;
    this.debouncifyUpdateSpinning(props);
  }

  componentDidMount() {
    this.updateSpinning();
  }

  componentDidUpdate() {
    this.debouncifyUpdateSpinning();
    this.updateSpinning();
  }

  componentWillUnmount() {
    this.cancelExistingSpin();
  }

  debouncifyUpdateSpinning = (props?: SpinProps) => {
    const { delay } = props || this.props;
    if (delay) {
      this.cancelExistingSpin();
      this.updateSpinning = debounce(this.originalUpdateSpinning, delay);
    }
  };

  updateSpinning = () => {
    const { spinning } = this.props;
    const { spinning: currentSpinning } = this.state;
    if (currentSpinning !== spinning) {
      this.setState({ spinning });
    }
  };

  cancelExistingSpin = () => {
    const us = this.updateSpinning as ObjectInterface;
    us && us.cancel && us.cancel();
  };

  isNestedPattern = () => {
    return !!(this.props && this.props.children);
  };

  render() {
    const { className, size, tip, wrapperClassName, style, ...restProps } = this.props;
    const { spinning } = this.state;

    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
      },
      className,
    );
    const divProps = omit(restProps, ['spinning', 'delay']);
    const spinElement = (
      <div {...divProps} style={style} className={spinClassName}>
        <Icon icon={'loading'} className={`${prefixCls}-loading`} />
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );
    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...divProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  }
}

export default Spin;
