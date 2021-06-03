export interface Imports {
  [key: string]: any;
}

export type IIFEModule<T> = (...args: any[]) => T;

export default function evalCode<T>(
  title: string,
  iife: string,
  imports: Imports,
): IIFEModule<T> {
  return Function(`
"use strict";

return (${Object.keys(imports).join(', ')}) => {
  ${iife}
  return ${title};
};`)() as IIFEModule<T>;
}
