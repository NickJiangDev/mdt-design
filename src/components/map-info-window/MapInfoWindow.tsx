import * as React from 'react';
import classNames from 'classnames';
import './style/map-info-window.less';
import { DataSource, DsRecord, ToolProps } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ItemList } from './components/item-list';
import { ItemDetail } from './components/item-detail';
import find from 'lodash/find';
import every from 'lodash/every';
import toastApi from '../toast';

export interface MapInfoWindowProps {
  className?: string;
  onClose?: () => void; // 关闭信息卡片
  dataSources: DataSource[];

  // 数据源记录唯一标识符
  dataSourceRecordUniqueKey?: string;

  showClose?: boolean;
  // 详情部分头部工具栏
  headerTools?: ToolProps[];
  renderHeaderTools?: (ds: DataSource | undefined) => React.ReactNode;
  // 详情底部底部工具栏
  footerTools?: ToolProps[];
  renderFooterTools?: (ds: DataSource | undefined) => React.ReactNode;

  // 针对多数据的情况下 当前选中数据变更
  handleShowIndexChange?: (params: {
    // 选中数据包（DataSource）uuid
    packageUuid: string;
    // 选中数据包下记录 (rec) uuid
    recordUuid: string;
  }) => void;

  style?: React.CSSProperties;

  getPreviewPopupContainer?: () => HTMLElement;
}

const prefixCls = 'dmc-map-info-window';

const convert2Str = (v: string | number) => {
  if (typeof v === 'number') {
    return v.toString();
  }
  return v;
};

const MapInfoWindow: React.FC<MapInfoWindowProps> = (props) => {
  const {
    className,
    onClose,
    dataSources,
    dataSourceRecordUniqueKey,
    handleShowIndexChange,
    showClose = true,
    headerTools,
    renderHeaderTools,
    footerTools,
    renderFooterTools,
    style,
    getPreviewPopupContainer,
  } = props;

  const _dataSourceDataUniqueKey = dataSourceRecordUniqueKey || 'id';
  // 左侧列表选中数据包（ds）uuid
  const [dsId, setDsId] = useState('');
  // 左侧列表选中记录 (ds > data) uuid
  const [recId, setRecId] = useState('');
  const [curDataSource, setCurDataSource] = useState<DataSource>(dataSources[0]);
  const [curRecord, setCurRecord] = useState<DsRecord>(dataSources[0]?.data?.[0]);
  const hasMultiRecs = useMemo(() => dataSources.length > 1 || dataSources[0]?.data?.length > 1, [
    dataSources,
  ]);

  const handleSelPkgChange = useCallback(
    (id: string) => {
      const curDs =
        find(dataSources, (i) => {
          const _dataSourceUniqueKey = (i.dataSourceUniqueKey || 'packageUuid') as keyof DataSource;
          return i[_dataSourceUniqueKey] === id;
        }) || ({} as DataSource);
      setDsId(id);
      setCurDataSource(curDs);
      if (
        !find(curDs?.data, (i) => convert2Str(i[_dataSourceDataUniqueKey]) === convert2Str(recId))
      ) {
        const rec = curDs?.data?.[0] || ({} as DsRecord);
        setRecId(rec[_dataSourceDataUniqueKey]);
        setCurRecord(rec);
      }
    },
    [_dataSourceDataUniqueKey, dataSources, recId],
  );
  const handleSelRecChange = useCallback(
    (pkgId: string, recId: string) => {
      const curDs =
        find(dataSources, (i) => {
          const _dataSourceUniqueKey = (i.dataSourceUniqueKey || 'packageUuid') as keyof DataSource;
          return i[_dataSourceUniqueKey] === dsId;
        }) || ({} as DataSource);
      const { data = [] } = curDs;
      setDsId(pkgId);
      setRecId(recId);
      setCurDataSource(curDs);
      setCurRecord(
        find(
          data,
          (i) =>
            convert2Str(i[_dataSourceDataUniqueKey as keyof DataSource]) === convert2Str(recId),
        ) || ({} as DsRecord),
      );
    },
    [_dataSourceDataUniqueKey, dataSources, dsId],
  );

  useEffect(() => {
    // validation
    if (
      !every(dataSources, (ds) => {
        const _dataSourceUniqueKey = (ds.dataSourceUniqueKey || 'packageUuid') as keyof DataSource;
        return ds[_dataSourceUniqueKey] && Array.isArray(ds.data);
      })
    ) {
      toastApi.error('MapInfoWindow DataSource 参数错误');
      throw new Error('MapInfoWindow DataSource 参数错误');
    }
    if (
      !dataSourceRecordUniqueKey &&
      !every(dataSources, (ds) => every(ds.data, (d) => d[_dataSourceDataUniqueKey]))
    ) {
      toastApi.error('MapInfoWindow DataSource 内部参数 data 错误 - 没有唯一标识符');
      throw new Error(
        'MapInfoWindow DataSource 内部参数 data 错误 - 未通过 dataSourceDataUniqueKey 设置唯一标识符',
      );
    }

    const firstDs = dataSources[0];
    const curRecord = firstDs?.data?.[0] || {};
    const curDsId = (firstDs?.[
      (firstDs.dataSourceUniqueKey || 'packageUuid') as keyof DataSource
    ] as unknown) as string;
    setCurDataSource(firstDs);
    setCurRecord(curRecord);
    setDsId(curDsId);
    setRecId(curRecord[_dataSourceDataUniqueKey]);
  }, [_dataSourceDataUniqueKey, dataSourceRecordUniqueKey, dataSources]);

  useEffect(() => {
    if (recId && dsId) {
      handleShowIndexChange?.({
        packageUuid: dsId,
        recordUuid: recId,
      });
    }
  }, [handleShowIndexChange, recId, dsId]);

  return (
    <>
      {curDataSource && curRecord && (
        <div className={classNames(prefixCls, className)} style={style}>
          {hasMultiRecs && (
            <ItemList
              recId={recId}
              prefixCls={prefixCls}
              dataSources={dataSources}
              selectDataSourceId={dsId}
              handleSelPkgChange={handleSelPkgChange}
              handleSelRecChange={handleSelRecChange}
              dataSourceDataUniqueKey={_dataSourceDataUniqueKey}
            />
          )}
          <ItemDetail
            prefixCls={prefixCls}
            record={curRecord}
            dataSource={curDataSource}
            showClose={showClose}
            onClose={onClose}
            headerTools={headerTools}
            renderHeaderTools={renderHeaderTools}
            footerTools={footerTools}
            renderFooterTools={renderFooterTools}
            hasMultiRecs={hasMultiRecs}
            getPreviewPopupContainer={getPreviewPopupContainer}
          />
          <div className={`${prefixCls}-triangle-border`}>
            <div className={`${prefixCls}-triangle`} />
          </div>
        </div>
      )}
    </>
  );
};

MapInfoWindow.displayName = 'MapInfoWindow';
export default MapInfoWindow;

const MapInfoWindowMemo = React.memo(MapInfoWindow);
MapInfoWindowMemo.displayName = 'MapInfoWindowMemo';
export { MapInfoWindowMemo };
