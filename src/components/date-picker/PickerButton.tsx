import Button, { ButtonProps } from '../button';

export default function PickerButton(props: ButtonProps) {
  return <Button size="compact" type="primary" {...props} />;
}
