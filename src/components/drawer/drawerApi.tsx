import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ObjectInterface } from '../_utils/interfaces';
import Drawer, { DrawerProps } from './Drawer';
import DragDrawer, { DragDrawerProps } from './DragDrawer';

type OmitType = 'defaultOpen' | 'open' | 'level';
export type CloseType = (e: React.MouseEvent | React.KeyboardEvent) => void;

const drawerApi = {
  open: (
    children: (onClose: CloseType) => React.ReactNode,
    drawerConfig?: Omit<DrawerProps | DragDrawerProps, OmitType>,
    drag?: boolean,
  ) => {
    const overflow = document.body.style.overflow;
    const View = drag ? DragDrawer : Drawer;
    const Draw = (props: ObjectInterface) => {
      const [open, setOpen] = React.useState(false);
      React.useEffect(() => {
        setTimeout(() => {
          setOpen(true);
        });
      }, []);
      const onClose = (e: React.MouseEvent | React.KeyboardEvent) => {
        props.onClose && props.onClose(e);
        // hack drawer会将overflow清空;
        setTimeout(() => {
          document.body.style.overflow = overflow;
        }, (parseFloat(drawerConfig?.duration || '') * 1000 || 300) + 200);
        setOpen(false);
      };
      return (
        <View {...props} open={open} level={null} onClose={onClose}>
          {props.children(onClose)}
        </View>
      );
    };

    let dom = document.createElement('div');
    document.body.append(dom);
    const _afterVisibleChange = (visible: boolean) => {
      if (!visible) {
        ReactDOM.unmountComponentAtNode(dom);
        dom.remove();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dom = undefined;
      }
      drawerConfig?.afterVisibleChange?.(visible);
    };
    ReactDOM.render(
      <Draw
        {...(drawerConfig || {})}
        children={children}
        afterVisibleChange={_afterVisibleChange}
      />,
      dom,
    );
  },
};

export default drawerApi;
