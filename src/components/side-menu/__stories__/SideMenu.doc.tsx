import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import SideMenu from '../SideMenu';

const SideMenuDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <SideMenu
        treeProps={{
          treeData: [
            {
              title: '导航1',
              key: '0-0',
            },
            {
              title: '导航2',
              key: '0-0-0',
              children: [
                {
                  title: '导航2-1',
                  key: '0-0-0-0',
                  disableCheckbox: true,
                },
                {
                  title: '导航2-2',
                  key: '0-0-0-1',
                },
              ],
            },
            {
              title: '导航3',
              key: '0-0-1',
              children: [
                {
                  title: <span style={{ color: '#1890ff' }}>我是自定义颜色</span>,
                  key: '0-0-1-0',
                },
              ],
            },
          ],
        }}
      />
    </DocPreview>
  );
};

export default SideMenuDemo;
