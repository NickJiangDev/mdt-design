import * as React from 'react';
import classNames from 'classnames';
import useClickAway from 'react-use/lib/useClickAway';
import { ButtonProps, ButtonMemo } from '../button';
import DraggableWrap from '../draggable-wrap';
import { Rnd, RndResizeStartCallback, RndResizeCallback } from 'react-rnd';
import Tooltip, { TooltipPlacement } from '../tooltip';
import Icon from '../icon/Icon';
import './style/create-filter.less';

const prefixCls = 'dmc-create-filter';
const { useState, useCallback, useMemo, useRef, Fragment, useEffect } = React;

export type FilterButtonProps = Omit<ButtonProps, 'children'>;
export interface CreateFilterProps {
  /** 类名 */
  className?: string;
  /** 显示底部布局 */
  showFooter?: boolean;
  /** 底部布局的类名 */
  footerClassName?: string;
  /** 底部布局的前置元素 */
  footerPrefixEl?: () => React.ReactNode;
  /** 加载样式 */
  loading?: boolean;
  /** 预留的可操作区域 */
  extra?: React.ReactNode;
  children: React.ReactNode;
  /** 确定按钮的回调 */
  onOk?: () => void;
  /** 取消按钮的回调 */
  onClose?: () => void;
  /** 确定按钮的文案 */
  okButtonLabel?: React.ReactNode;
  /** 确定按钮的属性 */
  okButtonProps?: FilterButtonProps;
  /** 取消按钮的文案 */
  cancelButtonLabel?: React.ReactNode;
  /** 取消按钮的属性 */
  cancelButtonProps?: FilterButtonProps;
  /** 显示的内容 */
  overlay?: (() => React.ReactNode) | React.ReactNode;
  /** 任意点击关闭 */
  clickAway?: boolean;
  /** 内容的样式 */
  overlayStyle?: React.CSSProperties;
  /** 内容的类名 */
  overlayClassName?: string;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 当前宽度 */
  width?: string | number;
  /** 当前高度 */
  height?: string | number;
  /**气泡框位置 */
  placement?: TooltipPlacement;
  otherContainerStyle?: React.CSSProperties;
  leftResizable?: boolean;
  /** 内容的最小宽度 */
  overlayMinWidth?: number;
  /** 当前气泡框的显隐回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 显示隐藏后的回调 */
  afterVisibleChange?: () => void;
  /** 触发元素控制气泡的显示隐藏 */
  onToggleVisible?: (val: boolean) => void;
  /** 失效状态 */
  disabled?: boolean;
}

const rndStyle: React.CSSProperties = {
  right: 0,
  left: 'unset',
  pointerEvents: 'auto',
  transform: 'none',
};

const rndEnableResizing = { left: true };

const fullStyle = { width: '100%', height: '100%' };

export const CreateFilter = React.forwardRef<HTMLDivElement, CreateFilterProps>((props, ref) => {
  const {
    onOk,
    extra,
    children,
    loading,
    overlay,
    onClose,
    className,
    clickAway,
    showFooter,
    footerClassName,
    okButtonLabel,
    okButtonProps,
    cancelButtonLabel,
    cancelButtonProps,
    overlayStyle = {},
    overlayClassName,
    getPopupContainer,
    width,
    height,
    placement,
    otherContainerStyle,
    footerPrefixEl,
    leftResizable,
    overlayMinWidth,
    onVisibleChange,
    afterVisibleChange,
    onToggleVisible,
    disabled,
    ...restProps
  } = props as CreateFilterProps & typeof defaultProps;
  const refPicker = useRef<HTMLDivElement>(null);
  const refPopup = useRef<HTMLDivElement>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const visibleRef = useRef<boolean>(popupVisible);
  visibleRef.current = popupVisible;

  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(popupVisible);
    }
  }, [popupVisible, onVisibleChange]);

  const toggleVisible = useCallback(
    (e: React.MouseEvent<Element>) => {
      if (!disabled) {
        e.stopPropagation();
        const vi = !visibleRef.current;
        onToggleVisible && onToggleVisible(vi);
        setPopupVisible(vi);
      }
    },
    [onToggleVisible, disabled],
  );

  const handleOk = useCallback(
    (e: React.MouseEvent<Element>) => {
      toggleVisible(e);
      onOk && onOk();
    },
    [onOk, toggleVisible],
  );

  const handleClose = useCallback(
    (e: React.MouseEvent<Element>) => {
      toggleVisible(e);
      onClose && onClose();
    },
    [onClose, toggleVisible],
  );

  const cancelBtn = useMemo(
    () => (
      <ButtonMemo onClick={handleClose} {...cancelButtonProps}>
        {cancelButtonLabel}
      </ButtonMemo>
    ),
    [cancelButtonLabel, cancelButtonProps, handleClose],
  );

  const okBtn = useMemo(
    () => (
      <ButtonMemo onClick={handleOk} type="primary" {...okButtonProps}>
        {okButtonLabel}
      </ButtonMemo>
    ),
    [handleOk, okButtonLabel, okButtonProps],
  );

  const renderFooter = useMemo(() => {
    return (
      <div className={classNames(`${prefixCls}-footer`, footerClassName)}>
        {!!extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        {footerPrefixEl?.()}
        <div className={`${prefixCls}-btns`}>
          {cancelBtn}
          {okBtn}
        </div>
      </div>
    );
  }, [footerClassName, extra, footerPrefixEl, cancelBtn, okBtn]);

  const [overlayWidth, setOverlayWidth] = React.useState(overlayStyle?.width || '100%');

  const [hideHandler, setHideHandler] = React.useState(false);

  const onResizeStart: RndResizeStartCallback = React.useCallback(() => {
    setHideHandler(true);
  }, []);

  const onResizeStop: RndResizeCallback = React.useCallback(
    (_e, _dir, eleRef) => {
      const w = eleRef.offsetWidth;
      if (overlayMinWidth && w < overlayMinWidth) {
        setOverlayWidth(overlayMinWidth);
      } else {
        setOverlayWidth(w);
      }
      setHideHandler(false);
    },
    [overlayMinWidth],
  );

  const wrapperStyle = React.useMemo(() => ({ ...overlayStyle, width: overlayWidth }), [
    overlayStyle,
    overlayWidth,
  ]);

  const rndSize = React.useMemo(
    () => ({ width: overlayWidth, height: overlayStyle?.height || '100%' }),
    [overlayStyle, overlayWidth],
  );

  const renderToolTip = useMemo(() => {
    const wrapCls = classNames(`${prefixCls}`, className, {
      [`${prefixCls}-loading`]: loading,
    });
    return (
      <div ref={refPopup}>
        <DraggableWrap bounds={false} hideHandler={hideHandler}>
          {leftResizable ? (
            <div style={wrapperStyle}>
              <Rnd
                style={rndStyle}
                size={rndSize}
                dragAxis="none"
                disableDragging
                enableResizing={rndEnableResizing}
                onResizeStart={onResizeStart}
                onResizeStop={onResizeStop}
              >
                {/* <div style={overlayStyle} className={wrapCls}> */}
                <div style={fullStyle} className={wrapCls}>
                  {loading ? (
                    <Icon icon="loading" className={`${prefixCls}-icon-loading`} />
                  ) : (
                    <Fragment>
                      <div className={`${prefixCls}-content`}>
                        {typeof overlay === 'function' ? overlay() : overlay}
                      </div>
                      {showFooter && renderFooter}
                    </Fragment>
                  )}
                </div>
              </Rnd>
            </div>
          ) : (
            // <div style={overlayStyle} className={wrapCls}>
            <div style={overlayStyle} className={wrapCls}>
              {loading ? (
                <Icon icon="loading" className={`${prefixCls}-icon-loading`} />
              ) : (
                <Fragment>
                  <div className={`${prefixCls}-content`}>
                    {typeof overlay === 'function' ? overlay() : overlay}
                  </div>
                  {showFooter && renderFooter}
                </Fragment>
              )}
            </div>
          )}
        </DraggableWrap>
      </div>
    );
  }, [
    className,
    loading,
    hideHandler,
    leftResizable,
    wrapperStyle,
    rndSize,
    onResizeStart,
    onResizeStop,
    overlay,
    showFooter,
    renderFooter,
    overlayStyle,
  ]);

  useClickAway(refPicker, (e: KeyboardEvent) => {
    if (clickAway) {
      const isPicker = !!(refPicker.current && refPicker.current.contains(e.target as Node));
      const isPopup = !!(refPopup.current && refPopup.current.contains(e.target as Node));
      const vi = isPicker || isPopup;
      if (vi !== popupVisible) {
        setPopupVisible(vi);
        onClose && onClose();
      }
    }
  });
  const popupCls = classNames(`${prefixCls}-popup`, overlayClassName);

  const pickerStyle = React.useMemo(() => ({ width, height, ...otherContainerStyle }), [
    height,
    otherContainerStyle,
    width,
  ]);

  return (
    <Tooltip
      {...restProps}
      ref={ref}
      arrowContent={null}
      trigger="click"
      placement={placement}
      destroyTooltipOnHide
      visible={popupVisible}
      overlayClassName={popupCls}
      overlay={renderToolTip}
      getPopupContainer={getPopupContainer}
      afterVisibleChange={afterVisibleChange}
    >
      <span ref={refPicker} onClick={toggleVisible} style={pickerStyle}>
        {children}
      </span>
    </Tooltip>
  );
});

const defaultProps = {
  okButtonLabel: '确定',
  okButtonProps: {},
  cancelButtonLabel: '取消',
  cancelButtonProps: {},
  showFooter: true,
  placement: 'bottom' as TooltipPlacement,
};

CreateFilter.defaultProps = defaultProps;
CreateFilter.displayName = 'CreateFilter';
export default CreateFilter;

const CreateFilterMemo = React.memo(CreateFilter);
CreateFilterMemo.displayName = 'CreateFilterMemo';
export { CreateFilterMemo };
