import * as React from 'react';
import classNames from 'classnames';
import { prefixCls, DEFAULT_IMAGE_SRC, BACKGROUND_SIZE_OPT } from './constant';
import Button from '../../button';
import Select from '../../select';
import { ColorImageProps } from './interface';
import '../style/color-image.less';

const ColorImage: React.FC<ColorImageProps> = ({
  className,
  showUpload,
  showMedia,
  onChange,
  labelUpload,
  getPopupContainer,
  labelSelectMedia,
  bgSizeOptions,
  src,
  size,
}) => {
  const style = {
    backgroundSize: size,
    backgroundImage: `url(${src})`,
    backgroundRepeat: src === DEFAULT_IMAGE_SRC ? 'repeat' : 'no-repeat',
  };
  return (
    <React.Fragment>
      <div style={style} className={classNames(`${prefixCls}-img`, className)}>
        <div className={`${prefixCls}-img-btns`}>
          <Button className={`${prefixCls}-img-btn`} onClick={showUpload}>
            {labelUpload}
          </Button>
          {!!showMedia && (
            <Button className={`${prefixCls}-img-btn`} onClick={showMedia}>
              {labelSelectMedia}
            </Button>
          )}
        </div>
      </div>
      <div className={`${prefixCls}-img-size-wrap`}>
        <Select
          size="compact"
          type="menu-bg"
          value={size}
          options={bgSizeOptions}
          allowClear={false}
          onChange={onChange}
          getPopupContainer={getPopupContainer}
          className={`${prefixCls}-img-size-select ${prefixCls}-select`}
        />
      </div>
    </React.Fragment>
  );
};

ColorImage.defaultProps = {
  labelUpload: '本地上传',
  labelSelectMedia: '从素材库选择',
  bgSizeOptions: BACKGROUND_SIZE_OPT,
  src: DEFAULT_IMAGE_SRC,
  size: BACKGROUND_SIZE_OPT[0].key,
};

ColorImage.displayName = 'ColorImage';
export default ColorImage;

const ColorImageMemo = React.memo(ColorImage);
ColorImageMemo.displayName = 'ColorImageMemo';
export { ColorImageMemo };
