import * as React from 'react';
import Menu, { MenuItem, SubMenu, MenuDivider } from '@/components/menu';
import { BaseContext, ThemeEnum } from '@/components/style/context';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => {
  const { theme } = React.useContext(BaseContext);
  return (
    <DocPreview {...props}>
      <h1>Menu</h1>
      <div style={{ width: 200 }}>
        <Menu>
          <MenuItem key={1} title="第一步" danger>
            第一步(danger状态)
          </MenuItem>
          <MenuItem key={2} onClick={() => console.log(1)}>
            第二步
          </MenuItem>
          <MenuItem key={3} onClick={() => console.log(1)} title="第三步">
            第三步
          </MenuItem>
          <MenuDivider key={4}></MenuDivider>
          <MenuItem key={5} onClick={() => console.log(1)} title="第四步">
            第四步
          </MenuItem>
          <SubMenu title="sub-menu">
            <MenuItem key={6} onClick={() => console.log(1)} title="第四步">
              第五步
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      {theme === ThemeEnum.dark && (
        <React.Fragment>
          <h1>assist bg</h1>
          <div style={{ width: 200, padding: 20, background: '#343b4d' }}>
            <Menu type={'assist-bg'}>
              <MenuItem key={1} title="第一步">
                第一步
              </MenuItem>
              <MenuItem key={2} onClick={() => console.log(1)}>
                第二步
              </MenuItem>
              <MenuItem key={3} onClick={() => console.log(1)} title="第三步">
                第三步
              </MenuItem>
              <MenuDivider key={4}></MenuDivider>
              <MenuItem key={5} onClick={() => console.log(1)} title="第四步">
                第四步
              </MenuItem>
              <SubMenu title="sub-menu" type={'assist-bg'}>
                <MenuItem key={6} onClick={() => console.log(1)} title="第四步">
                  第五步
                </MenuItem>
              </SubMenu>
            </Menu>
          </div>
        </React.Fragment>
      )}
    </DocPreview>
  );
};
