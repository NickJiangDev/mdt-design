/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { DataSource } from '../types';
import { Input } from '../../input';
import Draggable from 'react-draggable';
import map from 'lodash/map';
import includes from 'lodash/includes';
import cloneDeep from 'lodash/cloneDeep';
import '../style/item-list.less';
import Icon from '@/components/icon';
import reduce from 'lodash/reduce';
import Scrollbar from '@/components/scrollbar';
import Tooltip from '@/components/tooltip';

export interface ItemListProps {
  prefixCls: string;

  recId: string;
  dataSources: DataSource[];

  selectDataSourceId: string;

  dataSourceDataUniqueKey: string;

  handleSelPkgChange: (pkgUuid: string) => void;
  handleSelRecChange: (pkgUuid: string, recUuid: string) => void;
}

const getIconName = (geometryType: string) => {
  switch (geometryType) {
    case 'point':
      return 'location';
    case 'line':
      return 'line';
    case 'polygon':
      return 'layer';
    case 'point_to_polygon':
      return 'location-to';
    default:
      return 'location';
  }
};
export const ItemList = React.memo((props: ItemListProps) => {
  const {
    recId,
    dataSources,
    prefixCls,
    selectDataSourceId,
    handleSelPkgChange,
    handleSelRecChange,
    dataSourceDataUniqueKey,
  } = props;

  const moreThanOneRec =
    dataSources.length >= 1 || (dataSources.length === 1 && dataSources[0].data.length > 1);

  const [_dataSources, setInnerDataSources] = useState(dataSources);

  const [searchWidth, setSearchWidth] = useState(160);
  const [originWidth, setOriginWidth] = useState(160);
  const [originClientX, setOriginClientX] = useState(0);
  const totalDataLen = useMemo(() => {
    return reduce(dataSources, (acc, { data }) => acc + data.length, 0);
  }, [dataSources]);
  const style = useMemo(() => ({ width: searchWidth, left: Math.min(-searchWidth, 0) }), [
    searchWidth,
  ]);

  const handleSearch = useCallback(
    (e: KeyboardEvent) => {
      const v = (e.target as HTMLInputElement | null)?.value;
      if (v) {
        const ds = cloneDeep(dataSources);
        const curDataSources = ds.reduce((acc, i) => {
          if (i.objectType.includes(v)) {
            acc.push(i);
            return acc;
          } else {
            const validRec = i.data.filter(
              (d) =>
                i.infoCfg?.some((cfg) => includes(d[cfg.key], v)) ||
                Object.values(d).some((val) => includes(val, v)),
            );
            if (validRec.length > 0) {
              acc.push({
                ...i,
                data: validRec,
              });
            }
          }
          return acc;
        }, [] as DataSource[]);
        setInnerDataSources(curDataSources);
      }
    },
    [dataSources],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (v === '') {
        setInnerDataSources(dataSources);
      }
    },
    [dataSources],
  );

  const _handleSelPkgChange = useCallback(
    (e: React.MouseEvent) => {
      const el = e.currentTarget as HTMLDivElement | null;
      el && handleSelPkgChange(el.dataset.pkgUuid || '');
    },
    [handleSelPkgChange],
  );
  const _handleSelRecChange = useCallback(
    (e: React.MouseEvent) => {
      const el = e.currentTarget as HTMLDivElement | null;
      if (el) {
        const pkgUuid = el.dataset.pkgUuid || '';
        const recUuid = el.dataset.recUuid || '';
        handleSelRecChange(pkgUuid, recUuid);
      }
    },
    [handleSelRecChange],
  );

  const onDragStart = useCallback((e: React.MouseEvent) => {
    const { clientX } = e;
    setOriginClientX(clientX);
  }, []);
  const onDrag = useCallback(
    (e: React.MouseEvent) => {
      const { clientX } = e;
      const x = clientX - originClientX;
      const curWidth = originWidth - x;
      setSearchWidth(Math.max(160, curWidth));
    },
    [originWidth, originClientX],
  );
  const onDragEnd = useCallback(() => {
    setOriginWidth(searchWidth);
  }, [searchWidth]);

  useEffect(() => {
    setInnerDataSources(dataSources);
  }, [dataSources]);

  return (
    <>
      {moreThanOneRec && (
        <div className={`${prefixCls}-list`} style={style}>
          {/* 拖拽调整宽度 */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Draggable
            axis="x"
            onStart={onDragStart}
            onDrag={onDrag}
            onStop={onDragEnd}
            bounds={{ right: 10 }}
          >
            <div className={`${prefixCls}-list-draggable`} />
          </Draggable>
          <div className={`${prefixCls}-list-cnt`}>共{totalDataLen}条数据</div>
          <Input
            prefixIcon="search"
            placeholder="搜索数据"
            size="compact"
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
          <Scrollbar>
            <div className={`${prefixCls}-list-content`}>
              {_dataSources.map((ds) => {
                const dsUuid = ds[ds.dataSourceUniqueKey || 'packageUuid'] as string;
                return (
                  <Fragment key={dsUuid}>
                    <div
                      data-pkg-uuid={dsUuid}
                      className={`${prefixCls}-list-content-item ${prefixCls}-list-content-pkg-item`}
                      onClick={_handleSelPkgChange}
                    >
                      <Tooltip title={ds.objectType} mouseEnterDelay={0.5}>
                        <span>{ds.objectType}</span>
                      </Tooltip>
                    </div>
                    {dsUuid === selectDataSourceId &&
                      map(ds.data, (d) => {
                        const firstColumnKey = ds.infoCfg?.[0]?.key;
                        const name = d.name || (firstColumnKey ? d[firstColumnKey] : '');
                        const _id =
                          typeof d[dataSourceDataUniqueKey] === 'number'
                            ? d[dataSourceDataUniqueKey].toString()
                            : d[dataSourceDataUniqueKey];
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const _recId = typeof recId === 'number' ? recId.toString() : recId;
                        return (
                          <Tooltip
                            title={name}
                            mouseEnterDelay={0.5}
                            key={d[dataSourceDataUniqueKey]}
                          >
                            <div
                              data-rec-uuid={d[dataSourceDataUniqueKey]}
                              data-pkg-uuid={dsUuid}
                              className={`${prefixCls}-list-content-item ${prefixCls}-list-content-rec-item`}
                              onClick={_handleSelRecChange}
                            >
                              <div className={`${prefixCls}-list-content-rec-item-checked-icon`}>
                                {_recId === _id && <Icon icon="done-check" size={14} />}
                              </div>
                              {ds.geometryType && (
                                <Icon icon={getIconName(ds.geometryType)} size={16} />
                              )}
                              <div className={`${prefixCls}-list-content-rec-item-name`}>
                                {name}
                              </div>
                            </div>
                          </Tooltip>
                        );
                      })}
                  </Fragment>
                );
              })}
            </div>
          </Scrollbar>
        </div>
      )}
    </>
  );
});
