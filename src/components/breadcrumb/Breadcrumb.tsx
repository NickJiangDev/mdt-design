import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { ObjectInterface } from '../_utils/interfaces';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import './style/breadcrumb.less';

export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}

export interface BreadcrumbProps {
  /** 显示第一个面包屑的向前箭头 */
  withPrev?: boolean;
  /** router 的路由栈信息 */
  routes?: Route[];
  /** 路由的参数 */
  params?: ObjectInterface;
  /** 分隔符自定义 */
  separator?: React.ReactNode;
  /** 第一个面包屑的样式 */
  prefix?: React.ReactNode;
  /** 第一个面包屑的文案 */
  prefixText?: string;
  /** 自定义链接函数，和 react-router 配置使用 */
  itemRender?: (
    route: Route,
    params: ObjectInterface,
    routes: Route[],
    paths: string[],
  ) => React.ReactNode;
  /** 类名 */
  className?: string;
  /** 第一个面包屑的配置项 */
  prevOptions?: {
    goPrev?: () => void;
    goPrevHref?: string;
  };
}

const prefixCls = 'dmc-breadcrumb';

const getBreadcrumbName = (route: Route, params: ObjectInterface) => {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
};

const defaultItemRender = (
  route: Route,
  params: ObjectInterface,
  routes: Route[],
  paths: string[],
): React.ReactNode => {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
};

const filterFragment = (children: React.ReactNode) => {
  return React.Children.toArray(children).map((element: React.ReactNode) => {
    if (React.isValidElement(element) && element.type === React.Fragment) {
      const props = element.props;
      return props.children;
    }
    return element;
  });
};

const getPath = (path: string, params: ObjectInterface) => {
  path = (path || '').replace(/^\//, '');
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};

const genForRoutes = (
  routes: Route[] = [],
  params = {},
  itemRender = defaultItemRender,
  separator: React.ReactNode,
) => {
  const paths: string[] = [];
  return routes.map((route, index) => {
    const path = getPath(route.path, params);
    if (path) {
      paths.push(path);
    }

    const lastSeparator = index === routes.length - 1;
    return (
      <BreadcrumbItem
        lastSeparator={lastSeparator}
        separator={separator}
        key={path || route.breadcrumbName}
      >
        {itemRender(route, params, routes, paths)}
      </BreadcrumbItem>
    );
  });
};

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const {
    separator,
    className,
    params,
    routes,
    children,
    withPrev,
    prevOptions,
    itemRender,
    prefix,
    prefixText,
    ...restProps
  } = props;

  const goPrevHref = prevOptions?.goPrevHref;
  const goPrev = prevOptions?.goPrev;
  const HtmlTag = goPrevHref ? 'a' : 'span';
  const showPrevSeparator = !children && (!routes || (routes && routes.length === 0));
  const prevNode = prefix || (
    <span className={`${prefixCls}-item ${prefixCls}-item-prev`}>
      <HtmlTag className={`${prefixCls}-item-link`} href={goPrevHref} onClick={goPrev}>
        <Icon icon="left-back" />
        {prefixText}
      </HtmlTag>
      {!showPrevSeparator && <BreadcrumbSeparator>|</BreadcrumbSeparator>}
    </span>
  );

  let crumbs;
  if (routes && routes.length > 0) {
    crumbs = genForRoutes(routes, params, itemRender, separator);
  } else if (children) {
    crumbs = React.Children.map(filterFragment(children), (element: React.ReactElement, index) => {
      if (!element) {
        return element;
      }
      return React.cloneElement(element, { separator, key: index });
    });
  }

  return (
    <div {...restProps} className={classNames(prefixCls, className)}>
      {withPrev && prevNode}
      {crumbs}
    </div>
  );
};

Breadcrumb.defaultProps = {
  separator: '/',
  withPrev: true,
};
Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;

const BreadcrumbMemo = React.memo(Breadcrumb);
BreadcrumbMemo.displayName = 'BreadcrumbMemo';
export { BreadcrumbMemo };
