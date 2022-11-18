import { DocPreview } from '@/__stories-template__';
import Input from '@/components/input';
import FormItem from '@/components/form-item';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => (
  <DocPreview {...props}>
    <div>
      <h2>default</h2>
      <FormItem label="模型名称">
        <Input allowClear={false} />
      </FormItem>
    </div>

    <div>
      <h2>default, required, message</h2>
      <FormItem label="模型名称" required={true} message="请输入名称，至少6个字符">
        <Input allowClear={false} />
      </FormItem>
    </div>

    <div>
      <h2>default, required, message, position=right</h2>
      <FormItem
        label="模型名称"
        required
        message="请输入名称，至少6个字符"
        position="right"
        messageIcon="alert"
      >
        <Input allowClear={false} />
      </FormItem>
    </div>
    <br />
    <div>
      <h2>status=error, messageIcon=alert</h2>
      <FormItem
        required
        label="模型名称"
        messageIcon="alert"
        message="请输入名称，至少6个字符"
        status="error"
      >
        <Input allowClear={false} status="error" />
      </FormItem>
    </div>

    <div>
      <h2>status=success, messageIcon=done-check</h2>
      <FormItem
        required
        label="模型名称"
        messageIcon="done-check"
        message="请输入名称，至少6个字符"
        status="success"
      >
        <Input allowClear={false} status="success" />
      </FormItem>
    </div>

    <div>
      <h2>status=warning, messageIcon=save</h2>
      <FormItem
        required
        label="模型名称"
        messageIcon="save"
        message="请输入名称，至少6个字符"
        status="warning"
      >
        <Input allowClear={false} status="warning" />
      </FormItem>
    </div>
    <br />
    <h2>direction: column</h2>
    <FormItem label="模型名称" required={true} direction="column">
      <Input allowClear={false} />
    </FormItem>
    <h2>block</h2>
    <FormItem label="模型名称" required={true} direction="column" position="right" block>
      <Input allowClear={false} block />
    </FormItem>
  </DocPreview>
);
