/**
 * @desc event interface
 */
// tslint:disable no-any no-unsafe-any
import { isString } from '@/basic/type';

// 第一种获取的方法 可读性略差
export enum mouseTypeEnum {
    'click',
    'mouse-down',
    'mouse-enter',
    'mouse-leave',
    'mouse-move',
    'mouse-out',
    'mouse-over',
    'mouse-in',
    'mouse-up',
}

export const mouseTypeArr2: string[] = Object.entries(mouseTypeEnum)
    .filter((v: [string, any]) => {
        return isString(v[1]);
    })
    .map((v: [string, any]) => {
        return v[1];
    });
export type mouseType2 = keyof typeof mouseTypeEnum;
// 分割分割 //

// 第二种方法，可读性更好 但是要写一行tslint-ignore
function makeArray<T extends string>(...args: T[]): T[] {
    return args;
}
// tslint:disable-next-line
export const mouseTypeArr = makeArray(
    'click',
    'mouse-down',
    'mouse-enter',
    'mouse-leave',
    'mouse-move',
    'mouse-out',
    'mouse-over',
    'mouse-in',
    'mouse-up',
);

export type mouseType = typeof mouseTypeArr[number];
// 分割分割 //

export function isMouseType(value: any): value is mouseType {
    return mouseTypeArr.indexOf(value) !== -1;
}

export type event = 'mouse' | 'keybord';

export type keybordType = 'input';

export interface IeventHandler {
    name: string;
    handler: Function;
}
