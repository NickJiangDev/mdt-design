import * as React from 'react';
import { ObjectInterface } from './interfaces';

export const isValidElement = React.isValidElement;

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: ObjectInterface,
): React.ReactNode {
  if (!isValidElement(element)) return replacement;

  return React.cloneElement(element, typeof props === 'function' ? props() : props);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cloneElement(element: React.ReactNode, props?: any): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}
