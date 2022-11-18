export interface ObjectInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface LabelValueItemInterface extends ObjectInterface {
  label?: string;
  value?: string;
  // icon?: React.ReactNode;
}
