import React, { useCallback } from 'react';
import '../style/item-detail.less';
import { DataSource, DsRecord, ToolProps } from '../types';
import Icon from '@/components/icon';
import get from 'lodash/get';
import keys from 'lodash/keys';
import map from 'lodash/map';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import PreviewList, { PreviewType } from '../../preview-list';
import dialogApi from '../../dialog/dialogApi';
import { ObjectInterface } from '@/components/_utils/interfaces';
import Scrollbar from '@/components/scrollbar';

// const alias = {
//   name: '名称',
//   address: '地址',
// };

// 为兼容旧版私有数据显示
const reverseAlias = {
  名称: 'name',
  地址: 'address',
};

export interface ItemDetailProps {
  prefixCls: string;
  dataSource: DataSource;
  record: DsRecord;
  showClose: boolean;
  onClose?: () => void;
  // 详情部分头部工具栏
  headerTools?: ToolProps[];
  renderHeaderTools?: (ds: DataSource | undefined) => React.ReactNode;
  // 详情底部底部工具栏
  footerTools?: ToolProps[];
  renderFooterTools?: (ds: DataSource | undefined) => React.ReactNode;
  hasMultiRecs: boolean;
  getPreviewPopupContainer?: () => HTMLElement;
}

const ImgList = React.memo(
  ({
    imgs,
    prefixCls,
    getPreviewPopupContainer,
  }: {
    prefixCls: string;
    imgs: string[] | undefined;
    getPreviewPopupContainer?: () => HTMLElement;
  }) => {
    const RenderCell = useCallback(
      (props: ObjectInterface) => {
        return (
          <div
            className={`${prefixCls}-img-preview-list-item`}
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${props?.item?.url})`,
            }}
          />
        );
      },
      [prefixCls],
    );
    const RenderPreview = useCallback(
      (props: ObjectInterface) => {
        return (
          <div
            className={`${prefixCls}-img-preview-item`}
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${props?.item?.url})`,
            }}
          />
        );
      },
      [prefixCls],
    );
    const handlePreview = useCallback(
      (e: React.MouseEvent) => {
        const imgIndex = (e.currentTarget as HTMLDivElement | null)?.dataset.index;
        const v = Number.parseInt(imgIndex || '0', 10);
        const numericImgIndex = isNaN(v) ? 0 : v;
        return dialogApi.open(
          {
            centered: true,
            closable: true,
            maskClosable: true,
            mask: true,
            wrapClassName: `${prefixCls}-img-preview`,
            getContainer: getPreviewPopupContainer,
          },
          (onClose) => {
            return (
              <PreviewList
                title="图片预览"
                defaultSelectIndex={numericImgIndex}
                handleClose={onClose}
                showEdit={false}
                list={map(imgs, (i) => ({ url: i }))}
                type={PreviewType.normal}
                RenderCell={RenderCell}
                RenderPreview={RenderPreview}
              />
            );
          },
        );
      },
      [RenderCell, RenderPreview, getPreviewPopupContainer, imgs, prefixCls],
    );
    return (
      <>
        {map(imgs, (img, index) => (
          <div
            data-index={index}
            key={index + img}
            className={`${prefixCls}-detail-body-img-list-item`}
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundImage: `url(${img})`,
              backgroundRepeat: 'no-repeat',
            }}
            onClick={handlePreview}
          >
            <Icon icon="maximize" size={40} />
          </div>
        ))}
      </>
    );
  },
);

export const ItemDetail = React.memo(
  ({
    prefixCls,
    record,
    dataSource,
    headerTools,
    renderHeaderTools,
    footerTools,
    renderFooterTools,
    showClose,
    onClose,
    hasMultiRecs,
    getPreviewPopupContainer,
  }: ItemDetailProps) => {
    const _footerTools = dataSource?.footerTools || footerTools || [];
    const _headerTools = dataSource?.headerTools || headerTools || [];
    const _renderHeaderTools = dataSource?.renderHeaderTools || renderHeaderTools;
    const _renderFooterTools = dataSource?.renderFooterTools || renderFooterTools;
    const { infoCfg, infoWindowSettings = {} } = dataSource || {};
    const { decimalSetting = -1 } = infoWindowSettings;
    const style = hasMultiRecs ? { minHeight: '380px' } : undefined;
    const toolStyle = {
      gridTemplateColumns: `repeat(${_footerTools.length}, 1fr)`,
    };

    const toRenderList: Array<{ key: string; val: string }> = infoCfg
      ? infoCfg.map(({ key, type = '' }) => {
          const reverseKey = get(reverseAlias, key);
          let val = (reverseKey && get(record, reverseKey)) || get(record, key);
          if (type === 'number' && decimalSetting >= 0) {
            const numericVal = Number.parseFloat(val);
            val = isNaN(numericVal)
              ? ''
              : decimalSetting === 0
              ? Math.round(numericVal)
              : numericVal.toFixed(decimalSetting);
          }
          return { key, val };
        })
      : map(keys(record), (key) => ({
          key,
          val: get(record, key),
        }));

    return (
      <div
        style={style}
        className={classNames(`${prefixCls}-detail`, {
          [`${prefixCls}-detail-multi-recs`]: hasMultiRecs,
        })}
      >
        <div className={`${prefixCls}-detail-header`}>
          <div className={`${prefixCls}-detail-header-btns`}>
            {_renderHeaderTools
              ? _renderHeaderTools(dataSource)
              : map(_headerTools, ({ id, name, action }) => (
                  <div className={`${prefixCls}-detail-header-btn`} key={id} onClick={action}>
                    <Icon icon={name} size={14} />
                  </div>
                ))}
          </div>
          <div className={`${prefixCls}-detail-header-close-btn`} onClick={onClose}>
            {showClose && <Icon icon="close" size={14} />}
          </div>
        </div>
        <div className={`${prefixCls}-detail-body`}>
          {!isEmpty(record.imgs) && (
            <div className={`${prefixCls}-detail-body-info-list-title`}>数据信息</div>
          )}
          <Scrollbar>
            <div className={`${prefixCls}-detail-body-info-list`}>
              {map(toRenderList, ({ key, val }) => (
                <div className={`${prefixCls}-detail-body-info-list-item`} key={key}>
                  <div className={`${prefixCls}-detail-body-info-list-item-key`}>{key}</div>
                  <div className={`${prefixCls}-detail-body-info-list-item-val`}>{val}</div>
                </div>
              ))}
            </div>
          </Scrollbar>
          {!isEmpty(record.imgs) && (
            <>
              <div className={`${prefixCls}-detail-body-img-list-title`}>图片信息</div>
              <div className={`${prefixCls}-detail-body-img-list`}>
                <ImgList
                  imgs={record.imgs}
                  prefixCls={prefixCls}
                  getPreviewPopupContainer={getPreviewPopupContainer}
                />
              </div>
            </>
          )}
        </div>
        {_renderFooterTools || _footerTools.length ? (
          <div className={`${prefixCls}-detail-footer`} style={toolStyle}>
            {_renderFooterTools
              ? _renderFooterTools(dataSource)
              : map(_footerTools, ({ id, name, action }, index) => (
                  <div key={id} onClick={action} className={`${prefixCls}-detail-footer-btn`}>
                    <div className={`${prefixCls}-detail-footer-btn-name`}>{name}</div>
                    {_footerTools.length > 1 && index !== _footerTools.length - 1 && (
                      <div className={`${prefixCls}-detail-footer-btn-split-line`} />
                    )}
                  </div>
                ))}
          </div>
        ) : null}
      </div>
    );
  },
);
