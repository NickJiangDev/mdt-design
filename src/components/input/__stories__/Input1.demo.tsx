import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { LinkButton } from '@/components/button';
import Icon from '@/components/icon';
import Input, { Password, InputNumber, Textarea, InputAnimation } from '@/components/input';
import Tooltip from '@/components/tooltip';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const InputDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <div>
          <h4>标准</h4>
          <Input placeholder="请输入" />
        </div>
        <div>
          <h4>disabled</h4>
          <Input placeholder="请输入" disabled />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>前缀</h4>
          <Input prefixAddon="+86" placeholder="输入手机号" />
        </div>
        <div>
          <h4>后缀</h4>
          <Input suffixAddon="米" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>动态搜索</h4>
          <InputAnimation />
        </div>
        <div>
          <h4>动态搜索(受控)</h4>
          <InputAnimation value={'test'} />
        </div>
      </FlexHorAround>
      <h4>block</h4>
      <Tooltip trigger="focus" title={'ddd'} placement="topLeft" overlayClassName="numeric-input">
        <Input placeholder="请输入" block suffix={<LinkButton>获取验证码</LinkButton>} />
      </Tooltip>
      <FlexHorAround>
        <div>
          <h4>compact</h4>
          <Input placeholder="请输入" size="compact" />
        </div>
        <div>
          <h4>compact disabled</h4>
          <Input placeholder="请输入" disabled size="compact" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>compact 前缀</h4>
          <Input prefixAddon="+86" placeholder="输入手机号" size="compact" />
        </div>
        <div>
          <h4>compact 后缀</h4>
          <Input suffixAddon="米" size="compact" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>正常</h4>
          <Input placeholder="请输入" />
        </div>
        <div>
          <h4>错误</h4>
          <Input placeholder="请输入" status="error" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>警告</h4>
          <Input placeholder="请输入" status="warning" />
        </div>
        <div>
          <h4>成功</h4>
          <Input placeholder="输入手机号" status="success" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>prefixIcon</h4>
          <Input placeholder="搜索内容" prefixIcon="search" />
        </div>
        <div>
          <h4>suffixIcon</h4>
          <Input placeholder="请输入" suffixIcon="visibility-on" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>prefix</h4>
          <Input placeholder="请输入" prefix={<Icon icon="search" size={16} />} />
        </div>
        <div>
          <h4>suffix</h4>
          <Input placeholder="请输入" suffix={<LinkButton>获取验证码</LinkButton>} />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>password</h4>
          <Password placeholder="请输入密码" />
        </div>
        <div>
          <h4>password visibilityToggle=false</h4>
          <Password placeholder="请输入密码" visibilityToggle={false} />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>centered</h4>
          <Password placeholder="请输入" centered />
        </div>
        <div>
          <h4>allowClear=false</h4>
          <Password placeholder="请输入" visibilityToggle={false} allowClear={false} />
        </div>
      </FlexHorAround>
      <h4>block</h4>
      <Password placeholder="请输入密码" block />
      <FlexHorAround>
        <div>
          <h4>input number</h4>
          <InputNumber placeholder="请输入数字" />
        </div>
        <div>
          <h4>input number visibilityHandler</h4>
          <InputNumber placeholder="请输入数字" visibilityHandler />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>input number disabled</h4>
          <InputNumber placeholder="请输入数字" disabled />
        </div>
        <div>
          <h4>input number centered</h4>
          <InputNumber placeholder="请输入" centered />
        </div>
      </FlexHorAround>
      <h4>block</h4>
      <Tooltip trigger="focus" title={'ddd'} placement="topLeft" overlayClassName="numeric-input">
        <InputNumber placeholder="请输入数字" block />
      </Tooltip>
      <FlexHorAround>
        <div>
          <h4>正常</h4>
          <InputNumber placeholder="请输入数字" size="compact" />
        </div>
        <div>
          <h4>错误</h4>
          <InputNumber placeholder="请输入数字" status="error" size="compact" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>警告</h4>
          <InputNumber placeholder="请输入数字" status="warning" size="compact" />
        </div>
        <div>
          <h4>成功</h4>
          <InputNumber placeholder="请输入数字" status="success" size="compact" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>normal</h4>
          <Textarea placeholder="请输入" />
        </div>
        <div>
          <h4>disabled</h4>
          <Textarea placeholder="请输入" disabled />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>最小高度3行，最大高度10行</h4>
          <Textarea autoSize={{ minRows: 3, maxRows: 10 }} />
        </div>
        <div>
          <h4>autoSize false, 固定高度300px</h4>
          <Textarea autoSize={false} style={{ height: 300 }} />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>正常</h4>
          <Textarea placeholder="请输入" autoSize={false} />
        </div>
        <div>
          <h4>错误</h4>
          <Textarea placeholder="请输入" autoSize={false} status="error" />
        </div>
      </FlexHorAround>
      <FlexHorAround>
        <div>
          <h4>警告</h4>
          <Textarea autoSize={false} style={{ height: 300 }} status="warning" />
        </div>
        <div>
          <h4>成功</h4>
          <Textarea autoSize={false} style={{ height: 300, maxHeight: 500 }} status="success" />
        </div>
      </FlexHorAround>
      <h4>block</h4>
      <Textarea placeholder="请输入" block />
    </DocPreview>
  );
};

export default InputDemo;
