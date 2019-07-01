/**
 * @desc type
 */

// tslint:disable no-any no-unsafe-any
export const isType: Function = (obj: any, str: string): boolean => {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
};

export function isString(obj: any): obj is string {
    return isType(obj, 'String');
}

export function isNumber(obj: any): obj is number {
    return isType(obj, 'Number');
}
