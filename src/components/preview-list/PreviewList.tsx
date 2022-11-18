import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useKey from 'react-use/lib/useKey';
import classNames from 'classnames';
import { Grid } from 'react-virtualized';
import { GridCellProps } from 'react-virtualized/dist/es/Grid';
import useMeasure from 'react-use/lib/useMeasure';
import useDataValue from '@/hooks/useDataValue';
import useStaticCallback from '@/hooks/useStaticCallback';
import { ObjectInterface } from '../_utils/interfaces';
import { createScrollbar, PerfectScrollbarClass } from '@/components/scrollbar';
import { Icon } from '@/components/icon';
import './style/index.less';
import { useCallback } from 'react';
import { IconButton } from '@/components/button';
import { Tooltip } from '@/components/tooltip';

export enum PreviewType {
  normal = 'normal',
  fullscreen = 'fullscreen',
}

export enum PreviewTheme {
  initial = 'initial',
  // 全屏主题
  defaultFull = 'default-full',
  blackFull = 'black-full',
}

export enum PreviewLisMode {
  media = 'media',
  other = 'other',
}

export interface PreviewListProps {
  /** 模式 */
  mode?: PreviewLisMode;
  /** 展示列表 */
  list: ObjectInterface[];
  /** 类名 */
  className?: string;
  /** 选中的索引 */
  selectIndex?: number;
  /** 默认选中的索引 */
  defaultSelectIndex?: number;
  /** 自定义渲染单元 */
  RenderCell: React.FC<ObjectInterface>;
  /** 自定义渲染展示内容 */
  RenderPreview: React.FC<ObjectInterface>;
  /** 选择回调 */
  onChangeSelect?: (index: number) => void;
  /** 类型 */
  type?: PreviewType.normal | PreviewType.fullscreen;
  /** 显示编辑功能 */
  showEdit?: boolean;
  /** 编辑样式自定义 */
  editRenderItem?: (index: number) => React.ReactNode | string;
  /** 显示分享功能 */
  showShare?: boolean;
  /** 显示列表 */
  showList?: boolean;
  /** 标题 */
  title?: string;
  /** 预览主题 */
  theme?: PreviewTheme;
  /** 关闭回调处理 */
  handleClose?: () => void;
  /** 分享回调处理 */
  handleShare?: () => void;
  /** 编辑回调处理 */
  handleEdit?: Array<() => void>;
  /** 分享提示文案 */
  shareTip?: string;
  /** 自定义功能 */
  renderAction?: (index: number) => React.ReactNode | string;
}

const prefixCls = 'dmc-preview-list';
const scrollbarOpts = { suppressScrollY: true, minScrollbarLength: 20 };

const PreviewList: React.FC<PreviewListProps> = (props) => {
  const {
    list,
    mode = PreviewLisMode.other,
    selectIndex,
    defaultSelectIndex,
    className,
    RenderCell,
    RenderPreview,
    onChangeSelect,
    type,
    showList,
    showEdit,
    showShare,
    title,
    theme = PreviewTheme.initial,
    handleClose,
    handleEdit,
    handleShare,
    shareTip = '',
    renderAction,
    ...restProps
  } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const listLen = list.length;
  const gridRef = React.useRef(null);
  const psRef = React.useRef<PerfectScrollbarClass>();
  const [unControlVal, setUnControlVal] = React.useState(defaultSelectIndex ?? 0);
  const isControl = 'selectIndex' in props;
  const val = isControl ? selectIndex ?? 0 : unControlVal;
  const itemCls = `${prefixCls}-item`;
  const itemInnerCls = `${prefixCls}-item-inner`;
  const itemSelectCls = `${prefixCls}-item-active`;
  const _title = title || list?.[val]?.name;

  const clickItem = useDataValue((valStr: string) => {
    const index = parseInt(valStr);
    !isControl && setUnControlVal(index);
    onChangeSelect && onChangeSelect(index);
  });

  const clickPreNav = useStaticCallback(() => {
    const index = val - 1;
    !isControl && setUnControlVal(index);
    onChangeSelect && onChangeSelect(index);
  });

  const clickNextNav = useStaticCallback(() => {
    const index = val + 1;
    !isControl && setUnControlVal(index);
    onChangeSelect && onChangeSelect(index);
  });

  const clickKey = useStaticCallback((event: KeyboardEvent) => {
    let index = val;
    if (event.key === 'ArrowLeft' && val > 0) {
      index = val - 1;
    } else if (event.key === 'ArrowRight' && val < listLen - 1) {
      index = val + 1;
    }
    if (index !== val) {
      !isControl && setUnControlVal(index);
      onChangeSelect && onChangeSelect(index);
    }
  });

  const keyFilter = useCallback((event: KeyboardEvent) => {
    return event.key === 'ArrowRight' || event.key === 'ArrowLeft';
  }, []);
  useKey(keyFilter, clickKey, undefined, [clickKey]);

  const cellRenderer = ({ isVisible, columnIndex, style }: GridCellProps) => {
    if (!isVisible || columnIndex >= listLen) {
      return null;
    }
    const data = list[columnIndex];
    const cls = classNames(itemCls, { [itemSelectCls]: columnIndex === val });
    return (
      <div style={style} key={columnIndex} className={cls}>
        <div data-value={columnIndex} className={itemInnerCls} onClick={clickItem}>
          <RenderCell item={data} />
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    const dom = ReactDOM.findDOMNode(gridRef.current) as Element;
    if (dom) {
      const [ps, destroy] = createScrollbar(dom, 'assist-bg', scrollbarOpts);
      psRef.current = ps;
      return () => {
        destroy();
        psRef.current = undefined;
      };
    }
  }, []);

  React.useEffect(() => {
    psRef.current && psRef.current.update();
  });

  return (
    <div
      {...restProps}
      className={classNames(prefixCls, className, `${prefixCls}-${theme}`, {
        [`${prefixCls}-fullscreen`]: type === PreviewType.fullscreen,
      })}
      ref={ref}
    >
      <div className={`${prefixCls}-preview`}>
        {type === PreviewType.fullscreen && (
          <div className={`${prefixCls}-head ${prefixCls}-head-${theme}`}>
            <div className="name">
              <div>{_title}</div>
              {showShare && (
                <Tooltip title={shareTip}>
                  <IconButton
                    type="only-icon"
                    icon="launch-2"
                    onClick={() => {
                      handleShare && handleShare();
                    }}
                  />
                </Tooltip>
              )}
            </div>
            <div className={`${prefixCls}-action`}>
              {renderAction && renderAction(val)}
              {!renderAction && showEdit && (
                <IconButton
                  type="only-icon"
                  icon="edit"
                  onClick={() => {
                    if (handleEdit?.length) {
                      if (mode === PreviewLisMode.media && list[val].type === 'image') {
                        handleEdit[1]?.();
                      } else {
                        handleEdit[0]();
                      }
                    }
                    handleClose && handleClose();
                  }}
                />
              )}
              <IconButton
                type="only-icon"
                icon="close"
                onClick={() => handleClose && handleClose()}
              />
            </div>
          </div>
        )}
        {type === PreviewType.fullscreen ? (
          <div className={`${prefixCls}-preview-container`}>
            <div>
              {val !== 0 && (
                <div className={`${prefixCls}-nav ${prefixCls}-left-nav`} onClick={clickPreNav}>
                  <Icon icon="chevron-left" />
                </div>
              )}
            </div>
            <div className="content">
              <RenderPreview item={list[val]} handleClose={handleClose} />
            </div>
            <div>
              {val < listLen - 1 && (
                <div className={`${prefixCls}-nav ${prefixCls}-right-nav`} onClick={clickNextNav}>
                  <Icon icon="chevron-right" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={`${prefixCls}-preview-container`}>
              <RenderPreview item={list[val]} handleClose={handleClose} />
            </div>
            {val !== 0 && (
              <div className={`${prefixCls}-nav ${prefixCls}-left-nav`} onClick={clickPreNav}>
                <Icon icon="chevron-left" />
              </div>
            )}
            {val < listLen - 1 && (
              <div className={`${prefixCls}-nav ${prefixCls}-right-nav`} onClick={clickNextNav}>
                <Icon icon="chevron-right" />
              </div>
            )}
          </>
        )}
      </div>
      {showList && (
        <Grid
          ref={gridRef}
          width={width}
          height={78}
          rowHeight={64}
          rowCount={1}
          cellRenderer={cellRenderer}
          columnWidth={116}
          columnCount={listLen}
          scrollToColumn={val}
          className={`${prefixCls}-list`}
        />
      )}
    </div>
  );
};

PreviewList.defaultProps = {
  type: PreviewType.normal,
  showList: true,
  showEdit: false,
  showShare: false,
  title: '',
  shareTip: '',
};

export default PreviewList;
