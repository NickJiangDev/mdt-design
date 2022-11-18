import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Button from '@/components/button';
import { NotificationContainer } from '@/components/notification';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ToastDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <div>
        <h4>no icon</h4>
        <NotificationContainer
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
      <div>
        <h4>custom icon</h4>
        <NotificationContainer
          emotion="save"
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
    </FlexHorAround>
    <FlexHorAround>
      <div>
        <h4>success</h4>
        <NotificationContainer
          emotion="success"
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
      <div>
        <h4>error</h4>
        <NotificationContainer
          emotion="alert"
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
    </FlexHorAround>
    <FlexHorAround>
      <div>
        <h4>warning</h4>
        <NotificationContainer
          emotion="help-2"
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
      <div>
        <h4>info</h4>
        <NotificationContainer
          emotion="info"
          message="消息标题"
          description={
            '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
          }
        />
      </div>
    </FlexHorAround>
    <h4>footer</h4>
    <NotificationContainer
      emotion="info"
      message="消息标题"
      description={
        '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。'
      }
      footer={
        <>
          <Button>取消</Button>
          <Button type={'primary'}>确定</Button>
        </>
      }
    />
  </DocPreview>
);
export default ToastDemo;
