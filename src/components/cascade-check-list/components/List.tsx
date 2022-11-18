import * as React from 'react';
import Checkbox from '@/components/checkbox';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { useClickAway } from 'react-use';

import '../style/list.less';
import { Option, LevelType, CheckedStatus } from '../index';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/input';
import VirtualizedList, { ItemViewProps } from '@/components/virtualized-list';

export const virtualizedListWrapperClassName = 'virtualized-list-wrapper';

interface ListProps {
  // 列表宽度
  rowWidth?: number | string;
  rowMinWidth?: number | string;
  rowMaxWidth?: number | string;

  options: Option[];

  handleMouseEnterLine?: (
    enterLinePos: DOMRect,
    id: string,
    val: string,
    index: number,
    dom: HTMLDivElement,
  ) => void;
  handleMouseLeaveLine?: () => void;
  handleCheckboxChange?: (
    id: string,
    _id: string[] | undefined,
    val: string,
    checked: boolean,
  ) => void;
  handleCheckedAllChange?: (checked: boolean) => void;

  // 渲染 checkbox
  showCheckbox?: boolean;

  // 状态
  checkedStatus: CheckedStatus;

  // 层级相关
  level?: LevelType;
  levelTitles?: string[];

  // 全选相关
  selectAll?: boolean;
  selectAllText?: string;

  // 搜索框相关
  showSearch?: boolean;
  ignoreCase?: boolean;
  searchInputPlaceholder?: string;

  // 触发类型
  triggerType?: 'click' | 'hover';

  // 自定义行渲染
  renderer?: (
    id: string,
    _id: string[] | undefined,
    val: string,
    checked: boolean,
    item: ObjectInterface,
    index: number,
  ) => React.ReactNode;
}

const prefixCls = 'cascade-modified-list';

const List = React.memo(
  React.forwardRef<HTMLDivElement, ListProps>((props, ref) => {
    const {
      showCheckbox = false,
      selectAll = true,
      selectAllText = '全选',
      options,
      handleMouseEnterLine,
      handleMouseLeaveLine,
      renderer,
      handleCheckboxChange,
      handleCheckedAllChange,
      checkedStatus,
      levelTitles,
      level,
      showSearch,
      ignoreCase = false,
      searchInputPlaceholder = '',
      triggerType = 'hover',
      rowWidth,
      rowMinWidth,
      rowMaxWidth,
    } = props;
    const levelTitle = level != null ? levelTitles?.[level] : '' || '';
    const [allChecked, setAllChecked] = useState(false);
    const [allCheckedIndeterminate, setAllCheckedIndeterminate] = useState(false);
    const [_options, setOptions] = useState(options);
    const listRef = useRef<HTMLDivElement | null>(null);
    const fallbackOptions = useRef(options);

    const style = useMemo(() => {
      const _style: React.CSSProperties = {};
      if (rowWidth) {
        _style.width = typeof rowWidth === 'number' ? `${rowWidth}px` : rowWidth;
      }
      if (rowMinWidth) {
        _style.minWidth = typeof rowMinWidth === 'number' ? `${rowMinWidth}px` : rowMinWidth;
      }
      if (rowMaxWidth) {
        _style.maxWidth = typeof rowMaxWidth === 'number' ? `${rowMaxWidth}px` : rowMaxWidth;
      }
      return _style;
    }, [rowWidth, rowMinWidth, rowMaxWidth]);

    const handleTriggerMenu = useCallback(
      (e: React.MouseEvent) => {
        const currentTarget = e.currentTarget as HTMLDivElement;
        const {
          dataset: { val = '', index, id = '' },
        } = currentTarget;
        handleMouseEnterLine?.(
          currentTarget.getBoundingClientRect(),
          id,
          val,
          index ? Number.parseInt(index, 10) : -1,
          currentTarget,
        );
      },
      [handleMouseEnterLine],
    );

    const handleCheckedChange = useCallback(
      (id: string, _id: string[] | undefined, val: string, checked: boolean) => {
        handleCheckboxChange?.(id, _id, val, checked);
      },
      [handleCheckboxChange],
    );

    const _handleCheckedAllChange = (checked: boolean) => {
      setAllChecked(checked);
      setAllCheckedIndeterminate(false);
      handleCheckedAllChange?.(checked);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target as HTMLInputElement;
      if (value.length) {
        setOptions(
          options.filter((i) =>
            ignoreCase
              ? i.val.toLocaleLowerCase().includes(value.toLocaleLowerCase())
              : i.val.includes(value),
          ),
        );
      } else {
        setOptions(fallbackOptions.current);
      }
    };

    useEffect(() => {
      const { checkedCnt } = checkedStatus;
      if (checkedCnt === 0) {
        setAllCheckedIndeterminate(false);
        setAllChecked(false);
      } else {
        if (checkedCnt > 0) {
          setAllCheckedIndeterminate(true);
          setAllChecked(checkedCnt === options.length);
        }
      }
    }, [checkedStatus, level, options.length]);

    useEffect(() => {
      setOptions(options);
      fallbackOptions.current = options;
    }, [options]);

    useClickAway(listRef, (e) => {
      let isClickAway = true;
      if (e.target instanceof Node) {
        let el: Node | null = e.target;
        // 是否是某一列表的子元素
        while (el) {
          if (el instanceof HTMLElement && el.classList.contains(prefixCls)) {
            isClickAway = false;
            break;
          }
          el = el.parentElement;
        }
      }
      if (isClickAway) {
        handleMouseLeaveLine?.();
      }
    });

    const otherProps = useMemo(() => {
      const otherProps: ObjectInterface = {};

      if (triggerType === 'hover') {
        otherProps.onMouseEnter = handleTriggerMenu;
        otherProps.onMouseLeave = handleMouseLeaveLine;
      } else {
        otherProps.onClick = (e: React.MouseEvent) => {
          handleTriggerMenu(e);
        };
      }
      return otherProps;
    }, [handleMouseLeaveLine, handleTriggerMenu, triggerType]);

    const rowRenderer = useCallback(
      ({ index, item }: ItemViewProps) => {
        const { id, val, _id } = item;
        const checked = checkedStatus.checkedObj[id] ?? false;
        const indeterminate = checkedStatus.indeterminateObj[id] ?? false;
        return (
          <div
            key={id + val + index}
            data-id={id}
            data-val={val}
            data-index={index}
            className={`${prefixCls}-item`}
            onClick={(e) => {
              // 阻止因 React Portal 事件冒泡导致的级联点击
              if (e.currentTarget.contains(e.target as Node)) {
                handleCheckedChange(id, _id, val, !checked);
              }
            }}
            {...otherProps}
          >
            {showCheckbox && (
              <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                onClick={(checked: boolean) => {
                  if (triggerType === 'click') {
                    handleCheckedChange(id, _id, val, !checked);
                  }
                }}
                // onChange={(checked: boolean) => handleCheckedChange(id, val, checked)}
              />
            )}
            {renderer ? <>{renderer(id, _id, val, checked, item, index)}</> : <span>{val}</span>}
          </div>
        );
      },
      [
        checkedStatus.checkedObj,
        checkedStatus.indeterminateObj,
        handleCheckedChange,
        otherProps,
        renderer,
        showCheckbox,
        triggerType,
      ],
    );

    return (
      <div className={prefixCls} style={style} ref={listRef}>
        {levelTitle && (
          <span className="title-wrapper">
            <span className="title">{levelTitle}</span>
          </span>
        )}
        {showSearch && (
          <Input
            placeholder={searchInputPlaceholder}
            prefixIcon="search"
            onChange={handleSearchChange}
          />
        )}
        {selectAll && (
          <div className="select-all">
            <Checkbox
              className="selectAll"
              checked={allChecked}
              indeterminate={allCheckedIndeterminate}
              onChange={_handleCheckedAllChange}
              title={selectAllText}
            />
          </div>
        )}
        <div className={virtualizedListWrapperClassName} ref={ref}>
          <VirtualizedList
            minRowHeight={36}
            dynamicRowHeight
            data={_options}
            ItemView={rowRenderer}
            useScrollbar={false}
            rowWidth={typeof rowWidth === 'number' ? rowWidth : undefined}
          />
        </div>
      </div>
    );
  }),
);

export default List;
