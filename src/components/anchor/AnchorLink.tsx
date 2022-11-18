import * as React from 'react';
import classNames from 'classnames';
import { DmcAnchor, ConfigConsumerProps, ConfigContext } from './Anchor';
import AnchorContext from './context';
import { ObjectInterface } from '../_utils/interfaces';
import './style/anchor.less';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

class AnchorLink extends React.Component<AnchorLinkProps, ObjectInterface, DmcAnchor> {
  static defaultProps = {
    href: '#',
  };

  static contextType = AnchorContext;

  context!: DmcAnchor;

  componentDidMount() {
    this.context.registerLink(this.props.href);
  }

  componentDidUpdate({ href: prevHref }: AnchorLinkProps) {
    const { href } = this.props;
    if (prevHref !== href) {
      this.context.unregisterLink(prevHref);
      this.context.registerLink(href);
    }
  }

  componentWillUnmount() {
    this.context.unregisterLink(this.props.href);
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { scrollTo, onClick } = this.context;
    const { href, title } = this.props;
    onClick?.(e, { title, href });
    scrollTo(href);
  };

  renderAnchorLink = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, href, title, children, className, target } = this.props;
    const prefixCls = getPrefixCls('anchor', customizePrefixCls);
    const active = this.context.activeLink === href;
    const wrapperClassName = classNames(
      `${prefixCls}-link`,
      {
        [`${prefixCls}-link-active`]: active,
      },
      className,
    );
    const titleClassName = classNames(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active,
    });
    return (
      <div className={wrapperClassName}>
        <a
          className={titleClassName}
          href={href}
          title={typeof title === 'string' ? title : ''}
          target={target}
          onClick={this.handleClick}
        >
          {title}
        </a>
        {children}
      </div>
    );
  };

  render() {
    return <ConfigContext.Consumer>{this.renderAnchorLink}</ConfigContext.Consumer>;
  }
}

const AnchorLinkMemo = React.memo(AnchorLink);
AnchorLinkMemo.displayName = 'AffixMemo';
export { AnchorLink, AnchorLinkMemo };
