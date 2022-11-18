declare module '!!raw-loader!*' {
  const contents: string;
  export = contents;
}

declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
declare module "*.md" {
  const content: string;
  export default content;
}

declare module '@ant-design/css-animation';
declare module 'rc-picker';
declare module 'rc-slider';
declare module 'react-color/*';
declare module 'rc-input-number';
declare module 'rc-util*';
