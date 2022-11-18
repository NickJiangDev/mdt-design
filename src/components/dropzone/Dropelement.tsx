import * as React from 'react';
import classNames from 'classnames';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import './style/dropzone.less';

export interface DropelementProps {
  /** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers */
  /** 允许用户传入多个文件 */
  multiple?: boolean;
  /** 接收的文件类型 */
  accept?: string | string[];
  /** 最小尺寸 */
  minSize?: number;
  /** 最大尺寸 */
  maxSize?: number;
  /** 设置允许删除的项目接管当前的浏览器窗口 */
  preventDropOnDocument?: boolean;
  /** 禁用点击 */
  noClick?: boolean;
  /** 禁用键盘 */
  noKeyboard?: boolean;
  /** 禁用拖拽 */
  noDrag?: boolean;
  /** 设置停止将拖拽传播拖到父级 */
  noDragEventsBubbling?: boolean;
  /** 拖拽回调 */
  onDrop?<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ): void;
  /** 拖拽接收回调 */
  onDropAccepted?<T extends File>(files: T[], event: DropEvent): void;
  /** 拖拽失败回调 */
  onDropRejected?(fileRejections: FileRejection[], event: DropEvent): void;
  /** 提供一个文件聚合器 */
  getFilesFromEvent?(event: DropEvent): Promise<Array<File | DataTransferItem>>;
  /** 文件选择对话框关闭回调 */
  onFileDialogCancel?(): void;
  /** 类名 */
  className?: string;
  /** 禁用状态 */
  disabled?: boolean;
}

const prefixCls = 'dmc-dropelement';

const Dropelement: React.FC<DropelementProps> = (props) => {
  const { children, className, ...restProps } = props;
  const { getRootProps, getInputProps } = useDropzone(restProps);
  const cls = classNames(prefixCls, className);

  return (
    <div className={cls}>
      <div {...getRootProps({ className: `${prefixCls}-container` })}>
        <input {...getInputProps()} />
        {children}
      </div>
    </div>
  );
};

Dropelement.defaultProps = {
  multiple: true,
};

Dropelement.displayName = 'Dropelement';
export default Dropelement;

const DropelementMemo = React.memo(Dropelement);
DropelementMemo.displayName = 'DropelementMemo';
export { DropelementMemo };
