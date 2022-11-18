import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Button from '@/components/button';
import notification from '@/components/notification';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ToastDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <Button
        onClick={() =>
          notification.success({
            duration: 0,
            message: 'Notification Title',
            description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        success
      </Button>
      <Button
        onClick={() =>
          notification.error({
            message: 'Notification Title',
            description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        error
      </Button>
      <Button
        onClick={() =>
          notification.warning({
            message: 'Notification Title',
            description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        warning
      </Button>
      <Button
        onClick={() =>
          notification.info({
            message: 'Notification Title',
            description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        info
      </Button>
      <Button
        onClick={() =>
          notification.open({
            message: 'Notification Title',
            description:
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        open
      </Button>
    </FlexHorAround>
  </DocPreview>
);
export default ToastDemo;
