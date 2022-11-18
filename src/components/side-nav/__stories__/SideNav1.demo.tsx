import SideNav, { SideNavItem } from '@/components/side-nav';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const SideNavDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <SideNav>
        <SideNavItem label={'大屏工作台'} icon={'project-screen-on'} actived />
        <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} />
        <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} />
        <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} type={'mark'} />
        <SideNavItem label={'大屏工作台'} icon={'project-screen-on'} type={'mark'} actived />
      </SideNav>
    </DocPreview>
  );
};
export default SideNavDemo;
