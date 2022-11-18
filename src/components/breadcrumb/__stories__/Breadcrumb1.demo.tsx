import Breadcrumb, { BreadcrumbItem, BreadcrumbSeparator } from '../index';
import Icon from '@/components/icon';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
// import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';

const routes = [
  {
    path: 'index',
    breadcrumbName: '全部',
  },
  {
    path: 'first',
    breadcrumbName: '第一级',
  },
  {
    path: 'second',
    breadcrumbName: '文件名称',
  },
];

// const Apps = () => (
//   <ul className="app-list">
//     <li>
//       <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
//     </li>
//     <li>
//       <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
//     </li>
//   </ul>
// );

// const breadcrumbNameMap: PriviewProps = {
//   '/apps': 'Application List',
//   '/apps/1': 'Application1',
//   '/apps/2': 'Application2',
//   '/apps/1/detail': 'Detail',
//   '/apps/2/detail': 'Detail',
// };
// const Home = withRouter((props: PriviewProps) => {
//   const { location } = props;
//   const pathSnippets = location.pathname.split('/').filter((i: string) => i);
//   const extraBreadcrumbItems = pathSnippets.map((_: PriviewProps, index: number) => {
//     const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
//     return (
//       <BreadcrumbItem key={url}>
//         <Link to={url}>{breadcrumbNameMap[url]}</Link>
//       </BreadcrumbItem>
//     );
//   });
//   const breadcrumbItems = [
//     <BreadcrumbItem key="home">
//       <Link to="/">Home</Link>
//     </BreadcrumbItem>,
//   ].concat(extraBreadcrumbItems);
//   return (
//     <div className="demo">
//       <div className="demo-nav">
//         <Link to="/">Home</Link>
//         <Link to="/apps">Application List</Link>
//       </div>
//       <Switch>
//         <Route path="/apps" component={Apps} />
//         <Route render={() => <span>Home Page</span>} />
//       </Switch>
//       <Breadcrumb withPrev={false} prefixText="上一页">
//         {breadcrumbItems}
//       </Breadcrumb>
//     </div>
//   );
// });

const BreadcrumbDemo = (props: PriviewProps) => {
  const prevOptions = {
    goPrev: () => {
      console.log('上一页');
    },
  };
  return (
    <DocPreview {...props}>
      <h2>上一页</h2>
      <Breadcrumb prefixText="上一页" />
      <h2>基本用法</h2>
      <Breadcrumb prevOptions={prevOptions} prefixText="上一页">
        <BreadcrumbItem onClick={() => console.log('全部')}>全部</BreadcrumbItem>
        <BreadcrumbItem onClick={() => console.log('第一级')}>第一级</BreadcrumbItem>
        <BreadcrumbItem lastSeparator>文件名称</BreadcrumbItem>
      </Breadcrumb>

      <h2>图标</h2>
      <Breadcrumb prefixText="上一页">
        <BreadcrumbItem href="">
          <Icon icon="isochrone" size={16} />
        </BreadcrumbItem>
        <BreadcrumbItem href="">
          <Icon icon="app-grid" size={16} />
          <span>Application List</span>
        </BreadcrumbItem>
        <BreadcrumbItem lastSeparator>Application</BreadcrumbItem>
      </Breadcrumb>

      <h2>routes</h2>
      <Breadcrumb routes={routes} prefixText="上一页" />

      <h2>自定义分隔符</h2>
      <Breadcrumb separator="">
        <BreadcrumbItem>Location</BreadcrumbItem>
        <BreadcrumbSeparator>:</BreadcrumbSeparator>
        <BreadcrumbItem href="">Application Center</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem href="">Application List</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
      {/* <h2>与路由结合使用</h2>
      <Router>
        <Home />
      </Router> */}
    </DocPreview>
  );
};
export default BreadcrumbDemo;
